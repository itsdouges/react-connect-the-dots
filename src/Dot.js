// @flow

import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  pair: string,
  children: any,
  height: number,
  connector: ({ [string]: string | number | void | Object }) => any,
};

type State = {
  ready: boolean,
};

const PAIR_STORE = {};

function calculateHypotenuse ({ width, height }) {
  const x2 = width ** 2;
  const y2 = height ** 2;

  const hypotenuse = Math.sqrt(x2 + y2);

  return {
    hypotenuse: Math.ceil(hypotenuse),
    deg: (Math.atan(height / width) * 180) / Math.PI,
  };
}

const addEvent = (eventName, cb) => {
  window.addEventListener(eventName, cb, false);
  return () => window.removeEventListener(eventName, cb, false);
};

export default class Dot extends React.Component<Props, State> {
  static defaultProps = {
    height: 50,
  };

  static contextTypes = {
    setRef: PropTypes.func,
  };

  static childContextTypes = {
    setRef: PropTypes.func,
  };

  state: State = {
    ready: false,
  };

  getChildContext () {
    return {
      setRef: this.supplyRef,
    };
  }

  componentDidMount () {
    this.initialize(this.props);
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.pair !== this.props.pair) {
      this.cleanup(nextProps);
      this.setState({ ready: false });
      this.initialize(nextProps);
    }
  }

  componentWillUnmount () {
    this.cleanup(this.props);
  }

  props: Props;
  _instance: HTMLElement;
  removeEvent: ?Function;

  cleanup (props: Props) {
    const { pair } = props;
    if (PAIR_STORE[pair]) {
      PAIR_STORE[pair] = PAIR_STORE[pair]
        .filter((func) => func === this.calculatePosition);

      if (PAIR_STORE[pair].length === 0) {
        delete PAIR_STORE[pair];
      }
    }

    this.removeEvent && this.removeEvent();
  }

  initialize (props: Props) {
    const { pair, connector } = props;
    const store = PAIR_STORE[pair] || [];
    if (store.length === 2) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('>> A <Dot /> pair can only have two dots in a pair.');
        console.warn('>> This <Dot /> will function as a no-op.');
      }
      return;
    }

    store.push(this.calculatePosition);

    PAIR_STORE[pair] = store;

    if (connector) {
      this.waitToDrawConnector();
      this.removeEvent = addEvent('resize', () => {
        if (this.state.ready) {
          this.setState({});
        }
      });
    }
  }

  waitToDrawConnector () {
    requestAnimationFrame(() => {
      const { pair } = this.props;

      const store = PAIR_STORE[pair];
      if (store.length === 2) {
        this.setState({
          ready: true,
        });
        return;
      }

      this.waitToDrawConnector();
    });
  }

  drawConnector () {
    const { pair, connector, height } = this.props;

    if (!this.state.ready || !connector) {
      return null;
    }

    const [calcStart, calcEnd] = PAIR_STORE[pair];

    const first = calcStart();
    const second = calcEnd();

    if (!first || !second) {
      return null;
    }

    let start;
    let end;

    // We want the start node to be the one that is more left.
    if (first.left < second.left) {
      start = first;
      end = second;
    } else {
      start = second;
      end = first;
    }

    const x = end.left - start.left;
    const y = end.top - start.top;

    const { hypotenuse, deg } = calculateHypotenuse({ width: x, height: y });

    const style = {
      position: 'absolute',
      left: start.left,
      top: start.top - height / 2,
      height,
      transformOrigin: 'left',
      width: hypotenuse,
      transform: `rotate(${deg}deg)`,
    };

    return connector({ style });
  }

  supplyRef = (ref: any) => {
    if (this.context.setRef) {
      this.context.setRef(ref);
    }
    this._instance = ref;
  };

  calculatePosition = () => {
    if (!this._instance) {
      return undefined;
    }

    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = this._instance;

    return { top: offsetTop + offsetHeight / 2, left: offsetLeft + offsetWidth / 2 };
  };

  render () {
    const children = this.props.children.type === Dot
      ? this.props.children
      : this.props.children(this.supplyRef);

    return (
      <span>
        {this.drawConnector()}
        {children}
      </span>
    );
  }
}

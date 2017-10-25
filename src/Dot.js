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
    const store = PAIR_STORE[this.props.pair] || [];
    if (store.length === 2) {
      throw new Error('>> A named pair can only have two dots.');
    }

    store.push(this.calculatePosition);

    PAIR_STORE[this.props.pair] = store;

    if (this.props.connector) {
      this.waitToDrawConnector();
      this.removeEvent = addEvent('resize', () => {
        if (this.state.ready) {
          this.setState({});
        }
      });
    }
  }

  componentWillUnmount () {
    PAIR_STORE[this.props.pair] = PAIR_STORE[this.props.pair]
      .filter((func) => func === this.calculatePosition);

    if (PAIR_STORE[this.props.pair].length === 0) {
      delete PAIR_STORE[this.props.pair];
    }

    this.removeEvent && this.removeEvent();
  }

  props: Props;
  _instance: HTMLElement;
  removeEvent: ?Function;

  waitToDrawConnector () {
    requestAnimationFrame(() => {
      const store = PAIR_STORE[this.props.pair];
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
    if (!this.state.ready || !this.props.connector) {
      return null;
    }

    const [calcStart, calcEnd] = PAIR_STORE[this.props.pair];
    const start = calcStart();
    const end = calcEnd();

    const x = end.left - start.left;
    const y = end.top - start.top;

    const { hypotenuse, deg } = calculateHypotenuse({ width: x, height: y });

    const style = {
      position: 'absolute',
      left: start.left,
      top: start.top - this.props.height / 2,
      height: this.props.height,
      transformOrigin: 'left',
      width: hypotenuse,
      transform: `rotate(${deg}deg)`,
    };

    return this.props.connector({ style });
  }

  supplyRef = (ref: any) => {
    if (this.context.setRef) {
      this.context.setRef(ref);
    }
    this._instance = ref;
  };

  calculatePosition = () => {
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

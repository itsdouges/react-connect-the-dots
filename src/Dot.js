// @flow

import type { Node } from 'react';
import React from 'react';

type Props = {
  pair: string,
  children: Node,
  height: number,
  connector?: ({ [string]: string | number | void | Object }) => Node,
};

type State = {
  ready: boolean,
};

const PAIR_STORE = {};

export function calculateHypotenuse ({ width, height }: Dimensions) {
  const x2 = width ** 2;
  const y2 = height ** 2;

  const hypotenuse = Math.sqrt(x2 + y2);
  return Math.ceil(hypotenuse);
}

export default class Dot extends React.Component<Props, State> {
  static defaultProps = {
    height: 50,
  };

  state: State = {
    ready: false,
  };
  props: Props;
  _instance: HTMLElement;

  componentDidMount () {
    const store = PAIR_STORE[this.props.pair] || [];
    if (store.length === 2) {
      throw new Error('Only a pair of two can exist.');
    }

    store.push(this.calculatePosition);

    PAIR_STORE[this.props.pair] = store;

    if (this.props.connector) {
      this.waitToDrawConnector();
    }
  }

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

    const [startFunc, endFunc] = PAIR_STORE[this.props.pair];
    const start = startFunc();
    const end = endFunc();

    const x = end.left - start.left;
    const y = start.top - end.top;

    console.log(start, end);
    console.log(x, y);

    const width = calculateHypotenuse({ width: x, height: y });
    const rotation = Math.tan(y / x);

    const style = {
      position: 'absolute',
      left: start.left,
      top: start.top - this.props.height / 2,
      height: this.props.height,
      transformOrigin: 'left',
      width,
      transform: `rotate(${rotation}deg)`,
    };

    return this.props.connector && this.props.connector({ style });
  }

  componentWillUnmount () {
    PAIR_STORE[this.props.pair] = PAIR_STORE[this.props.pair]
      .filter((func) => func === this.calculatePosition);

    if (PAIR_STORE[this.props.pair].length === 0) {
      delete PAIR_STORE[this.props.pair];
    }
  }

  supplyRef = (ref: HTMLElement) => {
    this._instance = ref;
  };

  calculatePosition = () => {
    const { top, left, width, height } = this._instance.getBoundingClientRect();

    return { top: top + height / 2, left: left + width / 2 };
  };

  render () {
    return (
      <span ref={this.supplyRef}>
        {this.drawConnector()}
        {this.props.children}
      </span>
    );
  }
}

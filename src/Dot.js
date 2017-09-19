// @flow

import type { Node } from 'react';
import React from 'react';

type Props = {
  pair: string,
  children: Node,
  connector?: ({ [string]: string | number | void | Object }) => Node,
};

type State = {
  ready: boolean,
};

const PAIR_STORE = {};

export default class Dot extends React.Component<Props, State> {
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

    const style = {
      position: 'absolute',
      left: start.x,
      top: start.y,
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

    const x = top + height / 2;
    const y = left + width / 2;

    return { x, y };
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

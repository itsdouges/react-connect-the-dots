// @flow

import type { Node } from 'react';
import React from 'react';

type Props = {
  pair: string,
  children: Node,
  connector?: () => Node,
};

type State = {

};

const PAIR_STORE = {};

export default class Dot extends React.Component<Props, State> {
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
        const [start, end] = store;
        this.drawConnector(start(), end());
        return;
      }

      this.waitToDrawConnector();
    });
  }

  drawConnector (start, end) {
    console.log(start, end);
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
    return React.cloneElement(this.props.children, {
      ref: this.supplyRef,
    });
  }
}

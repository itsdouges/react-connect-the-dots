// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Dot from '../src';
import './styles.less';

const MyComponent = (props) => <div {...props} className="connector-simple" />;

const SingleLineApp = ({ double }: { double?: boolean }) => (
  <div className="root">
    <Dot pair="ab" connector={(props) => <MyComponent {...props} />}>
      <div className="child">1</div>
    </Dot>

    <Dot pair="ab" connector={double ? (props) => <div {...props} className="connector-simple" /> : undefined}>
      <div className="child">2</div>
    </Dot>
  </div>
);

const MultiLineApp = () => (
  <div className="root">
    <div className="child">1</div>
    <div>
      <div className="child">2</div>
      <div className="child">3</div>
    </div>
    <div className="child">4</div>
  </div>
);

storiesOf('<Dot />')
  .add('single line', () => <SingleLineApp />)
  .add('double line', () => <SingleLineApp double />)
  .add('multi lines', () => <MultiLineApp />);

// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import Dot from '../src';
// $FlowFixMe
import 'style-loader!css-loader!./styles.css';

const MyComponent = (props) => <div {...props} className="connector-simple" />;

const SingleLineApp = () => (
  <div className="root">
    <Dot pair="ab" connector={(props) => <MyComponent {...props} />}>
      <div className="child">1</div>
    </Dot>

    <Dot pair="ab">
      <div className="child move-top">2</div>
    </Dot>
  </div>
);

const MultiLineApp = () => (
  <div className="root">

    <Dot pair="ab" connector={(props) => <MyComponent {...props} />}>
      <div className="child">1</div>
    </Dot>

    <div>
      <Dot pair="bd" connector={(props) => <MyComponent {...props} />}>
        <Dot pair="bc" connector={(props) => <MyComponent {...props} />}>
          <Dot pair="ab">
            <div className="child">2</div>
          </Dot>
        </Dot>
      </Dot>

      <Dot pair="bd">
        <div className="child">3</div>
      </Dot>
    </div>

    <Dot pair="bc">
      <div className="child">4</div>
    </Dot>
  </div>
);

storiesOf('Dot/Single', module)
  .add('static', () => <SingleLineApp />);

storiesOf('Dot/Multi', module)
  .add('static', () => <MultiLineApp />);

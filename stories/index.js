// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Dot from '../src';
import './styles.less';

const App = () => (
  <div className="root">
    <div className="child">1</div>
    <div>
      <div className="child">2</div>
      <div className="child">3</div>
    </div>
    <div className="child">4</div>
  </div>
);

storiesOf('Component')
  .add('default', () => <App />);

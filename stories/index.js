import React from 'react';
import { storiesOf } from '@storybook/react';
import Dot from '../src';
import 'style-loader!css-loader!./styles.css';

const MyComponent = (props) => <div {...props} className="connector-simple" />;

const NestedComponent = ({ children }) => children;

const SingleLineApp = ({ dynamic }) => (
  <div className="root">
    <Dot pair="ab" connector={(props) => <MyComponent {...props} />}>
      <div className={`child${dynamic ? ' dynamic' : ''}`}>1</div>
    </Dot>

    <Dot pair="ab">
      <div className={`child move-top${dynamic ? ' dynamic' : ''}`}>2</div>
    </Dot>
  </div>
);

const NestedApp = ({ dynamic }) => (
  <div className="root">
    <Dot pair="ab" connector={(props) => <MyComponent {...props} />}>
      <NestedComponent>
        <div className={`child${dynamic ? ' dynamic' : ''}`}>1</div>
      </NestedComponent>
    </Dot>

    <Dot pair="ab">
      <NestedComponent>
        <div className={`child move-top${dynamic ? ' dynamic' : ''}`}>2</div>
      </NestedComponent>
    </Dot>
  </div>
);

const MultiLineApp = ({ dynamic }) => (
  <div className="root">

    <Dot pair="ab" connector={(props) => <MyComponent {...props} />}>
      <div className={`child${dynamic ? ' dynamic' : ''}`}>1</div>
    </Dot>

    <div>
      <Dot pair="bd" connector={(props) => <MyComponent {...props} />}>
        <Dot pair="bc" connector={(props) => <MyComponent {...props} />}>
          <Dot pair="ab">
            <div className={`child${dynamic ? ' dynamic' : ''}`}>2</div>
          </Dot>
        </Dot>
      </Dot>

      <Dot pair="bd">
        <div className={`child${dynamic ? ' dynamic' : ''}`}>3</div>
      </Dot>
    </div>

    <Dot pair="bc">
      <div className={`child${dynamic ? ' dynamic' : ''}`}>4</div>
    </Dot>
  </div>
);

storiesOf('Dot/Single', module)
  .add('static', () => <SingleLineApp />)
  .add('deeply nested', () => <NestedApp />)
  .add('dynamic', () => <SingleLineApp dynamic />);

storiesOf('Dot/Multi', module)
  .add('static', () => <MultiLineApp />)
  .add('dynamic', () => <MultiLineApp dynamic />);

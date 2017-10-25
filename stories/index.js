import React from 'react';
import { storiesOf } from '@storybook/react';
import Dot from '../src';
import 'style-loader!css-loader!./styles.css';

const MyComponent = (props) => <div {...props} className="connector-simple" />;

const SingleLineApp = ({ dynamic }) => (
  <div className="root">
    <Dot pair="ab" connector={(props) => <MyComponent {...props} />}>
      {(ref) => <div><div><div className={`child${dynamic ? ' dynamic' : ''}`} ref={ref}>1</div></div></div>}
    </Dot>

    <Dot pair="ab">
      {(ref) => <div className={`child move-top${dynamic ? ' dynamic' : ''}`} ref={ref}>1</div>}
    </Dot>
  </div>
);

const MultiLineApp = ({ dynamic }) => (
  <div className="root">

    <Dot pair="ab" connector={(props) => <MyComponent {...props} />}>
      {(ref) => <div className={`child${dynamic ? ' dynamic' : ''}`} ref={ref}>1</div>}
    </Dot>

    <div>
      <Dot pair="bd" connector={(props) => <MyComponent {...props} />}>
        <Dot pair="bc" connector={(props) => <MyComponent {...props} />}>
          <Dot pair="ab">
            {(ref) => <div className={`child${dynamic ? ' dynamic' : ''}`} ref={ref}>1</div>}
          </Dot>
        </Dot>
      </Dot>

      <Dot pair="bd">
        {(ref) => <div className={`child${dynamic ? ' dynamic' : ''}`} ref={ref}>1</div>}
      </Dot>
    </div>

    <Dot pair="bc">
      {(ref) => <div className={`child${dynamic ? ' dynamic' : ''}`} ref={ref}>1</div>}
    </Dot>
  </div>
);

storiesOf('Dot/Single', module)
  .add('static', () => <SingleLineApp />)
  .add('page margin', () => <div className="margin"><SingleLineApp /></div>)
  .add('dynamic', () => <SingleLineApp dynamic />);

storiesOf('Dot/Multi', module)
  .add('static', () => <MultiLineApp />)
  .add('dynamic', () => <MultiLineApp dynamic />);

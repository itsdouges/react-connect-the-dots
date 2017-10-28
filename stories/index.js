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

class ChangingDots extends React.Component {
  state = {
    flip: false,
  };

  componentDidMount () {
    const intervalId = setInterval(() => {
      this.setState((prevState) => ({
        flip: !prevState.flip,
      }));
    }, 1000);

    this.clean = () => clearInterval(intervalId);
  }

  componentWillUnmount () {
    this.clean();
  }

  render () {
    const pair = this.state.flip ? 'ab' : 'ac';

    const pairA = [
      <Dot key="dotab" pair="ab" connector={(props) => <MyComponent {...props} />}>
        {(ref) => <div><div><div className="child" ref={ref}>2</div></div></div>}
      </Dot>,
      <div key="ab"><div><div className="child">3</div></div></div>,
    ];

    const pairB = [
      <div key="b"><div><div className="child">2</div></div></div>,
      <Dot key="dotac" pair="ac" connector={(props) => <MyComponent {...props} />}>
        {(ref) => <div><div><div className="child" ref={ref}>3</div></div></div>}
      </Dot>,
    ];

    return (
      <div className="root">
        <Dot pair={pair}>
          {(ref) => <div className="child" ref={ref}>1</div>}
        </Dot>

        {this.state.flip ? pairA : pairB}
      </div>
    );
  }
}

storiesOf('Dot/Single', module)
  .add('static', () => <SingleLineApp />)
  .add('page margin', () => <div className="margin"><SingleLineApp /></div>)
  .add('updating positions', () => <ChangingDots />)
  .add('dynamic', () => <SingleLineApp dynamic />);

storiesOf('Dot/Multi', module)
  .add('static', () => <MultiLineApp />)
  .add('dynamic', () => <MultiLineApp dynamic />);

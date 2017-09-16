# [react-connect-the-dots](https://github.com/madou/react-connect-the-dots)

[![NPM version](http://img.shields.io/npm/v/react-connect-the-dots.svg?style=flat-square)](https://www.npmjs.com/package/react-connect-the-dots)
[![NPM downloads](http://img.shields.io/npm/dm/react-connect-the-dots.svg?style=flat-square)](https://www.npmjs.com/package/react-connect-the-dots)
[![Build Status](http://img.shields.io/travis/madou/react-connect-the-dots/master.svg?style=flat-square)](https://travis-ci.org/madou/react-connect-the-dots)
[![codecov](https://codecov.io/gh/madou/react-connect-the-dots/branch/master/graph/badge.svg)](https://codecov.io/gh/madou/react-connect-the-dots)
[![Dependency Status](http://img.shields.io/david/madou/react-connect-the-dots.svg?style=flat-square)](https://david-dm.org/madou/react-connect-the-dots)

Positions an element between components. Wrap a from and to component, give them a pair name, and customise the line as you see fit.
Explicitly a client side _only_ solution.

<p align="center">
  <img src="https://github.com/madou/react-connect-the-dots/blob/master/example.gif?raw=true" style="margin:0 auto" />
</p>

## Installation

```sh
npm install react-connect-the-dots
```

## Usage

```javascript
import Dot from 'react-connect-the-dots';

const CustomComponent = ({ supplyRef, ...props }) => (
  <div {...props} ref={supplyRef}>hello</div>
);

const App = () => (
  <div className="relative-position-container">

    <Dot pair="a-b" connector={(props) => <div className="sweet-line" {...props} />}>
      <CustomComponent className="position-top-left" />
    </Dot>

    <Dot pair="b-c" connector={(props) => <div className="sweet-line thicc" {...props} />}>
      <Dot pair="a-b">
        <CustomComponent className="position-bottom-right" />
      </Dot>
    </Dot>

    <Dot pair="b-c">
      <CustomComponent className="position-bottom-right" />
    </Dot>
  </div>
);
```

### `<Dot />`

Should wrap a component where you want a dot to be.
Each dot pair should have only **two** components.
A dot can wrap multiple components. Will pass down extra props,
so make sure to assign all overflow props to the raw DOM root element.

IMPORTANT: If using a custom component, make sure to set `ref` to the passed
down `supplyRef` function.

```javascript
<Dot pair="a-b" connector={(props) => <div className="sweet-line" {...props} />}>
  <CustomComponent className="position-bottom-right" />
</Dot>
```

| prop | type | required | description |
|-|-|-|-|
| children | Children  | yes | |
| pair | string  | yes | The name that each dot pair will share. |
| connector | () => React$Class | no | The connect(or) to be drawn between dots, make sure to spread the props to the root DOM element. |

## Troulbeshooting

If no lines are being drawn, one of two things is probably happening.

### Raw DOM element isn't recieving the ref func

### No `connector` is set

### React Story Book

To run the component in various modes, run the following command then go to `http://localhost:6006/`.

```bash
npm start
```

### Testing

```bash
npm test
```

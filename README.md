# [react-connect-the-dots](https://github.com/madou/react-connect-the-dots)

[![NPM version](http://img.shields.io/npm/v/react-connect-the-dots.svg?style=flat-square)](https://www.npmjs.com/package/react-connect-the-dots)
[![NPM downloads](http://img.shields.io/npm/dm/react-connect-the-dots.svg?style=flat-square)](https://www.npmjs.com/package/react-connect-the-dots)
[![Build Status](http://img.shields.io/travis/madou/react-connect-the-dots/master.svg?style=flat-square)](https://travis-ci.org/madou/react-connect-the-dots)
[![codecov](https://codecov.io/gh/madou/react-connect-the-dots/branch/master/graph/badge.svg)](https://codecov.io/gh/madou/react-connect-the-dots)
[![Dependency Status](http://img.shields.io/david/madou/react-connect-the-dots.svg?style=flat-square)](https://david-dm.org/madou/react-connect-the-dots)

Positions an component `connector` between two components. Wrap a from and to component, give them a pair name, and customise the line as you see fit.
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

const CustomComponent = () => (
  <div>hello</div>
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

You can wrap components in a `Dot` to draw a connector between them.
Each connector `pair` should only have two `Dots`, if you try to add
more an exception will be thrown.

```javascript
import Dot from 'react-connect-the-dots';

const App = () => (
  <Dot pair="a-b" connector={(props) => <div className="sweet-line" {...props} />}>
    <CustomComponent className="position-bottom-right" />
  </Dot>
);
```

| prop | type | required | description |
|-|-|-|-|
| pair | `string`  | yes | The name that each dot pair will share. |
| connector | () => `Node` | no | The connector to be drawn between dots. This can be on all, one, or none for a `Dot` pair. |
| children | `Children`  | yes | |

### React Story Book

To run the component in various modes, run the following command then go to `http://localhost:6006/`.

```bash
npm start
```

### Testing

```bash
npm test
```

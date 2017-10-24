import 'babel-polyfill';

global.React = require('react');

require('jsdom-global')();

global.chai = require('chai');
global.sinon = require('sinon');
global.expect = require('chai').expect;
global.AssertionError = require('chai').AssertionError;

global.chai.should();
global.chai.use(require('sinon-chai'));
global.chai.use(require('chai-enzyme')());
global.chai.use(require('chai-as-promised'));

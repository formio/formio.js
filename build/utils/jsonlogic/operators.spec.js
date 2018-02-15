'use strict';

/* eslint-env mocha */

var _chai = require('chai');

var _index = require('../index');

describe('Lodash operators', function () {
  describe('Arrays', function () {});
  describe('Collection', function () {});
  describe('Date', function () {});
  describe('Function', function () {});
  describe('Lang', function () {
    it('isEqual', function () {
      var logicTrue = { _isEqual: [[2, 3], [2, 3]] };
      var logicFalse = { _isEqual: [[2, 3], [2, 4]] };
      (0, _chai.expect)(_index.jsonLogic.apply(logicTrue)).to.be.equal(true);
      (0, _chai.expect)(_index.jsonLogic.apply(logicFalse)).to.be.equal(false);
    });
  });
  describe('Math', function () {
    it('add', function () {
      var logic = { _add: [2, 3] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic)).to.be.equal(5);
    });
    it('ceil', function () {
      var logic = { _ceil: [4.006] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic)).to.be.equal(5);
    });
    it('divide', function () {
      var logic = { _divide: [6, 3] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic)).to.be.equal(2);
    });
    it('floor', function () {
      var logic = { _floor: [4.906] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic)).to.be.equal(4);
    });
    it('max', function () {
      var logic = { _max: [[2, 5, 6, 3]] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic)).to.be.equal(6);
    });
    it('maxBy', function () {
      var data = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
      var logic1 = { _maxBy: [{ 'var': '' }, 'n'] };
      var logic2 = { _maxBy: [{ 'var': '' }, { _property: 'n' }] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic1, data)).to.be.equal(data[2]);
      (0, _chai.expect)(_index.jsonLogic.apply(logic2, data)).to.be.equal(data[2]);
    });
    it('mean', function () {
      var logic = { _mean: [[2, 5, 6, 3]] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic)).to.be.equal(4);
    });
    it('meanBy', function () {
      var data = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
      var logic1 = { _meanBy: [{ 'var': '' }, 'n'] };
      var logic2 = { _meanBy: [{ 'var': '' }, { _property: 'n' }] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic1, data)).to.be.equal(5);
      (0, _chai.expect)(_index.jsonLogic.apply(logic2, data)).to.be.equal(5);
    });
    it('min', function () {
      var logic = { _min: [[2, 5, 6, 3]] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic)).to.be.equal(2);
    });
    it('minBy', function () {
      var data = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
      var logic1 = { _minBy: [{ 'var': '' }, 'n'] };
      var logic2 = { _minBy: [{ 'var': '' }, { _property: 'n' }] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic1, data)).to.be.equal(data[1]);
      (0, _chai.expect)(_index.jsonLogic.apply(logic2, data)).to.be.equal(data[1]);
    });
    it('multiply', function () {
      var logic = { _multiply: [2, 3] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic)).to.be.equal(6);
    });
    it('round', function () {
      var logic1 = { _round: [4.006] };
      var logic2 = { _round: [4.906] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic1)).to.be.equal(4);
      (0, _chai.expect)(_index.jsonLogic.apply(logic2)).to.be.equal(5);
    });
    it('multiply', function () {
      var logic = { _multiply: [2, 3] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic)).to.be.equal(6);
    });
    it('subtract', function () {
      var logic = { _subtract: [2, 3] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic)).to.be.equal(-1);
    });
    it('sum', function () {
      var logic = { _sum: [[2, 3]] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic)).to.be.equal(5);
    });
    it('sumBy', function () {
      var data = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
      var logic1 = { _sumBy: [{ 'var': '' }, 'n'] };
      var logic2 = { _sumBy: [{ 'var': '' }, { _property: 'n' }] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic1, data)).to.be.equal(20);
      (0, _chai.expect)(_index.jsonLogic.apply(logic2, data)).to.be.equal(20);
    });
  });
  describe('Number', function () {});
  describe('Object', function () {});
  describe('String', function () {});
  describe('Util', function () {
    it('property', function () {
      var data = [{ 'a': { 'b': 2 } }, { 'a': { 'b': 1 } }];
      var logic = { _sumBy: [{ 'var': '' }, { _property: 'a.b' }] };
      (0, _chai.expect)(_index.jsonLogic.apply(logic, data)).to.be.equal(3);
    });
  });
});
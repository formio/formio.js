'use strict';

/* eslint-env mocha */

var _chai = require('chai');

var _writtenNumber = require('written-number');

var _writtenNumber2 = _interopRequireDefault(_writtenNumber);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _components = require('./fixtures/components.json');

var _components2 = _interopRequireDefault(_components);

var _submission = require('./fixtures/submission1.json');

var _submission2 = _interopRequireDefault(_submission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('eachComponent', function () {
  it('should iterate through nested components in the right order', function () {
    var n = 1;
    _index2.default.eachComponent(_components2.default, function (component) {
      (0, _chai.expect)(component.order).to.equal(n);
      n += 1;
    });
  });

  it('should include layouts components if provided', function () {
    var numComps = 0;
    var numLayout = 0;
    _index2.default.eachComponent(_components2.default, function (component) {
      if (_index2.default.isLayoutComponent(component)) {
        numLayout++;
      } else {
        numComps++;
      }
    }, true);
    (0, _chai.expect)(numLayout).to.be.equal(3);
    (0, _chai.expect)(numComps).to.be.equal(8);
  });

  it('Should provide the paths to all of the components', function () {
    var paths = ['one', 'parent1', 'two', 'parent2', 'three', '', 'four', 'five', 'six', 'seven', 'eight'];
    var testPaths = [];
    _index2.default.eachComponent(_components2.default, function (component, path) {
      testPaths.push(path);
    }, true);
    (0, _chai.expect)(paths).to.deep.equal(testPaths);
  });

  it('Should be able to find all textfield components', function () {
    var comps = _index2.default.findComponents(_components2.default, { type: 'textfield' });
    (0, _chai.expect)(comps.length).to.equal(6);
  });

  it('Should be able to find components with special properties.', function () {
    var components3 = require('./fixtures/components3.json');
    var comps = _index2.default.findComponents(components3, { 'properties.path': 'a' });
    (0, _chai.expect)(comps.length).to.equal(4);
    (0, _chai.expect)(comps[0].key).to.equal('b');
    (0, _chai.expect)(comps[1].key).to.equal('e');
    (0, _chai.expect)(comps[2].key).to.equal('j');
    (0, _chai.expect)(comps[3].key).to.equal('m');
  });

  it('Should be able to generate paths based on component types', function () {
    var components = require('./fixtures/components2.json');
    var paths = ['a', 'b', 'c', 'd', 'f', 'f.g', 'f.h', 'f.i', 'e', 'j', 'k', 'k.n', 'k.n.o', 'k.n.p', 'k.n.q', 'k.m', 'k.l', 'r', 'submit'];
    var testPaths = [];
    _index2.default.eachComponent(components, function (component, path) {
      testPaths.push(path);
    }, true);
    (0, _chai.expect)(paths).to.deep.equal(testPaths);
  });

  it('Should still provide the correct paths when it is not recursive', function () {
    var paths = ['a', 'd', 'f', 'f.g', 'f.h', 'f.i', 'e', 'j', 'k', 'k.n', 'k.n.o', 'k.n.p', 'k.n.q', 'k.m', 'k.l', 'r', 'submit'];
    var testPaths = [];
    _index2.default.eachComponent(require('./fixtures/components2.json'), function (component, path) {
      testPaths.push(path);
    });
    (0, _chai.expect)(paths).to.deep.equal(testPaths);
  });

  it('should be able to block recursion', function () {
    var numComps = 0;
    var numLayout = 0;
    _index2.default.eachComponent(_components2.default, function (component) {
      if (_index2.default.isLayoutComponent(component)) {
        numLayout++;
      } else {
        numComps++;
      }

      if (component.type === 'table') {
        var numInTable = 0;
        [].concat.apply([], component.rows).forEach(function (row) {
          _index2.default.eachComponent(row.components, function () {
            numInTable++;
          });
        });
        (0, _chai.expect)(numInTable).to.be.equal(4);
        return true;
      }
    }, true);
    (0, _chai.expect)(numLayout).to.be.equal(3);
    (0, _chai.expect)(numComps).to.be.equal(4);
  });
});

describe('getComponent', function () {
  it('should return the correct components', function () {
    for (var n = 1; n <= 8; n += 1) {
      var component = _index2.default.getComponent(_components2.default, (0, _writtenNumber2.default)(n));
      (0, _chai.expect)(component).not.to.be.null;
      (0, _chai.expect)(component).not.to.be.undefined;
      (0, _chai.expect)(component).to.be.an('object');
      (0, _chai.expect)(component.order).to.equal(n);
      (0, _chai.expect)(component.key).to.equal((0, _writtenNumber2.default)(n));
    }
  });

  it('should work with a different this context', function () {
    for (var n = 1; n <= 8; n += 1) {
      var component = _index2.default.getComponent.call({}, _components2.default, (0, _writtenNumber2.default)(n));
      (0, _chai.expect)(component).not.to.be.null;
      (0, _chai.expect)(component).not.to.be.undefined;
      (0, _chai.expect)(component).to.be.an('object');
      (0, _chai.expect)(component.order).to.equal(n);
      (0, _chai.expect)(component.key).to.equal((0, _writtenNumber2.default)(n));
    }
  });
});

describe('flattenComponents', function () {
  it('should return an object of flattened components', function () {
    var flattened = _index2.default.flattenComponents(_components2.default);
    for (var n = 1; n <= 8; n += 1) {
      var component = flattened[(0, _writtenNumber2.default)(n)];
      (0, _chai.expect)(component).not.to.be.undefined;
      (0, _chai.expect)(component).to.be.an('object');
      (0, _chai.expect)(component.order).to.equal(n);
      (0, _chai.expect)(component.key).to.equal((0, _writtenNumber2.default)(n));
    }
  });

  it('should work with a different this context', function () {
    var flattened = _index2.default.flattenComponents.call({}, _components2.default);
    for (var n = 1; n <= 8; n += 1) {
      var component = flattened[(0, _writtenNumber2.default)(n)];
      (0, _chai.expect)(component).not.to.be.undefined;
      (0, _chai.expect)(component).to.be.an('object');
      (0, _chai.expect)(component.order).to.equal(n);
      (0, _chai.expect)(component.key).to.equal((0, _writtenNumber2.default)(n));
    }
  });
});

describe('getValue', function () {
  it('should be able to get a simple value', function () {
    (0, _chai.expect)(_index2.default.getValue(_submission2.default, 'name')).to.be.equal(_submission2.default.data.name);
  });

  it('should be able to get a value from a container', function () {
    (0, _chai.expect)(_index2.default.getValue(_submission2.default, 'animalname')).to.be.equal(_submission2.default.data.mycontainer.animalname);
  });
});

describe('parseFloat', function () {
  it('should clear input and parse value', function () {
    (0, _chai.expect)(_index2.default.parseFloat('12,345,678.90')).to.be.equal(12345678.90);
  });
});

describe('formatAsCurrency', function () {
  it('should be able to format Float value for Currency component', function () {
    (0, _chai.expect)(_index2.default.formatAsCurrency(123.4)).to.be.equal('123.40');
    (0, _chai.expect)(_index2.default.formatAsCurrency(12345678.9)).to.be.equal('12,345,678.90');
    (0, _chai.expect)(_index2.default.formatAsCurrency(12345678.915)).to.be.equal('12,345,678.92');
  });

  it('should be able to format String value for Currency component', function () {
    (0, _chai.expect)(_index2.default.formatAsCurrency('12345678.915')).to.be.equal('12,345,678.92');
  });
});

describe('checkCalculated', function () {
  it('should be able to calculate value based on javascript code', function () {
    var component = {
      key: 'sum',
      calculateValue: 'value = 3'
    };
    var data = {};

    _index2.default.checkCalculated(component, null, data);
    (0, _chai.expect)(data.sum).to.be.equal(3);
  });

  it('should be able to calculate value based on json logic', function () {
    var component = {
      key: 'sum',
      calculateValue: {
        '_sum': { var: 'data.test' }
      }
    };
    var data = { test: [1, 2, 3] };

    _index2.default.checkCalculated(component, null, data);
    (0, _chai.expect)(data.sum).to.be.equal(6);
  });
});

describe('checkCondition', function () {
  it('should display component by default', function () {
    (0, _chai.expect)(_index2.default.checkCondition({}, null, {})).to.be.equal(true);
  });

  it('should be able to calculate condition based on javascript code', function () {
    var component = {
      key: 'sum',
      customConditional: 'show = data.test === 3'
    };
    var data1 = { test: 3 };
    var data2 = { test: 5 };

    (0, _chai.expect)(_index2.default.checkCondition(component, null, data1)).to.be.equal(true);
    (0, _chai.expect)(_index2.default.checkCondition(component, null, data2)).to.be.equal(false);
  });

  it('should be able to calculate condition based on json logic', function () {
    var component = {
      key: 'sum',
      conditional: {
        json: {
          '===': [{ '_sum': { var: 'data.test' } }, 6]
        }
      }
    };
    var data1 = { test: [1, 2, 3] };
    var data2 = { test: [1, 2, 4] };

    (0, _chai.expect)(_index2.default.checkCondition(component, null, data1)).to.be.equal(true);
    (0, _chai.expect)(_index2.default.checkCondition(component, null, data2)).to.be.equal(false);
  });
});

describe('getDateSetting', function () {
  it('should return null if no date provided', function () {
    (0, _chai.expect)(_index2.default.getDateSetting()).to.be.equal(null);
    (0, _chai.expect)(_index2.default.getDateSetting(null)).to.be.equal(null);
    (0, _chai.expect)(_index2.default.getDateSetting(undefined)).to.be.equal(null);
    (0, _chai.expect)(_index2.default.getDateSetting(NaN)).to.be.equal(null);
    (0, _chai.expect)(_index2.default.getDateSetting('')).to.be.equal(null);
    (0, _chai.expect)(_index2.default.getDateSetting('should be invalid')).to.be.equal(null);
  });

  it('should return valid Date on serialized date provided', function () {
    var date = new Date(0);

    (0, _chai.expect)(_index2.default.getDateSetting(date)).to.be.eql(date).but.not.equal(date);
    (0, _chai.expect)(_index2.default.getDateSetting(date.valueOf())).to.be.eql(date);
    (0, _chai.expect)(_index2.default.getDateSetting(date.toString())).to.be.eql(date);
    (0, _chai.expect)(_index2.default.getDateSetting(date.toISOString())).to.be.eql(date);
  });

  it('should be able to get value using moment APIs', function () {
    var validMomentExpression = 'moment(0)';
    var validDate = new Date(0);
    var invalidMomentExpression = "moment('')";

    (0, _chai.expect)(_index2.default.getDateSetting(validMomentExpression)).to.be.eql(validDate);
    (0, _chai.expect)(_index2.default.getDateSetting(invalidMomentExpression)).to.be.equal(null);
  });
});
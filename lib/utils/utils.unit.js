"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

var fs = _interopRequireWildcard(require("fs"));

var _chai = require("chai");

var _lodash = _interopRequireDefault(require("lodash"));

var _writtenNumber = _interopRequireDefault(require("written-number"));

var _2 = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var components = JSON.parse(fs.readFileSync('src/utils/fixtures/components.json'));
var components2 = JSON.parse(fs.readFileSync('src/utils/fixtures/components2.json'));
var components3 = JSON.parse(fs.readFileSync('src/utils/fixtures/components3.json'));
var components4 = JSON.parse(fs.readFileSync('src/utils/fixtures/components4.json'));
var components5 = JSON.parse(fs.readFileSync('src/utils/fixtures/components5.json'));
var submission1 = JSON.parse(fs.readFileSync('src/utils/fixtures/submission1.json'));
describe('Util Tests', function () {
  describe('eachComponent', function () {
    it('should iterate through nested components in the right order', function () {
      var n = 1;

      _2.default.eachComponent(components, function (component) {
        (0, _chai.expect)(component.order).to.equal(n);
        n += 1;
      });
    });
    it('should include layouts components if provided', function () {
      var numComps = 0;
      var numLayout = 0;

      _2.default.eachComponent(components, function (component) {
        if (_2.default.isLayoutComponent(component)) {
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

      _2.default.eachComponent(components, function (component, path) {
        testPaths.push(path);
      }, true);

      (0, _chai.expect)(paths).to.deep.equal(testPaths);
    });
    describe('findComponent', function () {
      it('should find correct component in nested structure', function () {
        _2.default.findComponent(components4, 'four', null, function (component) {
          (0, _chai.expect)(component.label).to.equal('4');
        });
      });
      it('should find correct component in flat structure', function () {
        _2.default.findComponent(components4, 'one', null, function (component) {
          (0, _chai.expect)(component.label).to.equal('1');
        });
      });
    });
    it('Should be able to find all textfield components', function () {
      var comps = _2.default.findComponents(components, {
        type: 'textfield'
      });

      (0, _chai.expect)(comps.length).to.equal(6);
    });
    it('Should be able to find components with special properties.', function () {
      var comps = _2.default.findComponents(components3, {
        'properties.path': 'a'
      });

      (0, _chai.expect)(comps.length).to.equal(4);
      (0, _chai.expect)(comps[0].key).to.equal('b');
      (0, _chai.expect)(comps[1].key).to.equal('e');
      (0, _chai.expect)(comps[2].key).to.equal('j');
      (0, _chai.expect)(comps[3].key).to.equal('m');
    });
    it('Should be able to generate paths based on component types', function () {
      var paths = ['a', 'b', 'c', 'd', 'f', 'f.g', 'f.h', 'f.i', 'e', 'j', 'k', 'k.n', 'k.n.o', 'k.n.p', 'k.n.q', 'k.m', 'k.l', 'r', 'submit'];
      var testPaths = [];

      _2.default.eachComponent(components2, function (component, path) {
        testPaths.push(path);
      }, true);

      (0, _chai.expect)(paths).to.deep.equal(testPaths);
    });
    it('Should still provide the correct paths when it is not recursive', function () {
      var paths = ['a', 'd', 'f', 'f.g', 'f.h', 'f.i', 'e', 'j', 'k', 'k.n', 'k.n.o', 'k.n.p', 'k.n.q', 'k.m', 'k.l', 'r', 'submit'];
      var testPaths = [];

      _2.default.eachComponent(components2, function (component, path) {
        testPaths.push(path);
      });

      (0, _chai.expect)(paths).to.deep.equal(testPaths);
    });
    it('should be able to block recursion', function () {
      var numComps = 0;
      var numLayout = 0;

      _2.default.eachComponent(components, function (component) {
        if (_2.default.isLayoutComponent(component)) {
          numLayout++;
        } else {
          numComps++;
        }

        if (component.type === 'table') {
          var numInTable = 0;
          [].concat.apply([], component.rows).forEach(function (row) {
            _2.default.eachComponent(row.components, function () {
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
    it('should not include `htmlelement` components when `includeAll` is not provided', function () {
      var htmlComponentsAmount = 0;

      _2.default.eachComponent(components5, function (component) {
        if (component.type === 'htmlelement') {
          htmlComponentsAmount++;
        }
      });

      (0, _chai.expect)(htmlComponentsAmount).to.be.equal(0);
    });
    it('should include `htmlelement` components when `includeAll` is provided', function () {
      var htmlComponentsAmount = 0;

      _2.default.eachComponent(components5, function (component) {
        if (component.type === 'htmlelement') {
          htmlComponentsAmount++;
        }
      }, true);

      (0, _chai.expect)(htmlComponentsAmount).to.be.equal(1);
    });
    it('should not include `content` components when `includeAll` is not provided', function () {
      var contentComponentsAmount = 0;

      _2.default.eachComponent(components5, function (component) {
        if (component.type === 'content') {
          contentComponentsAmount++;
        }
      });

      (0, _chai.expect)(contentComponentsAmount).to.be.equal(0);
    });
    it('should include `content` components when `includeAll` is provided', function () {
      var contentComponentsAmount = 0;

      _2.default.eachComponent(components5, function (component) {
        if (component.type === 'content') {
          contentComponentsAmount++;
        }
      }, true);

      (0, _chai.expect)(contentComponentsAmount).to.be.equal(1);
    });
  });
  describe('getComponent', function () {
    it('should return the correct components', function () {
      for (var n = 1; n <= 8; n += 1) {
        var component = _2.default.getComponent(components, (0, _writtenNumber.default)(n));

        (0, _chai.expect)(component).not.to.be.null;
        (0, _chai.expect)(component).not.to.be.undefined;
        (0, _chai.expect)(component).to.be.an('object');
        (0, _chai.expect)(component.order).to.equal(n);
        (0, _chai.expect)(component.key).to.equal((0, _writtenNumber.default)(n));
      }
    });
    it('should work with a different this context', function () {
      for (var n = 1; n <= 8; n += 1) {
        var component = _2.default.getComponent.call({}, components, (0, _writtenNumber.default)(n));

        (0, _chai.expect)(component).not.to.be.null;
        (0, _chai.expect)(component).not.to.be.undefined;
        (0, _chai.expect)(component).to.be.an('object');
        (0, _chai.expect)(component.order).to.equal(n);
        (0, _chai.expect)(component.key).to.equal((0, _writtenNumber.default)(n));
      }
    });
  });
  describe('flattenComponents', function () {
    it('should return an object of flattened components', function () {
      var flattened = _2.default.flattenComponents(components);

      for (var n = 1; n <= 8; n += 1) {
        var component = flattened[(0, _writtenNumber.default)(n)];
        (0, _chai.expect)(component).not.to.be.undefined;
        (0, _chai.expect)(component).to.be.an('object');
        (0, _chai.expect)(component.order).to.equal(n);
        (0, _chai.expect)(component.key).to.equal((0, _writtenNumber.default)(n));
      }
    });
    it('should work with a different this context', function () {
      var flattened = _2.default.flattenComponents.call({}, components);

      for (var n = 1; n <= 8; n += 1) {
        var component = flattened[(0, _writtenNumber.default)(n)];
        (0, _chai.expect)(component).not.to.be.undefined;
        (0, _chai.expect)(component).to.be.an('object');
        (0, _chai.expect)(component.order).to.equal(n);
        (0, _chai.expect)(component.key).to.equal((0, _writtenNumber.default)(n));
      }
    });
  });
  describe('getValue', function () {
    it('should be able to get a simple value', function () {
      (0, _chai.expect)(_2.default.getValue(submission1, 'name')).to.be.equal(submission1.data.name);
    });
    it('should be able to get a value from a container', function () {
      (0, _chai.expect)(_2.default.getValue(submission1, 'animalname')).to.be.equal(submission1.data.mycontainer.animalname);
    });
  });
  describe('parseFloat', function () {
    it('should clear input and parse value', function () {
      (0, _chai.expect)(_2.default.parseFloatExt('12,345,678.90')).to.be.equal(12345678.90);
    });
  });
  describe('formatAsCurrency', function () {
    it('should be able to format Float value for Currency component', function () {
      (0, _chai.expect)(_2.default.formatAsCurrency(123.4)).to.be.equal('123.40');
      (0, _chai.expect)(_2.default.formatAsCurrency(12345678.9)).to.be.equal('12,345,678.90');
      (0, _chai.expect)(_2.default.formatAsCurrency(12345678.915)).to.be.equal('12,345,678.92');
    });
    it('should be able to format String value for Currency component', function () {
      (0, _chai.expect)(_2.default.formatAsCurrency('12345678.915')).to.be.equal('12,345,678.92');
    });
  });
  describe('checkCalculated', function () {
    it('should be able to calculate value based on javascript code', function () {
      var component = {
        key: 'sum',
        calculateValue: 'value = 3'
      };
      var data = {};

      _2.default.checkCalculated(component, null, data);

      (0, _chai.expect)(data.sum).to.be.equal(3);
    });
    it('should be able to calculate value based on json logic', function () {
      var component = {
        key: 'sum',
        calculateValue: {
          '_sum': {
            var: 'data.test'
          }
        }
      };
      var data = {
        test: [1, 2, 3]
      };

      _2.default.checkCalculated(component, null, data);

      (0, _chai.expect)(data.sum).to.be.equal(6);
    });
    it('should return undefined if no logic provided', function () {
      var component = {
        key: 'sum',
        calculateValue: '/* do nothing */'
      };
      var data = {};

      _2.default.checkCalculated(component, null, data);

      (0, _chai.expect)(data.sum).to.be.undefined;
    });
  });
  describe('checkCondition', function () {
    it('should display component by default', function () {
      (0, _chai.expect)(_2.default.checkCondition({}, null, {})).to.be.equal(true);
    });
    it('should calculate simple triggers', function () {
      var component = {
        key: 'sum',
        conditional: {
          when: 'test',
          eq: 3,
          show: true
        }
      };
      var data1 = {
        test: 3
      };
      var data2 = {
        test: 5
      };
      (0, _chai.expect)(_2.default.checkCondition(component, null, data1)).to.be.equal(true);
      (0, _chai.expect)(_2.default.checkCondition(component, null, data2)).to.be.equal(false);
    });
    it('should be able to calculate condition based on javascript code', function () {
      var component = {
        key: 'sum',
        customConditional: function customConditional(context) {
          return context.data.test === 3;
        }
      };
      var data1 = {
        test: 3
      };
      var data2 = {
        test: 5
      };
      (0, _chai.expect)(_2.default.checkCondition(component, null, data1)).to.be.equal(true);
      (0, _chai.expect)(_2.default.checkCondition(component, null, data2)).to.be.equal(false);
    });
    it('should be able to calculate condition based on json logic', function () {
      var component = {
        key: 'sum',
        conditional: {
          json: {
            '===': [{
              '_sum': {
                var: 'data.test'
              }
            }, 6]
          }
        }
      };
      var data1 = {
        test: [1, 2, 3]
      };
      var data2 = {
        test: [1, 2, 4]
      };
      (0, _chai.expect)(_2.default.checkCondition(component, null, data1)).to.be.equal(true);
      (0, _chai.expect)(_2.default.checkCondition(component, null, data2)).to.be.equal(false);
    });
  });
  describe('getDateSetting', function () {
    it('should return null if no date provided', function () {
      (0, _chai.expect)(_2.default.getDateSetting()).to.be.equal(null);
      (0, _chai.expect)(_2.default.getDateSetting(null)).to.be.equal(null);
      (0, _chai.expect)(_2.default.getDateSetting(undefined)).to.be.equal(null);
      (0, _chai.expect)(_2.default.getDateSetting(NaN)).to.be.equal(null);
      (0, _chai.expect)(_2.default.getDateSetting('')).to.be.equal(null);
      (0, _chai.expect)(_2.default.getDateSetting('should be invalid')).to.be.equal(null);
    });
    it('should return valid Date on serialized date provided', function () {
      var date = new Date(0);
      (0, _chai.expect)(_2.default.getDateSetting(date)).to.be.eql(date);
      (0, _chai.expect)(_2.default.getDateSetting(date.valueOf())).to.be.eql(date);
      (0, _chai.expect)(_2.default.getDateSetting(date.toString())).to.be.eql(date);
      (0, _chai.expect)(_2.default.getDateSetting(date.toISOString())).to.be.eql(date);
    });
    it('should be able to get value using moment APIs', function () {
      var validMomentExpression = 'moment(0)';
      var validDate = new Date(0);
      var invalidMomentExpression = "moment('')";
      (0, _chai.expect)(_2.default.getDateSetting(validMomentExpression)).to.be.eql(validDate);
      (0, _chai.expect)(_2.default.getDateSetting(invalidMomentExpression)).to.be.equal(null);
    });
  });
  describe('checkTrigger', function () {
    it('should default to false', function () {
      (0, _chai.expect)(_2.default.checkCondition({}, {
        type: 'none'
      }, null, {})).to.be.equal(true);
    });
    it('should calculate simple triggers', function () {
      var component = {
        key: 'sum'
      };
      var trigger = {
        type: 'simple',
        simple: {
          when: 'test',
          eq: 3,
          show: true
        }
      };
      var data1 = {
        test: 3
      };
      var data2 = {
        test: 5
      };
      (0, _chai.expect)(_2.default.checkTrigger(component, trigger, null, data1)).to.be.equal(true);
      (0, _chai.expect)(_2.default.checkTrigger(component, trigger, null, data2)).to.be.equal(false);
    });
    it('should be able to calculate trigger based on javascript code', function () {
      var component = {
        key: 'sum'
      };
      var trigger = {
        type: 'javascript',
        javascript: 'result = data.test === 3'
      };
      var data1 = {
        test: 3
      };
      var data2 = {
        test: 5
      };
      (0, _chai.expect)(_2.default.checkTrigger(component, trigger, null, data1)).to.be.equal(true);
      (0, _chai.expect)(_2.default.checkTrigger(component, trigger, null, data2)).to.be.equal(false);
    });
    it('should be able to calculate trigger based on json logic', function () {
      var component = {
        key: 'sum'
      };
      var trigger = {
        type: 'json',
        json: {
          '===': [{
            '_sum': {
              var: 'data.test'
            }
          }, 6]
        }
      };
      var data1 = {
        test: [1, 2, 3]
      };
      var data2 = {
        test: [1, 2, 4]
      };
      (0, _chai.expect)(_2.default.checkTrigger(component, trigger, null, data1)).to.be.equal(true);
      (0, _chai.expect)(_2.default.checkTrigger(component, trigger, null, data2)).to.be.equal(false);
    });
  });
  describe('setActionProperty', function () {
    it('should set a boolean action property to true', function () {
      var component = {
        key: 'test',
        disabled: false
      };
      var action = {
        type: 'property',
        property: {
          label: 'Disabled',
          value: 'disabled',
          type: 'boolean'
        },
        state: true
      };

      _2.default.setActionProperty(component, action);

      (0, _chai.expect)(component.disabled).to.be.equal(true);
    });
    it('should set a boolean action property to false', function () {
      var component = {
        key: 'test',
        disabled: true
      };
      var action = {
        type: 'property',
        property: {
          label: 'Disabled',
          value: 'disabled',
          type: 'boolean'
        },
        state: false
      };

      _2.default.setActionProperty(component, action);

      (0, _chai.expect)(component.disabled).to.be.equal(false);
    });
    it('should set a boolean action nested property', function () {
      var component = {
        key: 'test',
        validate: {
          required: true
        }
      };
      var action = {
        type: 'property',
        property: {
          label: 'Required',
          value: 'validate.required',
          type: 'boolean'
        },
        state: false
      };

      _2.default.setActionProperty(component, action);

      (0, _chai.expect)(component.validate.required).to.be.equal(false);
    });
    it('should set a string action property', function () {
      var component = {
        key: 'test',
        label: 'foo'
      };
      var action = {
        type: 'property',
        property: {
          label: 'Label',
          value: 'label',
          type: 'string'
        },
        text: 'bar'
      };

      _2.default.setActionProperty(component, action);

      (0, _chai.expect)(component.label).to.be.equal('bar');
    });
    it('should set a string action property with result templating', function () {
      var component = {
        key: 'test',
        label: 'foo'
      };
      var action = {
        type: 'property',
        property: {
          label: 'Label',
          value: 'label',
          type: 'string'
        },
        text: 'bar {{ result }}'
      };

      _2.default.setActionProperty(component, action, 'baz');

      (0, _chai.expect)(component.label).to.be.equal('bar baz');
    });
    it('should set a string action property with row templating', function () {
      var component = {
        key: 'test',
        label: 'foo'
      };
      var action = {
        type: 'property',
        property: {
          label: 'Label',
          value: 'label',
          type: 'string'
        },
        text: 'bar {{ row.field }}'
      };

      _2.default.setActionProperty(component, action, true, {
        field: 'baz'
      });

      (0, _chai.expect)(component.label).to.be.equal('bar baz');
    });
    it('should set a string action property with data templating', function () {
      var component = {
        key: 'test',
        label: 'foo'
      };
      var action = {
        type: 'property',
        property: {
          label: 'Label',
          value: 'label',
          type: 'string'
        },
        text: 'bar {{ data.field }}'
      };

      _2.default.setActionProperty(component, action, true, {}, {
        field: 'baz'
      });

      (0, _chai.expect)(component.label).to.be.equal('bar baz');
    });
    it('should set a string action property with component templating', function () {
      var component = {
        key: 'test',
        label: 'foo'
      };
      var action = {
        type: 'property',
        property: {
          label: 'Label',
          value: 'label',
          type: 'string'
        },
        text: 'bar {{ component.key }}'
      };

      _2.default.setActionProperty(component, action);

      (0, _chai.expect)(component.label).to.be.equal('bar test');
    });
    it('should do nothing with a bad request', function () {
      var component = {
        key: 'test',
        label: 'foo'
      };

      var originalComponent = _lodash.default.cloneDeep(component);

      (0, _chai.expect)(component).to.deep.equal(originalComponent);
    });
  });
  describe('delay', function () {
    var score = 0;

    function incScore(value) {
      score += value || 1;
    }

    beforeEach(function () {
      score = 0;
    });
    it('should act as regular setTimeout()', function (done) {
      _2.default.delay(incScore);

      _2.default.delay(incScore, 0);

      _2.default.delay(incScore, 100, 2);

      _2.default.delay(function () {
        if (score === 4) {
          done();
        }
      }, 200);
    });
    it('should be cancelable via direct timer access', function (done) {
      var delay = _2.default.delay(incScore);

      clearTimeout(delay.timer);
      setTimeout(function () {
        if (score === 0) {
          done();
        }
      }, 100);
    });
    it('should be cancelable via cancel() method', function (done) {
      var delay = _2.default.delay(incScore);

      delay.cancel();
      setTimeout(function () {
        if (score === 0) {
          done();
        }
      }, 100);
    });
    it('should be able to call passed function synchronously', function (done) {
      var delay = _2.default.delay(incScore);

      delay();

      if (score === 1) {
        done();
      }
    });
  });
  describe('withSwitch', function () {
    it('should return Array with two functions', function () {
      var fns = _2.default.withSwitch();

      (0, _chai.expect)(fns).to.be.an('array').and.have.lengthOf(2);
      (0, _chai.expect)(fns[0]).to.be.a('function');
      (0, _chai.expect)(fns[1]).to.be.a('function');
    });
    describe('#get', function () {
      it('should return one of state', function () {
        var _utils$withSwitch = _2.default.withSwitch(42, 24),
            _utils$withSwitch2 = _slicedToArray(_utils$withSwitch, 1),
            get = _utils$withSwitch2[0];

        (0, _chai.expect)(get()).to.be.equal(42);
      });
      it('should be pure', function () {
        var _utils$withSwitch3 = _2.default.withSwitch(42, 24),
            _utils$withSwitch4 = _slicedToArray(_utils$withSwitch3, 1),
            get = _utils$withSwitch4[0];

        (0, _chai.expect)(get()).to.be.equal(42);
        (0, _chai.expect)(get()).to.be.equal(42);
        (0, _chai.expect)(get()).to.be.equal(42);
        (0, _chai.expect)(get()).to.be.equal(42);
      });
    });
    describe('#toggle', function () {
      it('should cycle between states', function () {
        var _utils$withSwitch5 = _2.default.withSwitch(42, 24),
            _utils$withSwitch6 = _slicedToArray(_utils$withSwitch5, 2),
            get = _utils$withSwitch6[0],
            toggle = _utils$withSwitch6[1];

        (0, _chai.expect)(get()).to.be.equal(42);
        toggle();
        (0, _chai.expect)(get()).to.be.equal(24);
        toggle();
        (0, _chai.expect)(get()).to.be.equal(42);
      });
    });
  });
  describe('unfold', function () {
    it('should return provided argument', function () {
      var parameters = [{}, 1, null, 'string'];
      parameters.forEach(function (p) {
        (0, _chai.assert)(p === _2.default.unfold(p));
      });
    });
    it('should call parameter, if it is function and return result', function () {
      var x = Symbol('__unfold__');
      (0, _chai.assert)(_2.default.unfold(function () {
        return x;
      }) === x);
    });
  });
  describe('firstNonNil', function () {
    it('should return first non nil value', function () {
      (0, _chai.expect)(_2.default.firstNonNil([1])).to.equal(1);
      (0, _chai.expect)(_2.default.firstNonNil([1, 3])).to.equal(1);
      (0, _chai.expect)(_2.default.firstNonNil([3, 2, 1])).to.equal(3);
      (0, _chai.expect)(_2.default.firstNonNil([undefined, undefined, 3, 1])).to.equal(3);
    });
    it('should unfold all functions in array', function () {
      (0, _chai.expect)(_2.default.firstNonNil([function () {
        return 1;
      }])).to.equal(1);
      (0, _chai.expect)(_2.default.firstNonNil([function () {
        return 1;
      }, 3])).to.equal(1);
      (0, _chai.expect)(_2.default.firstNonNil([undefined, undefined, function () {
        return 3;
      }, 1])).to.equal(3);
    });
  });
  describe('observeOverload', function () {
    it('should invoke the callback, if there too many dispatches in a short time', function (done) {
      try {
        var dispatch = _2.default.observeOverload(function () {
          return true;
        });

        for (var i = 0; i < 100; i += 1) {
          if (dispatch()) {
            return done();
          }
        }

        throw new Error('Callback not called');
      } catch (error) {
        done(error);
      }
    });
    it('should allow configuring the events limit', function (done) {
      try {
        for (var i = 1; i < 10; i += 1) {
          var _dispatch = _2.default.observeOverload(function () {
            return done('Limit option is ignored1');
          }, {
            limit: 100
          });

          for (var j = 0; j < i * 10; j += 1) {
            _dispatch();
          }
        } // exit if we done, otherwise throw


        var called = false;

        var dispatch = _2.default.observeOverload(function () {
          called = true;
          done();
        }, {
          limit: 100
        });

        for (var _i2 = 0; _i2 < 110; _i2 += 1) {
          dispatch();
        }

        if (!called) {
          throw new Error('Limit option is ignored2');
        }
      } catch (error) {
        done(error);
      }
    });
    it('should not invoke callback, if time between calls longer then options.delay', function (done) {
      try {
        var dispatch = _2.default.observeOverload(function () {
          return done('Callback should not be called');
        }, {
          delay: 100,
          limit: 2
        });

        var count = 0;
        var id = setInterval(function () {
          dispatch();
          count += 1;

          if (count >= 3) {
            done();
            clearInterval(id);
          }
        }, 110);
      } catch (error) {
        done(error);
      }
    });
    it('Should return string without HTML characters', function () {
      var unescapedString = _2.default.unescapeHTML('&lt;p&gt;ampersand &amp; &#34;quotes&#34; test&lt;&#47;p&gt;');

      (0, _chai.expect)(unescapedString).to.equal('<p>ampersand & "quotes" test</p>');
    });
  });
});
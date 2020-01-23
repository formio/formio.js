"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Select = _interopRequireDefault(require("./Select"));

var _chai = require("chai");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

describe('Select Component', function () {
  it('Should build a Select component', function () {
    return _harness.default.testCreate(_Select.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'select', 1);
    });
  });
  it('Should preserve the tabindex', function () {
    return _harness.default.testCreate(_Select.default, _fixtures.comp2).then(function (component) {
      var element = component.element.getElementsByClassName('choices__list choices__list--single')[0];

      _harness.default.testElementAttribute(element, 'tabindex', '10');
    });
  });
  it('Should default to 0 when tabindex is not specified', function () {
    return _harness.default.testCreate(_Select.default, _fixtures.comp1).then(function (component) {
      var element = component.element.getElementsByClassName('choices__list choices__list--single')[0];

      _harness.default.testElementAttribute(element, 'tabindex', '0');
    });
  });
  it('Should allow to override threshold option of fuzzy search', function () {
    try {
      var c1 = Object.assign((0, _cloneDeep.default)(_fixtures.comp1), {
        searchThreshold: 0.2
      });
      var c2 = Object.assign((0, _cloneDeep.default)(_fixtures.comp1), {
        searchThreshold: 0.4
      });
      var c3 = Object.assign((0, _cloneDeep.default)(_fixtures.comp1), {
        searchThreshold: 0.8
      });
      var comps = [_harness.default.testCreate(_Select.default, c1), _harness.default.testCreate(_Select.default, c2), _harness.default.testCreate(_Select.default, c3)];
      return _nativePromiseOnly.default.all(comps).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3),
            a = _ref2[0],
            b = _ref2[1],
            c = _ref2[2];

        (0, _chai.expect)(a.choices.config.fuseOptions.threshold).to.equal(0.2);
        (0, _chai.expect)(b.choices.config.fuseOptions.threshold).to.equal(0.4);
        (0, _chai.expect)(c.choices.config.fuseOptions.threshold).to.equal(0.8);
      });
    } catch (error) {
      return _nativePromiseOnly.default.reject(error);
    }
  });
  it('should set component value', function () {
    return _harness.default.testCreate(_Select.default, _fixtures.comp1).then(function (component) {
      _powerAssert.default.deepEqual(component.dataValue, '');

      component.setValue('red');

      _powerAssert.default.equal(component.dataValue, 'red');
    });
  }); // it('should reset input value when called with empty value', () => {
  //   const comp = Object.assign({}, comp1);
  //   delete comp.placeholder;
  //
  //   return Harness.testCreate(SelectComponent, comp).then((component) => {
  //     assert.deepEqual(component.dataValue, '');
  //     assert.equal(component.refs.input[0].value, '');
  //     component.setValue('red');
  //     assert.equal(component.dataValue, 'red');
  //     assert.equal(component.refs.input[0].value, 'red');
  //     component.setValue('');
  //     assert.equal(component.dataValue, '');
  //     assert.equal(component.refs.input[0].value, '');
  //   });
  // });
});
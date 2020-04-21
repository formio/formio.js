"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

describe('Select Component', function () {
  it('should return string value for different value types', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.comp4).then(function (component) {
      var stringValue = component.asString(true);
      var stringValue1 = component.asString(11);
      var stringValue2 = component.asString('test');
      var stringValue3 = component.asString(12);

      _powerAssert.default.equal(stringValue, '<span>true</span>');

      _powerAssert.default.equal(stringValue1, '<span>11</span>');

      _powerAssert.default.equal(stringValue2, '<span>test</span>');

      _powerAssert.default.equal(stringValue3, '<span>1.2</span>');

      done();
    });
  });
  it('should correctly determine storage type when dataType is auto', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.comp4).then(function (component) {
      var value = component.normalizeSingleValue('true');
      var value1 = component.normalizeSingleValue('11');
      var value2 = component.normalizeSingleValue('test');
      var value3 = component.normalizeSingleValue('11test11test');
      var value4 = component.normalizeSingleValue('test11');
      var value5 = component.normalizeSingleValue('0');

      _powerAssert.default.equal(_typeof(value), 'boolean');

      _powerAssert.default.equal(_typeof(value1), 'number');

      _powerAssert.default.equal(_typeof(value2), 'string');

      _powerAssert.default.equal(_typeof(value3), 'string');

      _powerAssert.default.equal(_typeof(value4), 'string');

      _powerAssert.default.equal(_typeof(value5), 'number');

      done();
    });
  });
  it('should not change value letter case', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.comp4).then(function (component) {
      var value = component.normalizeSingleValue('data.textArea');
      var value1 = component.normalizeSingleValue('ECMAScript');
      var value2 = component.normalizeSingleValue('JS');

      _powerAssert.default.equal(value, 'data.textArea');

      _powerAssert.default.equal(value1, 'ECMAScript');

      _powerAssert.default.equal(value2, 'JS');

      done();
    });
  });
  it('should define boolean value', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.comp4).then(function (component) {
      var value = component.normalizeSingleValue('TRUE');
      var value1 = component.normalizeSingleValue('False');
      var value2 = component.normalizeSingleValue('true');

      _powerAssert.default.equal(value, true);

      _powerAssert.default.equal(value1, false);

      _powerAssert.default.equal(value2, true);

      done();
    });
  });
  it('should set multiple selected values not repeating them', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.multiSelect).then(function (component) {
      component.setItems(_fixtures.multiSelectOptions, false);
      component.setChoicesValue(['Cheers']);
      component.setChoicesValue(['Cheers', 'Cyberdyne Systems'], 1);
      component.setChoicesValue(['Cheers', 'Cyberdyne Systems', 'Massive Dynamic'], 2);
      var choices = component.element.querySelector('.choices__list--multiple').children;

      _powerAssert.default.equal(choices.length, 3);

      done();
    });
  });
  it('should not show selected values in dropdown when searching', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.multiSelect).then(function (component) {
      component.setItems(_fixtures.multiSelectOptions, false);
      component.setChoicesValue(['Cheers']);
      component.setChoicesValue(['Cheers', 'Cyberdyne Systems'], 1);
      component.setItems([], true);
      var itemsInDropdown = component.element.querySelectorAll('.choices__item--choice');
      var choices = component.element.querySelector('.choices__list--multiple').children;

      _powerAssert.default.equal(choices.length, 2);

      _powerAssert.default.equal(itemsInDropdown.length, 1);

      done();
    });
  });
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
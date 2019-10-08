"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Number = _interopRequireDefault(require("./Number"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

describe('Number Component', function () {
  it('Should build an number component', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 1);
    });
  });
  it('Should limit decimals using step', function () {
    return _harness.default.testCreate(_Number.default, (0, _merge2.default)({}, _fixtures.comp2, {
      validate: {
        step: '0.001'
      }
    })).then(function (component) {
      _harness.default.testSetInput(component, 123456789.123456789, 123456789.123, '123,456,789.123');

      _harness.default.testSetInput(component, -123456789.123456789, -123456789.123, '-123,456,789.123');

      _harness.default.testSetInput(component, '123456789.123456789', 123456789.123, '123,456,789.123');

      _harness.default.testSetInput(component, '-123456789.123456789', -123456789.123, '-123,456,789.123');
    });
  });
  it('Should format numbers for USA locale', function () {
    /* eslint-disable max-statements */
    return _harness.default.testCreate(_Number.default, _fixtures.comp2, {
      language: 'en-US'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, undefined, '', '');

      _harness.default.testSetInput(component, '', '', '');

      _harness.default.testSetInput(component, {}, '', '');

      _harness.default.testSetInput(component, [], '', '');

      _harness.default.testSetInput(component, [''], '', '');

      _harness.default.testSetInput(component, ['1'], 1, '1');

      _harness.default.testSetInput(component, 0, 0, '0');

      _harness.default.testSetInput(component, 1, 1, '1');

      _harness.default.testSetInput(component, -1, -1, '-1');

      _harness.default.testSetInput(component, 1000, 1000, '1,000');

      _harness.default.testSetInput(component, -1000, -1000, '-1,000');

      _harness.default.testSetInput(component, 1000.00, 1000, '1,000');

      _harness.default.testSetInput(component, -1000.00, -1000, '-1,000');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1,000.01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1,000.01');

      _harness.default.testSetInput(component, 1000.001, 1000.001, '1,000.001');

      _harness.default.testSetInput(component, -1000.001, -1000.001, '-1,000.001');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1,234,567,890.12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1,234,567,890.12');

      _harness.default.testSetInput(component, 12.123456789, 12.123456789, '12.123456789');

      _harness.default.testSetInput(component, -12.123456789, -12.123456789, '-12.123456789'); // These tests run into the maximum number of significant digits for floats.


      _harness.default.testSetInput(component, 123456789.123456789, 123456789.123456789, '123,456,789.12345679');

      _harness.default.testSetInput(component, -123456789.123456789, -123456789.123456789, '-123,456,789.12345679');

      _harness.default.testSetInput(component, '0', 0, '0');

      _harness.default.testSetInput(component, '1', 1, '1');

      _harness.default.testSetInput(component, '-1', -1, '-1');

      _harness.default.testSetInput(component, '1000', 1000, '1,000');

      _harness.default.testSetInput(component, '-1000', -1000, '-1,000');

      _harness.default.testSetInput(component, '1000.01', 1000.01, '1,000.01');

      _harness.default.testSetInput(component, '-1000.01', -1000.01, '-1,000.01');

      _harness.default.testSetInput(component, '1000.00', 1000, '1,000');

      _harness.default.testSetInput(component, '-1000.00', -1000, '-1,000');

      _harness.default.testSetInput(component, '1000.001', 1000.001, '1,000.001');

      _harness.default.testSetInput(component, '-1000.001', -1000.001, '-1,000.001');

      _harness.default.testSetInput(component, '1234567890.12', 1234567890.12, '1,234,567,890.12');

      _harness.default.testSetInput(component, '-1234567890.12', -1234567890.12, '-1,234,567,890.12');

      _harness.default.testSetInput(component, '12.123456789', 12.123456789, '12.123456789');

      _harness.default.testSetInput(component, '-12.123456789', -12.123456789, '-12.123456789');

      _harness.default.testSetInput(component, '123456789.123456789', 123456789.123456789, '123,456,789.12345679');

      _harness.default.testSetInput(component, '-123456789.123456789', -123456789.123456789, '-123,456,789.12345679');
    });
    /* eslint-enable max-statements */
  });
  it('Should format numbers for British locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp2, {
      language: 'en-GB'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, '0');

      _harness.default.testSetInput(component, 1, 1, '1');

      _harness.default.testSetInput(component, -1, -1, '-1');

      _harness.default.testSetInput(component, 1000, 1000, '1,000');

      _harness.default.testSetInput(component, -1000, -1000, '-1,000');

      _harness.default.testSetInput(component, 1000.00, 1000, '1,000');

      _harness.default.testSetInput(component, -1000.00, -1000, '-1,000');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1,000.01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1,000.01');

      _harness.default.testSetInput(component, 1000.001, 1000.001, '1,000.001');

      _harness.default.testSetInput(component, -1000.001, -1000.001, '-1,000.001');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1,234,567,890.12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1,234,567,890.12');

      _harness.default.testSetInput(component, 12.123456789, 12.123456789, '12.123456789');

      _harness.default.testSetInput(component, -12.123456789, -12.123456789, '-12.123456789');
    });
  });
  it('Should format numbers for French locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp2, {
      language: 'fr'
    }).then(function (component) {
      // The spaces in these tests are a weird unicode space so be careful duplicating the tests.
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, '0');

      _harness.default.testSetInput(component, 1, 1, '1');

      _harness.default.testSetInput(component, -1, -1, '-1');

      _harness.default.testSetInput(component, 1000, 1000, '1 000');

      _harness.default.testSetInput(component, -1000, -1000, '-1 000');

      _harness.default.testSetInput(component, 1000.00, 1000, '1 000');

      _harness.default.testSetInput(component, -1000.00, -1000, '-1 000');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1 000,01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1 000,01');

      _harness.default.testSetInput(component, 1000.001, 1000.001, '1 000,001');

      _harness.default.testSetInput(component, -1000.001, -1000.001, '-1 000,001');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1 234 567 890,12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1 234 567 890,12');

      _harness.default.testSetInput(component, 12.123456789, 12.123456789, '12,123456789');

      _harness.default.testSetInput(component, -12.123456789, -12.123456789, '-12,123456789');
    });
  });
  it('Should format numbers for German locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp2, {
      language: 'de'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, '0');

      _harness.default.testSetInput(component, 1, 1, '1');

      _harness.default.testSetInput(component, -1, -1, '-1');

      _harness.default.testSetInput(component, 1000, 1000, '1.000');

      _harness.default.testSetInput(component, -1000, -1000, '-1.000');

      _harness.default.testSetInput(component, 1000.00, 1000, '1.000');

      _harness.default.testSetInput(component, -1000.00, -1000, '-1.000');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1.000,01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1.000,01');

      _harness.default.testSetInput(component, 1000.001, 1000.001, '1.000,001');

      _harness.default.testSetInput(component, -1000.001, -1000.001, '-1.000,001');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1.234.567.890,12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1.234.567.890,12');

      _harness.default.testSetInput(component, 12.123456789, 12.123456789, '12,123456789');

      _harness.default.testSetInput(component, -12.123456789, -12.123456789, '-12,123456789');
    });
  });
  it('Should display default integer value', function (done) {
    _harness.default.testCreate(_Number.default, _fixtures.comp3).then(function (number) {
      _powerAssert.default.deepEqual(_lodash.default.get(number, ['inputs', '0', 'value']), '42');

      done();
    });
  });
  it('Should display default decimal value', function (done) {
    var TEST_VAL = 4.2;

    var comp = _lodash.default.cloneDeep(_fixtures.comp3);

    comp.defaultValue = TEST_VAL;
    comp.decimalLimit = 2;
    comp.requireDecimal = true;

    _harness.default.testCreate(_Number.default, comp).then(function (number) {
      _powerAssert.default.deepEqual(_lodash.default.get(number, ['inputs', '0', 'value']), '4.20');

      done();
    });
  });
  it('Should add trailing zeros on blur, if decimal required', function (done) {
    var comp = _lodash.default.cloneDeep(_fixtures.comp3);

    comp.decimalLimit = 2;
    comp.requireDecimal = true;

    _harness.default.testCreate(_Number.default, comp).then(function (number) {
      var testset = [// [inv, outv, display]
      ['42', 42, '42.00'], ['42.1', 42.1, '42.10'], ['42.01', 42.01, '42.01'], ['4200', 4200, '4200.00'], ['4200.4', 4200.4, '4200.40'], ['4200.42', 4200.42, '4200.42'], ['4200.', 4200, '4200.00'], ['99999999.', 99999999, '99999999.00']];
      testset.forEach(function (set, index) {
        try {
          _harness.default.testNumberBlur.apply(_harness.default, [number].concat(_toConsumableArray(set)));
        } catch (err) {
          done(new Error("Test case #".concat(index, ", set: ").concat(set, ", err: ").concat(err.message)));
        }
      });
      done();
    }, done);
  });
  it('Should add trailing zeros on blur, if decimal and delimiter is required', function (done) {
    var comp = _lodash.default.cloneDeep(_fixtures.comp3);

    comp.decimalLimit = 2;
    comp.requireDecimal = true;
    comp.delimiter = true;
    /* eslint-disable max-statements */

    _harness.default.testCreate(_Number.default, comp).then(function (number) {
      var testset = [// [inv, outv, display]
      ['42', 42, '42.00'], ['42.1', 42.1, '42.10'], ['42.01', 42.01, '42.01'], ['4200', 4200, '4,200.00'], ['4200.4', 4200.4, '4,200.40'], ['4200.42', 4200.42, '4,200.42'], ['4200.', 4200, '4,200.00'], ['99999999.', 99999999, '99,999,999.00']];
      testset.forEach(function (set, index) {
        try {
          _harness.default.testNumberBlur.apply(_harness.default, [number].concat(_toConsumableArray(set)));
        } catch (err) {
          done(new Error("Test case #".concat(index, ", set: ").concat(set, ", err: ").concat(err.message)));
        }
      });
      done();
    }, done);
  });
  it('Should add trailing zeros on blur with `multiple` flag', function (done) {
    _harness.default.testCreate(_Number.default, _fixtures.comp4).then(function (number) {
      var testset = [['42', 42, '42.00'], ['42.1', 42.1, '42.10'], ['42.01', 42.01, '42.01'], ['4200', 4200, '4,200.00'], ['4200.4', 4200.4, '4,200.40'], ['4200.42', 4200.42, '4,200.42'], ['4200.', 4200, '4,200.00'], ['99999999.', 99999999, '99,999,999.00']];
      testset.forEach(function (set, index) {
        try {
          _powerAssert.default.strictEqual(number.inputs.length, index + 1);

          _harness.default.testNumberBlur.apply(_harness.default, [number].concat(_toConsumableArray(set), [index]));

          number.addValue();
        } catch (err) {
          done(new Error("Test case #".concat(index, ", set: ").concat(set, ", err: ").concat(err.message)));
        }
      });
      done();
    }, done);
  });
});
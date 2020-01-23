"use strict";

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Number = _interopRequireDefault(require("./Number"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      _harness.default.testSetInput(component, null, null, '');

      _harness.default.testSetInput(component, undefined, null, '');

      _harness.default.testSetInput(component, '', null, '');

      _harness.default.testSetInput(component, {}, null, '');

      _harness.default.testSetInput(component, [], null, '');

      _harness.default.testSetInput(component, [''], null, '');

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
      _harness.default.testSetInput(component, null, null, '');

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
      _harness.default.testSetInput(component, null, null, '');

      _harness.default.testSetInput(component, 0, 0, '0');

      _harness.default.testSetInput(component, 1, 1, '1');

      _harness.default.testSetInput(component, -1, -1, '-1');

      _harness.default.testSetInput(component, 1000, 1000, '1 000');

      _harness.default.testSetInput(component, -1000, -1000, '-1 000');

      _harness.default.testSetInput(component, 1000.00, 1000, '1 000');

      _harness.default.testSetInput(component, -1000.00, -1000, '-1 000');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1 000,01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1 000,01');

      _harness.default.testSetInput(component, 1000.001, 1000.001, '1 000,001');

      _harness.default.testSetInput(component, -1000.001, -1000.001, '-1 000,001');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1 234 567 890,12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1 234 567 890,12');

      _harness.default.testSetInput(component, 12.123456789, 12.123456789, '12,123456789');

      _harness.default.testSetInput(component, -12.123456789, -12.123456789, '-12,123456789');
    });
  });
  it('Should format numbers for German locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp2, {
      language: 'de'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, null, '');

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
  it('Should display default integer value', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp3).then(function (number) {
      _powerAssert.default.deepEqual(_lodash.default.get(number, ['refs', 'input', '0', 'value']), '42');
    });
  });
  it('Should display default decimal value', function () {
    var TEST_VAL = 4.2;

    var comp = _lodash.default.cloneDeep(_fixtures.comp3);

    comp.defaultValue = TEST_VAL;
    comp.decimalLimit = 2;
    comp.requireDecimal = true;
    return _harness.default.testCreate(_Number.default, comp).then(function (number) {
      _powerAssert.default.deepEqual(_lodash.default.get(number, ['refs', 'input', '0', 'value']), '4.20');
    });
  }); // it('Should add trailing zeros on blur, if decimal required', (done) => {
  //   const comp = _.cloneDeep(comp3);
  //
  //   comp.decimalLimit = 2;
  //   comp.requireDecimal = true;
  //
  //   Harness.testCreate(NumberComponent, comp).then(number => {
  //     const testset = [
  //       // [inv, outv, display]
  //       ['42',        42,       '42.00'],
  //       ['42.1',      42.1,     '42.10'],
  //       ['42.01',     42.01,    '42.01'],
  //       ['4200',      4200,     '4200.00'],
  //       ['4200.4',    4200.4,   '4200.40'],
  //       ['4200.42',   4200.42,  '4200.42'],
  //       ['4200.',     4200,     '4200.00'],
  //       ['99999999.', 99999999, '99999999.00']
  //     ];
  //
  //     testset.forEach((set, index) => {
  //       try {
  //         Harness.testNumberBlur(number, ...set);
  //       }
  //       catch (err) {
  //         done(new Error(`Test case #${index}, set: ${set}, err: ${err.message}`));
  //       }
  //     });
  //
  //     done();
  //   }, done);
  // });
  //
  // it('Should add trailing zeros on blur, if decimal and delimiter is required', (done) => {
  //   const comp = _.cloneDeep(comp3);
  //
  //   comp.decimalLimit = 2;
  //   comp.requireDecimal = true;
  //   comp.delimiter = true;
  //
  //   /* eslint-disable max-statements */
  //   Harness.testCreate(NumberComponent, comp).then(number => {
  //     const testset = [
  //       // [inv, outv, display]
  //       ['42',        42,       '42.00'],
  //       ['42.1',      42.1,     '42.10'],
  //       ['42.01',     42.01,    '42.01'],
  //       ['4200',      4200,     '4,200.00'],
  //       ['4200.4',    4200.4,   '4,200.40'],
  //       ['4200.42',   4200.42,  '4,200.42'],
  //       ['4200.',     4200,     '4,200.00'],
  //       ['99999999.', 99999999, '99,999,999.00']
  //     ];
  //
  //     testset.forEach((set, index) => {
  //       try {
  //         Harness.testNumberBlur(number, ...set);
  //       }
  //       catch (err) {
  //         done(new Error(`Test case #${index}, set: ${set}, err: ${err.message}`));
  //       }
  //     });
  //
  //     done();
  //   }, done);
  // });
  //
  // it('Should add trailing zeros on blur with `multiple` flag', (done) => {
  //   Harness.testCreate(NumberComponent, comp4).then(number => {
  //     const testset = [
  //       ['42',        42,       '42.00'],
  //       ['42.1',      42.1,     '42.10'],
  //       ['42.01',     42.01,    '42.01'],
  //       ['4200',      4200,     '4,200.00'],
  //       ['4200.4',    4200.4,   '4,200.40'],
  //       ['4200.42',   4200.42,  '4,200.42'],
  //       ['4200.',     4200,     '4,200.00'],
  //       ['99999999.', 99999999, '99,999,999.00']
  //     ];
  //
  //     testset.forEach((set, index) => {
  //       try {
  //         assert.strictEqual(number.inputs.length, index + 1);
  //         Harness.testNumberBlur(number, ...set, index);
  //         number.addValue();
  //       }
  //       catch (err) {
  //         done(new Error(`Test case #${index}, set: ${set}, err: ${err.message}`));
  //       }
  //     });
  //
  //     done();
  //   }, done);
  // });
});
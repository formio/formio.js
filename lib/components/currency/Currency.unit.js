"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Currency = _interopRequireDefault(require("./Currency"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Currency Component', function () {
  it('Should build a currency component', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 1);
    });
  });
  it('Should format currency for USA locale', function () {
    /* eslint-disable max-statements */
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'en-US'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, undefined, '', '');

      _harness.default.testSetInput(component, {}, '', '');

      _harness.default.testSetInput(component, [], '', '');

      _harness.default.testSetInput(component, [''], '', '');

      _harness.default.testSetInput(component, ['1'], 1, '$1.00');

      _harness.default.testSetInput(component, ['$1.00'], 1, '$1.00');

      _harness.default.testSetInput(component, 0, 0, '$0.00');

      _harness.default.testSetInput(component, 1.00, 1, '$1.00');

      _harness.default.testSetInput(component, -1.00, -1, '-$1.00');

      _harness.default.testSetInput(component, 1, 1, '$1.00');

      _harness.default.testSetInput(component, -1, -1, '-$1.00');

      _harness.default.testSetInput(component, 1000, 1000, '$1,000.00');

      _harness.default.testSetInput(component, -1000, -1000, '-$1,000.00');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '$1,000.01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-$1,000.01');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '$1,234,567,890.12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-$1,234,567,890.12');

      _harness.default.testSetInput(component, 123456789.123456789, 123456789.12, '$123,456,789.12');

      _harness.default.testSetInput(component, -123456789.123456789, -123456789.12, '-$123,456,789.12');

      _harness.default.testSetInput(component, '0', 0, '$0.00');

      _harness.default.testSetInput(component, '1.00', 1, '$1.00');

      _harness.default.testSetInput(component, '-1.00', -1, '-$1.00');

      _harness.default.testSetInput(component, '1', 1, '$1.00');

      _harness.default.testSetInput(component, '-1', -1, '-$1.00');

      _harness.default.testSetInput(component, '1000', 1000, '$1,000.00');

      _harness.default.testSetInput(component, '-1000', -1000, '-$1,000.00');

      _harness.default.testSetInput(component, '1000.01', 1000.01, '$1,000.01');

      _harness.default.testSetInput(component, '-1000.01', -1000.01, '-$1,000.01');

      _harness.default.testSetInput(component, '1234567890.12', 1234567890.12, '$1,234,567,890.12');

      _harness.default.testSetInput(component, '-1234567890.12', -1234567890.12, '-$1,234,567,890.12');

      _harness.default.testSetInput(component, '123456789.123456789', 123456789.12, '$123,456,789.12');

      _harness.default.testSetInput(component, '-123456789.123456789', -123456789.12, '-$123,456,789.12');

      _harness.default.testSetInput(component, '$0', 0, '$0.00');

      _harness.default.testSetInput(component, '$1.00', 1, '$1.00');

      _harness.default.testSetInput(component, '-$1.00', -1, '-$1.00');

      _harness.default.testSetInput(component, '$1', 1, '$1.00');

      _harness.default.testSetInput(component, '-$1', -1, '-$1.00');

      _harness.default.testSetInput(component, '$1000', 1000, '$1,000.00');

      _harness.default.testSetInput(component, '-$1000', -1000, '-$1,000.00');

      _harness.default.testSetInput(component, '$1000.01', 1000.01, '$1,000.01');

      _harness.default.testSetInput(component, '-$1000.01', -1000.01, '-$1,000.01');

      _harness.default.testSetInput(component, '$1234567890.12', 1234567890.12, '$1,234,567,890.12');

      _harness.default.testSetInput(component, '-$1234567890.12', -1234567890.12, '-$1,234,567,890.12');

      _harness.default.testSetInput(component, '$123456789.123456789', 123456789.12, '$123,456,789.12');

      _harness.default.testSetInput(component, '-$123456789.123456789', -123456789.12, '-$123,456,789.12');
    });
    /* eslint-enable max-statements */
  });
  it('Should format currency for British locale', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'en-GB'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, 'US$0.00');

      _harness.default.testSetInput(component, 1.00, 1, 'US$1.00');

      _harness.default.testSetInput(component, -1.00, -1, '-US$1.00');

      _harness.default.testSetInput(component, 1, 1, 'US$1.00');

      _harness.default.testSetInput(component, -1, -1, '-US$1.00');

      _harness.default.testSetInput(component, 1000, 1000, 'US$1,000.00');

      _harness.default.testSetInput(component, -1000, -1000, '-US$1,000.00');

      _harness.default.testSetInput(component, 1000.01, 1000.01, 'US$1,000.01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-US$1,000.01');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, 'US$1,234,567,890.12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-US$1,234,567,890.12');

      _harness.default.testSetInput(component, 123456789.123456789, 123456789.12, 'US$123,456,789.12');

      _harness.default.testSetInput(component, -123456789.123456789, -123456789.12, '-US$123,456,789.12');
    });
  });
  it('Should format currency for French locale', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'fr'
    }).then(function (component) {
      // The spaces in these tests are a weird unicode space so be careful duplicating the tests.
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, '0,00 $US');

      _harness.default.testSetInput(component, 1.00, 1, '1,00 $US');

      _harness.default.testSetInput(component, -1.00, -1, '-1,00 $US');

      _harness.default.testSetInput(component, 1, 1, '1,00 $US');

      _harness.default.testSetInput(component, -1, -1, '-1,00 $US');

      _harness.default.testSetInput(component, 1000, 1000, '1 000,00 $US');

      _harness.default.testSetInput(component, -1000, -1000, '-1 000,00 $US');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1 000,01 $US');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1 000,01 $US');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1 234 567 890,12 $US');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1 234 567 890,12 $US');

      _harness.default.testSetInput(component, 1234567890.123456789, 1234567890.12, '1 234 567 890,12 $US');

      _harness.default.testSetInput(component, -1234567890.123456789, -1234567890.12, '-1 234 567 890,12 $US');
    });
  });
  it('Should format currency for German locale', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'de'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, '0,00 $');

      _harness.default.testSetInput(component, 1.00, 1.00, '1,00 $');

      _harness.default.testSetInput(component, -1.00, -1.00, '-1,00 $');

      _harness.default.testSetInput(component, 1, 1, '1,00 $');

      _harness.default.testSetInput(component, -1, -1, '-1,00 $');

      _harness.default.testSetInput(component, 1000, 1000, '1.000,00 $');

      _harness.default.testSetInput(component, -1000, -1000, '-1.000,00 $');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1.000,01 $');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1.000,01 $');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1.234.567.890,12 $');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1.234.567.890,12 $');

      _harness.default.testSetInput(component, 1234567890.123456789, 1234567890.12, '1.234.567.890,12 $');

      _harness.default.testSetInput(component, -1234567890.123456789, -1234567890.12, '-1.234.567.890,12 $');
    });
  });
});
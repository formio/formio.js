'use strict';

var _Currency = require('./Currency');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Currency Component', function () {
  it('Should build a currency component', function (done) {
    _harness.Harness.testCreate(_Currency.CurrencyComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
  it('Should format currency for USA locale', function (done) {
    _harness.Harness.testCreate(_Currency.CurrencyComponent, _index.components.comp1, { language: 'en-US' }).then(function (component) {
      _harness.Harness.testSetInput(component, null, null, '');
      _harness.Harness.testSetInput(component, undefined, null, '');
      _harness.Harness.testSetInput(component, {}, null, '');
      _harness.Harness.testSetInput(component, [], null, '');
      _harness.Harness.testSetInput(component, [''], null, '');
      _harness.Harness.testSetInput(component, ['1'], 1, '$1.00');
      _harness.Harness.testSetInput(component, ['$1.00'], 1, '$1.00');
      _harness.Harness.testSetInput(component, 0, 0, '0');
      _harness.Harness.testSetInput(component, 1.00, 1, '$1.00');
      _harness.Harness.testSetInput(component, -1.00, -1, '-$1.00');
      _harness.Harness.testSetInput(component, 1, 1, '$1.00');
      _harness.Harness.testSetInput(component, -1, -1, '-$1.00');
      _harness.Harness.testSetInput(component, 1000, 1000, '$1,000.00');
      _harness.Harness.testSetInput(component, -1000, -1000, '-$1,000.00');
      _harness.Harness.testSetInput(component, 1000.01, 1000.01, '$1,000.01');
      _harness.Harness.testSetInput(component, -1000.01, -1000.01, '-$1,000.01');
      _harness.Harness.testSetInput(component, 1234567890.12, 1234567890.12, '$1,234,567,890.12');
      _harness.Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-$1,234,567,890.12');
      _harness.Harness.testSetInput(component, 123456789.123456789, 123456789.12, '$123,456,789.12');
      _harness.Harness.testSetInput(component, -123456789.123456789, -123456789.12, '-$123,456,789.12');
      _harness.Harness.testSetInput(component, '0', 0, '$0.00');
      _harness.Harness.testSetInput(component, '1.00', 1, '$1.00');
      _harness.Harness.testSetInput(component, '-1.00', -1, '-$1.00');
      _harness.Harness.testSetInput(component, '1', 1, '$1.00');
      _harness.Harness.testSetInput(component, '-1', -1, '-$1.00');
      _harness.Harness.testSetInput(component, '1000', 1000, '$1,000.00');
      _harness.Harness.testSetInput(component, '-1000', -1000, '-$1,000.00');
      _harness.Harness.testSetInput(component, '1000.01', 1000.01, '$1,000.01');
      _harness.Harness.testSetInput(component, '-1000.01', -1000.01, '-$1,000.01');
      _harness.Harness.testSetInput(component, '1234567890.12', 1234567890.12, '$1,234,567,890.12');
      _harness.Harness.testSetInput(component, '-1234567890.12', -1234567890.12, '-$1,234,567,890.12');
      _harness.Harness.testSetInput(component, '123456789.123456789', 123456789.12, '$123,456,789.12');
      _harness.Harness.testSetInput(component, '-123456789.123456789', -123456789.12, '-$123,456,789.12');
      _harness.Harness.testSetInput(component, '$0', 0, '$0.00');
      _harness.Harness.testSetInput(component, '$1.00', 1, '$1.00');
      _harness.Harness.testSetInput(component, '-$1.00', -1, '-$1.00');
      _harness.Harness.testSetInput(component, '$1', 1, '$1.00');
      _harness.Harness.testSetInput(component, '-$1', -1, '-$1.00');
      _harness.Harness.testSetInput(component, '$1000', 1000, '$1,000.00');
      _harness.Harness.testSetInput(component, '-$1000', -1000, '-$1,000.00');
      _harness.Harness.testSetInput(component, '$1000.01', 1000.01, '$1,000.01');
      _harness.Harness.testSetInput(component, '-$1000.01', -1000.01, '-$1,000.01');
      _harness.Harness.testSetInput(component, '$1234567890.12', 1234567890.12, '$1,234,567,890.12');
      _harness.Harness.testSetInput(component, '-$1234567890.12', -1234567890.12, '-$1,234,567,890.12');
      _harness.Harness.testSetInput(component, '$123456789.123456789', 123456789.12, '$123,456,789.12');
      _harness.Harness.testSetInput(component, '-$123456789.123456789', -123456789.12, '-$123,456,789.12');
      done();
    });
  });
  it('Should format currency for British locale', function (done) {
    _harness.Harness.testCreate(_Currency.CurrencyComponent, _index.components.comp1, { language: 'en-GB' }).then(function (component) {
      _harness.Harness.testSetInput(component, null, null, '');
      _harness.Harness.testSetInput(component, 0, 0, '0');
      _harness.Harness.testSetInput(component, 1.00, 1, 'US$1.00');
      _harness.Harness.testSetInput(component, -1.00, -1, '-US$1.00');
      _harness.Harness.testSetInput(component, 1, 1, 'US$1.00');
      _harness.Harness.testSetInput(component, -1, -1, '-US$1.00');
      _harness.Harness.testSetInput(component, 1000, 1000, 'US$1,000.00');
      _harness.Harness.testSetInput(component, -1000, -1000, '-US$1,000.00');
      _harness.Harness.testSetInput(component, 1000.01, 1000.01, 'US$1,000.01');
      _harness.Harness.testSetInput(component, -1000.01, -1000.01, '-US$1,000.01');
      _harness.Harness.testSetInput(component, 1234567890.12, 1234567890.12, 'US$1,234,567,890.12');
      _harness.Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-US$1,234,567,890.12');
      _harness.Harness.testSetInput(component, 123456789.123456789, 123456789.12, 'US$123,456,789.12');
      _harness.Harness.testSetInput(component, -123456789.123456789, -123456789.12, '-US$123,456,789.12');
      done();
    });
  });
  it('Should format currency for French locale', function (done) {
    _harness.Harness.testCreate(_Currency.CurrencyComponent, _index.components.comp1, { language: 'fr' }).then(function (component) {
      // The spaces in these tests are a weird unicode space so be careful duplicating the tests.
      _harness.Harness.testSetInput(component, null, null, '');
      _harness.Harness.testSetInput(component, 0, 0, '0');
      _harness.Harness.testSetInput(component, 1.00, 1, '1,00 $US');
      _harness.Harness.testSetInput(component, -1.00, -1, '-1,00 $US');
      _harness.Harness.testSetInput(component, 1, 1, '1,00 $US');
      _harness.Harness.testSetInput(component, -1, -1, '-1,00 $US');
      _harness.Harness.testSetInput(component, 1000, 1000, '1 000,00 $US');
      _harness.Harness.testSetInput(component, -1000, -1000, '-1 000,00 $US');
      _harness.Harness.testSetInput(component, 1000.01, 1000.01, '1 000,01 $US');
      _harness.Harness.testSetInput(component, -1000.01, -1000.01, '-1 000,01 $US');
      _harness.Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1 234 567 890,12 $US');
      _harness.Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1 234 567 890,12 $US');
      _harness.Harness.testSetInput(component, 1234567890.123456789, 1234567890.12, '1 234 567 890,12 $US');
      _harness.Harness.testSetInput(component, -1234567890.123456789, -1234567890.12, '-1 234 567 890,12 $US');
      done();
    });
  });
  it('Should format currency for German locale', function (done) {
    _harness.Harness.testCreate(_Currency.CurrencyComponent, _index.components.comp1, { language: 'de' }).then(function (component) {
      _harness.Harness.testSetInput(component, null, null, '');
      _harness.Harness.testSetInput(component, 0, 0, '0');
      _harness.Harness.testSetInput(component, 1.00, 1.00, '1,00 $');
      _harness.Harness.testSetInput(component, -1.00, -1.00, '-1,00 $');
      _harness.Harness.testSetInput(component, 1, 1, '1,00 $');
      _harness.Harness.testSetInput(component, -1, -1, '-1,00 $');
      _harness.Harness.testSetInput(component, 1000, 1000, '1.000,00 $');
      _harness.Harness.testSetInput(component, -1000, -1000, '-1.000,00 $');
      _harness.Harness.testSetInput(component, 1000.01, 1000.01, '1.000,01 $');
      _harness.Harness.testSetInput(component, -1000.01, -1000.01, '-1.000,01 $');
      _harness.Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1.234.567.890,12 $');
      _harness.Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1.234.567.890,12 $');
      _harness.Harness.testSetInput(component, 1234567890.123456789, 1234567890.12, '1.234.567.890,12 $');
      _harness.Harness.testSetInput(component, -1234567890.123456789, -1234567890.12, '-1.234.567.890,12 $');
      done();
    });
  });
});
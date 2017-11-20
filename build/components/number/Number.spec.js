'use strict';

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _Number = require('./Number');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Number Component', function () {
  it('Should build an number component', function (done) {
    _harness.Harness.testCreate(_Number.NumberComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
  it('Should limit decimals using step', function (done) {
    _harness.Harness.testCreate(_Number.NumberComponent, (0, _merge3.default)({}, _index.components.comp2, {
      validate: {
        step: '0.001'
      }
    })).then(function (component) {

      _harness.Harness.testSetInput(component, 123456789.123456789, 123456789.123, '123,456,789.123');
      _harness.Harness.testSetInput(component, -123456789.123456789, -123456789.123, '-123,456,789.123');
      _harness.Harness.testSetInput(component, '123456789.123456789', 123456789.123, '123,456,789.123');
      _harness.Harness.testSetInput(component, '-123456789.123456789', -123456789.123, '-123,456,789.123');
      done();
    });
  });
  it('Should format numbers for USA locale', function (done) {
    _harness.Harness.testCreate(_Number.NumberComponent, _index.components.comp2, { i18n: { lng: 'en-US', resources: {} } }).then(function (component) {
      _harness.Harness.testSetInput(component, null, null, '');
      _harness.Harness.testSetInput(component, undefined, null, '');
      _harness.Harness.testSetInput(component, '', null, '');
      _harness.Harness.testSetInput(component, {}, null, '');
      _harness.Harness.testSetInput(component, [], null, '');
      _harness.Harness.testSetInput(component, [''], null, '');
      _harness.Harness.testSetInput(component, ['1'], 1, '1');
      _harness.Harness.testSetInput(component, 0, 0, '0');
      _harness.Harness.testSetInput(component, 1, 1, '1');
      _harness.Harness.testSetInput(component, -1, -1, '-1');
      _harness.Harness.testSetInput(component, 1000, 1000, '1,000');
      _harness.Harness.testSetInput(component, -1000, -1000, '-1,000');
      _harness.Harness.testSetInput(component, 1000.00, 1000, '1,000');
      _harness.Harness.testSetInput(component, -1000.00, -1000, '-1,000');
      _harness.Harness.testSetInput(component, 1000.01, 1000.01, '1,000.01');
      _harness.Harness.testSetInput(component, -1000.01, -1000.01, '-1,000.01');
      _harness.Harness.testSetInput(component, 1000.001, 1000.001, '1,000.001');
      _harness.Harness.testSetInput(component, -1000.001, -1000.001, '-1,000.001');
      _harness.Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1,234,567,890.12');
      _harness.Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1,234,567,890.12');
      _harness.Harness.testSetInput(component, 12.123456789, 12.123456789, '12.123456789');
      _harness.Harness.testSetInput(component, -12.123456789, -12.123456789, '-12.123456789');
      // These tests run into the maximum number of significant digits for floats.
      _harness.Harness.testSetInput(component, 123456789.123456789, 123456789.123457, '123,456,789.123457');
      _harness.Harness.testSetInput(component, -123456789.123456789, -123456789.123457, '-123,456,789.123457');
      _harness.Harness.testSetInput(component, '0', 0, '0');
      _harness.Harness.testSetInput(component, '1', 1, '1');
      _harness.Harness.testSetInput(component, '-1', -1, '-1');
      _harness.Harness.testSetInput(component, '1000', 1000, '1,000');
      _harness.Harness.testSetInput(component, '-1000', -1000, '-1,000');
      _harness.Harness.testSetInput(component, '1000.01', 1000.01, '1,000.01');
      _harness.Harness.testSetInput(component, '-1000.01', -1000.01, '-1,000.01');
      _harness.Harness.testSetInput(component, '1000.00', 1000, '1,000');
      _harness.Harness.testSetInput(component, '-1000.00', -1000, '-1,000');
      _harness.Harness.testSetInput(component, '1000.001', 1000.001, '1,000.001');
      _harness.Harness.testSetInput(component, '-1000.001', -1000.001, '-1,000.001');
      _harness.Harness.testSetInput(component, '1234567890.12', 1234567890.12, '1,234,567,890.12');
      _harness.Harness.testSetInput(component, '-1234567890.12', -1234567890.12, '-1,234,567,890.12');
      _harness.Harness.testSetInput(component, '12.123456789', 12.123456789, '12.123456789');
      _harness.Harness.testSetInput(component, '-12.123456789', -12.123456789, '-12.123456789');
      _harness.Harness.testSetInput(component, '123456789.123456789', 123456789.123457, '123,456,789.123457');
      _harness.Harness.testSetInput(component, '-123456789.123456789', -123456789.123457, '-123,456,789.123457');
      done();
    });
  });
  it('Should format numbers for British locale', function (done) {
    _harness.Harness.testCreate(_Number.NumberComponent, _index.components.comp2, { i18n: { lng: 'en-GB', resources: {} } }).then(function (component) {
      _harness.Harness.testSetInput(component, null, null, '');
      _harness.Harness.testSetInput(component, 0, 0, '0');
      _harness.Harness.testSetInput(component, 1, 1, '1');
      _harness.Harness.testSetInput(component, -1, -1, '-1');
      _harness.Harness.testSetInput(component, 1000, 1000, '1,000');
      _harness.Harness.testSetInput(component, -1000, -1000, '-1,000');
      _harness.Harness.testSetInput(component, 1000.00, 1000, '1,000');
      _harness.Harness.testSetInput(component, -1000.00, -1000, '-1,000');
      _harness.Harness.testSetInput(component, 1000.01, 1000.01, '1,000.01');
      _harness.Harness.testSetInput(component, -1000.01, -1000.01, '-1,000.01');
      _harness.Harness.testSetInput(component, 1000.001, 1000.001, '1,000.001');
      _harness.Harness.testSetInput(component, -1000.001, -1000.001, '-1,000.001');
      _harness.Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1,234,567,890.12');
      _harness.Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1,234,567,890.12');
      _harness.Harness.testSetInput(component, 12.123456789, 12.123456789, '12.123456789');
      _harness.Harness.testSetInput(component, -12.123456789, -12.123456789, '-12.123456789');
      done();
    });
  });
  it('Should format numbers for French locale', function (done) {
    _harness.Harness.testCreate(_Number.NumberComponent, _index.components.comp2, { i18n: { lng: 'fr', resources: {} } }).then(function (component) {
      // The spaces in these tests are a weird unicode space so be careful duplicating the tests.
      _harness.Harness.testSetInput(component, null, null, '');
      _harness.Harness.testSetInput(component, 0, 0, '0');
      _harness.Harness.testSetInput(component, 1, 1, '1');
      _harness.Harness.testSetInput(component, -1, -1, '-1');
      _harness.Harness.testSetInput(component, 1000, 1000, '1 000');
      _harness.Harness.testSetInput(component, -1000, -1000, '-1 000');
      _harness.Harness.testSetInput(component, 1000.00, 1000, '1 000');
      _harness.Harness.testSetInput(component, -1000.00, -1000, '-1 000');
      _harness.Harness.testSetInput(component, 1000.01, 1000.01, '1 000,01');
      _harness.Harness.testSetInput(component, -1000.01, -1000.01, '-1 000,01');
      _harness.Harness.testSetInput(component, 1000.001, 1000.001, '1 000,001');
      _harness.Harness.testSetInput(component, -1000.001, -1000.001, '-1 000,001');
      _harness.Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1 234 567 890,12');
      _harness.Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1 234 567 890,12');
      _harness.Harness.testSetInput(component, 12.123456789, 12.123456789, '12,123456789');
      _harness.Harness.testSetInput(component, -12.123456789, -12.123456789, '-12,123456789');
      done();
    });
  });
  it('Should format numbers for German locale', function (done) {
    _harness.Harness.testCreate(_Number.NumberComponent, _index.components.comp2, { i18n: { lng: 'de', resources: {} } }).then(function (component) {
      _harness.Harness.testSetInput(component, null, null, '');
      _harness.Harness.testSetInput(component, 0, 0, '0');
      _harness.Harness.testSetInput(component, 1, 1, '1');
      _harness.Harness.testSetInput(component, -1, -1, '-1');
      _harness.Harness.testSetInput(component, 1000, 1000, '1.000');
      _harness.Harness.testSetInput(component, -1000, -1000, '-1.000');
      _harness.Harness.testSetInput(component, 1000.00, 1000, '1.000');
      _harness.Harness.testSetInput(component, -1000.00, -1000, '-1.000');
      _harness.Harness.testSetInput(component, 1000.01, 1000.01, '1.000,01');
      _harness.Harness.testSetInput(component, -1000.01, -1000.01, '-1.000,01');
      _harness.Harness.testSetInput(component, 1000.001, 1000.001, '1.000,001');
      _harness.Harness.testSetInput(component, -1000.001, -1000.001, '-1.000,001');
      _harness.Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1.234.567.890,12');
      _harness.Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1.234.567.890,12');
      _harness.Harness.testSetInput(component, 12.123456789, 12.123456789, '12,123456789');
      _harness.Harness.testSetInput(component, -12.123456789, -12.123456789, '-12,123456789');
      done();
    });
  });
});
'use strict';
import { CurrencyComponent } from './Currency';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Currency Component', function() {
  it('Should build a currency component', function(done) {
    Harness.testCreate(CurrencyComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
  it('Should format currency for USA locale', function(done) {
    Harness.testCreate(CurrencyComponent, comps.comp1, {language: 'en-US'}).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, undefined, null, '');
      Harness.testSetInput(component, {}, null, '');
      Harness.testSetInput(component, [], null, '');
      Harness.testSetInput(component, [''], null, '');
      Harness.testSetInput(component, ['1'], 1, '$1.00');
      Harness.testSetInput(component, ['$1.00'], 1, '$1.00');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1.00, 1, '$1.00');
      Harness.testSetInput(component, -1.00, -1, '-$1.00');
      Harness.testSetInput(component, 1, 1, '$1.00');
      Harness.testSetInput(component, -1, -1, '-$1.00');
      Harness.testSetInput(component, 1000, 1000, '$1,000.00');
      Harness.testSetInput(component, -1000, -1000, '-$1,000.00');
      Harness.testSetInput(component, 1000.01, 1000.01, '$1,000.01');
      Harness.testSetInput(component, -1000.01, -1000.01, '-$1,000.01');
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, '$1,234,567,890.12');
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-$1,234,567,890.12');
      Harness.testSetInput(component, 123456789.123456789, 123456789.12, '$123,456,789.12');
      Harness.testSetInput(component, -123456789.123456789, -123456789.12, '-$123,456,789.12');
      Harness.testSetInput(component, '0', 0, '$0.00');
      Harness.testSetInput(component, '1.00', 1, '$1.00');
      Harness.testSetInput(component, '-1.00', -1, '-$1.00');
      Harness.testSetInput(component, '1', 1, '$1.00');
      Harness.testSetInput(component, '-1', -1, '-$1.00');
      Harness.testSetInput(component, '1000', 1000, '$1,000.00');
      Harness.testSetInput(component, '-1000', -1000, '-$1,000.00');
      Harness.testSetInput(component, '1000.01', 1000.01, '$1,000.01');
      Harness.testSetInput(component, '-1000.01', -1000.01, '-$1,000.01');
      Harness.testSetInput(component, '1234567890.12', 1234567890.12, '$1,234,567,890.12');
      Harness.testSetInput(component, '-1234567890.12', -1234567890.12, '-$1,234,567,890.12');
      Harness.testSetInput(component, '123456789.123456789', 123456789.12, '$123,456,789.12');
      Harness.testSetInput(component, '-123456789.123456789', -123456789.12, '-$123,456,789.12');
      Harness.testSetInput(component, '$0', 0, '$0.00');
      Harness.testSetInput(component, '$1.00', 1, '$1.00');
      Harness.testSetInput(component, '-$1.00', -1, '-$1.00');
      Harness.testSetInput(component, '$1', 1, '$1.00');
      Harness.testSetInput(component, '-$1', -1, '-$1.00');
      Harness.testSetInput(component, '$1000', 1000, '$1,000.00');
      Harness.testSetInput(component, '-$1000', -1000, '-$1,000.00');
      Harness.testSetInput(component, '$1000.01', 1000.01, '$1,000.01');
      Harness.testSetInput(component, '-$1000.01', -1000.01, '-$1,000.01');
      Harness.testSetInput(component, '$1234567890.12', 1234567890.12, '$1,234,567,890.12');
      Harness.testSetInput(component, '-$1234567890.12', -1234567890.12, '-$1,234,567,890.12');
      Harness.testSetInput(component, '$123456789.123456789', 123456789.12, '$123,456,789.12');
      Harness.testSetInput(component, '-$123456789.123456789', -123456789.12, '-$123,456,789.12');
      done();
    });
  });
  it('Should format currency for British locale', function(done) {
    Harness.testCreate(CurrencyComponent, comps.comp1, {language: 'en-GB'}).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1.00, 1, 'US$1.00');
      Harness.testSetInput(component, -1.00, -1, '-US$1.00');
      Harness.testSetInput(component, 1,  1, 'US$1.00');
      Harness.testSetInput(component, -1, -1, '-US$1.00');
      Harness.testSetInput(component, 1000, 1000, 'US$1,000.00');
      Harness.testSetInput(component, -1000, -1000, '-US$1,000.00');
      Harness.testSetInput(component, 1000.01, 1000.01, 'US$1,000.01');
      Harness.testSetInput(component, -1000.01, -1000.01, '-US$1,000.01');
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, 'US$1,234,567,890.12');
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-US$1,234,567,890.12');
      Harness.testSetInput(component, 123456789.123456789, 123456789.12, 'US$123,456,789.12');
      Harness.testSetInput(component, -123456789.123456789, -123456789.12, '-US$123,456,789.12');
      done();
    });
  });
  it('Should format currency for French locale', function(done) {
    Harness.testCreate(CurrencyComponent, comps.comp1, {language: 'fr'}).then((component) => {
      // The spaces in these tests are a weird unicode space so be careful duplicating the tests.
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1.00, 1, '1,00 $US');
      Harness.testSetInput(component, -1.00, -1, '-1,00 $US');
      Harness.testSetInput(component, 1, 1, '1,00 $US');
      Harness.testSetInput(component, -1, -1, '-1,00 $US');
      Harness.testSetInput(component, 1000, 1000, '1 000,00 $US');
      Harness.testSetInput(component, -1000, -1000, '-1 000,00 $US');
      Harness.testSetInput(component, 1000.01, 1000.01, '1 000,01 $US');
      Harness.testSetInput(component, -1000.01, -1000.01, '-1 000,01 $US');
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1 234 567 890,12 $US');
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1 234 567 890,12 $US');
      Harness.testSetInput(component, 1234567890.123456789, 1234567890.12, '1 234 567 890,12 $US');
      Harness.testSetInput(component, -1234567890.123456789, -1234567890.12, '-1 234 567 890,12 $US');
      done();
    });
  });
  it('Should format currency for German locale', function(done) {
    Harness.testCreate(CurrencyComponent, comps.comp1, {language: 'de'}).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1.00, 1.00, '1,00 $');
      Harness.testSetInput(component, -1.00, -1.00, '-1,00 $');
      Harness.testSetInput(component, 1, 1, '1,00 $');
      Harness.testSetInput(component, -1, -1, '-1,00 $');
      Harness.testSetInput(component, 1000, 1000, '1.000,00 $');
      Harness.testSetInput(component, -1000, -1000, '-1.000,00 $');
      Harness.testSetInput(component, 1000.01, 1000.01, '1.000,01 $');
      Harness.testSetInput(component, -1000.01, -1000.01, '-1.000,01 $');
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1.234.567.890,12 $');
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1.234.567.890,12 $');
      Harness.testSetInput(component, 1234567890.123456789, 1234567890.12, '1.234.567.890,12 $');
      Harness.testSetInput(component, -1234567890.123456789, -1234567890.12, '-1.234.567.890,12 $');
      done();
    });
  });
});

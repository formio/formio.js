'use strict';
import _merge from 'lodash/merge';
import { NumberComponent } from './Number';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Number Component', function() {
  it('Should build an number component', function(done) {
    Harness.testCreate(NumberComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
  it('Should limit decimals using step', function(done) {
    Harness.testCreate(NumberComponent, _merge({}, comps.comp2, {
      validate: {
        step: '0.001'
      }
    })).then((component) => {

      Harness.testSetInput(component, 123456789.123456789, 123456789.123, '123,456,789.123');
      Harness.testSetInput(component, -123456789.123456789, -123456789.123, '-123,456,789.123');
      Harness.testSetInput(component, '123456789.123456789', 123456789.123, '123,456,789.123');
      Harness.testSetInput(component, '-123456789.123456789', -123456789.123, '-123,456,789.123');
      done();
    });
  });
  it('Should format numbers for USA locale', function(done) {
    Harness.testCreate(NumberComponent, comps.comp2, {language: 'en-US'}).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, undefined, null, '');
      Harness.testSetInput(component, '', null, '');
      Harness.testSetInput(component, {}, null, '');
      Harness.testSetInput(component, [], null, '');
      Harness.testSetInput(component, [''], null, '');
      Harness.testSetInput(component, ['1'], 1, '1');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1, 1, '1');
      Harness.testSetInput(component, -1, -1, '-1');
      Harness.testSetInput(component, 1000, 1000, '1,000');
      Harness.testSetInput(component, -1000, -1000, '-1,000');
      Harness.testSetInput(component, 1000.00, 1000, '1,000');
      Harness.testSetInput(component, -1000.00, -1000, '-1,000');
      Harness.testSetInput(component, 1000.01, 1000.01, '1,000.01');
      Harness.testSetInput(component, -1000.01, -1000.01, '-1,000.01');
      Harness.testSetInput(component, 1000.001, 1000.001, '1,000.001');
      Harness.testSetInput(component, -1000.001, -1000.001, '-1,000.001');
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1,234,567,890.12');
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1,234,567,890.12');
      Harness.testSetInput(component, 12.123456789, 12.123456789, '12.123456789');
      Harness.testSetInput(component, -12.123456789, -12.123456789, '-12.123456789');
      // These tests run into the maximum number of significant digits for floats.
      Harness.testSetInput(component, 123456789.123456789, 123456789.123457, '123,456,789.123457');
      Harness.testSetInput(component, -123456789.123456789, -123456789.123457, '-123,456,789.123457');
      Harness.testSetInput(component, '0', 0, '0');
      Harness.testSetInput(component, '1', 1, '1');
      Harness.testSetInput(component, '-1', -1, '-1');
      Harness.testSetInput(component, '1000', 1000, '1,000');
      Harness.testSetInput(component, '-1000', -1000, '-1,000');
      Harness.testSetInput(component, '1000.01', 1000.01, '1,000.01');
      Harness.testSetInput(component, '-1000.01', -1000.01, '-1,000.01');
      Harness.testSetInput(component, '1000.00', 1000, '1,000');
      Harness.testSetInput(component, '-1000.00', -1000, '-1,000');
      Harness.testSetInput(component, '1000.001', 1000.001, '1,000.001');
      Harness.testSetInput(component, '-1000.001', -1000.001, '-1,000.001');
      Harness.testSetInput(component, '1234567890.12', 1234567890.12, '1,234,567,890.12');
      Harness.testSetInput(component, '-1234567890.12', -1234567890.12, '-1,234,567,890.12');
      Harness.testSetInput(component, '12.123456789', 12.123456789, '12.123456789');
      Harness.testSetInput(component, '-12.123456789', -12.123456789, '-12.123456789');
      Harness.testSetInput(component, '123456789.123456789', 123456789.123457, '123,456,789.123457');
      Harness.testSetInput(component, '-123456789.123456789', -123456789.123457, '-123,456,789.123457');
      done();
    });
  });
  it('Should format numbers for British locale', function(done) {
    Harness.testCreate(NumberComponent, comps.comp2, {language: 'en-GB'}).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1, 1, '1');
      Harness.testSetInput(component, -1, -1, '-1');
      Harness.testSetInput(component, 1000, 1000, '1,000');
      Harness.testSetInput(component, -1000, -1000, '-1,000');
      Harness.testSetInput(component, 1000.00, 1000, '1,000');
      Harness.testSetInput(component, -1000.00, -1000, '-1,000');
      Harness.testSetInput(component, 1000.01, 1000.01, '1,000.01');
      Harness.testSetInput(component, -1000.01, -1000.01, '-1,000.01');
      Harness.testSetInput(component, 1000.001, 1000.001, '1,000.001');
      Harness.testSetInput(component, -1000.001, -1000.001, '-1,000.001');
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1,234,567,890.12');
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1,234,567,890.12');
      Harness.testSetInput(component, 12.123456789, 12.123456789, '12.123456789');
      Harness.testSetInput(component, -12.123456789, -12.123456789, '-12.123456789');
      done();
    });
  });
  it('Should format numbers for French locale', function(done) {
    Harness.testCreate(NumberComponent, comps.comp2, {language: 'fr'}).then((component) => {
      // The spaces in these tests are a weird unicode space so be careful duplicating the tests.
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1, 1, '1');
      Harness.testSetInput(component, -1, -1, '-1');
      Harness.testSetInput(component, 1000, 1000, '1 000');
      Harness.testSetInput(component, -1000, -1000, '-1 000');
      Harness.testSetInput(component, 1000.00, 1000, '1 000');
      Harness.testSetInput(component, -1000.00, -1000, '-1 000');
      Harness.testSetInput(component, 1000.01, 1000.01, '1 000,01');
      Harness.testSetInput(component, -1000.01, -1000.01, '-1 000,01');
      Harness.testSetInput(component, 1000.001, 1000.001, '1 000,001');
      Harness.testSetInput(component, -1000.001, -1000.001, '-1 000,001');
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1 234 567 890,12');
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1 234 567 890,12');
      Harness.testSetInput(component, 12.123456789, 12.123456789, '12,123456789');
      Harness.testSetInput(component, -12.123456789, -12.123456789, '-12,123456789');
      done();
    });
  });
  it('Should format numbers for German locale', function(done) {
    Harness.testCreate(NumberComponent, comps.comp2, {language: 'de'}).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1, 1, '1');
      Harness.testSetInput(component, -1, -1, '-1');
      Harness.testSetInput(component, 1000, 1000, '1.000');
      Harness.testSetInput(component, -1000, -1000, '-1.000');
      Harness.testSetInput(component, 1000.00, 1000, '1.000');
      Harness.testSetInput(component, -1000.00, -1000, '-1.000');
      Harness.testSetInput(component, 1000.01, 1000.01, '1.000,01');
      Harness.testSetInput(component, -1000.01, -1000.01, '-1.000,01');
      Harness.testSetInput(component, 1000.001, 1000.001, '1.000,001');
      Harness.testSetInput(component, -1000.001, -1000.001, '-1.000,001');
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1.234.567.890,12');
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1.234.567.890,12');
      Harness.testSetInput(component, 12.123456789, 12.123456789, '12,123456789');
      Harness.testSetInput(component, -12.123456789, -12.123456789, '-12,123456789');
      done();
    });
  });
});

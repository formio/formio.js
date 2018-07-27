import _merge from 'lodash/merge';

import Harness from '../../../test/harness';
import NumberComponent from './Number';

import {
  comp1,
  comp2
} from './fixtures';

describe('Number Component', () => {
  it('Should build an number component', () => {
    return Harness.testCreate(NumberComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
    });
  });

  it('Should limit decimals using step', () => {
    return Harness.testCreate(NumberComponent, _merge({}, comp2, {
      validate: {
        step: '0.001'
      }
    })).then((component) => {
      Harness.testSetInput(component, 123456789.123456789, 123456789.123, '123,456,789.123');
      Harness.testSetInput(component, -123456789.123456789, -123456789.123, '-123,456,789.123');
      Harness.testSetInput(component, '123456789.123456789', 123456789.123, '123,456,789.123');
      Harness.testSetInput(component, '-123456789.123456789', -123456789.123, '-123,456,789.123');
    });
  });

  it('Should format numbers for USA locale', () => {
    /* eslint-disable max-statements */
    return Harness.testCreate(NumberComponent, comp2, { language: 'en-US' }).then((component) => {
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
      Harness.testSetInput(component, 123456789.123456789, 123456789.123456789, '123,456,789.12345679');
      Harness.testSetInput(component, -123456789.123456789, -123456789.123456789, '-123,456,789.12345679');
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
      Harness.testSetInput(component, '123456789.123456789', 123456789.123456789, '123,456,789.12345679');
      Harness.testSetInput(component, '-123456789.123456789', -123456789.123456789, '-123,456,789.12345679');
    });
    /* eslint-enable max-statements */
  });

  it('Should format numbers for British locale', () => {
    return Harness.testCreate(NumberComponent, comp2, { language: 'en-GB' }).then((component) => {
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
    });
  });

  it('Should format numbers for French locale', () => {
    return Harness.testCreate(NumberComponent, comp2, { language: 'fr' }).then((component) => {
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
    });
  });

  it('Should format numbers for German locale', () => {
    return Harness.testCreate(NumberComponent, comp2, { language: 'de' }).then((component) => {
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
    });
  });
});

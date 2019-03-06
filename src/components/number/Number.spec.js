import assert from 'power-assert';
import _ from 'lodash';
import _merge from 'lodash/merge';
import Harness from '../../../test/harness';
import NumberComponent from './Number';

import {
  comp1,
  comp2,
  comp3,
  comp4
} from './fixtures';

describe('Number Component', () => {
  it('Should build an number component', (done) => {
    Harness.testCreate(NumberComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });

  it('Should limit decimals using step', (done) => {
    Harness.testCreate(NumberComponent, _merge({}, comp2, {
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

  it('Should format numbers for USA locale', (done) => {
    /* eslint-disable max-statements */
    Harness.testCreate(NumberComponent, comp2, { language: 'en-US' }).then((component) => {
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
      done();
    });
    /* eslint-enable max-statements */
  });

  it('Should format numbers for British locale', (done) => {
    Harness.testCreate(NumberComponent, comp2, { language: 'en-GB' }).then((component) => {
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

  it('Should format numbers for French locale', (done) => {
    Harness.testCreate(NumberComponent, comp2, { language: 'fr' }).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1, 1, '1');
      Harness.testSetInput(component, -1, -1, '-1');
      Harness.testSetInput(component, 1000, 1000, Harness.assertStringEqual('1 000'));
      Harness.testSetInput(component, -1000, -1000, Harness.assertStringEqual('-1 000'));
      Harness.testSetInput(component, 1000.00, 1000, Harness.assertStringEqual('1 000'));
      Harness.testSetInput(component, -1000.00, -1000, Harness.assertStringEqual('-1 000'));
      Harness.testSetInput(component, 1000.01, 1000.01, Harness.assertStringEqual('1 000,01'));
      Harness.testSetInput(component, -1000.01, -1000.01, Harness.assertStringEqual('-1 000,01'));
      Harness.testSetInput(component, 1000.001, 1000.001, Harness.assertStringEqual('1 000,001'));
      Harness.testSetInput(component, -1000.001, -1000.001, Harness.assertStringEqual('-1 000,001'));
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, Harness.assertStringEqual('1 234 567 890,12'));
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, Harness.assertStringEqual('-1 234 567 890,12'));
      Harness.testSetInput(component, 12.123456789, 12.123456789, '12,123456789');
      Harness.testSetInput(component, -12.123456789, -12.123456789, '-12,123456789');
      done();
    });
  });

  it('Should format numbers for German locale', (done) => {
    Harness.testCreate(NumberComponent, comp2, { language: 'de' }).then((component) => {
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

  it('Should display default integer value', (done) => {
    Harness.testCreate(NumberComponent, comp3).then(number => {
      assert.deepEqual(_.get(number, ['inputs', '0', 'value']), '42');
      done();
    });
  });

  it('Should display default decimal value', (done) => {
    const TEST_VAL = 4.2;
    const comp = _.cloneDeep(comp3);

    comp.defaultValue = TEST_VAL;
    comp.decimalLimit = 2;
    comp.requireDecimal = true;

    Harness.testCreate(NumberComponent, comp).then(number => {
      assert.deepEqual(_.get(number, ['inputs', '0', 'value']), '4.20');
      done();
    });
  });

  it('Should add trailing zeros on blur, if decimal required', (done) => {
    const comp = _.cloneDeep(comp3);

    comp.decimalLimit = 2;
    comp.requireDecimal = true;

    Harness.testCreate(NumberComponent, comp).then(number => {
      const testset = [
        // [inv, outv, display]
        ['42',        42,       '42.00'],
        ['42.1',      42.1,     '42.10'],
        ['42.01',     42.01,    '42.01'],
        ['4200',      4200,     '4200.00'],
        ['4200.4',    4200.4,   '4200.40'],
        ['4200.42',   4200.42,  '4200.42'],
        ['4200.',     4200,     '4200.00'],
        ['99999999.', 99999999, '99999999.00']
      ];

      testset.forEach((set, index) => {
        try {
          Harness.testNumberBlur(number, ...set);
        }
        catch (err) {
          done(new Error(`Test case #${index}, set: ${set}, err: ${err.message}`));
        }
      });

      done();
    }, done);
  });

  it('Should add trailing zeros on blur, if decimal and delimiter is required', (done) => {
    const comp = _.cloneDeep(comp3);

    comp.decimalLimit = 2;
    comp.requireDecimal = true;
    comp.delimiter = true;

    /* eslint-disable max-statements */
    Harness.testCreate(NumberComponent, comp).then(number => {
      const testset = [
        // [inv, outv, display]
        ['42',        42,       '42.00'],
        ['42.1',      42.1,     '42.10'],
        ['42.01',     42.01,    '42.01'],
        ['4200',      4200,     '4,200.00'],
        ['4200.4',    4200.4,   '4,200.40'],
        ['4200.42',   4200.42,  '4,200.42'],
        ['4200.',     4200,     '4,200.00'],
        ['99999999.', 99999999, '99,999,999.00']
      ];

      testset.forEach((set, index) => {
        try {
          Harness.testNumberBlur(number, ...set);
        }
        catch (err) {
          done(new Error(`Test case #${index}, set: ${set}, err: ${err.message}`));
        }
      });

      done();
    }, done);
  });

  it('Should add trailing zeros on blur with `multiple` flag', (done) => {
    Harness.testCreate(NumberComponent, comp4).then(number => {
      const testset = [
        ['42',        42,       '42.00'],
        ['42.1',      42.1,     '42.10'],
        ['42.01',     42.01,    '42.01'],
        ['4200',      4200,     '4,200.00'],
        ['4200.4',    4200.4,   '4,200.40'],
        ['4200.42',   4200.42,  '4,200.42'],
        ['4200.',     4200,     '4,200.00'],
        ['99999999.', 99999999, '99,999,999.00']
      ];

      testset.forEach((set, index) => {
        try {
          assert.strictEqual(number.inputs.length, index + 1);
          Harness.testNumberBlur(number, ...set, index);
          number.addValue();
        }
        catch (err) {
          done(new Error(`Test case #${index}, set: ${set}, err: ${err.message}`));
        }
      });

      done();
    }, done);
  });
});

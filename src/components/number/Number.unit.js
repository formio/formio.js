import assert from 'power-assert';
import _ from 'lodash';
import _merge from 'lodash/merge';
import Harness from '../../../test/harness';
import NumberComponent from './Number';

import {
  comp1,
  comp2,
  comp3,
  comp4,
  comp5
} from './fixtures';

describe('Number Component', () => {
  it('Should build an number component', () => {
    return Harness.testCreate(NumberComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
    });
  });

  it('Should format submissions for table view for French locale', () => {
    return Harness.testCreate(NumberComponent, comp4, { language: 'fr' }).then((component) => {
      const value1 = component.getValueAsString(1);
      const value2 = component.getValueAsString(1.1);
      const value3 = component.getValueAsString(1.11);
      const value4 = component.getValueAsString(1111);
      const value5 = component.getValueAsString(1111111);
      const value6 = component.getValueAsString(-11111);

      assert.equal(value1, '1,00');
      assert.equal(value2, '1,10');
      assert.equal(value3, '1,11');
      assert.equal(value4, '1 111,00');
      assert.equal(value5, '1 111 111,00');
      assert.equal(value6, '-11 111,00');
    });
  });

  it('Should format sumbissions for table view for USA locale', () => {
    return Harness.testCreate(NumberComponent, comp4, { language: 'en-US' }).then((component) => {
      const value1 = component.getValueAsString(1);
      const value2 = component.getValueAsString(1.1);
      const value3 = component.getValueAsString(1.11);
      const value4 = component.getValueAsString(1111);
      const value5 = component.getValueAsString(1111111);
      const value6 = component.getValueAsString(-11111);

      assert.equal(value1, '1.00');
      assert.equal(value2, '1.10');
      assert.equal(value3, '1.11');
      assert.equal(value4, '1,111.00');
      assert.equal(value5, '1,111,111.00');
      assert.equal(value6, '-11,111.00');
    });
  });

  it('Should format value on blur for USA locale', () => {
   return Harness.testCreate(NumberComponent, comp4, { language: 'en-US' }).then((component) => {
      component.root = {
        onChange: ()=>{},
        triggerChange: ()=>{},
      };

      const blurEvent = new Event('blur');
      const inputEvent = new Event('input');
      const valueElement = component.element.querySelector('[name="data[number]"]');

      valueElement.value = 22222222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.equal(valueElement.value, '22,222,222.00');

      valueElement.value = 22222222.2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.equal(valueElement.value, '22,222,222.20');

      valueElement.value = 22222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.equal(valueElement.value, '22,222.00');

      valueElement.value = 2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.equal(valueElement.value, '2.00');
    });
  });

  it('Should format value on blur for French locale', (done) => {
    Harness.testCreate(NumberComponent, comp4, { language: 'fr' }).then((component) => {
      component.root = {
        onChange: ()=>{},
        triggerChange: ()=>{},
      };

      const blurEvent = new Event('blur');
      const inputEvent = new Event('input');
      const valueElement = component.element.querySelector('[name="data[number]"]');

      valueElement.value = 22222222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.deepEqual(valueElement.value, '22 222 222,00');

      valueElement.value = '22222222,2';
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.deepEqual(valueElement.value, '22 222 222,20');

      valueElement.value = 22222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.deepEqual(valueElement.value, '22 222,00');

      valueElement.value = 222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.deepEqual(valueElement.value, '222,00');

      valueElement.value = 2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.deepEqual(valueElement.value, '2,00');

      done();
    });
  });

  it('Should not change entered value on blur if multiple value is set', (done) => {
    Harness.testCreate(NumberComponent, comp5).then((component) => {
      component.root = {
        onChange: ()=>{},
        triggerChange: ()=>{},
      };
      const blurEvent = new Event('blur');
      const clickEvent = new Event('click');
      const addBtn = component.refs.addButton[0];

      addBtn.dispatchEvent(clickEvent);

      const firstValueElement = component.element.querySelectorAll('[name="data[number]"]')[0];
      const secondValueElement = component.element.querySelectorAll('[name="data[number]"]')[1];

      component.setValue([111,222]);

      firstValueElement.dispatchEvent(blurEvent);
      secondValueElement.dispatchEvent(blurEvent);

      assert.equal(component.dataValue[0], component.getValue()[0]);
      assert.equal(component.dataValue[1], component.getValue()[1]);
      done();
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

  it('Should format submissions for table view for French locale', () => {
    return Harness.testCreate(NumberComponent, comp2, { language: 'fr' }).then((component) => {
      const value1 = component.getValueAsString(1);
      const value2 = component.getValueAsString(1.1);
      const value3 = component.getValueAsString(1.1111111);
      const value4 = component.getValueAsString(1111);
      const value5 = component.getValueAsString(1111111);
      const value6 = component.getValueAsString(-11111.1111);

      assert.equal(value1, '1');
      assert.equal(value2, '1,1');
      assert.equal(value3, '1,1111111');
      assert.equal(value4, '1 111');
      assert.equal(value5, '1 111 111');
      assert.equal(value6, '-11 111,1111');
    });
  });

  it('Should format sumissions for table view for USA locale', () => {
    return Harness.testCreate(NumberComponent, comp2, { language: 'en-US' }).then((component) => {
      const value1 = component.getValueAsString(1);
      const value2 = component.getValueAsString(1.1);
      const value3 = component.getValueAsString(1.1111111);
      const value4 = component.getValueAsString(1111);
      const value5 = component.getValueAsString(1111111);
      const value6 = component.getValueAsString(-11111.1111);

      assert.equal(value1, '1');
      assert.equal(value2, '1.1');
      assert.equal(value3, '1.1111111');
      assert.equal(value4, '1,111');
      assert.equal(value5, '1,111,111');
      assert.equal(value6, '-11,111.1111');
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
      Harness.testSetInput(component, 1000, 1000, '1 000');
      Harness.testSetInput(component, -1000, -1000, '-1 000');
      Harness.testSetInput(component, 1000.00, 1000, '1 000');
      Harness.testSetInput(component, -1000.00, -1000, '-1 000');
      Harness.testSetInput(component, 1000.01, 1000.01, '1 000,01');
      Harness.testSetInput(component, -1000.01, -1000.01, '-1 000,01');
      Harness.testSetInput(component, 1000.001, 1000.001, '1 000,001');
      Harness.testSetInput(component, -1000.001, -1000.001, '-1 000,001');
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1 234 567 890,12');
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1 234 567 890,12');
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

  it('Should display default integer value', () => {
    return Harness.testCreate(NumberComponent, comp3).then(number => {
      assert.deepEqual(_.get(number, ['refs', 'input', '0', 'value']), '42');
    });
  });

  it('Should display default decimal value', () => {
    const TEST_VAL = 4.2;
    const comp = _.cloneDeep(comp3);

    comp.defaultValue = TEST_VAL;
    comp.decimalLimit = 2;
    comp.requireDecimal = true;

    return Harness.testCreate(NumberComponent, comp).then(number => {
      assert.deepEqual(_.get(number, ['refs', 'input', '0', 'value']), '4.20');
    });
  });

  // it('Should add trailing zeros on blur, if decimal required', (done) => {
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

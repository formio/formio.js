import Harness from '../../../test/harness';
import CurrencyComponent from './Currency';
import assert from 'power-assert';
import {
  comp1,
  comp2,
  comp3,
  comp4,
} from './fixtures';

describe('Currency Component', () => {
  before(done => {
    // Need to polyfill some Intl.locale support, since node doesn't include it in standard builds
    require('../../../test/numberFormatPolyfill');

    done();
  });

  it('Should build a currency component', () => {
    return Harness.testCreate(CurrencyComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
    });
  });

  it('Should place a caret between the period and the underline.', (done) => {
    Harness.testCreate(CurrencyComponent, comp3, { language: 'en-US' })
      .then((component) => {
        const inputEvent = new Event('input');
        const currencyElement = component.element.querySelector('[name="data[currency]"]');

        currencyElement.value = 42;
        currencyElement.dispatchEvent(inputEvent);
        assert.equal(currencyElement.value, '$42');

        currencyElement.value = '.';
        currencyElement.dispatchEvent(inputEvent);
        setTimeout(() => {
          assert.equal(currencyElement.selectionStart, 3);
          done();
        }, 200);
      });
  });

  it('Should format value on blur for USA locale', (done) => {
    Harness.testCreate(CurrencyComponent, comp1, { language: 'en-US' }).then((component) => {
      component.root = {
        onChange: ()=>{},
        triggerChange: ()=>{},
      };

      const blurEvent = new Event('blur');
      const inputEvent = new Event('input');
      const valueElement = component.element.querySelector('[name="data[money]"]');

      valueElement.value = 22222222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.equal(valueElement.value, '$22,222,222.00');

      valueElement.value = 22222222.2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.equal(valueElement.value, '$22,222,222.20');

      valueElement.value = 22222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.equal(valueElement.value, '$22,222.00');

      valueElement.value = 222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.equal(valueElement.value, '$222.00');

      valueElement.value = 2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.equal(valueElement.value, '$2.00');

      done();
    });
  });

  it('Should format value on blur for French locale', (done) => {
    Harness.testCreate(CurrencyComponent, comp1, { language: 'fr' }).then((component) => {
      component.root = {
        onChange: ()=>{},
        triggerChange: ()=>{},
      };

      const blurEvent = new Event('blur');
      const inputEvent = new Event('input');
      const valueElement = component.element.querySelector('[name="data[money]"]');

      valueElement.value = 22222222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.deepEqual(valueElement.value, '22 222 222,00 $US');

      valueElement.value = '22222222,2';
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.deepEqual(valueElement.value, '22 222 222,20 $US');

      valueElement.value = 22222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.deepEqual(valueElement.value, '22 222,00 $US');

      valueElement.value = 222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.deepEqual(valueElement.value, '222,00 $US');

      valueElement.value = 2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);
      assert.deepEqual(valueElement.value, '2,00 $US');

      done();
    });
  });

  it('Should not change entered value on blur if multiple value is set', (done) => {
    Harness.testCreate(CurrencyComponent, comp2).then((component) => {
      component.root = {
        onChange: ()=>{},
        triggerChange: ()=>{},
      };
      const blurEvent = new Event('blur');
      const clickEvent = new Event('click');
      const addBtn = component.refs.addButton[0];

      addBtn.dispatchEvent(clickEvent);

      const firstValueElement = component.element.querySelectorAll('[name="data[currency]"]')[0];
      const secondValueElement = component.element.querySelectorAll('[name="data[currency]"]')[1];

      component.setValue([111,222]);

      firstValueElement.dispatchEvent(blurEvent);
      secondValueElement.dispatchEvent(blurEvent);

      assert.equal(component.dataValue[0], component.getValue()[0]);
      assert.equal(component.dataValue[1], component.getValue()[1]);
      done();
    });
  });

  it('Should format currency submissions for table view for French locale', () => {
    return Harness.testCreate(CurrencyComponent, comp1, { language: 'fr' }).then((component) => {
      const value1 = component.getValueAsString(1);
      const value2 = component.getValueAsString(1.1);
      const value3 = component.getValueAsString(1.11);
      const value4 = component.getValueAsString(1111);
      const value5 = component.getValueAsString(1111111);
      const value6 = component.getValueAsString(-11111);

      assert.equal(value1, '1,00 $US');
      assert.equal(value2, '1,10 $US');
      assert.equal(value3, '1,11 $US');
      assert.equal(value4, '1 111,00 $US');
      assert.equal(value5, '1 111 111,00 $US');
      assert.equal(value6, '-11 111,00 $US');
    });
  });

  it('Should format currency sumbissions for table view for USA locale', () => {
    return Harness.testCreate(CurrencyComponent, comp1, { language: 'en-US' }).then((component) => {
      const value1 = component.getValueAsString(1);
      const value2 = component.getValueAsString(1.1);
      const value3 = component.getValueAsString(1.11);
      const value4 = component.getValueAsString(1111);
      const value5 = component.getValueAsString(1111111);
      const value6 = component.getValueAsString(-11111);

      assert.equal(value1, '$1.00');
      assert.equal(value2, '$1.10');
      assert.equal(value3, '$1.11');
      assert.equal(value4, '$1,111.00');
      assert.equal(value5, '$1,111,111.00');
      assert.equal(value6, '-$11,111.00');
    });
  });

  it('Should add trailing zeros', () => {
    return Harness.testCreate(CurrencyComponent, comp1, { language: 'en-US' }).then((component) => {
      assert.equal(component.addZerosAndFormatValue(null),);
      assert.equal(component.addZerosAndFormatValue('3'), '3.00');
      assert.equal(component.addZerosAndFormatValue('3.1'), '3.10');
      assert.equal(component.addZerosAndFormatValue('-3'), '-3.00');
      assert.equal(component.addZerosAndFormatValue('$3'), '$3.00');
      assert.equal(component.addZerosAndFormatValue('-$3'), '-$3.00');
      assert.equal(component.addZerosAndFormatValue('$3.3'), '$3.30');
      assert.equal(component.addZerosAndFormatValue('$3.33'), '$3.33');
    });
  });

  it('Should set values with trailing zeros', () => {
    return Harness.testCreate(CurrencyComponent, comp1, { language: 'en-US' }).then((component) => {
      assert.equal(component.formatValue(null), null);
      assert.equal(component.formatValue('0'), '0.00');
      assert.equal(component.formatValue('3'), '3.00');
      assert.equal(component.formatValue('3.3'), '3.30');
      assert.equal(component.formatValue('3.33'), '3.33');
    });
  });

  it('Should format currency for USA locale', () => {
    /* eslint-disable max-statements */
    return Harness.testCreate(CurrencyComponent, comp1, { language: 'en-US' }).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, undefined, null, '');
      Harness.testSetInput(component, {}, null, '');
      Harness.testSetInput(component, [], null, '');
      Harness.testSetInput(component, [''], null, '');
      Harness.testSetInput(component, ['1'], 1, '$1.00');
      Harness.testSetInput(component, ['$1.00'], 1, '$1.00');
      Harness.testSetInput(component, 0, 0, '$0.00');
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
      Harness.testSetInput(component, '$_', 0, '$0.00');
      Harness.testSetInput(component, '-$_', 0, '$0.00');
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
    });
    /* eslint-enable max-statements */
  });

  it('Should format currency for British locale', () => {
    return Harness.testCreate(CurrencyComponent, comp1, { language: 'en-GB' }).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, 'US$0.00');
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
    });
  });

  it('Should format currency for French locale', () => {
    return Harness.testCreate(CurrencyComponent, comp1, { language: 'fr' }).then((component) => {
      // The spaces in these tests are a weird unicode space so be careful duplicating the tests.
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0,00 $US');
      Harness.testSetInput(component, 1.00, 1, '1,00 $US');
      Harness.testSetInput(component, -1.00, -1, '-1,00 $US');
      Harness.testSetInput(component, 1, 1, '1,00 $US');
      Harness.testSetInput(component, -1, -1, '-1,00 $US');
      Harness.testSetInput(component, 1000, 1000, '1 000,00 $US');
      Harness.testSetInput(component, -1000, -1000, '-1 000,00 $US');
      Harness.testSetInput(component, 1000.01, 1000.01, '1 000,01 $US');
      Harness.testSetInput(component, -1000.01, -1000.01, '-1 000,01 $US');
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1 234 567 890,12 $US');
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1 234 567 890,12 $US');
      Harness.testSetInput(component, 1234567890.123456789, 1234567890.12, '1 234 567 890,12 $US');
      Harness.testSetInput(component, -1234567890.123456789, -1234567890.12, '-1 234 567 890,12 $US');
    });
  });

  it('Should format currency for German locale', () => {
    return Harness.testCreate(CurrencyComponent, comp1, { language: 'de' }).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0,00 $');
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
    });
  });

  it('Should return value as string properly for multiple values', (done) => {
    Harness.testCreate(CurrencyComponent, comp4).then((component) => {
      component.refs.input = null;
      assert.equal(component.getValueAsString([100, 200, 300, 500]), '$100.00, $200.00, $300.00, $500.00');
      done();
    }).catch(done);
  });
});

/* eslint-disable no-loss-of-precision */
import assert from 'power-assert';
import _ from 'lodash';
import _merge from 'lodash/merge';
import Harness from '../harness';
import { Formio } from '../../src/Formio';
import NumberComponent from '../../src/components/number/Number';

import {
  comp1,
  comp2,
  comp3,
  comp4,
  comp5,
  comp6,
  comp7,
  comp8,
  comp9,
  comp10,
  comp11,
  scientificNotation,
} from './fixtures/number';

describe('Number Component', function () {
  it('Should build an number component', function () {
    return Harness.testCreate(NumberComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
    });
  });

  it('Should correctly handle scientific notation', function () {
    return Harness.testCreate(NumberComponent, scientificNotation, {
      allowScientificNotation: true,
    }).then((component) => {
      const testCases = [
        [6.54635e12, 6546350000000, '6546350000000'],
        [1.23e-5, 0.0000123, '0.0000123'],
        [3.14159e2, 314.159, '314.159'],
        [2e-3, 0.002, '0.002'],
        [7.5e5, 750000, '750000'],
        [1.2345e10, 12345000000, '12345000000'],
      ];

      testCases.forEach(([input, expectedValue, expectedDisplayValue]) => {
        component.setValue(input);
        assert.equal(
          component.dataValue,
          expectedValue,
          `setValue: ${input} should result in ${expectedValue}`,
        );
        assert.equal(
          component.getValueAsString(input),
          expectedDisplayValue,
          `getValueAsString: ${input} should result in ${expectedDisplayValue}`,
        );
      });
    });
  });

  it('Should format sumbissions for table view for USA locale', function () {
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

  it('Should format value on blur for USA locale', function () {
    return Harness.testCreate(NumberComponent, comp4, { language: 'en-US' }).then((component) => {
      component.root = {
        onChange: () => {},
        triggerChange: () => {},
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

  it('Should format value on blur for French locale', function (done) {
    Harness.testCreate(NumberComponent, comp4, { language: 'fr' }).then((component) => {
      component.root = {
        onChange: () => {},
        triggerChange: () => {},
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

  it('Should not change entered value on blur if multiple value is set', function (done) {
    Harness.testCreate(NumberComponent, comp5).then((component) => {
      component.root = {
        onChange: () => {},
        triggerChange: () => {},
      };
      const blurEvent = new Event('blur');
      const clickEvent = new Event('click');
      const addBtn = component.refs.addButton[0];

      addBtn.dispatchEvent(clickEvent);

      const firstValueElement = component.element.querySelectorAll('[name="data[number]"]')[0];
      const secondValueElement = component.element.querySelectorAll('[name="data[number]"]')[1];

      component.setValue([111, 222]);

      firstValueElement.dispatchEvent(blurEvent);
      secondValueElement.dispatchEvent(blurEvent);

      assert.equal(component.dataValue[0], component.getValue()[0]);
      assert.equal(component.dataValue[1], component.getValue()[1]);
      done();
    });
  });

  it('Should limit decimals using step', function () {
    return Harness.testCreate(
      NumberComponent,
      _merge({}, comp2, {
        validate: {
          step: '0.001',
        },
      }),
    ).then((component) => {
      Harness.testSetInput(component, 123456789.123456789, 123456789.123, '123,456,789.123');
      Harness.testSetInput(component, -123456789.123456789, -123456789.123, '-123,456,789.123');
      Harness.testSetInput(component, '123456789.123456789', 123456789.123, '123,456,789.123');
      Harness.testSetInput(component, '-123456789.123456789', -123456789.123, '-123,456,789.123');
    });
  });

  it('Should format submissions for table view for French locale', function () {
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

  it('Should format sumissions for table view for USA locale', function () {
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

  it('Should format numbers for USA locale', function () {
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
      Harness.testSetInput(component, 1000.0, 1000, '1,000');
      Harness.testSetInput(component, -1000.0, -1000, '-1,000');
      Harness.testSetInput(component, 1000.01, 1000.01, '1,000.01');
      Harness.testSetInput(component, -1000.01, -1000.01, '-1,000.01');
      Harness.testSetInput(component, 1000.001, 1000.001, '1,000.001');
      Harness.testSetInput(component, -1000.001, -1000.001, '-1,000.001');
      Harness.testSetInput(component, 1234567890.12, 1234567890.12, '1,234,567,890.12');
      Harness.testSetInput(component, -1234567890.12, -1234567890.12, '-1,234,567,890.12');
      Harness.testSetInput(component, 12.123456789, 12.123456789, '12.123456789');
      Harness.testSetInput(component, -12.123456789, -12.123456789, '-12.123456789');
      // These tests run into the maximum number of significant digits for floats.
      Harness.testSetInput(
        component,
        123456789.123456789,
        123456789.123456789,
        '123,456,789.12345679',
      );
      Harness.testSetInput(
        component,
        -123456789.123456789,
        -123456789.123456789,
        '-123,456,789.12345679',
      );
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
      Harness.testSetInput(
        component,
        '123456789.123456789',
        123456789.123456789,
        '123,456,789.12345679',
      );
      Harness.testSetInput(
        component,
        '-123456789.123456789',
        -123456789.123456789,
        '-123,456,789.12345679',
      );
    });
  });

  it('Should format numbers for British locale', function () {
    return Harness.testCreate(NumberComponent, comp2, { language: 'en-GB' }).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1, 1, '1');
      Harness.testSetInput(component, -1, -1, '-1');
      Harness.testSetInput(component, 1000, 1000, '1,000');
      Harness.testSetInput(component, -1000, -1000, '-1,000');
      Harness.testSetInput(component, 1000.0, 1000, '1,000');
      Harness.testSetInput(component, -1000.0, -1000, '-1,000');
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

  it('Should format numbers for French locale', function () {
    return Harness.testCreate(NumberComponent, comp2, { language: 'fr' }).then((component) => {
      // The spaces in these tests are a weird unicode space so be careful duplicating the tests.
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1, 1, '1');
      Harness.testSetInput(component, -1, -1, '-1');
      Harness.testSetInput(component, 1000, 1000, '1 000');
      Harness.testSetInput(component, -1000, -1000, '-1 000');
      Harness.testSetInput(component, 1000.0, 1000, '1 000');
      Harness.testSetInput(component, -1000.0, -1000, '-1 000');
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

  it('Should format numbers for German locale', function () {
    return Harness.testCreate(NumberComponent, comp2, { language: 'de' }).then((component) => {
      Harness.testSetInput(component, null, null, '');
      Harness.testSetInput(component, 0, 0, '0');
      Harness.testSetInput(component, 1, 1, '1');
      Harness.testSetInput(component, -1, -1, '-1');
      Harness.testSetInput(component, 1000, 1000, '1.000');
      Harness.testSetInput(component, -1000, -1000, '-1.000');
      Harness.testSetInput(component, 1000.0, 1000, '1.000');
      Harness.testSetInput(component, -1000.0, -1000, '-1.000');
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

  it('Should display default integer value', function () {
    return Harness.testCreate(NumberComponent, comp3).then((number) => {
      assert.deepEqual(_.get(number, ['refs', 'input', '0', 'value']), '42');
    });
  });

  it('Should display default decimal value', function () {
    const TEST_VAL = 4.2;
    const comp = _.cloneDeep(comp3);

    comp.defaultValue = TEST_VAL;
    comp.decimalLimit = 2;
    comp.requireDecimal = true;

    return Harness.testCreate(NumberComponent, comp).then((number) => {
      assert.deepEqual(_.get(number, ['refs', 'input', '0', 'value']), '4.20');
    });
  });

  it('Should provide min/max validation', function (done) {
    const form = _.cloneDeep(comp6);

    const validValues = [null, 20, 555, 34, 20.000001, 554.999];

    const invalidMin = [19.99, 0, 1, 0.34, -0.1, -20];

    const invalidMax = [555.00000001, 100000, 5555];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form, { language: 'en-US' })
          .then((form) => {
            form.setPristine(false);

            const component = form.getComponent('number');
            const changed = component.setValue(value);
            const error = message;

            if (value) {
              assert.equal(changed, true, 'Should set value');
            }

            setTimeout(() => {
              if (valid) {
                assert.equal(component.errors.length, 0, 'Should not contain error');
              } else {
                assert(component.errors.length > 0, 'Should contain error');
                assert.equal(component.errors[0].message, error, 'Should contain error message');
                assert.equal(
                  component.element.classList.contains('has-error'),
                  true,
                  'Should contain error class',
                );
                assert.equal(
                  component.refs.messageContainer.textContent.trim(),
                  error,
                  'Should show error',
                );
              }

              if (_.isEqual(value, lastValue)) {
                done();
              }
            }, 300);
          })
          .catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidMin, false, 'Number cannot be less than 20.');
    testValidity(
      invalidMax,
      false,
      'Number cannot be greater than 555.',
      invalidMax[invalidMax.length - 1],
    );
  });

  it('Should be able to switch between multiple and single values', function (done) {
    Harness.testCreate(NumberComponent, comp5).then((component) => {
      assert.equal(_.isEqual(component.defaultValue, [null]), true);
      component.component.multiple = false;
      component.redraw().then(() => {
        assert.equal(component.defaultValue, null);
        done();
      });
    });
  });

  it('Should return value as string properly for multiple values', function (done) {
    Harness.testCreate(NumberComponent, comp7)
      .then((component) => {
        component.refs.input = null;
        assert.equal(component.getValueAsString([1, 2, 3, 4, 5]), '1, 2, 3, 4, 5');
        done();
      })
      .catch(done);
  });

  it('Should not remove decimal symbol and numbers after decimal symbol when submit is pressed', function (done) {
    Formio.createForm(document.createElement('div'), comp8, {}).then((form) => {
      const inputEvent = new Event('input');
      const numberComponent = form.getComponent('number');
      const buttonComponent = form.getComponent('submit');
      numberComponent.refs.input[0].value = '123-456';
      numberComponent.refs.input[0].dispatchEvent(inputEvent);
      setTimeout(() => {
        buttonComponent.refs.button.click();
        setTimeout(() => {
          assert.equal(numberComponent.refs.input[0].value, '123-456');
          done();
        }, 200);
      }, 200);
    });
  });

  it('Should remove thousands separator in parseValue function if set on component JSON', function () {
    const numberComponent = new NumberComponent({
      thousandsSeparator: '.',
      decimalSymbol: ',',
      delimiter: true,
    });
    assert.equal(numberComponent.parseValue('123.456.789,1'), '123456789,1');
  });

  it('Should use a . thousands separator when delimiter is true and thousands separator is set to .', function (done) {
    Formio.createForm(document.createElement('div'), comp9, {}).then((form) => {
      const numberComponent = form.getComponent('number');
      const inputEvent = new Event('input');
      const blurEvent = new Event('blur');
      numberComponent.refs.input[0].value = '111222333';
      numberComponent.refs.input[0].dispatchEvent(inputEvent);
      numberComponent.refs.input[0].dispatchEvent(blurEvent);
      setTimeout(() => {
        assert.equal(numberComponent.refs.input[0].value, '111.222.333');
        done();
      }, 200);
    });
  });

  it('Should not display a number validation error if the default value is set to a numeric string', function () {
    return Formio.createForm(document.createElement('div'), comp10, {}).then((form) => {
      const numberComponent = form.getComponent('number');
      assert.equal(numberComponent._errors.length, 0);
    });
  });

  it('Should maintain the correct caret (cursor) position when rendering value with thousands separators after restoreCaretPosition is called', function (done) {
    Formio.createForm(document.createElement('div'), comp11, {})
      .then((form) => {
        const numberComponent = form.getComponent('number');
        form.root.focusedComponent = numberComponent;
        const numberElement = numberComponent.refs.input[0];
        const inputEvent = new Event('input');

        numberElement.value = 1234567;
        numberElement.dispatchEvent(inputEvent);
        // see https://formio.atlassian.net/browse/FIO-9144
        // before the fix, the caret was moving back by one after being restored
        numberComponent.restoreCaretPosition();
        assert.equal(numberElement.value, '1,234,567');
        // selectionStart (a.k.a cursor position) is 9 with the delimiters
        // it would be 7 without them and 8 with the previous bug
        assert.equal(numberElement.selectionStart, 9);
        done();
      })
      .catch(done);
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

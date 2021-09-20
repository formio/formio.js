import Harness from '../../../test/harness';
import TextAreaComponent from './TextArea';
import sinon from 'sinon';
import Formio from './../../Formio';
import assert from 'power-assert';
import { expect } from 'chai';
import _ from 'lodash';
import {
  comp1,
  comp2,
  comp3
} from './fixtures';

describe('TextArea Component', () => {
  it('Should build a TextArea component', () => {
    return Harness.testCreate(TextAreaComponent, comp1).then((component) => {
      Harness.testElements(component, 'textarea', 1);
    });
  });

  it('setValue should be called only once', () => {
    return Harness.testCreate(TextAreaComponent, comp2).then((component) => {
      const valueToSet = [
        {
          firstName: 'Bobby',
          lastName: 'Lynch'
        },
        {
          firstName: 'Harold',
          lastName: 'Freeman'
        },
      ];
      const emit = sinon.spy(component, 'setValue');
      component.setValue(valueToSet);
      expect(component.getValue()).to.deep.equal([
        {
          firstName: 'Bobby',
          lastName: 'Lynch'
        },
        {
          firstName: 'Harold',
          lastName: 'Freeman'
        }
      ]);
      expect(emit.callCount).to.equal(1);
    });
  });

  it('Should provide min/max length validation', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].validate = { minLength: 5, maxLength: 10 };

    const validValues = [
      '',
      'te_st',
      'test value',
      '      ',
      'What?',
      'test: ',
      't    ',
      '   t '
    ];

    const invalidMin = [
      't',
      'tt',
      'ttt',
      'tttt',
      '  t ',
      '  t',
      '_4_'
    ];

    const invalidMax = [
      'test__value',
      'test value ',
      ' test value',
      'test: value',
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textArea');
          const changed = component.setValue(value);
          const error = message;

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message, error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidMin, false, 'Text Area must have at least 5 characters.');
    testValidity(invalidMax, false, 'Text Area must have no more than 10 characters.', invalidMax[invalidMax.length-1]);
  });

  it('Should provide min/max words validation', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].validate = { minWords: 2, maxWords: 5 };

    const validValues = [
      '',
      'test value',
      'some, test value',
      'some - test - value',
      '   value      value     value    value   value      ',
      ' What ?',
      '" test "',
    ];

    const invalidMin = [
      '  t   ',
      '? ',
      'e',
      '_test    ',
      '   9',
      't  ',
      'What?',
      '"4"'
    ];

    const invalidMax = [
      'te st __ va lue ""',
      '" te st va lue "',
      '11 - 22 - 33 - 44',
      'te st : va lue :',
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textArea');
          const changed = component.setValue(value);
          const error = message;

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message, error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidMin, false, 'Text Area must have at least 2 words.');
    testValidity(invalidMax, false, 'Text Area must have no more than 5 words.', invalidMax[invalidMax.length-1]);
  });

  it('Should provide pattern validation', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].validate = { pattern: '\\D+' };

    const validValues = [
      '',
      '     ',
      'test value',
      '& "" (test) _ ,.*',
      '  some - test - value   ',
    ];

    const invalidValues = [
      'test(2)',
      '123',
      '0 waste',
      '"9"',
      '   9',
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textArea');
          const changed = component.setValue(value);
          const error = message;

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message.trim(), error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues,
      false,
      'Text Area does not match the pattern \\D+',
      invalidValues[invalidValues.length-1]
    );
  });

  it('Should set custom number of rows', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].rows = 5;
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textArea');
      assert.equal(component.refs.input[0].rows, component.component.rows, 'Should set custom number of rows');

      done();
    }).catch(done);
  });

  it('Should render HTML', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].inputFormat = 'html';
    const element = document.createElement('div');

    Formio.createForm(element, form, {
      readOnly: true
    }).then(form => {
      form.setSubmission({
        data: {
          textArea: '<b>HTML!</b>'
        }
      });
      setTimeout(() => {
        const textArea = form.getComponent('textArea');
        assert.equal(textArea.refs.input[0].innerHTML, '<b>HTML!</b>');
        done();
      }, 300);
    }).catch(done);
  });

  it('Should render plain text', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].inputFormat = 'plain';
    const element = document.createElement('div');

    Formio.createForm(element, form, {
      readOnly: true
    }).then(form => {
      form.setSubmission({
        data: {
          textArea: '<b>Plain text!</b>'
        }
      });
      setTimeout(() => {
        const textArea = form.getComponent('textArea');
        assert.equal(textArea.refs.input[0].innerText, '<b>Plain text!</b>');
        done();
      }, 300);
    }).catch(done);
  });

  it('Should correctly count characters if character counter is enabled', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].showCharCount = true;
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textArea');
      const inputValue = (value) => {
        const input = component.refs.input[0];
        const inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      const checkValue = (value) => {
        assert.equal(component.dataValue, value, 'Should set value');
        assert.equal(parseInt(component.refs.charcount[0].textContent), value.length, 'Should show correct chars number');
        assert.equal(component.refs.charcount[0].textContent, `${value.length} characters`, 'Should show correct message');
      };

      let value = 'test Value (@#!-"]) _ 23.,5}/*&&';
      inputValue(value);
      setTimeout(() => {
        checkValue(value);
        value = '';
        inputValue(value);

        setTimeout(() => {
          checkValue(value);
          value = '  ';
          inputValue(value);

          setTimeout(() => {
            checkValue(value);

            done();
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should correctly count words if word counter is enabled', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].showWordCount = true;
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textArea');
      const inputValue = (value) => {
        const input = component.refs.input[0];
        const inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      const checkValue = (value, expected) => {
        assert.equal(component.dataValue, value, 'Should set value');
        assert.equal(parseInt(component.refs.wordcount[0].textContent), expected, 'Should show correct words number');
        assert.equal(component.refs.wordcount[0].textContent, `${expected} words`, 'Should show correct message');
      };

      let value = 'test , test_test 11 - "so me"';
      inputValue(value);

      setTimeout(() => {
        checkValue(value, 7);
        value = ' test ';
        inputValue(value);

        setTimeout(() => {
          checkValue(value, 1);
          value = ' .   .  ';
          inputValue(value);

          setTimeout(() => {
            checkValue(value, 2);

            done();
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });
});

import Harness from '../../../test/harness';
import PasswordComponent from './Password';
import Formio from './../../Formio';
import assert from 'power-assert';
import _ from 'lodash';

import {
  comp1,
  comp2
} from './fixtures';

describe('Password Component', () => {
  it('Should build a password component', () => {
    return Harness.testCreate(PasswordComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="password"]', 1);
    });
  });

  it('Should provide min/max length validation', (done) => {
    const form = _.cloneDeep(comp2);
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

          const component = form.getComponent('password');
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
    testValidity(invalidMin, false, 'Password must have at least 5 characters.');
    testValidity(invalidMax, false, 'Password must have no more than 10 characters.', invalidMax[invalidMax.length-1]);
  });

  it('Should provide pattern validation', (done) => {
    const form = _.cloneDeep(comp2);
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

          const component = form.getComponent('password');
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
    testValidity(invalidValues, false, 'Password does not match the pattern \\D+', invalidValues[invalidValues.length-1]);
  });
});

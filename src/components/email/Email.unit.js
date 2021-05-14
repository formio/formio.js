import Harness from '../../../test/harness';
import EmailComponent from './Email';
import Formio from './../../Formio';
import assert from 'power-assert';
import _ from 'lodash';

import {
  comp1,
  comp2
} from './fixtures';

describe('Email Component', () => {
  it('Should build a email component', () => {
    return Harness.testCreate(EmailComponent, comp1);
  });

  it('Should provide min/max length validation', (done) => {
    const form = _.cloneDeep(comp2);
    form.components[0].validate = { minLength: 7, maxLength: 10 };

    const validValues = [
      '',
      'test@te.st',
      't__t@t.st',
      '_t@test.st'
    ];

    const invalidMin = [
      't@t.st',
    ];

    const invalidMax = [
      't@test.test',
      'test@test.test',
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('email');
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
    testValidity(invalidMin, false, 'Email must have at least 7 characters.');
    testValidity(invalidMax, false, 'Email must have no more than 10 characters.', invalidMax[invalidMax.length-1]);
  });

  it('Should provide pattern validation', (done) => {
    const form = _.cloneDeep(comp2);
    form.components[0].validate = { pattern: '^[0-9]+@[0-9]+\\.[a-z]{2,4}$' };

    const validValues = [
      '000@12.ts',
      '123456@1234.com',
      '123456@1234.come',
      ''
    ];

    const invalidValues = [
      '123_456@1234.com',
      '123456@12.34.com',
      'test@123.com',
      '00000@123t.com'
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('email');
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
      'Email does not match the pattern ^[0-9]+@[0-9]+\\.[a-z]{2,4}$',
      invalidValues[invalidValues.length-1]
    );
  });

  it('Should provide email validation', (done) => {
    const form = _.cloneDeep(comp2);

    const validValues = [
      '',
      'test_test@test.test',
      '123456@1234.test',
      'TEST@TEST.test',
      'te.st_te%st@test.com',
      'te/st___te%st@test.com',
      '"John..Doe"@example.com',
      'test-test@test.com',
      'test-test@te-st.com',
      '0-0-0-0-0@12-3-t.com'
    ];

    const invalidValues = [
      'te.st_te%st@test.123',
      '      ',
      'test.test',
      'test-te st@test.com',
      '   test_test@test.test',
      '.test_te%st@test.com',
      'te/st___t,e%st@test.com',
      'te[st]t@test.com',
      'test@test.com     ',
      'test@',
      'test@test',
      'test@test.',
      '@test.com',
      'test@.com',
      '00000@123t.m',
      '00000@123t.m-com',
      'test(test)@mail.com',
      'John..Doe@example.com',
      'john.smith(comment)@example.com',
      'test-test.@test.com'
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('email');
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
      'Email must be a valid email.',
      invalidValues[invalidValues.length-1]
    );
  });
});

import Harness from '../../../test/harness';
import UrlComponent from './Url';
import Formio from './../../Formio';
import assert from 'power-assert';
import _ from 'lodash';

import {
  comp1,
  comp2
} from './fixtures';

describe('Url Component', () => {
  it('Should build a url component', (done) => {
    Harness.testCreate(UrlComponent, comp1).then(() => {
      done();
    });
  });

  it('Should provide min/max length validation', (done) => {
    const form = _.cloneDeep(comp2);
    form.components[0].validate = { minLength: 6, maxLength: 10 };

    const validValues = [
      '',
      'www.hhh.by',
      'uuu.by',
      'TE2-t.est',
      'te2-t.est'
    ];

    const invalidMin = [
      'hh.jj',
      'w.by'
    ];

    const invalidMax = [
      'Test-t.Test',
      'test.test.test',
      't-t-t-t-t.tt'
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('url');
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
    testValidity(invalidMin, false, 'Url must have at least 6 characters.');
    testValidity(invalidMax, false, 'Url must have no more than 10 characters.', invalidMax[invalidMax.length-1]);
  });

  it('Should provide pattern validation', (done) => {
    const form = _.cloneDeep(comp2);
    form.components[0].validate = { pattern: '^(https?):\\/\\/(-\\.)?([^\\s\\/?\\.#-]+\\.?)+(\\/[^\\s]*)?$' };

    const validValues = [
      'https://someTest.com',
      'http://test.com',
      'http://userid@example.com:8080',
      ''
    ];

    const invalidValues = [
      'www.test.com',
      'test.hh',
      'http://at--er.b.co'
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('url');
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
      'Url does not match the pattern ^(https?):\\/\\/(-\\.)?([^\\s\\/?\\.#-]+\\.?)+(\\/[^\\s]*)?$',
      invalidValues[invalidValues.length-1]
    );
  });

  it('Should provide url validation', (done) => {
    const form = _.cloneDeep(comp2);

    const validValues = [
      '',
      'www.test.test',
      'https://www.test.test',
      'http://www.test.test',
      'email://test1111@test.to',
      'email://t-e-s-t@te-st.to',
      'te.S-T.test',
      'www.1111111.test'
    ];

    const invalidValues = [
      '      ',
      'e.S-T.test.',
      'someText',
      '.www.test.to',
      'htthhhhhps://www.test.test',
      '://www.test.test',
      '    www.test.test',
      'www.test.test  ',
      'www.te st.test',
      'www.1111111.33',
      'www.rrrrrr.66h',
      'email://test111test.to',
      'http://',
      'http://.',
      'http://..',
      'http://../',
      'http://?',
      'http://??',
      'http://??/',
      'http://#',
      'http://##',
      'http://##/',
      'http://foo.bar?q=Spaces should be encoded',
      '//',
      '//a',
      '///a',
      '///',
      'http:///a'
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('url');
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
      'Url must be a valid url.',
      invalidValues[invalidValues.length-1]
    );
  });
});

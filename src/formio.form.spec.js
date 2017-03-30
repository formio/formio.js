'use strict';
import FormioForm from './formio.form';
import { Harness } from '../test/harness';
import { FormTests } from '../test/forms/index';
import assert from 'power-assert';
import each from 'lodash/each';

describe('Formio Form Renderer tests', () => {
  let simpleForm = null;
  it('Should create a simple form', (done) => {
    let formElement = document.createElement('div');
    simpleForm = new FormioForm(formElement);
    simpleForm.setForm({
      title: 'Simple Form',
      components: [
        {
          type: 'textfield',
          key: 'firstName',
          input: true
        },
        {
          type: 'textfield',
          key: 'lastName',
          input: true
        }
      ]
    }).then(() => {
      Harness.testElements(simpleForm, 'input[type="text"]', 2);
      Harness.testElements(simpleForm, 'input[name="data[firstName]"]', 1);
      Harness.testElements(simpleForm, 'input[name="data[lastName]"]', 1);
      done();
    });
  });

  it('Should set a submission to the form.', () => {
    Harness.testSubmission(simpleForm, {data: {
      firstName: 'Joe',
      lastName: 'Smith'
    }});
  });

  each(FormTests, (formTest) => {
    each(formTest.tests, (formTestTest, title) => {
      it(title, (done) => {
        let formElement = document.createElement('div');
        let form = new FormioForm(formElement);
        form.setForm(formTest.form).then(() => {
          formTestTest(form, done);
        }).catch((error) => {
          done(error);
        });
      });
    });
  });
});

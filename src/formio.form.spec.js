'use strict';
import FormioForm from './formio.form';
import { Harness } from '../test/harness';
import { FormTests } from '../test/forms/index';
import assert from 'power-assert';
import each from 'lodash/each';
import i18next from 'i18next';

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

  it('Should translate a form from options', done => {
    let formElement = document.createElement('div');
    let translateForm = new FormioForm(formElement, {
      language: 'es',
      i18n: {
        es: {
          'Default Label': 'Spanish Label'
        }
      }
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [
        {
          type: 'textfield',
          label: 'Default Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {}
        }
      ]
    }).then(() => {
      let label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML, 'Spanish Label');
      done();
    });
  });

  it('Should translate a form after instantiate', done => {
    let formElement = document.createElement('div');
    let translateForm = new FormioForm(formElement, {
      i18n: {
        es: {
          'Default Label': 'Spanish Label'
        }
      }
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [
        {
          type: 'textfield',
          label: 'Default Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {}
        }
      ]
    }).then(() => {
      translateForm.language = 'es';
      let label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML, 'Spanish Label');
      done();
    });
  });

  it('Should add a translation after instantiate', done => {
    let formElement = document.createElement('div');
    let translateForm = new FormioForm(formElement, {
      i18n: {
        language: 'es',
        es: {
          'Default Label': 'Spanish Label'
        },
        fr: {
          'Default Label': 'French Label'
        }
      }
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [
        {
          type: 'textfield',
          label: 'Default Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {}
        }
      ]
    }).then(() => {
      translateForm.language = 'fr';
      let label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML, 'French Label');
      done();
    });
  });

  it('Should switch a translation after instantiate', done => {
    let formElement = document.createElement('div');
    let translateForm = new FormioForm(formElement);
    translateForm.setForm({
      title: 'Translate Form',
      components: [
        {
          type: 'textfield',
          label: 'Default Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {}
        }
      ]
    }).then(() => {
      translateForm.addLanguage('es', {'Default Label': 'Spanish Label'}, true);
      let label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML, 'Spanish Label');
      done();
    });
  });

  each(FormTests, (formTest) => {
    each(formTest.tests, (formTestTest, title) => {
      it(title, (done) => {
        let formElement = document.createElement('div');
        let form = new FormioForm(formElement, {language: 'en'});
        form.setForm(formTest.form).then(() => {
          formTestTest(form, done);
        }).catch((error) => {
          done(error);
        });
      });
    });
  });
});

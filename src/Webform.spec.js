'use strict';
import Webform from './Webform';
import Harness from '../test/harness';
import FormTests from '../test/forms/index';
import assert from 'power-assert';
import each from 'lodash/each';

describe('Formio Form Renderer tests', () => {
  let simpleForm = null;
  it('Should create a simple form', (done) => {
    const formElement = document.createElement('div');
    simpleForm = new Webform(formElement);
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
    const formElement = document.createElement('div');
    const translateForm = new Webform(formElement, {
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
      const label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML, 'Spanish Label');
      done();
    });
  });

  it('Should translate a form after instantiate', done => {
    const formElement = document.createElement('div');
    const translateForm = new Webform(formElement, {
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
      const label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML, 'Spanish Label');
      done();
    });
  });

  it('Should add a translation after instantiate', done => {
    const formElement = document.createElement('div');
    const translateForm = new Webform(formElement, {
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
      const label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML, 'French Label');
      done();
    });
  });

  it('Should switch a translation after instantiate', done => {
    const formElement = document.createElement('div');
    const translateForm = new Webform(formElement);
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
      const label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML, 'Spanish Label');
      done();
    });
  });

  each(FormTests, (formTest) => {
    each(formTest.tests, (formTestTest, title) => {
      it(title, (done) => {
        const formElement = document.createElement('div');
        const form = new Webform(formElement, {language: 'en'});
        form.setForm(formTest.form).then(() => {
          formTestTest(form, done);
        }).catch((error) => {
          done(error);
        });
      });
    });
  });
});

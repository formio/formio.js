import assert from 'power-assert';
import { expect } from 'chai';
import each from 'lodash/each';
import Harness from '../test/harness';
import FormTests from '../test/forms';
import Formio from './Formio';
import Webform from './Webform';
import { APIMock } from '../test/APIMock';

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
    }).catch(done);
  });

  it('Should set a submission to the form.', () => {
    Harness.testSubmission(simpleForm, { data: {
      firstName: 'Joe',
      lastName: 'Smith'
    } });
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
      assert.equal(label.innerHTML.trim(), 'Spanish Label');
      done();
    }).catch(done);
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
      assert.equal(label.innerHTML.trim(), 'Spanish Label');
      done();
    }).catch(done);
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
      assert.equal(label.innerHTML.trim(), 'French Label');
      done();
    }).catch(done);
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
      translateForm.addLanguage('es', { 'Default Label': 'Spanish Label' }, true);
      const label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML.trim(), 'Spanish Label');
      done();
    }).catch(done);
  });

  it('Should keep translation after redraw', done => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    const schema = {
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
    };

    try {
      form.setForm(schema)
        .then(() => {
          form.addLanguage('ru', { 'Default Label': 'Russian Label' }, true);
          return form.language = 'ru';
        }, done)
        .then(() => {
          expect(form.options.language).to.equal('ru');
          expect(formElement.querySelector('.control-label').innerHTML).to.equal('Russian Label');
          form.redraw();
          expect(form.options.language).to.equal('ru');
          expect(formElement.querySelector('.control-label').innerHTML).to.equal('Russian Label');
          done();
        }, done)
        .catch(done);
    }
    catch (error) {
      done(error);
    }
  });

  it('Should fire languageChanged event when language is set', done => {
    let isLanguageChangedEventFired = false;
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    const schema = {
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
    };

    try {
      form.setForm(schema)
        .then(() => {
          form.addLanguage('ru', { 'Default Label': 'Russian Label' }, true);
          form.on('languageChanged', () => {
            isLanguageChangedEventFired = true;
          });
          return form.language = 'ru';
        }, done)
        .then(() => {
          assert(isLanguageChangedEventFired);
          done();
        }, done)
        .catch(done);
    }
    catch (error) {
      done(error);
    }
  });

  it('Should fire initialized event after change event when language is set', done => {
    let isChangeEventFired = false;
    const formElement = document.createElement('div');
    const schema = {
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
    };
    Formio.createForm(formElement, schema)
      .then(form => {
        form.ready.then(() => {
          form.language = 'en-GB';
        });
        form.on('change', () => {
          isChangeEventFired = true;
        });
        form.on('initialized', () => {
          assert(isChangeEventFired);
          done();
        });
      });
  });

  it('When submitted should strip fields with persistent: client-only from submission', done => {
    const formElement = document.createElement('div');
    simpleForm = new Webform(formElement);
    /* eslint-disable quotes */
    simpleForm.setForm({
      title: 'Simple Form',
      components: [
        {
          "label": "Name",
          "allowMultipleMasks": false,
          "showWordCount": false,
          "showCharCount": false,
          "tableView": true,
          "type": "textfield",
          "input": true,
          "key": "name",
          "widget": {
            "type": ""
          }
        },
        {
          "label": "Age",
          "persistent": "client-only",
          "mask": false,
          "tableView": true,
          "type": "number",
          "input": true,
          "key": "age"
        }
      ]
    });
    /* eslint-enable quotes */

    Harness.testSubmission(simpleForm, {
      data: { name: 'noname', age: '1' }
    });

    simpleForm.submit().then((submission) => {
      assert.deepEqual(submission.data, { name: 'noname' });
      done();
    });
  });

  each(FormTests, (formTest) => {
    each(formTest.tests, (formTestTest, title) => {
      it(title, (done) => {
        const formElement = document.createElement('div');
        const form = new Webform(formElement, { language: 'en' });
        form.setForm(formTest.form).then(() => {
          formTestTest(form, done);
        }).catch(done);
      });
    });
  });
});

describe('Test the saveDraft and restoreDraft feature', () => {
  APIMock.submission('https://savedraft.form.io/myform', {
    components: [
      {
        type: 'textfield',
        key: 'a',
        label: 'A'
      },
      {
        type: 'textfield',
        key: 'b',
        label: 'B'
      }
    ]
  });

  const saveDraft = function(user, draft, newData, done) {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, {
      saveDraft: true,
      saveDraftThrottle: false
    });
    form.src = 'https://savedraft.form.io/myform';
    Formio.setUser(user);
    form.on('restoreDraft', (existing) => {
      assert.deepEqual(existing ? existing.data : null, draft);
      form.setSubmission({ data: newData }, { modified: true });
    });
    form.on('saveDraft', (saved) => {
      // Make sure the modified class was added to the components.
      const a = form.getComponent('a');
      const b = form.getComponent('b');
      assert.equal(a.hasClass(a.getElement(), 'formio-modified'), true);
      assert.equal(b.hasClass(b.getElement(), 'formio-modified'), true);
      assert.deepEqual(saved.data, newData);
      form.draftEnabled = false;
      done();
    });
    form.formReady.then(() => {
      assert.equal(form.savingDraft, true);
    });
  };

  it('Should allow a user to start a save draft session.', (done) => saveDraft({
    _id: '1234',
    data: {
      firstName: 'Joe',
      lastName: 'Smith'
    }
  }, null, {
    a: 'one',
    b: 'two'
  }, done));

  it('Should allow a different user to start a new draft session', (done) => saveDraft({
    _id: '2468',
    data: {
      firstName: 'Sally',
      lastName: 'Thompson'
    }
  }, null, {
    a: 'three',
    b: 'four'
  }, done));

  it('Should restore a users existing draft', (done) => saveDraft({
    _id: '1234',
    data: {
      firstName: 'Joe',
      lastName: 'Smith'
    }
  }, {
    a: 'one',
    b: 'two'
  }, {
    a: 'five',
    b: 'six'
  }, done));
});

import assert from 'power-assert';
import { expect } from 'chai';
import sinon from 'sinon';
import each from 'lodash/each';
import Harness from '../test/harness';
import FormTests from '../test/forms';
import Webform from './Webform';
import { settingErrors, clearOnHide, manualOverride } from '../test/formtest';
// import Formio from './Formio';
// import { APIMock } from '../test/APIMock';

describe('Webform tests', () => {
  let formWithCalculatedValue;

  it('Should calculate the field value after validation errors appeared on submit', function(done) {
    const formElement = document.createElement('div');
    formWithCalculatedValue = new Webform(formElement);
    formWithCalculatedValue.setForm(manualOverride).then(() => {
      Harness.clickElement(formWithCalculatedValue, formWithCalculatedValue.components[2].refs.button);
      setTimeout(() => {
        console.log(formWithCalculatedValue.errors.length);

        const inputEvent = new Event('input');
        const input1 = formWithCalculatedValue.components[0].refs.input[0];

          input1.value =  55;
          input1.dispatchEvent(inputEvent);

        setTimeout(() => {
          const input2 = formElement.querySelector('input[name="data[number2]"]');
          assert.equal(input2.value, '55');
          assert.equal(input1.value, 55);
          done();
        }, 250);
      }, 250);
    })
    .catch((err) => done(err));
  });

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
      template: 'bootstrap3',
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
      template: 'bootstrap3',
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
      template: 'bootstrap3',
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
    const translateForm = new Webform(formElement, {
      template: 'bootstrap3',
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
      translateForm.addLanguage('es', { 'Default Label': 'Spanish Label' }, true);
      const label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML.trim(), 'Spanish Label');
      done();
    }).catch(done);
  });

  it('Should keep translation after redraw', done => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, {
      template: 'bootstrap3',
    });
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
          expect(formElement.querySelector('.control-label').innerHTML.trim()).to.equal('Russian Label');
          form.redraw();
          expect(form.options.language).to.equal('ru');
          expect(formElement.querySelector('.control-label').innerHTML.trim()).to.equal('Russian Label');
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
    const form = new Webform(formElement, {
      template: 'bootstrap3',
    });
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
          form.addLanguage('ru', { 'Default Label': 'Russian Label' }, false);
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

  it('Should keep components valid if they are pristine', function(done) {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
    form.setForm(settingErrors).then(() => {
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      const input = form.element.querySelector('input[name="data[textField]"]');
      for (let i = 0; i < 50; i++) {
        input.value += i;
        input.dispatchEvent(inputEvent);
      }
      this.timeout(1000);
      setTimeout(() => {
        assert.equal(form.errors.length, 0);
        Harness.setInputValue(form, 'data[textField]', '');
        setTimeout(() => {
          assert.equal(form.errors.length, 1);
          done();
        }, 250);
      }, 250);
    });
  });

  it('Should delete value of hidden component if clearOnHide is turned on', function(done) {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
    form.setForm(clearOnHide).then(() => {
      const visibleData = {
        data: {
          visible: 'yes',
          clearOnHideField: 'some text',
          submit: false
        },
        metadata: {}
      };

      const hiddenData = {
        data: {
          visible: 'no',
          submit: false
        }
      };
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      const textField = form.element.querySelector('input[name="data[clearOnHideField]"]');
      textField.value = 'some text';
      textField.dispatchEvent(inputEvent);
      this.timeout(1000);
      setTimeout(() => {
        assert.deepEqual(form.data, visibleData.data);
        Harness.setInputValue(form, 'data[visible]', 'no');

        setTimeout(() => {
          assert.deepEqual(form.data, hiddenData.data);
          done();
        }, 250);
      }, 250);
    });
  });

  const formElement = document.createElement('div');
  const checkForErrors = function(form, flags = {}, submission, numErrors, done) {
    form.setSubmission(submission, flags).then(() => {
      setTimeout(() => {
        const errors = formElement.querySelectorAll('.formio-error-wrapper');
        expect(errors.length).to.equal(numErrors);
        expect(form.errors.length).to.equal(numErrors);
        done();
      }, 100);
    }).catch(done);
  };

  it('Should not fire validations when fields are either protected or not persistent.', (done) => {
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      {
        title: 'protected and persistent',
        components: [
          {
            type: 'textfield',
            label: 'A',
            key: 'a',
            validate: {
              required: true
            }
          },
          {
            type: 'textfield',
            label: 'B',
            key: 'b',
            protected: true,
            validate: {
              required: true
            }
          }
        ],
      }).then(() => {
        checkForErrors(form, {}, {}, 0, () => {
          checkForErrors(form, {}, {
            data: {
              a: 'Testing',
              b: ''
            }
          }, 1, () => {
            checkForErrors(form, {}, {
              _id: '123123123',
              data: {
                a: 'Testing',
                b: ''
              }
            }, 0, done);
          });
        });
    });
  });

  it('Should not fire validation on init.', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }).then(() => {
        checkForErrors(form, {}, {}, 0, done);
    });
  });

  it('Should validation on init when alwaysDirty flag is set.', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement, {
      language: 'en',
      template: 'bootstrap3',
      alwaysDirty: true
    });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }).then(() => {
      checkForErrors(form, {}, {}, 2, done);
    });
  });

  it('Should validation on init when dirty flag is set.', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }).then(() => {
      checkForErrors(form, {
        dirty: true
      }, {}, 2, done);
    });
  });

  it('Should not show any errors on setSubmission when providing an empty data object', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }
    ).then(() => {
      checkForErrors(form, {}, {}, 0, done);
    });
  });

  it('Should not show errors when providing empty data object with data set.', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }
    ).then(() => {
      checkForErrors(form, {}, { data: {} }, 0, done);
    });
  });

  it('Should show errors on setSubmission when providing explicit data values.', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }
    ).then(() => {
      checkForErrors(form, {}, {
        data:{
          number: 2,
          textArea: ''
        }
      }, 2, done);
    });
  });

  it('Should not show errors on setSubmission with noValidate:TRUE', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }
    ).then(() => {
      checkForErrors(form, {
        noValidate:true
      }, {
        data:{
          number: 2,
          textArea: ''
        }
      }, 0, done);
    });
  });

  describe('set/get nosubmit', () => {
    it('should set/get nosubmit flag and emit nosubmit event', () => {
      const form = new Webform(null, {});
      const emit = sinon.spy(form, 'emit');
      expect(form.nosubmit).to.be.false;
      form.nosubmit = true;
      expect(form.nosubmit).to.be.true;
      expect(emit.callCount).to.equal(1);
      expect(emit.args[0]).to.deep.equal(['nosubmit', true]);
      form.nosubmit = false;
      expect(form.nosubmit).to.be.false;
      expect(emit.callCount).to.equal(2);
      expect(emit.args[1]).to.deep.equal(['nosubmit', false]);
    });
  });

  describe('getValue and setValue', () => {
    it('should setValue and getValue', (done) => {
      formElement.innerHTML = '';
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
      form.setForm({
        components: [
          {
            type: 'textfield',
            key: 'a'
          },
          {
            type: 'container',
            key: 'b',
            components: [
              {
                type: 'datagrid',
                key: 'c',
                components: [
                  {
                    type: 'textfield',
                    key: 'd'
                  },
                  {
                    type: 'textfield',
                    key: 'e'
                  },
                  {
                    type: 'editgrid',
                    key: 'f',
                    components: [
                      {
                        type: 'textfield',
                        key: 'g'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }).then(() => {
        let count = 0;
        const onChange = form.onChange;
        form.onChange = function(...args) {
          count++;
          return onChange.apply(form, args);
        };

        // Ensure that it says it changes.
        assert.equal(form.setValue({
          a: 'a',
          b: {
            c: [
              { d: 'd1', e: 'e1', f: [{ g: 'g1' }] },
              { d: 'd2', e: 'e2', f: [{ g: 'g2' }] },
            ]
          }
        }), true);

        setTimeout(() => {
          // It should have only updated once.
          assert.equal(count, 1);
          done();
        }, 500);
      });
    });
  });

  describe('Reset values', () => {
    it('Should reset all values correctly.', () => {
      formElement.innerHTML = '';
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
      return form.setForm(
        {
          components: [
            {
              type: 'textfield',
              key: 'firstName',
              label: 'First Name',
              placeholder: 'Enter your first name.',
              input: true,
              tooltip: 'Enter your <strong>First Name</strong>',
              description: 'Enter your <strong>First Name</strong>'
            },
            {
              type: 'textfield',
              key: 'lastName',
              label: 'Last Name',
              placeholder: 'Enter your last name',
              input: true,
              tooltip: 'Enter your <strong>Last Name</strong>',
              description: 'Enter your <strong>Last Name</strong>'
            },
            {
              type: 'select',
              label: 'Favorite Things',
              key: 'favoriteThings',
              placeholder: 'These are a few of your favorite things...',
              data: {
                values: [
                  {
                    value: 'raindropsOnRoses',
                    label: 'Raindrops on roses'
                  },
                  {
                    value: 'whiskersOnKittens',
                    label: 'Whiskers on Kittens'
                  },
                  {
                    value: 'brightCopperKettles',
                    label: 'Bright Copper Kettles'
                  },
                  {
                    value: 'warmWoolenMittens',
                    label: 'Warm Woolen Mittens'
                  }
                ]
              },
              dataSrc: 'values',
              template: '<span>{{ item.label }}</span>',
              multiple: true,
              input: true
            },
            {
              type: 'number',
              key: 'number',
              label: 'Number',
              input: true
            },
            {
              type: 'button',
              action: 'submit',
              label: 'Submit',
              theme: 'primary'
            }
          ]
        }
      ).then(() => {
        form.setSubmission({
          data: {
            firstName: 'Joe',
            lastName: 'Bob',
            favoriteThings: ['whiskersOnKittens', 'warmWoolenMittens'],
            number: 233
          }
        }).then(() => {
          expect(form.submission).to.deep.equal({
            data: {
              firstName: 'Joe',
              lastName: 'Bob',
              favoriteThings: ['whiskersOnKittens', 'warmWoolenMittens'],
              number: 233,
              submit: false
            }
          });
          form.setSubmission({ data: {} }).then(() => {
            expect(form.submission).to.deep.equal({
              data: {
                firstName: '',
                lastName: '',
                favoriteThings: [],
                submit: false
              }
            });
          });
        });
      });
    });
  });

  each(FormTests, (formTest) => {
    describe(formTest.title || '', () => {
      each(formTest.tests, (formTestTest, title) => {
        it(title, () => {
          const formElement = document.createElement('div');
          const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
          return form.setForm(formTest.form).then(() => {
            formTestTest(form, (error) => {
              form.destroy();
              if (error) {
                throw new Error(error);
              }
            });
          });
        });
      });
    });
  });
});

// describe('Test the saveDraft and restoreDraft feature', () => {
//   APIMock.submission('https://savedraft.form.io/myform', {
//     components: [
//       {
//         type: 'textfield',
//         key: 'a',
//         label: 'A'
//       },
//       {
//         type: 'textfield',
//         key: 'b',
//         label: 'B'
//       }
//     ]
//   });
//
//   const saveDraft = function(user, draft, newData, done) {
//     const formElement = document.createElement('div');
//     const form = new Webform(formElement, {
//       saveDraft: true,
//       saveDraftThrottle: false
//     });
//     form.src = 'https://savedraft.form.io/myform';
//     Formio.setUser(user);
//     form.on('restoreDraft', (existing) => {
//       assert.deepEqual(existing ? existing.data : null, draft);
//       form.setSubmission({ data: newData }, { modified: true });
//     });
//     form.on('saveDraft', (saved) => {
//       // Make sure the modified class was added to the components.
//       const a = form.getComponent('a');
//       const b = form.getComponent('b');
//       assert.equal(a.hasClass(a.getElement(), 'formio-modified'), true);
//       assert.equal(b.hasClass(b.getElement(), 'formio-modified'), true);
//       assert.deepEqual(saved.data, newData);
//       form.draftEnabled = false;
//       done();
//     });
//     form.formReady.then(() => {
//       assert.equal(form.savingDraft, true);
//     });
//   };
//
//   it('Should allow a user to start a save draft session.', (done) => saveDraft({
//     _id: '1234',
//     data: {
//       firstName: 'Joe',
//       lastName: 'Smith'
//     }
//   }, null, {
//     a: 'one',
//     b: 'two'
//   }, done));
//
//   it('Should allow a different user to start a new draft session', (done) => saveDraft({
//     _id: '2468',
//     data: {
//       firstName: 'Sally',
//       lastName: 'Thompson'
//     }
//   }, null, {
//     a: 'three',
//     b: 'four'
//   }, done));
//
//   it('Should restore a users existing draft', (done) => saveDraft({
//     _id: '1234',
//     data: {
//       firstName: 'Joe',
//       lastName: 'Smith'
//     }
//   }, {
//     a: 'one',
//     b: 'two'
//   }, {
//     a: 'five',
//     b: 'six'
//   }, done));
// });

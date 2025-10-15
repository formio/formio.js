import _ from 'lodash';
import { fastCloneDeep } from '../../src/utils';
import Harness from '../harness.js';
import FormComponent from '../../src/components/form/Form';
import { expect } from 'chai';
import assert from 'power-assert';

import {
  comp1,
  comp3,
  comp4,
  comp5,
  comp6,
  comp7,
  comp8,
  nestedWizardForm,
  formModalEdit
} from './fixtures/form';
import Webform from '../../src/Webform.js';
import { Formio } from '../../src/formio.form.js';
import { formComponentWithConditionalRenderingForm } from '../formtest/index.js';
import * as nestedFormWithDisabledClearOnHide from '../forms/nestedFormWithDisabledClearOnHide.js';
import * as nestedFormWIthContentComponent from '../forms/nestedFormWithContentComp.js';
import multiLevelNestedForms from '../forms/multiLevelNestedForms.js';
import download from 'downloadjs';

describe('Form Component', () => {
  it('Should build a form component', () => {
    return Harness.testCreate(FormComponent, comp1);
  });

  describe('Value inside Nested Form', () => {
    it('Should be able to set value to Nested Form Component and check result in the email template', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(comp5)
        .then(() => {
            const textField = form.getComponent(['form', 'textField']);
            textField.setValue('123', { modified: true });
            assert.equal(textField.dataValue, '123', 'Should set value');
            const toString = form.getValueAsString(textField.data, { email: true });
            assert.ok(toString.includes('table'), 'Email template should render html table');
            assert.ok(toString.includes(textField.label), 'Email template should have Text Field label');
            assert.ok(toString.includes(textField.dataValue), 'Email template should have Text Field value');
            done();
        })
        .catch(done);
    });
  });

  it('Test refreshOn inside NestedForm', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm(comp4)
      .then(() => {
        const make = form.getComponent(['form', 'make']);
        const model = form.getComponent(['form', 'model']);
        make.setValue('ford');
        setTimeout(() => {
          assert.equal(make.dataValue, 'ford', 'Should set value');
          model.setValue('Focus', { modified: true });
          setTimeout(() => {
            assert.equal(model.dataValue, 'Focus', 'Should set value');
            make.setValue('honda', { modified: true });
            setTimeout(() => {
              assert.equal(make.dataValue, 'honda', 'Should set value');
              assert.equal(model.dataValue, '', 'Should refresh and clear value');
              done();
            }, 400);
          }, 400);
        }, 400);
      })
      .catch(done);
  });

  describe('renderSubForm', () => {
    let formcmp = null;
    it('should set sub form parentVisible', done => {
      Harness.testCreate(FormComponent, comp1)
        .then(cmp => {
          formcmp = cmp;
          formcmp.visible = false;
          return formcmp.subFormReady;
        }, done)
        .then(subForm => {
          expect(formcmp).to.not.be.null;
          expect(formcmp.visible).to.be.false;
          expect(subForm.parentVisible).to.be.false;
          done();
        }, done)
        .catch(done);
    });
  });

  describe('set visible', () => {
    it('should set visible flag on instance', done => {
      Harness.testCreate(FormComponent, comp1)
        .then(formcmp => {
          expect(formcmp._visible).to.be.true;
          formcmp.visible = false;
          expect(formcmp._visible).to.be.false;
          done();
        }, done)
        .catch(done);
    });

    it('should update sub form visibility', done => {
      let formcmp;
      Harness.testCreate(FormComponent, comp1)
        .then(cmp => {
          formcmp = cmp;
          return formcmp.subFormReady;
        }, done)
        .then(subform => {
          expect(formcmp.visible).to.be.true;
          expect(subform.parentVisible).to.be.true;
          formcmp.visible = false;
          expect(formcmp.visible).to.be.false;
          expect(subform.parentVisible).to.be.false;
          formcmp.visible = true;
          expect(formcmp.visible).to.be.true;
          expect(subform.parentVisible).to.be.true;
          done();
        }, done)
        .catch(done);
    });
  });

  describe('get visible', () => {
    it('should get visible flag from instance', done => {
      Harness.testCreate(FormComponent, comp1)
        .then(formcmp => {
          expect(formcmp._visible).to.be.true;
          expect(formcmp.visible).to.be.true;
          formcmp.visible = false;
          expect(formcmp.visible).to.be.false;
          done();
        }, done)
        .catch(done);
    });
  });

  describe('set parentVisible', () => {
    it('should set parentVisible flag on instance', done => {
      Harness.testCreate(FormComponent, comp1)
        .then(formcmp => {
          expect(formcmp._parentVisible).to.be.true;
          formcmp.parentVisible = false;
          expect(formcmp._parentVisible).to.be.false;
          done();
        }, done)
        .catch(done);
    });

    it('should update sub form visibility', done => {
      let formcmp;
      Harness.testCreate(FormComponent, comp1)
        .then(cmp => {
          formcmp = cmp;
          return formcmp.subFormReady;
        }, done)
        .then(subform => {
          expect(formcmp.parentVisible).to.be.true;
          expect(subform.parentVisible).to.be.true;
          formcmp.parentVisible = false;
          expect(formcmp.parentVisible).to.be.false;
          expect(subform.parentVisible).to.be.false;
          formcmp.parentVisible = true;
          expect(formcmp.parentVisible).to.be.true;
          expect(subform.parentVisible).to.be.true;
          done();
        }, done)
        .catch(done);
    });
  });

  describe('get parentVisible', () => {
    it('should get parentVisible flag from instance', done => {
      Harness.testCreate(FormComponent, comp1)
        .then(formcmp => {
          expect(formcmp._parentVisible).to.be.true;
          expect(formcmp.parentVisible).to.be.true;
          formcmp.parentVisible = false;
          expect(formcmp.parentVisible).to.be.false;
          done();
        }, done)
        .catch(done);
    });
  });

  describe('Modal Edit', () => {
    it('Should render preview when modalEdit', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(formModalEdit).then(() => {
        const preview = form.element.querySelector('[ref="openModal"]');
        assert(preview, 'Should contain element to open a modal window');
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('Conditional rendering', () => {
    it('Should render and set submission to conditional form component', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(formComponentWithConditionalRenderingForm).then(() => {
        form.setSubmission({
          data: {
            checkbox: true,
            form: {
              data: {
                textField: 'test'
              }
            }
          }
        }).then(() => {
          setTimeout(() => {
            const checkbox = formElement.querySelector('input[name="data[checkbox]"]');
            const textField = formElement.querySelector('input[name="data[textField]"]');
            expect(checkbox).to.not.be.null;
            assert.equal(checkbox.checked, true);
            expect(textField).to.not.be.null;
            assert.equal(textField.value, 'test');
            done();
          }, 300);
        });
      }).catch(done);
    });
  });

  describe('Advanced Logic', () => {
    it('Should disable all components of the form', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(comp6)
        .then(() => {
            const textField = form.getComponent(['textField']);
            const nestedForm = form.getComponent(['form']);
            textField.setValue('test', { modified: true });
            setTimeout(() => {
              assert.equal(textField.dataValue, 'test', 'Should set value');
              assert.equal(nestedForm.disabled, true, 'Nested Form should be disabled');
              done();
            }, 300);
        })
        .catch(done);
    });
  });

  describe('Inside Collapsed Panel', () => {
    it('Should be able to set value to Nested Form Component inside collapsed Panel', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(comp5)
        .then(() => {
            const textField = form.getComponent(['form', 'textField']);
            const panel = form.getComponent('panel333');
            textField.setValue('123', { modified: true });
            setTimeout(() => {
              assert.equal(textField.dataValue, '123', 'Should set value');
              panel.collapsed = false;
              setTimeout(() => {
                assert.equal(textField.dataValue, '123', 'Should keep the set value after the panel was expanded');
                done();
              }, 300);
            }, 300);
        })
        .catch(done);
    });
  });
});

describe('Wizard Component', () => {
  it('Should build a wizard component and disable cancel, next and breadcrumbs', (done) => {
    Harness.testCreate(FormComponent, comp3, {
      breadcrumbSettings:
        { clickable: false },
      buttonSettings:
        { showCancel: false, showPrevious: false }
    }).then(() => {
      done();
    });
  });
});

describe('SaveDraft functionality for Nested Form', () => {
  const originalMakeRequest = Formio.makeRequest;
  let saveDraftCalls = 0;
  let restoreDraftCalls = 0;
  let state = null;
  let subFormState = null;

  const restoredDraftNestedData = { nested: 'test Nested' };

  const restoredDraftData = {
    parent: 'test Parent',
    form: { data: restoredDraftNestedData },
    submit: false,
  };

  before((done) => {
    Formio.setUser({
      _id: '123'
    });

    Formio.makeRequest = (formio, type, url, method, data) => {
      if (type === 'submission' && ['put', 'post'].includes(method)) {
        state = data.state;
        subFormState = _.get(data, 'data.form.state', null);
        if (state === 'draft') {
          saveDraftCalls = ++saveDraftCalls;
        }
        return Promise.resolve(fastCloneDeep(data));
      }

      if (type === 'submission' && method === 'get' && _.endsWith(url, '660e75e4e8c776f1225142aa')) {
        return Promise.resolve(
          fastCloneDeep({
            _id: '660e75e4e8c776f1225142aa',
            form: '63e4deda12b88c4f05c125cf',
            owner: '63ceaccebe0090345b109da7',
            data: restoredDraftNestedData,
            project: '65b0ccbaf019a907ac01a869',
            state: 'draft',
          }),
        );
      }

      if (type === 'form' && method === 'get') {
        return Promise.resolve(fastCloneDeep(_.endsWith(url, 'parent') ? comp7 : comp8));
      }

      if (type === 'submissions' && method === 'get' && _.includes(url, 'parent')) {
        restoreDraftCalls = ++restoreDraftCalls;
        return Promise.resolve([
          fastCloneDeep({
            _id: '662259f500773e9994360c72',
            form: '66051dae494c977c47028fac',
            owner: '63ceaccebe0090345b109da7',
            data: restoredDraftData,
            project: '65b0ccbaf019a907ac01a869',
            state: 'draft',
          }),
        ]);
      }

      if (type === 'submissions' && method === 'get') {
        restoreDraftCalls = ++restoreDraftCalls;
        return Promise.resolve([
          fastCloneDeep({
            _id: '660e75e4e8c776f1225142aa',
            form: '63e4deda12b88c4f05c125cf',
            owner: '63ceaccebe0090345b109da7',
            data: restoredDraftNestedData,
            project: '65b0ccbaf019a907ac01a869',
            state: 'draft',
          }),
        ]);
      }
    };

    done();
  });

  afterEach(() => {
    saveDraftCalls = 0;
    restoreDraftCalls = 0;
    state = null;
    subFormState = null;
  });

  after((done) => {
    Formio.makeRequest = originalMakeRequest;
    Formio.setUser();
    done();
  });

  it('Changes to the child form should trigger a `modified` change in the parent', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(
      formElement,
      'http://localhost:3000/idwqwhclwioyqbw/testdraftparent',
      {
        saveDraft: true
      }
    ).then((form) => {
      setTimeout(() => {
        form.on('change', ({ changed }, _, modified) => {
          if (changed) {
            const { instance } = changed;
            if (instance instanceof Webform) {
              assert(modified === true, 'the modified flag should bubble to the root');
              done();
            }
          }
        });
        const tfNestedInput = form.getComponent('form.nested')?.refs?.input?.[0];
        assert(tfNestedInput !== undefined, 'We have the input element');
        tfNestedInput.value = 'testNested';
        const inputEvent = new Event('input');
        tfNestedInput.dispatchEvent(inputEvent);
      }, 600);
    }).catch((err) => done(err));
  });

  it('Should save draft for Nested Form and for the Parent Form', function(done) {
    const formElement = document.createElement('div');
    Formio.createForm(
      formElement,
      'http://localhost:3000/idwqwhclwioyqbw/testdraftparent',
      {
        saveDraft: true
      }
    ).then((form) => {
      setTimeout(() => {
        const tfNestedInput = form.getComponent('form.nested').refs.input[0];
        tfNestedInput.value = 'testNested';
        const inputEvent = new Event('input');
        tfNestedInput.dispatchEvent(inputEvent);
        setTimeout(() => {
          assert.equal(saveDraftCalls, 2);
          assert.equal(state, 'draft');
          done();
        }, 1000);
      }, 400);
    }).catch((err) => done(err));
  });

  it('Should restore draft for nested Form', function(done) {
    const formElement = document.createElement('div');
    Formio.createForm(
      formElement,
      'http://localhost:3000/idwqwhclwioyqbw/testdraftparent',
      {
        saveDraft: true
      }
    ).then((form) => {
      setTimeout(() => {
        assert.equal(restoreDraftCalls, 2);
        assert.equal(saveDraftCalls, 0);
        assert.equal(form.submission.state, 'draft');
        assert.deepEqual(form.data, restoredDraftData);
        assert.deepEqual(_.get(form.submission.data, 'form.data'), restoredDraftNestedData);
        done();
      }, 200);
    }).catch((err) => done(err));
  });

  it('Should not restore draft for Nested Form if skipDraftRestore is set as true', function(done) {
    const formElement = document.createElement('div');
    Formio.createForm(
      formElement,
      'http://localhost:3000/idwqwhclwioyqbw/testdraftparent',
      {
        saveDraft: true,
        skipDraftRestore: true
      }
    ).then((form) => {
      setTimeout(() => {
        assert.equal(restoreDraftCalls, 0);
        assert.equal(saveDraftCalls, 0);
        assert.equal(_.isUndefined(form.submission.state), true);
        done();
      }, 200);
    }).catch((err) => done(err));
  });

  it('Should change state of the nested sumbmission to submitted after submit parent form', function(done) {
    const formElement = document.createElement('div');
    Formio.createForm(
      formElement,
      'http://localhost:3000/idwqwhclwioyqbw/testdraftparent',
      {
        saveDraft: true
      }
    ).then((form)=>{
      setTimeout(()=>{
        const tfNestedInput = form.getComponent('form.nested').refs.input[0];
        tfNestedInput.value = 'testNested Update';
        const inputEvent = new Event('input');
        tfNestedInput.dispatchEvent(inputEvent);
        setTimeout(()=>{
          assert.equal(saveDraftCalls, 1);
          const clickEvent = new Event('click');
          const submitBtn = form.element.querySelector('[name="data[submit]"]');
          submitBtn.dispatchEvent(clickEvent);
          setTimeout(()=> {
            assert.equal(saveDraftCalls, 1);
            assert.equal(state, 'submitted');
            assert.equal(subFormState, 'submitted');
            done();
          }, 500);
        }, 300);
      }, 200);
    }).catch((err) => done(err));
  });

  it('Should not create a draft submission for nested form if Save as reference is set to false', function(done) {
    _.set(comp7.components[1], 'reference', false);
    const formElement = document.createElement('div');
    Formio.createForm(
      formElement,
      'http://localhost:3000/idwqwhclwioyqbw/testdraftparent',
      {
        saveDraft: true
      }
    ).then((form)=>{
      setTimeout(() => {
        const tfNestedInput = form.getComponent('form.nested').refs.input[0];
        tfNestedInput.value = 'test Nested Input';
        const inputEvent = new Event('input');
        tfNestedInput.dispatchEvent(inputEvent);
        setTimeout(() => {
          assert.equal(saveDraftCalls, 1);
          assert.equal(state, 'draft');
          _.unset(comp7.components[1], 'reference');
          done();
        }, 1000);
      }, 200);
    }).catch((err) => done(err));
  });

  it('Should pass all the required options to the nested form properly', function(done) {
    const formElement = document.createElement('div');
    Formio.createForm(
      formElement,
      nestedWizardForm,
      {
        readOnly: true,
      },
    ).then((form) => {
      setTimeout(() => {
        assert.equal(form.options.readOnly, true);
        done();
      });
    }).catch((err) => done(err));
  });
});

describe('Disabled clearOnHide functionality for Nested Form', () => {
  const originalMakeRequest = Formio.makeRequest;
  let loadSubForm = false;
  let submitSubForm = false;
  let subFormSubmission = null;
  let mainFormSubmission = null;
  let saveAsRef = true;


  before((done) => {
    Formio.setUser({
      _id: '123'
    });

    Formio.makeRequest = (formio, type, url, method, data) => {
      if (type === 'form' && method === 'get' && (url).includes('/clearonhidetest')) {
        const mainForm = fastCloneDeep(nestedFormWithDisabledClearOnHide.mainForm);
        mainForm.components[0].reference = saveAsRef;
        return Promise.resolve(mainForm);
      };
      if (type === 'form' && method === 'get' && (url).includes('/67b5d190ac6f65931c9a320a')) {
        loadSubForm = true;
        return Promise.resolve(nestedFormWithDisabledClearOnHide.nestedForm);
      };

      if (type === 'submission' && method === 'post' && (url).includes('67b5d190ac6f65931c9a320a')) {
        submitSubForm = true;
        subFormSubmission = fastCloneDeep(data);
        return Promise.resolve({
            ...data,
            _id: 'nestedSubmissionId',
            data: fastCloneDeep(data.data)
          });
      };

      if (type === 'submission' && method === 'post' && (url).includes('/clearonhidetest')) {
        mainFormSubmission = fastCloneDeep(data);
        return Promise.resolve({
            ...data,
            _id: 'mainSubmissionId',
            data: fastCloneDeep(data.data)
          });
      };
    };
    done();
  });

  afterEach(() => {
    loadSubForm = false;
    submitSubForm = false;
    subFormSubmission = null;
    mainFormSubmission = null;
    saveAsRef = true;
  });

  after((done) => {
    Formio.makeRequest = originalMakeRequest;
    Formio.setUser();
    done();
  });

  it('Should submit hidden nested form with enabled saveAsReference and disabled clearOnHide', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(
      formElement,
      'http://localhost:3000/ryyclyrmbzvuqog/clearonhidetest',
    ).then((instance) => {
      instance.submit().then(() => {
        assert.equal(loadSubForm, true);
        assert.equal(submitSubForm, true);
        assert.deepEqual(subFormSubmission.data, { textField: 'test', textArea: '' });
        assert.equal(mainFormSubmission.data?.form?._id, 'nestedSubmissionId');
        assert.deepEqual(mainFormSubmission.data?.form?.data, { textField: 'test', textArea: '' });
        done();
      });
    }).catch((err) => done(err));
  });

  it('Should submit hidden nested form data with disabled saveAsReference and disabled clearOnHide', (done) => {
    saveAsRef = false;
    const formElement = document.createElement('div');
    Formio.createForm(
      formElement,
      'http://localhost:3000/ryyclyrmbzvuqog/clearonhidetest',
    ).then((instance) => {
      instance.submit().then(() => {
        assert.equal(loadSubForm, true);
        assert.equal(submitSubForm, false);
        assert.deepEqual(!!subFormSubmission, false);
        assert.equal(!!mainFormSubmission.data?.form?._id, false);
        assert.deepEqual(mainFormSubmission.data?.form?.data, { textField: 'test', textArea: '' });
        done();
      });
    }).catch((err) => done(err));
  });
});

describe('Nested Form validation inside Wizard', () => {
  const originalMakeRequest = Formio.makeRequest;
  let postRequestCount = 0;
  let childFormRequestCount = 0;

  const parentForm = {
    "_id": "677d3efea934773d422a05fa",
    "title": "Wizard parent",
    "name": "fdAsWizardParent",
    "path": "fdaswizardparent",
    "type": "form",
    "display": "wizard",
    "components": [{
      "title": "Page 1",
      "key": "page1",
      "type": "panel",
      "components": [{
        "label": "Form",
        "key": "form",
        "type": "form",
        "form": "677d3efea934773d422a05ec",
        "lazyLoad": true
      }]
    }, ]

  };

  const childForm = {
    "_id": "677d3efea934773d422a05ec",
    "title": "Wizard Child",
    "name": "WizardChild",
    "path": "wizardchild",
    "type": "form",
    "components": [{
        "label": "Text Field",
        "key": "textField",
        "type": "textfield",
        "validate": {
          "required": true
        }
      },
      {
        "label": "Submit",
        "key": "submit",
        "type": "button"
      }
    ]
  };

  before((done) => {
    // Mock Formio.makeRequest to count POST requests and serve mock forms
    Formio.makeRequest = (formio, type, url, method, data) => {
      if (type === 'form' && method === 'get') {
        if (url.includes('parentForm')) {
          return Promise.resolve(_.cloneDeep(parentForm));
        } else if (url.includes('677d3efea934773d422a05ec')) {
          ++childFormRequestCount;
          return Promise.resolve(_.cloneDeep(childForm));
        }
        if (type === 'submission' && ['post'].includes(method)) {
          postRequestCount++;
        }
        return Promise.resolve();
      }
    };
    done()
  });

  after((done) => {
    // Restore the original makeRequest
    Formio.makeRequest = originalMakeRequest;
    done();
  });

  it('Should show validation errors for nested form components inside wizard', (done) => {
    const formElement = document.createElement('div');
    postRequestCount = 0;
    Formio.createForm(formElement, 'http://localhost:3000/idwqwhclwioyqbw/parentForm')
      .then((wizard) => {
        setTimeout(() => {
          const btn = _.get(wizard.refs, `${wizard.wizardKey}-submit`);
          const clickEvent = new Event('click');
          btn.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(wizard.errors.length, 1, 'Should trigger validation error');
            assert.equal(wizard.errors[0].ruleName, 'required');
            assert.equal(wizard.element.querySelectorAll('.formio-error-wrapper').length, 1, 'Should set error classes for invalid component inside nested form')
            assert.equal(postRequestCount, 0, 'No submission POST requests should be made');
            assert.equal(childFormRequestCount, 1);
            done()
          }, 300);
        }, 100)
      });
  });
})

describe('Test Conditional Multi-Level Nested forms', () => {
  const originalMakeRequest = Formio.makeRequest;
  let noNestedWizards = false;

  before((done) => {
    Formio.setUser({
      _id: '123'
    });

    Formio.makeRequest = (formio, type, url, method, data) => {
      if (type === 'form' && method === 'get' && (url).includes('/esubmissionsext')) {
        const mainForm = fastCloneDeep(multiLevelNestedForms.mainForm);
        return Promise.resolve(mainForm);
      };
      const formId = _.last(url.split('/')).split('?')[0];
      if (type === 'form' && method === 'get' && multiLevelNestedForms[`${formId}`]) {
        const form = fastCloneDeep(multiLevelNestedForms[`${formId}`]);
        if (noNestedWizards) {
          form.display = 'form';
        }
        return Promise.resolve(form);
      }
      else {
        console.log(111, 'form not found', type, method,  url, formId)
      };
    };
    done();
  });

  after((done) => {
    Formio.makeRequest = originalMakeRequest;
    Formio.setUser();
    done();
  });

  it('Should show deeply nested wizard every time when condition is met', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(
      formElement,
      'http://localhost:3000/authoring-lszihwhpgvtoncg/esubmissionsext',
    ).then((wizard) => {
      assert.equal(wizard.allPages.length, 1)
      assert.equal(wizard.pages.length, 1);
      const textField = wizard.getComponent('textField');
      const inputEvent = new Event('input');
      const input = textField.refs.input[0];
      input.value = '5';
      input.dispatchEvent(inputEvent);
      setTimeout(() => {
        assert.equal(textField.dataValue, '5');
        assert.equal(wizard.allPages.length, 3);
        assert.equal(wizard.pages.length, 3);
        const input = textField.refs.input[0];
        input.value = '7';
        input.dispatchEvent(inputEvent);
        setTimeout(() => {
          assert.equal(textField.dataValue, '7');
          assert.equal(wizard.allPages.length, 1);
          assert.equal(wizard.pages.length, 1);
          const input = textField.refs.input[0];
          input.value = '5';
          input.dispatchEvent(inputEvent);
          setTimeout(() => {
            assert.equal(textField.dataValue, '5');
            assert.equal(wizard.allPages.length, 3);
            assert.equal(wizard.pages.length, 3);
            done();
          }, 350)
        }, 350)
      }, 350)
    }).catch((err) => done(err));
  })

  it('Should show deeply nested nested forms every time when condition is met', (done) => {
    const formElement = document.createElement('div');
    noNestedWizards = true;
    Formio.createForm(
      formElement,
      'http://localhost:3000/authoring-lszihwhpgvtoncg/esubmissionsext',
    ).then((form) => {
      const textField = form.getComponent('textField');
      const inputEvent = new Event('input');
      const input = textField.refs.input[0];
      input.value = '5';
      input.dispatchEvent(inputEvent);
      setTimeout(() => {
        assert.equal(textField.dataValue, '5');
        const nestedForm1 = form.getComponent('eSubmissions.pmta');
        const nestedForm2 = form.getComponent('eSubmissions.pmta.section1.contacts');
        const nestedForm3 = form.getComponent('eSubmissions.pmta.section1.contacts.section1A.applicantOrganization');
        const nestedForm4 = form.getComponent('eSubmissions.pmta.section1.contacts.section1B.authorizedRepresentative');
        const nestedForm5 = form.getComponent('eSubmissions.pmta.section1.contacts.section1B.authorizedRepresentative.organization');
        assert.equal(!!nestedForm1._conditionallyHidden, false);
        assert.equal(!!nestedForm1.subForm._conditionallyHidden, false);
        assert.equal(!!nestedForm2._conditionallyHidden, false);
        assert.equal(!!nestedForm2.subForm._conditionallyHidden, false);
        assert.equal(!!nestedForm3._conditionallyHidden, false);
        assert.equal(!!nestedForm3.subForm._conditionallyHidden, false);
        assert.equal(!!nestedForm4._conditionallyHidden, false);
        assert.equal(!!nestedForm4.subForm._conditionallyHidden, false);
        assert.equal(!!nestedForm5._conditionallyHidden, false);
        assert.equal(!!nestedForm5.subForm._conditionallyHidden, false);

        const input = textField.refs.input[0];
        input.value = '7';
        input.dispatchEvent(inputEvent);
        setTimeout(() => {
          assert.equal(textField.dataValue, '7');
          const nestedForm1 = form.getComponent('eSubmissions.pmta');
          const nestedForm2 = form.getComponent('eSubmissions.pmta.section1.contacts');
          assert.equal(nestedForm1.conditionallyHidden(), true);
          assert.equal(nestedForm2.conditionallyHidden(), true);
          const input = textField.refs.input[0];
          input.value = '5';
          input.dispatchEvent(inputEvent);
          setTimeout(() => {
            assert.equal(textField.dataValue, '5');
            const nestedForm1 = form.getComponent('eSubmissions.pmta');
            const nestedForm2 = form.getComponent('eSubmissions.pmta.section1.contacts');
            const nestedForm3 = form.getComponent('eSubmissions.pmta.section1.contacts.section1A.applicantOrganization');
            const nestedForm4 = form.getComponent('eSubmissions.pmta.section1.contacts.section1B.authorizedRepresentative');
            const nestedForm5 = form.getComponent('eSubmissions.pmta.section1.contacts.section1B.authorizedRepresentative.organization');
            assert.equal(!!nestedForm1._conditionallyHidden, false);
            assert.equal(!!nestedForm1.subForm._conditionallyHidden, false);
            assert.equal(!!nestedForm2._conditionallyHidden, false);
            assert.equal(!!nestedForm2.subForm._conditionallyHidden, false);
            assert.equal(!!nestedForm3._conditionallyHidden, false);
            assert.equal(!!nestedForm3.subForm._conditionallyHidden, false);
            assert.equal(!!nestedForm4._conditionallyHidden, false);
            assert.equal(!!nestedForm4.subForm._conditionallyHidden, false);
            assert.equal(!!nestedForm5._conditionallyHidden, false);
            assert.equal(!!nestedForm5.subForm._conditionallyHidden, false);
            done();
          }, 300)
        }, 300)
      }, 350)
      }).catch((err) => done(err));
  })
});

describe('Test Nested Form value setting', () => {
  const originalMakeRequest = Formio.makeRequest;
  before((done) => {
    Formio.setUser({
      _id: '123'
    });

    Formio.makeRequest = (formio, type, url, method, data) => {
      if (type === 'form' && method === 'get' && (url).includes('/datareadytest')) {
        const mainForm = fastCloneDeep(nestedFormWIthContentComponent.parentForm);
        return Promise.resolve(mainForm);
      };

      if (type === 'form' && method === 'get' && (url).includes('/67c19d4a0b924378e690a993')) {
        return Promise.resolve(nestedFormWIthContentComponent.childForm);
      };
    };
    done();
  });

  after((done) => {
    Formio.makeRequest = originalMakeRequest;
    Formio.setUser();
    done();
  });

  it('The nested form submission should be set and correctly displayed once dataReady promise is resolved', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(
      formElement,
      'http://localhost:3000/ryyclyrmbzvuqog/datareadytest',
      { readOnly: true }
    ).then((instance) => {
      instance.setSubmission(nestedFormWIthContentComponent.submission).then(function() {
        instance.dataReady.then(function() {
            const contentText = instance.element.querySelector('.formio-component-content').textContent;
            assert.equal(contentText.includes('foo'), true);
            assert.equal(contentText.includes('hey'), true);
            done();
          })
        })
      }).catch((err) => done(err));
    })
});

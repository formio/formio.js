import Harness from '../../../test/harness';
import FormComponent from './Form';
import { expect } from 'chai';
import assert from 'power-assert';

import {
  comp1,
  comp3,
  comp4,
  comp5,
  comp6
} from './fixtures';
import Webform from '../../Webform';
import formModalEdit from './fixtures/formModalEdit';
import { formComponentWithConditionalRenderingForm } from '../../../test/formtest';

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
            }, 300);
          }, 300);
        }, 300);
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
      }).catch(done);
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
          }, 250);
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

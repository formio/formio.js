import FormBuilder from './FormBuilder';
import assert from 'power-assert';
import Harness from '../test/harness';
import simpleWizard from '../test/forms/simpleWizard';
import formWithFormController from '../test/forms/formWithFormController';
import { fastCloneDeep } from './utils/utils';

global.requestAnimationFrame = (cb) => cb();
global.cancelAnimationFrame = () => {};

describe('WizardBuilder tests', function() {
  let formBuilderElement, formBuilder;
  after((done) => {
    destroyWizardBuilder();
    done();
  });

  function destroyWizardBuilder() {
    if (formBuilder && formBuilder.instance) {
      formBuilder.instance.destroy();
      document.body.removeChild(formBuilderElement);
    }
  }

  function createWizardBuilder(form = { display: 'wizard', components: [] }) {
    destroyWizardBuilder();
    formBuilderElement = document.createElement('div');
    document.body.appendChild(formBuilderElement);
    formBuilder = new FormBuilder(formBuilderElement, { ...form, components: [...form.components] }, {});
    return formBuilder;
  }

  it('Test page remove with cancellation', function(done) {
    const builder = createWizardBuilder(simpleWizard);

    setTimeout(() => {
      const panel = builder.instance.webform.components[0];
      const removeComponentRef = panel.refs.removeComponent;
      window.confirm = () => {
        return false;
      };
      Harness.clickElement(panel, removeComponentRef);
      setTimeout(() => {
        assert.equal(builder.instance._form.components.length, 5, 'Should not remove the page on cancel');
        assert.equal(builder.instance.webform.components[0].key, 'page1', 'Should stay on page 1 since we' +
          ' canceled the deletion');
        done();
      }, 300);
    }, 500);
  });

  it('Test page remove with confirmation', function(done) {
    const builder = createWizardBuilder(simpleWizard);

    setTimeout(() => {
      const panel = builder.instance.webform.components[0];
      const removeComponentRef = panel.refs.removeComponent;
      window.confirm = () => {
        return true;
      };
      Harness.clickElement(panel, removeComponentRef);
      setTimeout(() => {
        assert.equal(builder.instance._form.components.length, 4, 'Should remove the page on confirm');
        assert.equal(builder.instance.webform.components[0].key, 'page2', 'Should switch to the next page when' +
          ' deletion is confirmed');
        done();
      }, 300);
    }, 500);
  });

  it('Test page remove with confirmation when remove from component settings window', function(done) {
    const builder = createWizardBuilder(simpleWizard);

    setTimeout(() => {
      const panel = builder.instance.webform.components[0];
      const editComponentRef = panel.refs.editComponent;
      window.confirm = () => {
        return true;
      };

      Harness.clickElement(panel, editComponentRef);
      setTimeout(() => {
        assert(builder.instance.editForm, 'Should create the settings form on component edit');
        const removeButton = builder.instance.componentEdit.querySelector('[ref="removeButton"]');
        Harness.clickElement(panel, removeButton);
        setTimeout(() => {
          assert.equal(builder.instance._form.components.length, 4, 'Should remove the page on confirm');
          assert.equal(builder.instance.webform.components[0].key, 'page2', 'Should switch to the next page when' +
            ' deletion is confirmed');
          done();
        }, 300);
      }, 300);
    }, 500);
  });

  it('Should execute form controller', (done) => {
    const form = fastCloneDeep(formWithFormController);
    form.display = 'wizard';
    const builder = createWizardBuilder(form).instance;

    setTimeout(() => {
      const textF = builder.webform.getComponent('textField');
      assert.equal(textF.getValue(), 'Hello World');
      assert.equal(textF.disabled, true);
      assert.equal(builder.webform.components[0].disabled, true);

      done();
    }, 500);
  });

  it('Test pages reorder', (done) => {
    const builder = createWizardBuilder(simpleWizard);

    setTimeout(() => {
      const drake = builder.instance.navigationDragula;
      const addPageBtn = builder.instance.element.querySelector('.wizard-add-page');
      assert.equal(drake.canMove(addPageBtn), false, 'Should not be able to move Add Page button');
      const pagesElements = builder.instance.element.querySelectorAll('.wizard-pages li');
      assert.equal(pagesElements.length, 6, 'Should contain all buttons for all the pages + Add Page button');
      const firstPage = pagesElements[0];
      assert.equal(drake.canMove(firstPage), true, 'Should be able to move page button');
      done();
    }, 500);
  });

  describe('Test saveComponent', () => {
    it('should replace page component correctly in form object', function(done) {
      const builder = createWizardBuilder(simpleWizard);
      const page = builder.instance.webform.components[0];
      const editComponentRef = page.refs.editComponent;

      Harness.clickElement(page, editComponentRef);
      setTimeout(() => {
        assert(builder.instance.editForm, 'Should create the settings form on component edit');
        const labelComponent = builder.instance.editForm.getComponent('label');
        labelComponent.updateValue('This is page 1');
        const saveButton = builder.instance.componentEdit.querySelector('[ref="saveButton"]');
        Harness.clickElement(page, saveButton);
        setTimeout(() => {
          assert.equal(builder.instance.form.components[0].label, 'This is page 1');
          done();
        }, 100);
      }, 100);
    });

    it('should not remove page when component with duplicate API key is changed', function(done) {
      const builder = createWizardBuilder(simpleWizard);
      const page1 = builder.instance.webform.components[0];

      let component1 = builder.instance.webform.components[0].components[0];
      Harness.clickElement(component1, component1.refs.editComponent);
      setTimeout(() => {
        assert(builder.instance.editForm, 'Should create the settings form on component edit');
        const keyComponent = builder.instance.editForm.getComponent('key');
        keyComponent.updateValue(page1.key);
        const saveButton = builder.instance.componentEdit.querySelector('[ref="saveButton"]');
        Harness.clickElement(component1, saveButton);
        setTimeout(() => {
          component1 = builder.instance.webform.components[0].components[0];
          assert.equal(component1.errors.length, 1, 'Should have error due to duplicate API key');
          assert.equal(component1.errors[0].message, `API Key is not unique: ${page1.key}`);

          Harness.clickElement(component1, component1.refs.editComponent);
          setTimeout(() => {
            assert(builder.instance.editForm, 'Should create the settings form on component edit');
            const keyComponent = builder.instance.editForm.getComponent('key');
            keyComponent.updateValue('some-unique-key');
            const saveButton = builder.instance.componentEdit.querySelector('[ref="saveButton"]');
            Harness.clickElement(component1, saveButton);
            setTimeout(() => {
              assert.equal(builder.instance.form.components[0].label, page1.label, 'Page 1 should still exist');
              assert.equal(builder.instance.form.components[0].components[0].key, 'some-unique-key', 'Component should have new key');
              done();
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    });
  });
});

import FormBuilder from './FormBuilder';
import assert from 'power-assert';
import Harness from '../test/harness';
import simpleWizard from '../test/forms/simpleWizard';

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
});

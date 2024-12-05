import assert from 'power-assert';
import Harness from '../harness';
import { flattenComponents } from '../../src/utils/formUtils';
import PanelComponent from '../../src/components/panel/Panel';
import panelEditForm from '../../src/components/panel/Panel.form';
import { Formio } from '../../src/Formio';
import {
  comp1,
  comp2
} from './fixtures/panel';

describe('Panel Component', function() {
  it('Should build a panel component', function() {
    return Harness.testCreate(PanelComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
    });
  });

  it('Should keep validation errors after expanding collapsed panel', function(done) {
    const element = document.createElement('div');

    Formio.createForm(element, comp2).then(form => {
      const panel = form.getComponent('panel');
      const numberComp = form.getComponent('number');
      const textComp = form.getComponent('textField');

      assert.equal(panel.collapsed, false);
      assert.equal(numberComp.errors.length, 0);
      assert.equal(textComp.errors.length, 1);

      // Make sure the error is not visible in the UI.
      assert.equal(numberComp.element.classList.contains('has-error'), false, 'Should not contain error classes.');
      assert.equal(textComp.element.classList.contains('has-error'), false, 'Should not contain error classes.');

      const inputEvent = new Event('input');
      const numberInput = numberComp.refs?.input[0];
      numberInput.value = 5;
      numberInput.dispatchEvent(inputEvent);

      const textInput = textComp.refs?.input[0];
      textInput.value = 'test';
      textInput.dispatchEvent(inputEvent);
      textInput.value = '';
      textInput.dispatchEvent(inputEvent);

      setTimeout(() => {
        assert.equal(numberComp.errors.length, 1);
        assert.equal(numberComp.refs.messageContainer.querySelectorAll('.error').length, 1);
        assert.equal(textComp.errors.length, 1);
        assert.equal(textComp.refs.messageContainer.querySelectorAll('.error').length, 1);

        panel.collapse(true);

        setTimeout(() => {
          panel.collapse(false);

          setTimeout(() => {
            assert.equal(panel.collapsed, false);
            assert.equal(numberComp.errors.length, 1);
            assert.equal(numberComp.refs.messageContainer.querySelectorAll('.error').length, 1);
            assert.equal(textComp.errors.length, 1);
            assert.equal(textComp.refs.messageContainer.querySelectorAll('.error').length, 1);
            assert.equal(panel.refs.messageContainer.querySelectorAll('.error').length, 0);
            done();
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });

  describe('Edit Form', function() {
    it('should include components for important settings', function() {
      const components = flattenComponents(panelEditForm().components);
      const keys = Object.keys(components).map(path => components[path].key);
      const settings = [
        'breadcrumbClickable'
      ];

      assert(settings.every(s => keys.includes(s)));
    });
  });
});

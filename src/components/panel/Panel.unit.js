import assert from 'power-assert';
import Harness from '../../../test/harness';
import { flattenComponents } from '../../utils/formUtils';
import PanelComponent from './Panel';
import panelEditForm from './Panel.form';
import Formio from '../../Formio';
import {
  comp1,
  comp2
} from './fixtures';

describe('Panel Component', () => {
  it('Should build a panel component', () => {
    return Harness.testCreate(PanelComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
    });
  });

  it('Should keep validation errors after expanding collapsed panel', (done) => {
    const element = document.createElement('div');

    Formio.createForm(element, comp2).then(form => {
      const panel = form.getComponent('panel');
      const numberComp = form.getComponent('number');
      const textComp = form.getComponent('textField');

      assert.equal(panel.collapsed, false);
      assert.equal(!!numberComp.error, false);
      assert.equal(!!textComp.error, false);

      const numberInput = numberComp.refs?.input[0];
      numberInput.value = 5;
      const inputEvent = new Event('input');
      numberInput.dispatchEvent(inputEvent);

      setTimeout(() => {
        assert.equal(!!numberComp.error, true);
        assert.equal(numberComp.error.messages.length, 1);
        assert.equal(numberComp.refs.messageContainer.querySelectorAll('.error').length, 1);
        assert.equal(!!textComp.error, false);

        const clickEvent = new Event('click');
        panel.refs.header.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(panel.collapsed, true);
          panel.refs.header.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(panel.collapsed, false);
            assert.equal(!!numberComp.error, true);
            assert.equal(numberComp.error.messages.length, 1);
            assert.equal(numberComp.refs.messageContainer.querySelectorAll('.error').length, 1);
            assert.equal(!!textComp.error, false);
            done();
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });

  describe('Edit Form', () => {
    it('should include components for important settings', () => {
      const components = flattenComponents(panelEditForm().components);
      const keys = Object.keys(components).map(path => components[path].key);
      const settings = [
        'breadcrumb',
        'breadcrumbClickable'
      ];

      assert(settings.every(s => keys.includes(s)));
    });
  });
});

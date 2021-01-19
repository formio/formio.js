import Harness from '../../../test/harness';
import TagsComponent from './Tags';
import assert from 'power-assert';
import modalTagsComponent from '../../../test/formtest/modalTagsComponent';

import {
  comp1,
  comp2,
} from './fixtures';
import Formio from '../../Formio';

describe('Tags Component', function() {
  it('Should build a tags component', function() {
    return Harness.testCreate(TagsComponent, comp1);
  });

  it('Should not allow to add non-unique tags on blur', function(done) {
    Harness.testCreate(TagsComponent, comp2).then((component) => {
      const values = ['test', 'test1', 'test'];
      Harness.setTagsValue(values, component);
      assert.equal(component.choices.getValue(true).length, 2);
      done();
    }).catch(done);
  });

  it('Should not exceed maxTags limit', function(done) {
    Harness.testCreate(TagsComponent, comp2).then((component) => {
      const values = ['1', '2', '3', '4', '5'];
      Harness.setTagsValue(values, component);

      assert.equal(component.choices.getValue(true).length, 4);
      done();
    }).catch(done);
  });

  it('Check getValueAsString', (done) => {
    const element = document.createElement('div');
    Formio.createForm(element, modalTagsComponent)
      .then(form => {
        const component = form.getComponent(['tags']);
        const modalWindow = component.componentModal.refs.modalContents;

        Harness.setTagsValue(['test', 'test1', 'test2'], component);
        Harness.dispatchEvent('click', modalWindow, '[ref="modalSave"]');

        setTimeout(() => {
          const modalPreview = component.element.querySelector('[ref="openModal"]');
          assert.equal(modalPreview.textContent.trim(), 'test, test1, test2', 'All tags should be rendered inside Modal Preview');
          form.destroy();
          done();
        }, 150);
      })
      .catch(done);
  });
});

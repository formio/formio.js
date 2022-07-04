import Harness from '../../../test/harness';
import TagsComponent from './Tags';
import assert from 'power-assert';
import modalTagsComponent from '../../../test/formtest/modalTagsComponent';
import _ from 'lodash';

import {
  comp1,
  comp2,
  comp3,
  comp4,
  comp5,
} from './fixtures';
import Formio from '../../Formio';

describe('Tags Component', function() {
  it('Should build a tags component', function() {
    return Harness.testCreate(TagsComponent, comp1);
  });

  it('Should set placeholder', function(done) {
    Harness.testCreate(TagsComponent, comp4).then((component) => {
      assert.equal(component.choices.config.placeholder, true);
      assert.equal(component.choices.config.placeholderValue, component.component.placeholder);
      assert.equal(component.choices.input.element.attributes.placeholder.value, component.component.placeholder);
      done();
    }).catch(done);
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

  it('Should use correct delimiter for value', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].delimeter = '-';

    Formio.createForm(element, form).then(form => {
      const tags = form.getComponent('tags');
      const value =  ['tag1','tag2', 'tag3'];

      tags.setValue(value);

      setTimeout(() => {
        assert.equal(tags.getValue(), value.join('-'));
        assert.equal(tags.dataValue, value.join('-'));
        assert.equal(form.submission.data.tags, value.join('-'));

        document.innerHTML = '';
        done();
      }, 200);
    }).catch(done);
  });

  it('Should use store value as array', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].storeas = 'array';

    Formio.createForm(element, form).then(form => {
      const tags = form.getComponent('tags');
      const value =  ['tag1','tag2', 'tag3'];

      tags.setValue(value);

      setTimeout(() => {
        assert.deepEqual(tags.getValue(), value.join(','));
        assert.deepEqual(form.submission.data.tags, value);
        assert.equal(tags.dataValue, value);

        document.innerHTML = '';
        done();
      }, 200);
    }).catch(done);
  });

  it('Should show the specified delimiter when get value as string', (done) => {
    const form = _.cloneDeep(comp5);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const tags = form.getComponent('tags');
      const value =  ['tag1', 'tag2', 'tag3'];

      tags.setValue(value);

      setTimeout(() => {
        assert.deepEqual(tags.getValue(), value.join(tags.component.delimeter));
        assert.deepEqual(form.submission.data.tags, value);
        assert.equal(tags.dataValue, value);
        assert.equal(tags.getValueAsString(value), value.join(`${tags.component.delimeter} `));

        document.innerHTML = '';
        done();
      }, 200);
    }).catch(done);
  });
});

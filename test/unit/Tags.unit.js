import Harness from '../harness';
import TagsComponent from '../../src/components/tags/Tags';
import assert from 'power-assert';
import modalTagsComponent from '../formtest/modalTagsComponent.json';
import _ from 'lodash';
import { wait } from '../util';

import {
  comp1,
  comp2,
  comp3,
  comp4,
  comp5,
  comp6,
} from './fixtures/tags';
import { Formio } from '../../src/Formio';

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
    const element = document.createElement('div');
    Formio.createForm(element, { type: 'form', display: 'form', components: [comp2] }).then(form => {
      const component = form.getComponent(['tags']);
      const values = ['test', 'test1', 'test'];
      Harness.setTagsValue(values, component);
      assert.equal(component.choices.getValue(true).length, 2);
      done();
    }).catch(done);
  });

  it('Should not show a tag after removal', async function () {
    const clickEvent = new Event('click');
    const element = document.createElement('div');
    const form = await Formio.createForm(element, { type: 'form', display: 'form', components: [comp2] })
    const component = form.getComponent(['tags']);
    const values = ['one', 'two'];
    const choicesInstance = component.choices;
    Harness.setTagsValue(values, component);
    const value = [...component.refs.input][0].value;
    assert.equal(value, 'one,two');
    const removeBtn = element.querySelector('.choices__list--multiple .choices__item .choices__button');
    removeBtn.dispatchEvent(clickEvent);
    await wait(200);
    choicesInstance._handleButtonAction(removeBtn);
    await wait(200);
    await form.redraw();
    await wait(200);
    const currentValue = [...component.refs.input][0].value;
    assert.equal(currentValue, 'two');
  });

  it('Should not exceed maxTags limit', function(done) {
    const element = document.createElement('div');
    Formio.createForm(element, { type: 'form', display: 'form', components: [comp2] }).then(form => {
      const component = form.getComponent(['tags']);
      const values = ['1', '2', '3', '4', '5'];
      Harness.setTagsValue(values, component);

      setTimeout(() => {
        assert.equal(component.choices.getValue(true).length, 4);
        done();
      }, 400);
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
          assert.equal(modalPreview.textContent.trim(), 'test,test1,test2', 'All tags should be rendered inside Modal Preview');
          form.destroy();
          done();
        }, 250);
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

  it('OnBlur validation should work properly with Tags component', (done) => {
    const element = document.createElement('div');

    Formio.createForm(element, comp6).then(form => {
      const tags = form.getComponent('tags');
      // tags.setValue(['1', '2', '3']);
      Harness.setTagsValue(['test', 'test1', 'test2'], tags);
      tags.choices.input.element.focus();

      setTimeout(() => {
        assert.equal(tags.errors.length, 0, 'Tags should be valid while changing');
        tags.choices.input.element.dispatchEvent(new Event('blur'));

        setTimeout(() => {
          assert.equal(tags.errors.length, 1, 'Should set error after Tags component was blurred');
          done();
        }, 700);
      }, 700);
    }).catch(done);
  });
});

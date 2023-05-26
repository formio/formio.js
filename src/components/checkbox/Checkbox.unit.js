import assert from 'power-assert';
import _ from 'lodash';

import Harness from '../../../test/harness';
import Formio from '../../Formio';
import CheckBoxComponent from './Checkbox';

import {
  comp1,
  customDefaultComponent,
  comp2,
  comp3,
  comp4
} from './fixtures';

describe('Checkbox Component', () => {
  it('Should build a checkbox component', () => {
    return Harness.testCreate(CheckBoxComponent, comp1).then((component) => {
      const inputs = Harness.testElements(component, 'input[type="checkbox"]', 1);
      for (let i=0; i < inputs.length; i++) {
        assert(inputs[i].getAttribute('class').indexOf('form-check-input') !== -1, 'No form-check-input class');
        assert.equal(inputs[i].name, `data[${comp1.key}]`);
      }
      Harness.testElements(component, 'span', 1);
    });
  });

  it('Span should have correct text label', () => {
    return Harness.testCreate(CheckBoxComponent, comp1).then((component) => {
      const checkboxes = component.element.querySelectorAll('input[ref="input"]');
      assert.equal(checkboxes.length, 1);
      const componentClass = checkboxes[0].getAttribute('class');
      assert(componentClass.indexOf('form-check-input') !== -1, 'No form-check-input class.');
      const labels = component.element.querySelectorAll('label');
      assert.equal(labels.length, 1);
      assert(labels[0].getAttribute('class').indexOf('form-check-label') !== -1, 'No form-check-label class');
      const spans = labels[0].querySelectorAll('span');
      assert.equal(spans.length, 1);
      assert.equal(spans[0].innerHTML, 'Check me');
    });
  });

  it('Should be able to set and get data', () => {
    return Harness.testCreate(CheckBoxComponent, comp1).then((component) => {
      Harness.testSetGet(component, 1);
      Harness.testSetGet(component, 0);
    });
  });

  it('Should be able to set custom default value', () => {
    return Harness.testCreate(CheckBoxComponent, customDefaultComponent).then((component) => {
      assert.equal(component.dataValue, true);
      });
  });

  it('Should be able to unselect a checkbox component with the radio input type', () => {
    return Harness.testCreate(CheckBoxComponent, comp2).then((component) => {
      const input = Harness.testElements(component, 'input[type="radio"]', 1)[0];
      Harness.clickElement(component, input);
      assert.equal(input.checked, true);
      Harness.clickElement(component, input);
      assert.equal(input.checked, false);
    });
  });

  it('Should render red asterisk for preview template of the modal required checkbox ', (done) => {
    Harness.testCreate(CheckBoxComponent, comp3).then((component) => {
      const label = component.element.querySelector('.control-label');
      assert(label.className.includes('field-required'));
      done();
    }).catch(done);
  });

  it('Should hide component with conditional logic when checkbox component with the radio input type is unchecked', (done) =>  {
    const form = _.cloneDeep(comp4);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const radioCheckbox = form.getComponent('p1');
      const contentComp = form.getComponent('p1Content');
      assert.equal(contentComp.visible, false);
      const radio = Harness.testElements(radioCheckbox, 'input[type="radio"]', 1)[0];
      Harness.clickElement(radioCheckbox, radio);
      setTimeout(() => {
        assert.equal(contentComp.visible, true);
        Harness.clickElement(radioCheckbox, radio);
        setTimeout(() => {
          assert.equal(contentComp.visible, false);
          done();
        }, 300);
      }, 300);
    }).catch((err) => done(err));
  });
});

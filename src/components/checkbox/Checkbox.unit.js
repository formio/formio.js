import assert from 'power-assert';

import Harness from '../../../test/harness';
import CheckBoxComponent from './Checkbox';

import {
  comp1
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
});

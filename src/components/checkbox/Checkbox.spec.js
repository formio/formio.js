import assert from 'power-assert';

import Harness from '../../../test/harness';
import CheckBoxComponent from './Checkbox';

import {
  comp1
} from './fixtures';

describe('Checkbox Component', () => {
  it('Should build a checkbox component', (done) => {
    Harness.testCreate(CheckBoxComponent, comp1).then((component) => {
      const inputs = Harness.testElements(component, 'input[type="checkbox"]', 1);
      for (let i=0; i < inputs.length; i++) {
        assert(inputs[i].getAttribute('class').indexOf('form-check-input') !== -1, 'No form-check-input class');
        assert.equal(inputs[i].name, `data[${comp1.key}]`);
      }
      Harness.testElements(component, 'span', 1);
      done();
    });
  });

  it('Span should have correct text label', (done) => {
    Harness.testCreate(CheckBoxComponent, comp1).then((component) => {
      const componentClass = component.element.getAttribute('class');
      assert(componentClass.indexOf('form-check') !== -1, 'No form-check class.');
      const labels = component.element.querySelectorAll('label');
      assert.equal(labels.length, 1);
      assert(labels[0].getAttribute('class').indexOf('form-check-label') !== -1, 'No form-check-label class');
      const spans = labels[0].querySelectorAll('span');
      assert.equal(spans.length, 1);
      assert.equal(spans[0].innerHTML, 'Check me');
      done();
    });
  });

  it('Should be able to set and get data', (done) => {
    Harness.testCreate(CheckBoxComponent, comp1).then((component) => {
      Harness.testSetGet(component, 1);
      Harness.testSetGet(component, 0);
      done();
    });
  });

  it('Should set the checkbox-checked class on wrapper of checked checkbox', done => {
    Harness.testCreate(CheckBoxComponent, comp1).then((component) => {
      assert(
        component.element.getAttribute('class').indexOf('checkbox-checked') === -1,
        'Checkbox wrapper does not have checkbox-checked class.'
      );
      Harness.clickElement(component, 'input[type="checkbox"]');
      assert(
        component.element.getAttribute('class').indexOf('checkbox-checked') !== -1,
        'Checkbox wrapper has checkbox-checked class.'
      );
      done();
    });
  });

  it('Should unset the checkbox-checked class on wrapper of checked checkbox', done => {
    Harness.testCreate(CheckBoxComponent, comp1).then((component) => {
      assert(
        component.element.getAttribute('class').indexOf('checkbox-checked') === -1,
        'Checkbox wrapper does not have checkbox-checked class.'
      );
      Harness.clickElement(component, 'input[type="checkbox"]');
      assert(
        component.element.getAttribute('class').indexOf('checkbox-checked') !== -1,
        'Checkbox wrapper has checkbox-checked class.'
      );
      Harness.clickElement(component, 'input[type="checkbox"]');
      assert(
        component.element.getAttribute('class').indexOf('checkbox-checked') === -1,
        'Checkbox wrapper does not have checkbox-checked class.'
      );
      done();
    });
  });
});

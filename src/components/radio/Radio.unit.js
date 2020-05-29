import assert from 'power-assert';

import Harness from '../../../test/harness';
import RadioComponent from './Radio';

import {
  comp1,
  comp2,
  comp3
} from './fixtures';

describe('Radio Component', () => {
  it('Should build a radio component', () => {
    return Harness.testCreate(RadioComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="radio"]', 4);
      Harness.testElements(component, 'span', 4);
    });
  });

  it('Should return correct string values if storage type is Number', () => {
    return Harness.testCreate(RadioComponent, comp2).then((component) => {
      assert.equal(component.getValueAsString(1), 'one');
      assert.equal(component.getValueAsString(2), 'two');
    });
  });

  it('Should save checked value after redrawing if storage type is Number', (done) => {
    Harness.testCreate(RadioComponent, comp3).then((component) => {
      component.setValue(22);
      component.redraw();

      setTimeout(()=>{
        assert.equal(component.refs.input[0].checked, false);
        assert.equal(component.refs.input[1].value, '22');
        assert.equal(component.refs.input[1].checked, true);
        assert.equal(component.refs.input[2].checked, false);
        done();
      }, 700);
    });
  });

  it('Span should have correct text label', () => {
    return Harness.testCreate(RadioComponent, comp1).then((component) => {
      component.element.querySelectorAll('input').forEach((input) => {
        assert(input.getAttribute('class').indexOf('form-check-input') !== -1, 'No form-check-input on radios.');
      });
      const spans = component.element.querySelectorAll('span');
      assert.equal(spans[0].innerHTML, 'Red');
      assert.equal(spans[1].innerHTML, 'Green');
      assert.equal(spans[2].innerHTML, 'Blue');
      assert.equal(spans[3].innerHTML, 'Yellow');
    });
  });
});

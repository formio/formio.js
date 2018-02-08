'use strict';
import assert from 'power-assert';
import {RadioComponent} from './Radio';
import {components as comps} from './fixtures/index';
import {Harness} from '../../../test/harness';
describe('Radio Component', () => {
  it('Should build a radio component', (done) => {
    Harness.testCreate(RadioComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="radio"]', 4);
      Harness.testElements(component, 'span', 4);
      done();
    });
  });

  it('Span should have correct text label', (done) => {
    Harness.testCreate(RadioComponent, comps.comp1).then((component) => {
      const labels = component.element.querySelectorAll('label');
      component.element.querySelectorAll('input').forEach((input) => {
        assert(input.getAttribute('class').indexOf('form-check-input') !== -1, 'No form-check-input on radios.');
      });
      const spans = component.element.querySelectorAll('span');
      assert.equal(spans[0].innerHTML, 'Red');
      assert.equal(spans[1].innerHTML, 'Green');
      assert.equal(spans[2].innerHTML, 'Blue');
      assert.equal(spans[3].innerHTML, 'Yellow');
      done();
    });
  });
});

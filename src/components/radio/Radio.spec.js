'use strict';
import assert from 'power-assert';
import { RadioComponent } from './Radio';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Radio Component', function() {
  it('Should build a radio component', function(done) {
    Harness.testCreate(RadioComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="radio"]', 4);
      Harness.testElements(component, 'span', 4);
      done();
    });
  });

  it('Span should have correct text label', function(done) {
    Harness.testCreate(RadioComponent, comps.comp1).then((component) => {
      let spans = component.element.querySelectorAll('span');
      assert.equal(spans[0].innerHTML, 'Red');
      assert.equal(spans[1].innerHTML, 'Green');
      assert.equal(spans[2].innerHTML, 'Blue');
      assert.equal(spans[3].innerHTML, 'Yellow');
      done();
    });
  });  
});

'use strict';
import RadioComponent from './Radio';
import { components as comps } from './fixtures/index';
import Harness from '../../../test/harness';
describe('Radio Component', function() {
  it('Should build a radio component', function(done) {
    Harness.testCreate(RadioComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="radio"]', 4);
      done();
    });
  });
});

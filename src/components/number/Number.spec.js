'use strict';
import { NumberComponent } from './Number';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Number Component', function() {
  it('Should build an number component', function(done) {
    Harness.testCreate(NumberComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
});

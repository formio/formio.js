'use strict';
import WellComponent from './Well';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('Well Component', function() {
  it('Should build a Well component', function(done) {
    Harness.testCreate(WellComponent, comps.comp1).then((component) => {
      Harness.testInputs(component, 'input[type="text"]', 2);
      done();
    });
  });
});

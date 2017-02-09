'use strict';
import WellComponent from './Well';
import { components as comps } from './fixtures/index';
import Harness from '../../../test/harness';
describe('Well Component', function() {
  it('Should build a Well component', function(done) {
    Harness.testCreate(WellComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });
});

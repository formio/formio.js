'use strict';
import SelectBoxesComponent from './SelectBoxes';
import { components as comps } from './fixtures/index';
import Harness from '../../../test/harness';
describe('SelectBoxes Component', function() {
  it('Should build a SelectBoxes component', function(done) {
    Harness.testCreate(SelectBoxesComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="checkbox"]', 8);
      done();
    });
  });
});

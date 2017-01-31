'use strict';
import SelectBoxesComponent from './SelectBoxes';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('SelectBoxes Component', function() {
  it('Should build a SelectBoxes component', function(done) {
    Harness.testCreate(SelectBoxesComponent, comps.comp1).then((component) => {
      Harness.testInputs(component, 'input[type="checkbox"]', 8);
      done();
    });
  });
});

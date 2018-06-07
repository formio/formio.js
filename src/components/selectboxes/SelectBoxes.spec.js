import Harness from '../../../test/harness';
import SelectBoxesComponent from './SelectBoxes';

import {
  comp1,
  comp2
} from './fixtures';

describe('SelectBoxes Component', () => {
  it('Should build a SelectBoxes component', (done) => {
    Harness.testCreate(SelectBoxesComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="checkbox"]', 8);
      done();
    });
  });

  it('Should build a required SelectBoxes component', (done) => {
    Harness.testCreate(SelectBoxesComponent, comp2).then((component) => {
      Harness.testElements(component, 'input[type="checkbox"]', 8);
      Harness.testElements(component, 'label.control-label > span', 8);
      Harness.testElements(component, 'label.control-label.field-required', 1);
      done();
    });
  });
});

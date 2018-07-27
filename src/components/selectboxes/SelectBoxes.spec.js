import Harness from '../../../test/harness';
import SelectBoxesComponent from './SelectBoxes';

import {
  comp1,
  comp2
} from './fixtures';

describe('SelectBoxes Component', () => {
  it('Should build a SelectBoxes component', () => {
    return Harness.testCreate(SelectBoxesComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="checkbox"]', 8);
    });
  });

  it('Should build a required SelectBoxes component', () => {
    return Harness.testCreate(SelectBoxesComponent, comp2).then((component) => {
      Harness.testElements(component, 'input[type="checkbox"]', 8);
      Harness.testElements(component, 'label.form-check-label > span', 8);
      Harness.testElements(component, 'label.col-form-label.field-required', 1);
    });
  });
});

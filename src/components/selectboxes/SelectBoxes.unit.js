import Harness from '../../../test/harness';
import SelectBoxesComponent from './SelectBoxes';

import {
  comp1,
} from './fixtures';

describe('SelectBoxes Component', () => {
  it('Should build a SelectBoxes component', () => {
    return Harness.testCreate(SelectBoxesComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="checkbox"]', 8);
    });
  });
});

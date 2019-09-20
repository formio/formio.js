import Harness from '../../../test/harness';
import ColumnsComponent from './Columns';

import {
  comp1
} from './fixtures';

describe('Columns Component', () => {
  it('Should build a columns component', () => {
    return Harness.testCreate(ColumnsComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
    });
  });
});

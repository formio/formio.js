import Harness from '../../../test/harness';
import TableComponent from './Table';

import {
  comp1
} from './fixtures';

describe('Table Component', () => {
  it('Should build a Table component', () => {
    return Harness.testCreate(TableComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 6);
    });
  });
});

import Harness from '../harness';
import TableComponent from '../../src/components/table/Table';

import {
  comp1
} from './fixtures/table';

describe('Table Component', () => {
  it('Should build a Table component', () => {
    return Harness.testCreate(TableComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 6);
    });
  });
});

import assert from 'power-assert';

import Harness from '../../../test/harness';
import DataGridComponent from './DataGrid';

import {
  comp1
} from './fixtures';

describe('DataGrid Component', () => {
  it('Should build a data grid component', () => {
    return Harness.testCreate(DataGridComponent, comp1).then((component) => {
      document.body.appendChild(component.getElement());
      Harness.testElements(component, 'input[type="text"]', 3);
    });
  });

  it('Should get and set values within the grid.', () => {
    return Harness.testCreate(DataGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          make: 'Jeep',
          model: 'Wrangler',
          year: 1997
        }
      ]);
    });
  });

  it('Should be able to add another row.', () => {
    return Harness.testCreate(DataGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          make: 'Jeep',
          model: 'Wrangler',
          year: 1997
        }
      ]);
      component.addRow();
      assert.deepEqual(component.getValue(), [
        {
          make: 'Jeep',
          model: 'Wrangler',
          year: 1997
        },
        {
          make: '',
          model: '',
          year: null
        }
      ]);
    });
  });
});

import assert from 'power-assert';

import Harness from '../../../test/harness';
import DataGridComponent from './DataGrid';

import {
  comp1
} from './fixtures';

describe('DataGrid Component', () => {
  it('Should build a data grid component', (done) => {
    Harness.testCreate(DataGridComponent, comp1).then((component) => {
      document.body.appendChild(component.getElement());
      Harness.testElements(component, 'input[type="text"]', 3);
      done();
    });
  });

  it('Should get and set values within the grid.', (done) => {
    Harness.testCreate(DataGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          make: 'Jeep',
          model: 'Wrangler',
          year: 1997
        },
        {
          make: 'Chevy',
          model: 'Tahoe',
          year: 2014
        }
      ]);
      done();
    });
  });

  it('Should be able to add another row.', (done) => {
    Harness.testCreate(DataGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          make: 'Jeep',
          model: 'Wrangler',
          year: 1997
        }
      ]);
      component.addValue();
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
      done();
    });
  });
});

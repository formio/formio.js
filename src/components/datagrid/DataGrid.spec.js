'use strict';
import assert from 'power-assert';
import DataGridComponent from './DataGrid';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('DataGrid Component', function() {
  it('Should build a data grid component', function(done) {
    Harness.testCreate(DataGridComponent, comps.comp1).then((component) => {
      Harness.testInputs(component, 'input[type="text"]', 2);
      Harness.testInputs(component, 'input[type="number"]', 1);
      done();
    });
  });

  it('Should get and set values within the grid.', function(done) {
    Harness.testCreate(DataGridComponent, comps.comp1).then((component) => {
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

  it('Should be able to add another row.', function(done) {
    Harness.testCreate(DataGridComponent, comps.comp1).then((component) => {
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
          make: null,
          model: null,
          year: null
        }
      ]);
      done();
    });
  });
});

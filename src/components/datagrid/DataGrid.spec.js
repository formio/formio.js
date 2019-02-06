import assert from 'power-assert';
import { expect } from 'chai';
import Harness from '../../../test/harness';
import DataGridComponent from './DataGrid';

import {
  comp1,
  comp2,
  withDefValue,
  withRowGroupsAndDefValue,
} from './fixtures';

describe('DataGrid Component', function() {
  it('Should build a data grid component', (done) => {
    Harness.testCreate(DataGridComponent, comp1).then((component) => {
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
          model: ''
        }
      ]);
      done();
    });
  });

  it('Should allow provide default value', function(done) {
    try {
      Harness.testCreate(DataGridComponent, withDefValue)
        .then((datagrid) => {
          expect(datagrid.getValue()).to.deep.equal([
            { name: 'Alex', age: 1 },
            { name: 'Bob',  age: 2 },
            { name: 'Conny', age: 3 }
          ]);
          done();
        }, done)
        .catch(done);
    }
    catch (err) {
      done(err);
    }
  });

  it('Should allow provide default value in row-groups model', function(done) {
    try {
      Harness.testCreate(DataGridComponent, withRowGroupsAndDefValue)
        .then((datagrid) => {
          expect(datagrid.getValue()).to.deep.equal([
            { name: 'Alex', age: 1 },
            { name: 'Bob',  age: 2 },
            { name: 'Conny', age: 3 },
            { name: '' },
            { name: '' }
          ]);
          done();
        }, done)
        .catch(done);
    }
    catch (err) {
      done(err);
    }
  });
});

describe('DataGrid Panels', () => {
  it('Should build a data grid component', (done) => {
    Harness.testCreate(DataGridComponent, comp2).then((component) => {
      done();
    });
  });

  it('Should be able to set the values of one panel in the DataGrid.', (done) => {
    Harness.testCreate(DataGridComponent, comp2).then((component) => {
      Harness.testSetGet(component, [
        {
          firstName: 'Joe',
          lastName: 'Smith'
        }
      ]);

      // Now add a new row.
      component.addValue();
      assert.deepEqual(component.getValue(), [
        {
          firstName: 'Joe',
          lastName: 'Smith'
        },
        {
          firstName: '',
          lastName: ''
        }
      ]);
      done();
    });
  });
});

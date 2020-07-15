import _ from 'lodash';
import assert from 'power-assert';
import { expect } from 'chai';
import Harness from '../../../test/harness';
import DataGridComponent from './DataGrid';

import {
  comp1,
  comp2,
  comp3,
  comp4,
  withDefValue,
  withRowGroupsAndDefValue,
} from './fixtures';

describe('DataGrid Component', () => {
  it('Should not show alert message in modal edit and close modal window when clicking on modal overlay and value was not changed', (done) => {
    Harness.testCreate(DataGridComponent, comp4).then((component) => {
      const hiddenModalWindow = component.element.querySelector('.component-rendering-hidden');
      assert.equal(!!hiddenModalWindow, true);

      const clickEvent = new Event('click');
      const openModalElement = component.refs.openModal;

      openModalElement.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(!!component.element.querySelector('.component-rendering-hidden'), false);

        const clickEvent = new Event('click');
        const modalOverlay = component.refs.modalOverlay;

        modalOverlay.dispatchEvent(clickEvent);

        setTimeout(() => {
          const dialogWindowHeader = document.querySelector('[ref="dialogHeader"]');
          //checking if there is dialog window
          assert.equal( !!dialogWindowHeader, false);

          const hiddenModalWindow = component.element.querySelector('.component-rendering-hidden');
          //checking if the modal window was closed
          assert.equal(!!hiddenModalWindow, true);
          done();
        }, 300);
      }, 200);
    });
  });

  it(`Should show alert message in modal edit, when clicking on modal overlay and value was changed, 
    and clear values when pushing 'yes, delete it' in alert container`, (done) => {
    Harness.testCreate(DataGridComponent, comp4).then((component) => {
      const hiddenModalWindow = component.element.querySelector('.component-rendering-hidden');
      assert.equal(!!hiddenModalWindow, true);

      const clickEvent = new Event('click');
      const openModalElement = component.refs.openModal;
      //open modal edit window
      openModalElement.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(!!component.element.querySelector('.component-rendering-hidden'), false);

        const inputEvent = new Event('input');
        const dataGridInputField = component.element.querySelector('[name="data[dataGrid][0][number]"]');

        dataGridInputField.value = 55555;
        //input value in dataGrid field inside modal edit window
        dataGridInputField.dispatchEvent(inputEvent);

        setTimeout(() => {
          assert.equal( component.element.querySelector('[name="data[dataGrid][0][number]"]').value, '55555');

          const clickEvent = new Event('click');
          const modalOverlay = component.refs.modalOverlay;
          //click outside modal edit window
          modalOverlay.dispatchEvent(clickEvent);

          setTimeout(() => {
            const dialogWindowHeader = document.querySelector('[ref="dialogHeader"]');
            assert.equal( !!dialogWindowHeader, true);

            const clickEvent = new Event('click');
            const btnForCleaningValues = document.querySelector('[ref="dialogYesButton"]');
            //click on 'yes, delete it' button inside alert window
            btnForCleaningValues.dispatchEvent(clickEvent);

            setTimeout(() => {
              const clickEvent = new Event('click');
              const openModalElement = component.refs.openModal;
              //open edit modal window again
              openModalElement.dispatchEvent(clickEvent);

              setTimeout(() => {
                assert.equal( component.element.querySelector('[name="data[dataGrid][0][number]"]').value, '');
                done();
              }, 350);
            }, 300);
          }, 250);
        }, 200);
      }, 150);
    });
  });

  it('Should build a data grid component', () => {
    return Harness.testCreate(DataGridComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 3);
    });
  });

  it('Should not skip validation on input nested components', done => {
    Harness.testCreate(DataGridComponent, comp1)
      .then(cmp => {
        expect(cmp.shouldSkipValidation()).to.be.false;
        done();
      }, done)
      .catch(done);
  });

  it('Should get and set values within the grid.', () => {
    return Harness.testCreate(DataGridComponent, comp1).then((component) => {
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
          model: ''
        }
      ]);
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

  describe('get minLength', () => {
    it('should return minimal number of required rows', () => {
      const EIDV = 'Invalid default value';
      const EDFC = 'Differ from configured value';
      const EDFG = 'Differ from number of rows in groups';
      const base = { type: 'datagrid', key: 'testkey' };
      let schema = _.cloneDeep(base);
      let datagrid = new DataGridComponent(schema, {});

      expect(datagrid.minLength, EIDV).to.equal(0);

      schema = Object.assign(_.cloneDeep(base), { validate: { minLength: 5 } });
      datagrid = new DataGridComponent(schema, {});
      expect(datagrid.minLength, EDFC).to.equal(5);

      schema = Object.assign(_.cloneDeep(base), {
        enableRowGroups: true,
        rowGroups: [
          { label: 'H1', numberOfRows: 1 },
          { label: 'B2', numberOfRows: 3 },
          { label: 'C3', numberOfRows: 3 },
          { label: 'M4', numberOfRows: 2 }
        ]
      });
      datagrid = new DataGridComponent(schema, {});
      expect(datagrid.minLength, EDFG).to.equal(9);

      schema = Object.assign(_.cloneDeep(base), {
        validate: { minLength: 5 },
        enableRowGroups: true,
        rowGroups: [
          { label: 'H1', numberOfRows: 1 },
          { label: 'B2', numberOfRows: 3 },
          { label: 'C3', numberOfRows: 3 },
          { label: 'M4', numberOfRows: 2 }
        ]
      });
      datagrid = new DataGridComponent(schema, {});
      if (datagrid.minLength === 5) {
        expect.fail('Number of row should take precedence over config');
      }
      else {
        expect(datagrid.minLength, EDFG).to.equal(9);
      }
    });
  });

  describe('getGroupSizes', () => {
    it('should return array of numbers representing group sizes', () => {
      const { getGroupSizes } = DataGridComponent.prototype;
      let self = { component: {} };

      expect(getGroupSizes.call(self)).to.deep.equal([]);

      self = { component: {
        rowGroups: [{ numberOfRows: 1 }]
      } };

      expect(getGroupSizes.call(self)).to.deep.equal([1]);

      self = { component: {
        rowGroups: [{ numberOfRows: 1 }, { numberOfRows: 2 }]
      } };

      expect(getGroupSizes.call(self)).to.deep.equal([1, 2]);

      self = { component: {
        rowGroups: [{ numberOfRows: 1 }, { numberOfRows: 3 }, { numberOfRows: 10 }]
      } };

      expect(getGroupSizes.call(self)).to.deep.equal([1, 3, 10]);
    });
  });
});

describe('DataGrid Panels', () => {
  it('Should build a data grid component', () => {
    return Harness.testCreate(DataGridComponent, comp2);
  });

  it('Should be able to set the values of one panel in the DataGrid.', () => {
    return Harness.testCreate(DataGridComponent, comp2).then((component) => {
      Harness.testSetGet(component, [
        {
          firstName: 'Joe',
          lastName: 'Smith'
        }
      ]);

      // Now add a new row.
      component.addRow();
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
    });
  });
});

describe('Datagrid disabling', () => {
  it('Child components should be disabled', () => {
    return Harness.testCreate(DataGridComponent, comp3).then((component) => {
      assert.equal(component.components.reduce((acc, child) => acc && child.parentDisabled, true), true);
    });
  });
});

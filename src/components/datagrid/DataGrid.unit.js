import _ from 'lodash';
import assert from 'power-assert';
import { expect } from 'chai';
import sinon from 'sinon';
import Harness from '../../../test/harness';
import DataGridComponent from './DataGrid';
import Formio from '../../Formio';

import {
  comp1,
  comp2,
  comp3,
  comp4,
  comp5,
  withDefValue,
  withRowGroupsAndDefValue,
  modalWithRequiredFields,
  withConditionalFieldsAndValidations,
  withLogic
} from './fixtures';

describe('DataGrid Component', () => {
  it('Test modal edit confirmation dialog', (done) => {
    Harness.testCreate(DataGridComponent, comp5).then((component) => {
      component.componentModal.openModal();
      const fakeEvent = {
        preventDefault: () => {}
      };
      component.componentModal.showDialogListener(fakeEvent);
      assert.equal(component.componentModal.isOpened, false, 'Should be closed without confirmation dialog since value was not changed');
      setTimeout(() => {
        component.componentModal.openModal();
        Harness.setInputValue(component, 'data[dataGrid][0][textField]', 'My Text');
        setTimeout(() => {
          component.componentModal.showDialogListener(fakeEvent);
          assert.equal(component.componentModal.isValueChanged(), true, 'Should return true since value was modified');
          assert.equal(component.componentModal.isOpened, true, 'Should stay opened and wait until user confirm closing without changes saving');
          assert(component.componentModal.dialog, 'Should open confirmation dialog');
          component.componentModal.closeDialog(fakeEvent);
          component.destroy();
          done();
        }, 100);
      }, 100);
    }).catch(done);
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
          assert.equal(component.element.querySelector('[name="data[dataGrid][0][number]"]').value, '55555');

          const clickEvent = new Event('click');
          const modalOverlay = component.refs.modalOverlay;
          //click outside modal edit window
          modalOverlay.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(!!component.componentModal.dialog, true);

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
          model: '',
          year: ''
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
            { name: '', age: '' },
            { name: '', age: '' }
          ]);
          done();
        }, done)
        .catch(done);
    }
    catch (err) {
      done(err);
    }
  });

  it('Should not cause setValue loops when logic within hidden component is set', function(done) {
    Formio.createForm(document.createElement('div'), withLogic)
      .then((form) => {
        const datagrid = form.getComponent('dataGrid');
        const spyFunc = sinon.spy(datagrid, 'checkComponentConditions');
        const textField = form.getComponent('escalationId');
        const select = form.getComponent('teamName');

        textField.component.hidden = true;
        select.setValue('preRiskAnalysis', { modified: true });

        setTimeout(() => {
          expect(spyFunc.callCount).to.be.lessThan(4);
          done();
        }, 1500);
      });
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

  it('Test "components" property and their context', (done) => {
    const testComponentsData = (components, expectedData) => {
      components.forEach((comp) => assert.deepEqual(
        comp.data,
        expectedData,
        'Data of components inside DataGrid should be equal to row\'s data'
      ));
    };

    Formio.createForm(document.createElement('div'), withConditionalFieldsAndValidations)
      .then((form) => {
        const rootText = form.getComponent(['text']);
        rootText.setValue('Match', { modified: true });

        setTimeout(() => {
          const emptyRowData = {
            rootTest: '',
            rowTest: ''
          };
          const dataGrid = form.getComponent(['dataGrid']);

          assert.equal(dataGrid.components.length, 6, 'DataGrid.components should contain 6 components');
          testComponentsData(dataGrid.components, emptyRowData);

          const showTextFieldInsideDataGridRadio = form.getComponent(['radio']);
          showTextFieldInsideDataGridRadio.setValue('show', { modified: true });

          setTimeout(() => {
            const rowData1 = { ...emptyRowData, radio1: '' };
            const dataGridRowRadio = form.getComponent(['dataGrid', 0, 'radio1']);

            assert.equal(dataGrid.components.length, 6, 'DataGrid.components should contain 6 components');
            testComponentsData(dataGrid.components, rowData1);
            assert.equal(dataGridRowRadio.visible, true, 'Radio inside DataGrid should become visible');

            dataGridRowRadio.setValue('dgShow', { modified: true });

            setTimeout(() => {
              const rowData2 =  {
                ...emptyRowData,
                radio1: 'dgShow',
                rowShowShowTextfieldWhenDataGridRadioHasShowValue: ''
              };
              const dataGridRowConditionalField = form.getComponent(['dataGrid', 0, 'rowShowShowTextfieldWhenDataGridRadioHasShowValue']);

              assert.equal(dataGrid.components.length, 6, 'DataGrid.components should contain 6 components');
              testComponentsData(dataGrid.components, rowData2);
              assert.equal(dataGridRowConditionalField.visible, true, 'Conditional field inside DataGrid should become visible');

              const rootTest = form.getComponent(['dataGrid', 0, 'rootTest']);
              const rowTest = form.getComponent(['dataGrid', 0, 'rowTest']);

              rootTest.setValue('Match', { modified: true });
              rowTest.setValue('Match', { modified: true });

              setTimeout(() => {
                const rowData3 = {
                  ...rowData2,
                  rowTest: 'Match',
                  rootTest: 'Match'
                };

                assert.equal(dataGrid.components.length, 6, 'DataGrid.components should contain 6 components');
                testComponentsData(dataGrid.components, rowData3);

                form.checkAsyncValidity(null, true).then((valid) => {
                  assert(valid, 'Form should be valid');
                  done();
                }).catch(done);
              }, 300);
            }, 300);
          }, 300);
        }, 300);
      })
      .catch(done);
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

describe('DataGrid disabling', () => {
  it('Child components should be disabled', () => {
    return Harness.testCreate(DataGridComponent, comp3).then((component) => {
      assert.equal(component.components.reduce((acc, child) => acc && child.parentDisabled, true), true);
    });
  });
});

describe('DataGrid modal', () => {
  it('Should be highlighted in red when invalid', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(formElement, {
      display: 'form',
      components: [modalWithRequiredFields]
    })
    .then((form) => {
      const data = {
        dataGrid: [
          {
            textField: '',
            textArea: ''
          }
        ]
      };

      form.checkValidity(data, true, data);

      setTimeout(() => {
        Harness.testModalWrapperErrorClasses(form);

        const validData = {
          dataGrid: [
            {
              textField: 'Some text',
              textArea: 'Mre text'
            }
          ]
        };

        form.setSubmission({ data: validData });

        setTimeout(() => {
          Harness.testModalWrapperErrorClasses(form, false);
          done();
        }, 200);
      }, 200);
    })
    .catch(done);
  });
});

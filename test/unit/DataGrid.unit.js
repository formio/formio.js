import _ from 'lodash';
import assert from 'power-assert';
import { expect } from 'chai';
import sinon from 'sinon';
import Harness from '../harness';
import DataGridComponent from '../../src/components/datagrid/DataGrid';
import { Formio } from '../../src/Formio';
import { fastCloneDeep } from '../../src/utils/utils';
import dragula from 'dragula';
import {
  comp1,
  comp2,
  comp3,
  comp4,
  comp5,
  comp6,
  comp7,
  comp8,
  comp9,
  comp10,
  comp11,
  withDefValue,
  withRowGroupsAndDefValue,
  modalWithRequiredFields,
  withConditionalFieldsAndValidations,
  withLogic,
  withCollapsibleRowGroups,
  withAllowCalculateOverride,
  twoWithAllowCalculatedOverride,
  withCheckboxes,
  withReorder,
} from './fixtures/datagrid';

describe('DataGrid Component', function () {
  before(function () {
    window.dragula = dragula;
  });

  after(function () {
    delete window.dragula;
  });

  it('Test modal edit confirmation dialog', function (done) {
    Harness.testCreate(DataGridComponent, comp5)
      .then((component) => {
        component.componentModal.openModal();
        const fakeEvent = {
          preventDefault: () => {},
        };
        component.componentModal.showDialogListener(fakeEvent);
        assert.equal(
          component.componentModal.isOpened,
          false,
          'Should be closed without confirmation dialog since value was not changed',
        );
        setTimeout(() => {
          component.componentModal.openModal();
          Harness.setInputValue(component, 'data[dataGrid][0][textField]', 'My Text');
          setTimeout(() => {
            component.componentModal.showDialogListener(fakeEvent);
            assert.equal(
              component.componentModal.isValueChanged(),
              true,
              'Should return true since value was modified',
            );
            assert.equal(
              component.componentModal.isOpened,
              true,
              'Should stay opened and wait until user confirm closing without changes saving',
            );
            assert(component.componentModal.dialog, 'Should open confirmation dialog');
            component.componentModal.closeDialog(fakeEvent);
            component.destroy();
            done();
          }, 100);
        }, 100);
      })
      .catch(done);
  });

  it(`Should show alert message in modal edit, when clicking on modal overlay and value was changed,
    and clear values when pushing 'yes, delete it' in alert container`, function (done) {
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
        const dataGridInputField = component.element.querySelector(
          '[name="data[dataGrid][0][number]"]',
        );

        dataGridInputField.value = 55555;
        //input value in dataGrid field inside modal edit window
        dataGridInputField.dispatchEvent(inputEvent);

        setTimeout(() => {
          assert.equal(
            component.element.querySelector('[name="data[dataGrid][0][number]"]').value,
            '55555',
          );

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
                assert.equal(
                  component.element.querySelector('[name="data[dataGrid][0][number]"]').value,
                  '',
                );
                done();
              }, 350);
            }, 300);
          }, 250);
        }, 200);
      }, 150);
    });
  });

  it('Should build a data grid component', function () {
    return Harness.testCreate(DataGridComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 3);
    });
  });

  it('Should build a data grid component with formio-component-datagrid class property', function (done) {
    Harness.testCreate(DataGridComponent, comp6)
      .then((component) => {
        const element = component.element.component.components[0].element;
        setTimeout(() => {
          assert.deepEqual(element.className.includes('formio-component-datagrid'), true);
          done();
        }, 200);
      }, done)
      .catch(done);
  });

  it('Should not skip validation on input nested components', function (done) {
    Harness.testCreate(DataGridComponent, comp1)
      .then((cmp) => {
        expect(cmp.shouldSkipValidation()).to.be.false;
        done();
      }, done)
      .catch(done);
  });

  it('Should get and set values within the grid.', function () {
    return Harness.testCreate(DataGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          make: 'Jeep',
          model: 'Wrangler',
          year: 1997,
        },
        {
          make: 'Chevy',
          model: 'Tahoe',
          year: 2014,
        },
      ]);
    });
  });

  it('Should be able to add another row.', function () {
    return Harness.testCreate(DataGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          make: 'Jeep',
          model: 'Wrangler',
          year: 1997,
        },
      ]);
      component.addRow();
      assert.deepEqual(component.getValue(), [
        {
          make: 'Jeep',
          model: 'Wrangler',
          year: 1997,
        },
        {
          make: '',
          model: '',
        },
      ]);
    });
  });

  it('Should allow provide default value', function (done) {
    try {
      Harness.testCreate(DataGridComponent, withDefValue)
        .then((datagrid) => {
          expect(datagrid.getValue()).to.deep.equal([
            { name: 'Alex', age: 1 },
            { name: 'Bob', age: 2 },
            { name: 'Conny', age: 3 },
          ]);
          done();
        }, done)
        .catch(done);
    } catch (err) {
      done(err);
    }
  });

  it('Should remove the corresponding row from the metadata when removing a row', function (done) {
    Formio.createForm(document.createElement('div'), comp11)
      .then((form) => {
        const checkValue = (index, value) => {
          assert.equal(datagrid.getValue()[index].select, value);
        };
        const datagrid = form.getComponent('dataGrid');
        datagrid.addRow();
        assert.equal(datagrid.getValue().length, 2);
        const select = form.getComponent('dataGrid[1].select');
        select.setValue('individual');
        checkValue(0, 'entity');
        checkValue(1, 'individual');
        setTimeout(() => {
          assert.equal(select.getView(), '<span>Individual</span>');
          datagrid.removeRow(1);
          assert.equal(datagrid.getValue().length, 1);
          datagrid.addRow();
          checkValue(0, 'entity');
          checkValue(1, 'entity');
          setTimeout(() => {
            const selectNew = form.getComponent('dataGrid[1].select');
            assert.equal(selectNew.getView(), '<span>Entity</span>');
            done();
          }, 200);
        }, 200);
      })
      .catch(done);
  });

  it('Should allow provide default value in row-groups model', function (done) {
    try {
      Harness.testCreate(DataGridComponent, withRowGroupsAndDefValue)
        .then((datagrid) => {
          expect(datagrid.getValue()).to.deep.equal([
            { name: 'Alex', age: 1 },
            { name: 'Bob', age: 2 },
            { name: 'Conny', age: 3 },
            { name: '' },
            { name: '' },
          ]);
          done();
        }, done)
        .catch(done);
    } catch (err) {
      done(err);
    }
  });

  it('Should not cause setValue loops when logic within hidden component is set', function (done) {
    Formio.createForm(document.createElement('div'), withLogic).then((form) => {
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

  it('Should collapse group rows on group header click', function (done) {
    Formio.createForm(document.createElement('div'), withCollapsibleRowGroups).then((form) => {
      const groupHeadersRefName = 'datagrid-dataGrid-group-header';
      const datagrid = form.getComponent('dataGrid');
      assert.equal(datagrid.refs[groupHeadersRefName][0]?.classList?.contains('collapsed'), false);
      assert.equal(datagrid.refs.chunks[0][0].classList?.contains('hidden'), false);
      assert.equal(datagrid.refs.chunks[0][1].classList?.contains('hidden'), false);

      const clickEvent = new Event('click');
      datagrid.refs[groupHeadersRefName][0].dispatchEvent(clickEvent);
      setTimeout(() => {
        const collapedGroupRows = datagrid.refs.chunks[0] || [];
        assert.equal(datagrid.refs[groupHeadersRefName][0]?.classList?.contains('collapsed'), true);
        assert.equal(collapedGroupRows[0]?.classList?.contains('hidden'), true);
        assert.equal(collapedGroupRows[1]?.classList?.contains('hidden'), true);
        done();
      }, 300);
    });
  });

  describe('get minLength', function () {
    it('should return minimal number of required rows', function () {
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
          { label: 'M4', numberOfRows: 2 },
        ],
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
          { label: 'M4', numberOfRows: 2 },
        ],
      });
      datagrid = new DataGridComponent(schema, {});
      if (datagrid.minLength === 5) {
        expect.fail('Number of row should take precedence over config');
      } else {
        expect(datagrid.minLength, EDFG).to.equal(9);
      }
    });
  });

  describe('getGroupSizes', function () {
    it('should return array of numbers representing group sizes', function () {
      const { getGroupSizes } = DataGridComponent.prototype;
      let self = { component: {} };

      expect(getGroupSizes.call(self)).to.deep.equal([]);

      self = {
        component: {
          rowGroups: [{ numberOfRows: 1 }],
        },
      };

      expect(getGroupSizes.call(self)).to.deep.equal([1]);

      self = {
        component: {
          rowGroups: [{ numberOfRows: 1 }, { numberOfRows: 2 }],
        },
      };

      expect(getGroupSizes.call(self)).to.deep.equal([1, 2]);

      self = {
        component: {
          rowGroups: [{ numberOfRows: 1 }, { numberOfRows: 3 }, { numberOfRows: 10 }],
        },
      };

      expect(getGroupSizes.call(self)).to.deep.equal([1, 3, 10]);
    });
  });

  it('Test "components" property and their context', function (done) {
    const testComponentsData = (components, expectedData) => {
      components.forEach((comp) =>
        assert.deepEqual(
          comp.data,
          expectedData,
          "Data of components inside DataGrid should be equal to row's data",
        ),
      );
    };

    Formio.createForm(document.createElement('div'), withConditionalFieldsAndValidations)
      .then((form) => {
        const rootText = form.getComponent(['text']);
        rootText.setValue('Match', { modified: true });

        setTimeout(() => {
          const emptyRowData = {
            rootTest: '',
            rowTest: '',
          };
          const dataGrid = form.getComponent(['dataGrid']);

          assert.equal(
            dataGrid.components.length,
            6,
            'DataGrid.components should contain 6 components',
          );
          testComponentsData(dataGrid.components, emptyRowData);

          const showTextFieldInsideDataGridRadio = form.getComponent(['radio']);
          showTextFieldInsideDataGridRadio.setValue('show', { modified: true });

          setTimeout(() => {
            const rowData1 = { ...emptyRowData, radio1: '' };
            const dataGridRowRadio = form.getComponent(['dataGrid', 0, 'radio1']);

            assert.equal(
              dataGrid.components.length,
              6,
              'DataGrid.components should contain 6 components',
            );
            testComponentsData(dataGrid.components, rowData1);
            assert.equal(
              dataGridRowRadio.visible,
              true,
              'Radio inside DataGrid should become visible',
            );

            dataGridRowRadio.setValue('dgShow', { modified: true });

            setTimeout(() => {
              const rowData2 = {
                ...emptyRowData,
                radio1: 'dgShow',
                rowShowShowTextfieldWhenDataGridRadioHasShowValue: '',
              };
              const dataGridRowConditionalField = form.getComponent([
                'dataGrid',
                0,
                'rowShowShowTextfieldWhenDataGridRadioHasShowValue',
              ]);

              assert.equal(
                dataGrid.components.length,
                6,
                'DataGrid.components should contain 6 components',
              );
              testComponentsData(dataGrid.components, rowData2);
              assert.equal(
                dataGridRowConditionalField.visible,
                true,
                'Conditional field inside DataGrid should become visible',
              );

              const rootTest = form.getComponent(['dataGrid', 0, 'rootTest']);
              const rowTest = form.getComponent(['dataGrid', 0, 'rowTest']);

              rootTest.setValue('Match', { modified: true });
              rowTest.setValue('Match', { modified: true });

              setTimeout(() => {
                const rowData3 = {
                  ...rowData2,
                  rowTest: 'Match',
                  rootTest: 'Match',
                };

                assert.equal(
                  dataGrid.components.length,
                  6,
                  'DataGrid.components should contain 6 components',
                );
                testComponentsData(dataGrid.components, rowData3);

                form
                  .checkAsyncValidity(null, true)
                  .then((valid) => {
                    assert(valid, 'Form should be valid');
                    done();
                  })
                  .catch(done);
              }, 300);
            }, 300);
          }, 300);
        }, 300);
      })
      .catch(done);
  });

  it('Should retain previous checkboxes checked property when add another is pressed (checked)', function () {
    return Harness.testCreate(DataGridComponent, withCheckboxes).then((component) => {
      component.childComponentsMap['dataGrid[0].radio'].element.querySelector('input').click();
      component.addRow();
      assert.equal(
        component.childComponentsMap['dataGrid[0].radio'].element.querySelector('input').checked,
        true,
      );
    });
  });

  it('Should retain previous checkboxes checked property when add another is pressed (unchecked)', function () {
    return Harness.testCreate(DataGridComponent, withCheckboxes).then((component) => {
      component.childComponentsMap['dataGrid[0].radio'].element.querySelector('input').click();
      component.childComponentsMap['dataGrid[0].radio'].element.querySelector('input').click();
      component.addRow();
      assert.equal(
        component.childComponentsMap['dataGrid[0].radio'].element.querySelector('input').checked,
        false,
      );
    });
  });

  it('Should lazy load dragula when reorder flag is set to true', async function () {
    await Formio.createForm(document.createElement('div'), comp9, {});
    const dragula = await Formio.libraries.dragula.ready;
    assert.strictEqual(window.dragula, dragula, 'could not find dragula');
    delete Formio.libraries.dragula;
  });

  it('Should not lazy load dragula when reorder flag is set to false', async function () {
    let formJSON = _.cloneDeep(comp9);
    formJSON.components[0].reorder = false;
    await Formio.createForm(document.createElement('div'), formJSON, {});
    assert(!Formio.libraries.dragula);
  });

  it('Should set the pristine of itself and the form the false when reordering occurs', function () {
    return Formio.createForm(document.createElement('div'), comp9, {}).then((form) => {
      const dataGridComponent = form.getComponent('dataGrid');
      const element = document.createElement('tr');
      element.dragInfo = {};
      _.set(element, 'dragInfo.index', 0);
      const tableBody = document.createElement('tbody');
      const sibling = document.createElement('tr');
      sibling.dragInfo = {};
      dataGridComponent.onReorder(element, tableBody, tableBody, sibling);
      assert(
        !form.pristine,
        'form pristine should be set to false when datagrid reordering occurs',
      );
    });
  });

  it('Disable/not disable submit button with required flag in dataGrid', function (done) {
    Formio.createForm(document.createElement('div'), comp10)
      .then((form) => {
        const buttonComponent = form.getComponent('submit');
        assert.equal(buttonComponent.disabled, true, '(1) Component should be disabled');
        const dataGrid = form.getComponent('dataGrid');
        dataGrid.setValue([
          {
            textField: 'some value',
            checkbox: false,
          },
          {
            textField: '',
            checkbox: false,
          },
        ]);

        setTimeout(() => {
          assert.equal(buttonComponent.disabled, false, '(2) Component should be not disabled');
          dataGrid.setValue([
            {
              textField: '',
              checkbox: false,
            },
            {
              textField: '',
              checkbox: false,
            },
          ]);

          setTimeout(() => {
            assert.equal(buttonComponent.disabled, true, '(3) Component should be disabled');
            done();
          }, 300);
        }, 300);
      })
      .catch((err) => done(err));
  });

  describe('DataGrid Panels', function () {
    it('Should build a data grid component', function () {
      return Harness.testCreate(DataGridComponent, comp2);
    });

    it('Should be able to set the values of one panel in the DataGrid.', function () {
      return Harness.testCreate(DataGridComponent, comp2).then((component) => {
        Harness.testSetGet(component, [
          {
            firstName: 'Joe',
            lastName: 'Smith',
          },
        ]);

        // Now add a new row.
        component.addRow();
        assert.deepEqual(component.getValue(), [
          {
            firstName: 'Joe',
            lastName: 'Smith',
          },
          {
            firstName: '',
            lastName: '',
          },
        ]);
      });
    });

    it('Should have unique IDs inside data grid', function () {
      return Harness.testCreate(DataGridComponent, comp7).then((component) => {
        component.addRow();
        const idArr = [];
        component.components.forEach((row, i) => {
          idArr[i] = row.element.component.components[0].id;
        });
        assert.equal(idArr[0] !== idArr[1], true);
      });
    });

    it('Should hide label in header for Button component when hideLabel is true.', function () {
      const formElement = document.createElement('div');
      return Formio.createForm(formElement, {
        display: 'form',
        components: [comp8],
      }).then(() => {
        assert.equal(
          formElement.getElementsByTagName('th')[0].textContent.trim(),
          '',
          'Should hide a label',
        );
        assert.equal(
          formElement.getElementsByTagName('th')[1].textContent.trim(),
          'Text Field',
          'Should show a label',
        );
      });
    });
  });

  describe('DataGrid disabling', function () {
    it('Child components should be disabled', function () {
      return Harness.testCreate(DataGridComponent, comp3).then((component) => {
        assert.equal(
          component.components.reduce((acc, child) => acc && child.parentDisabled, true),
          true,
        );
      });
    });
  });

  describe('DataGrid modal', function () {
    it('Should be highlighted in red when invalid', function (done) {
      const formElement = document.createElement('div');
      Formio.createForm(formElement, {
        display: 'form',
        components: [modalWithRequiredFields],
      })
        .then((form) => {
          form.setSubmission(
            {
              data: {
                dataGrid: [
                  {
                    textField: '',
                    textArea: '',
                  },
                ],
              },
            },
            {
              dirty: true,
            },
          );

          setTimeout(() => {
            Harness.testModalWrapperErrorClasses(form);

            const validData = {
              dataGrid: [
                {
                  textField: 'Some text',
                  textArea: 'Mre text',
                },
              ],
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

  describe('DataGrid calculated values', function () {
    it('Should allow override calculated value', function (done) {
      Formio.createForm(document.createElement('div'), withAllowCalculateOverride)
        .then((form) => {
          const select = form.getComponent('select');
          const dataGrid = form.getComponent('dataGrid');

          assert.deepEqual(dataGrid.getValue(), [
            {
              firstName: '',
              lastName: '',
            },
          ]);

          select.setValue('a', { modified: true });
          setTimeout(() => {
            assert.deepEqual(dataGrid.getValue(), [
              {
                firstName: 'A f 1',
                lastName: 'A l 1',
              },
            ]);

            select.setValue('b', { modified: true });
            setTimeout(() => {
              assert.deepEqual(dataGrid.getValue(), [
                {
                  firstName: 'B f 1',
                  lastName: 'B l 1',
                },
                {
                  firstName: 'B f 2',
                  lastName: 'B l 2',
                },
              ]);

              const firstName = form.getComponent(['dataGrid', 0, 'firstName']);
              firstName.setValue('first name', { modified: true });
              select.setValue('c', { modified: true });
              setTimeout(() => {
                assert.deepEqual(dataGrid.getValue(), [
                  {
                    firstName: 'first name',
                    lastName: 'B l 1',
                  },
                  {
                    firstName: 'B f 2',
                    lastName: 'B l 2',
                  },
                ]);
                done();
              }, 300);
            }, 300);
          }, 300);
        })
        .catch(done);
    });

    it('Should not recalculate value after restoring to previous calculated value', function (done) {
      Formio.createForm(document.createElement('div'), withAllowCalculateOverride)
        .then((form) => {
          const select = form.getComponent('select');
          const dataGrid = form.getComponent('dataGrid');

          assert.deepEqual(dataGrid.getValue(), [
            {
              firstName: '',
              lastName: '',
            },
          ]);

          select.setValue('a', { modified: true });
          setTimeout(() => {
            assert.deepEqual(dataGrid.getValue(), [
              {
                firstName: 'A f 1',
                lastName: 'A l 1',
              },
            ]);

            const firstName = form.getComponent(['dataGrid', 0, 'firstName']);
            firstName.setValue('first name', { modified: true });
            setTimeout(() => {
              select.setValue('c', { modified: true });
              setTimeout(() => {
                assert.deepEqual(dataGrid.getValue(), [
                  {
                    firstName: 'first name',
                    lastName: 'A l 1',
                  },
                ]);

                firstName.setValue('A f 1', { modified: true });
                setTimeout(() => {
                  assert.equal(select.getValue(), 'c');
                  assert.deepEqual(dataGrid.getValue(), [
                    {
                      firstName: 'A f 1',
                      lastName: 'A l 1',
                    },
                  ]);
                  done();
                }, 300);
              }, 300);
            }, 300);
          }, 300);
        })
        .catch(done);
    });

    it('Should calculate value for several DataGrid components', function (done) {
      Formio.createForm(document.createElement('div'), twoWithAllowCalculatedOverride)
        .then((form) => {
          const select = form.getComponent('select');
          const dataGrid = form.getComponent('dataGrid');
          const dataGrid2 = form.getComponent('dataGrid2');

          assert.deepEqual(dataGrid.getValue(), [
            {
              firstName: '',
              lastName: '',
            },
          ]);
          assert.deepEqual(dataGrid2.getValue(), [
            {
              firstName: '',
              lastName: '',
            },
          ]);

          select.setValue('a', { modified: true });
          setTimeout(() => {
            assert.deepEqual(dataGrid.getValue(), [
              {
                firstName: 'A f 1',
                lastName: 'A l 1',
              },
            ]);
            assert.deepEqual(dataGrid2.getValue(), [
              {
                firstName: 'A f 1',
                lastName: 'A l 1',
              },
            ]);

            select.setValue('b', { modified: true });
            setTimeout(() => {
              assert.deepEqual(dataGrid.getValue(), [
                {
                  firstName: 'B f 1',
                  lastName: 'B l 1',
                },
                {
                  firstName: 'B f 2',
                  lastName: 'B l 2',
                },
              ]);
              assert.deepEqual(dataGrid2.getValue(), [
                {
                  firstName: 'B f 1',
                  lastName: 'B l 1',
                },
                {
                  firstName: 'B f 2',
                  lastName: 'B l 2',
                },
              ]);

              const firstName = form.getComponent(['dataGrid', 0, 'firstName']);
              firstName.setValue('first name', { modified: true });
              const firstName2 = form.getComponent(['dataGrid2', 0, 'firstName']);
              firstName2.setValue('first name 2', { modified: true });
              select.setValue('c', { modified: true });
              setTimeout(() => {
                assert.deepEqual(dataGrid.getValue(), [
                  {
                    firstName: 'first name',
                    lastName: 'B l 1',
                  },
                  {
                    firstName: 'B f 2',
                    lastName: 'B l 2',
                  },
                ]);
                assert.deepEqual(dataGrid2.getValue(), [
                  {
                    firstName: 'first name 2',
                    lastName: 'B l 1',
                  },
                  {
                    firstName: 'B f 2',
                    lastName: 'B l 2',
                  },
                ]);
                done();
              }, 300);
            }, 300);
          }, 300);
        })
        .catch(done);
    });
  });

  describe('DataGrid Reorder', function () {
    it('Should display select components labels correctly on rows reorder', function (done) {
      Formio.createForm(document.createElement('div'), withReorder.form)
        .then((form) => {
          form.setSubmission(withReorder.submission).then(() => {
            const values = [
              { value: '11', label: 1 },
              { value: '22', label: 2 },
              { value: '33', label: 3 },
              { value: '44', label: 4 },
              { value: '55', label: 5 },
            ];

            const dataGrid = form.getComponent('dataGrid');
            _.each(dataGrid.components, (selectComp, ind) => {
              const expectedValue = values[ind];
              assert.equal(ind, selectComp.rowIndex);
              assert.equal(selectComp.dataValue, expectedValue.value);
              assert.equal(
                selectComp.templateData[expectedValue.value].data.number,
                expectedValue.label,
              );
            });

            dataGrid.onReorder({ dragInfo: { index: 4 } }, null, null, { dragInfo: { index: 0 } });
            dataGrid.onReorder({ dragInfo: { index: 4 } }, null, null, { dragInfo: { index: 1 } });
            dataGrid.onReorder({ dragInfo: { index: 2 } }, null, null, { dragInfo: { index: 4 } });

            setTimeout(() => {
              const values = [
                { value: '55', label: 5 },
                { value: '44', label: 4 },
                { value: '22', label: 2 },
                { value: '11', label: 1 },
                { value: '33', label: 3 },
              ];

              _.each(dataGrid.components, (selectComp, ind) => {
                const expectedValue = values[ind];
                assert.equal(ind, selectComp.rowIndex, 'Component index after reorder');
                assert.equal(
                  selectComp.dataValue,
                  expectedValue.value,
                  'Component value after reorder',
                );
                assert.equal(
                  selectComp.templateData[expectedValue.value].data.number,
                  expectedValue.label,
                  'Component label value after reorder',
                );
              });

              done();
            }, 600);
          });
        })
        .catch(done);
    });
  });

  describe('SaveDraft functionality', function () {
    let originalMakeRequest, saveDraftCalls;

    before(function (done) {
      originalMakeRequest = Formio.makeRequest;
      saveDraftCalls = 0;

      Formio.setUser({
        _id: '123',
      });

      Formio.makeRequest = (formio, type, url, method, data) => {
        if (type === 'submission' && ['put', 'post'].includes(method)) {
          saveDraftCalls = ++saveDraftCalls;
          return Promise.resolve(fastCloneDeep(data));
        }

        if (type === 'form' && method === 'get') {
          return Promise.resolve(
            fastCloneDeep({
              _id: '65cdd69efb1b9683c216fa1d',
              title: 'test draft',
              name: 'testDraft',
              path: 'testdraft',
              type: 'form',
              display: 'form',
              components: [
                {
                  label: 'Data Grid',
                  reorder: false,
                  addAnotherPosition: 'bottom',
                  layoutFixed: false,
                  enableRowGroups: false,
                  initEmpty: false,
                  tableView: false,
                  validateWhenHidden: false,
                  key: 'dataGrid',
                  type: 'datagrid',
                  input: true,
                  components: [
                    {
                      label: 'Text Field in Data Grid',
                      applyMaskOn: 'change',
                      tableView: true,
                      validateWhenHidden: false,
                      key: 'textField',
                      type: 'textfield',
                      input: true,
                    },
                  ],
                },
                {
                  label: 'Submit',
                  disableOnInvalid: true,
                  tableView: false,
                  key: 'submit',
                  type: 'button',
                  input: true,
                  saveOnEnter: false,
                },
              ],
              project: '65b0ccbaf019a907ac01a869',
              machineName: 'zarbzxibjafpcjb:testDraft',
            }),
          );
        }
      };

      done();
    });

    afterEach(function () {
      saveDraftCalls = 0;
    });

    after(function (done) {
      Formio.makeRequest = originalMakeRequest;
      Formio.setUser();
      done();
    });

    it('Should save the draft after removing row inside Data Grid component', function (done) {
      const formElement = document.createElement('div');
      Formio.createForm(formElement, 'http://localhost:3000/zarbzxibjafpcjb/testdraft', {
        saveDraft: true,
        skipDraftRestore: true,
        saveDraftThrottle: 100,
      })
        .then((form) => {
          setTimeout(() => {
            assert.equal(saveDraftCalls, 0);
            const dataGrid = form.getComponent('dataGrid');
            dataGrid.addRow();
            const textFieldInput = form.getComponent('dataGrid[1].textField').refs.input[0];
            textFieldInput.value = 'test';
            const inputEvent = new Event('input');
            textFieldInput.dispatchEvent(inputEvent);
            setTimeout(() => {
              assert.equal(dataGrid.dataValue.length, 2);
              assert.equal(saveDraftCalls, 1);
              dataGrid.removeRow(1);
              setTimeout(() => {
                assert.equal(dataGrid.dataValue.length, 1);
                assert.equal(saveDraftCalls, 2);
                done();
              }, 300);
            }, 300);
          }, 200);
        })
        .catch((err) => done(err));
    });
  });
});

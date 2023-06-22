import assert from 'power-assert';
import _ from 'lodash';
import Harness from '../../../test/harness';
import EditGridComponent from './EditGrid';
import {
  comp1,
  comp4,
  comp3,
  comp5,
  comp6,
  comp7,
  comp8,
  comp9,
  comp10,
  comp11,
  comp12,
  comp13,
  comp14,
  comp15,
  withOpenWhenEmptyAndConditions,
  compOpenWhenEmpty,
} from './fixtures';

import ModalEditGrid from '../../../test/forms/modalEditGrid';
import Webform from '../../Webform';
import { displayAsModalEditGrid } from '../../../test/formtest';
import Formio from '../../Formio';

describe('EditGrid Component', () => {
  it('Should set correct values in dataMap inside editGrid and allow aditing them', (done) => {
    Harness.testCreate(EditGridComponent, comp4).then((component) => {
      component.setValue([{ dataMap: { key111: '111' } }]);

      setTimeout(()=>{
        const clickEvent = new Event('click');
        const editBtn = component.element.querySelector('.editRow');

        editBtn.dispatchEvent(clickEvent);

        setTimeout(()=>{
          const keyValue = component.element.querySelectorAll('[ref="input"]')[0].value;
          const valueValue = component.element.querySelectorAll('[ref="input"]')[1].value;
          const saveBtnsQty = component.element.querySelectorAll('[ref="editgrid-editGrid-saveRow"]').length;

          assert.equal(saveBtnsQty, 1);
          assert.equal(keyValue, 'key111');
          assert.equal(valueValue, '111');
          done();
        }, 500);
      }, 200);
    });
  });

  it('Should set correct values after reset', (done) => {
    Harness.testCreate(EditGridComponent, comp5)
      .then((component) => {
        assert.equal(component.components.length, 0);

        component.setValue([
          { textField: 'textField1' },
          { textField: 'textField2' }
        ], { resetValue: true });

        setTimeout(() => {
          assert.equal(component.components.length, 2);
          done();
        }, 300);
      });
  });

  it('Should display saved values if there are more then 1 nested components', (done) => {
    Harness.testCreate(EditGridComponent, comp3).then((component) => {
      component.setValue([{ container: { number: 55555 } }, { container: { number: 666666 } }]);

      setTimeout(()=>{
        const firstValue = component.element.querySelectorAll('[ref="editgrid-editGrid-row"]')[0].querySelector('.col-sm-2').textContent.trim();
        const secondValue = component.element.querySelectorAll('[ref="editgrid-editGrid-row"]')[1].querySelector('.col-sm-2').textContent.trim();

        assert.equal(firstValue, '55555');
        assert.equal(secondValue, '666666');
        done();
      }, 600);
    });
  });

  it('Should build an empty edit grid component', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(1)', 'Field 1');
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(2)', 'Field 2');
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '0');
      Harness.testElements(component, 'li.list-group-header', 1);
      Harness.testElements(component, 'li.list-group-item', 1);
      Harness.testElements(component, 'li.list-group-footer', 0);
      Harness.testElements(component, 'div.editRow', 0);
      Harness.testElements(component, 'div.removeRow', 0);
      assert.equal(component.refs[`${component.editgridKey}-addRow`].length, 1);
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
    });
  });

  it('Should build an edit grid component', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(1)', 'Field 1');
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(2)', 'Field 2');
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '0');
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.testElements(component, 'li.list-group-header', 1);
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testElements(component, 'li.list-group-footer', 0);
      Harness.testElements(component, 'div.editRow', 2);
      Harness.testElements(component, 'div.removeRow', 2);
      assert.equal(component.refs[`${component.editgridKey}-addRow`].length, 1);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', 'good');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', 'foo');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', 'good');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', 'bar');
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
    });
  });

  it('Should add a row when add another is clicked', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.testElements(component, 'li.list-group-item', 1);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '0');
      Harness.clickElement(component, component.refs[`${component.editgridKey}-addRow`][0]);
      Harness.testElements(component, 'li.list-group-item', 2);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '0');
      Harness.clickElement(component, component.refs[`${component.editgridKey}-addRow`][0]);
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '0');
      assert(!component.checkValidity(component.getValue(), true), 'Item should not be valid');
    });
  });

  it('Should save a new row when save is clicked', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      component.pristine = false;
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
      Harness.clickElement(component, component.refs[`${component.editgridKey}-addRow`][0]);
      Harness.testElements(component, 'li.list-group-item', 4);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
      Harness.setInputValue(component, 'data[editgrid][2][field1]', 'good');
      Harness.setInputValue(component, 'data[editgrid][2][field2]', 'baz');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      Harness.testElements(component, 'li.list-group-item', 4);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '3');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.row div:nth-child(1)', 'good');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.row div:nth-child(2)', 'baz');
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
    });
  });

  it('Should cancel add a row when cancel is clicked', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
      Harness.clickElement(component, component.refs[`${component.editgridKey}-addRow`][0]);
      Harness.testElements(component, 'li.list-group-item', 4);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
      Harness.setInputValue(component, 'data[editgrid][2][field1]', 'good');
      Harness.setInputValue(component, 'data[editgrid][2][field2]', 'baz');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-danger');
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
      assert.equal(component.editRows.length, 2);
      assert(component.checkValidity(component.getValue(), true), 'Item should be valid');
    });
  });

  it('Should delete a row when delete is clicked', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        },
        {
          field1: 'good',
          field2: 'baz'
        }
      ]);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '3');
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.removeRow');
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', 'good');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', 'foo');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', 'good');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', 'baz');
      assert(component.checkValidity(component.getValue(), true), 'Item should be valid');
    });
  });

  it('Should edit a row when edit is clicked', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      Harness.getInputValue(component, 'data[editgrid][1][field1]', 'good');
      Harness.getInputValue(component, 'data[editgrid][1][field2]', 'bar');
      Harness.testElements(component, 'div.editgrid-actions button.btn-primary', 1);
      Harness.testElements(component, 'div.editgrid-actions button.btn-danger', 1);
      assert(!component.checkValidity(component.getValue(), true), 'Item should not be valid');
    });
  });

  it('Should save a row when save is clicked', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      Harness.setInputValue(component, 'data[editgrid][1][field2]', 'baz');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', 'good');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', 'baz');
      assert(component.checkValidity(component.getValue(), true), 'Item should be valid');
    });
  });

  it('Should cancel edit row when cancel is clicked', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      Harness.setInputValue(component, 'data[editgrid][1][field2]', 'baz');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-danger');
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', 'good');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', 'bar');
      assert(component.checkValidity(component.getValue(), true), 'Item should be valid');
    });
  });

  it('Should show error messages for existing data in rows', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'bad',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        },
        {
          field1: 'also bad',
          field2: 'baz'
        }
      ]);
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.has-error div.editgrid-row-error', 'Must be good');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.has-error div.editgrid-row-error', 'Must be good');
      assert(!component.checkValidity(component.getValue(), true), 'Item should not be valid');
    });
  });

  it('Should not allow saving when errors exist', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.clickElement(component, 'button.btn-primary');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      Harness.getInputValue(component, 'data[editgrid][0][field1]', '');
      Harness.getInputValue(component, 'data[editgrid][0][field2]', '');
      assert(!component.checkValidity(component.getValue(), true), 'Item should not be valid');
      Harness.setInputValue(component, 'data[editgrid][0][field2]', 'baz');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      Harness.getInputValue(component, 'data[editgrid][0][field1]', '');
      Harness.getInputValue(component, 'data[editgrid][0][field2]', 'baz');
      assert(!component.checkValidity(component.getValue(), true), 'Item should not be valid');
      Harness.setInputValue(component, 'data[editgrid][0][field1]', 'bad');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      Harness.getInputValue(component, 'data[editgrid][0][field1]', 'bad');
      Harness.getInputValue(component, 'data[editgrid][0][field2]', 'baz');
      assert(!component.checkValidity(component.getValue(), true), 'Item should not be valid');
      Harness.setInputValue(component, 'data[editgrid][0][field1]', 'good');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      assert(component.checkValidity(component.getValue(), true), 'Item should be valid');
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '1');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', 'good');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', 'baz');
    });
  });

  it('Should not allow saving when rows are open', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      assert(!component.checkValidity(component.getValue(), true), 'Item should not be valid');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      assert(component.checkValidity(component.getValue(), true), 'Item should be valid');
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      assert(!component.checkValidity(component.getValue(), true), 'Item should not be valid');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-danger');
      assert(component.checkValidity(component.getValue(), true), 'Item should be valid');
    });
  });

  it('Should disable components when in read only', () => {
    return Harness.testCreate(EditGridComponent, comp1, { readOnly: true }).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.removeRow');
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
    });
  });

  describe('Display As Modal', () => {
    it('Should show add error classes to invalid components', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(displayAsModalEditGrid).then(() => {
        const editGrid = form.components[0];
        const clickEvent = new Event('click');
        editGrid.addRow();
        setTimeout(() => {
          const dialog = document.querySelector('[ref="dialogContents"]');
          const saveButton = dialog.querySelector('.btn.btn-primary');
          saveButton.dispatchEvent(clickEvent);
          setTimeout(() => {
            assert.equal(editGrid.errors.length, 6);
            const components = Array.from(dialog.querySelectorAll('[ref="component"]'));
            const areRequiredComponentsHaveErrorWrapper = components.every((comp) => {
              const { className } = comp;
              return (className.includes('required') && className.includes('formio-error-wrapper')) || true;
            });
            assert.equal(areRequiredComponentsHaveErrorWrapper, true);
            document.body.innerHTML = '';
            done();
          }, 100);
        }, 100);
      }).catch(done);
    });

    it('Should set alert with validation errors on save and update them', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(ModalEditGrid).then(() => {
        const editGrid = form.components[0];

        form.checkValidity(form._data, true, form._data);
        assert.equal(form.errors.length, 1);
        editGrid.addRow();

        setTimeout(() => {
          const editRow = editGrid.editRows[0];
          const dialog = editRow.dialog;
          const saveButton = dialog.querySelector('.btn.btn-primary');
          const clickEvent = new Event('click');
          saveButton.dispatchEvent(clickEvent);

          setTimeout(() => {
            const alert = dialog.querySelector('.alert.alert-danger');
            assert.equal(form.errors.length, 3);

            const errorsLinks = alert.querySelectorAll('li');
            assert.equal(errorsLinks.length, 2);
            const textField = editRow.components[0].getComponent('textField');
            textField.setValue('new value');

            setTimeout(() => {
              const alertAfterFixingField = dialog.querySelector('.alert.alert-danger');
              assert.equal(form.errors.length, 2);

              const errorsLinksAfterFixingField = alertAfterFixingField.querySelectorAll('li');
              assert.equal(errorsLinksAfterFixingField.length, 1);

              document.body.innerHTML = '';
              done();
            }, 450);
          }, 100);
        }, 100);
      }).catch(done);
    });

    it('Confirmation dialog', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(comp6).then(() => {
        const component = form.components[0];
        component.addRow();
        const dialog = document.querySelector('[ref="dialogContents"]');
        Harness.dispatchEvent('input', dialog, '[name="data[editGrid][0][textField]"]', (el) => el.value = '12');
        Harness.dispatchEvent('click', dialog, '[ref="dialogClose"]');
        const confirmationDialog = document.querySelector('[ref="confirmationDialog"]');
        assert(confirmationDialog, 'Should open a confirmation dialog when trying to close');
        Harness.dispatchEvent('click', confirmationDialog, '[ref="dialogCancelButton"]');
        setTimeout(() => {
          assert.equal(component.editRows[0].data.textField, '12', 'Data should not be cleared');

          Harness.dispatchEvent('click', dialog, '[ref="dialogClose"]');
          setTimeout(() => {
            const confirmationDialog2 = document.querySelector('[ref="confirmationDialog"]');
            assert(confirmationDialog2, 'Should open again a conformation dialog');
            Harness.dispatchEvent('click', confirmationDialog2, '[ref="dialogYesButton"]');
            setTimeout(() => {
              assert.equal(component.editRows.length, 0, 'Data should be cleared');
              done();
            }, 250);
          }, 250);
        }, 250);
      }).catch(done);
    });

    it('Confirmation dialog shouldn\'t occure if no values within the row are changed', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(comp6).then(() => {
        const component = form.components[0];
        component.setValue([
          { textField: 'v1' }
        ]);
        setTimeout(() => {
          component.editRow(0);
          const dialog = document.querySelector('[ref="dialogContents"]');
          Harness.dispatchEvent('click', dialog, '[ref="dialogClose"]');
          const confirmationDialog = document.querySelector('[ref="confirmationDialog"]');
          assert(!confirmationDialog, 'Shouldn\'t open a confirmation dialog when no values were changed');
          assert.equal(component.editRows[0].data.textField, 'v1', 'Data shouldn\'t be changed');
          done();
        }, 150);
      }).catch(done);
    });

    it('Should not produce many components in Edit view when minLength validation set', done => {
      const formElement = document.createElement('div');
      Formio.createForm(formElement, comp15, { attachMode:'builder' } )
        .then(form => {
          const editGrid = form.components[0];
          const elements = editGrid.element.querySelectorAll('[ref="input"]');

          setTimeout(() => {
            assert.equal(elements.length, 2);
            done();
          }, 200);
        })
        .catch(done);
    });

    it('Should close row when Display as Modal checked', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(comp14).then(() => {
        const editGrid = form.components[0];
        editGrid.addRow();
        setTimeout(() => {
          const dialog = document.querySelector('[ref="dialogContents"]');
          Harness.dispatchEvent('input', dialog, '[name="data[editGrid][0][firstName]"]', (el) => el.value = 'Michael');
          Harness.dispatchEvent('click', dialog, '[ref="dialogClose"]');
          const confirmationDialog = document.querySelector('[ref="confirmationDialog"]');
          Harness.dispatchEvent('click', confirmationDialog, '[ref="dialogYesButton"]');
          setTimeout(() => {
            assert.equal(!!document.querySelector('[ref="dialogContents"]'), false);
            done();
          }, 100);
        }, 100);
      }).catch(done);
    });
  });

  describe('Draft Rows', () => {
    it('Check saving rows as draft', (done) => {
      Harness.testCreate(EditGridComponent, comp5).then((component) => {
        component.addRow();
        Harness.clickElement(component, '[ref="editgrid-editGrid1-saveRow"]');
        assert.deepEqual(component.dataValue, [{ textField: '' }]);
        const isInvalid = !component.checkValidity(component.dataValue, true);
        assert(isInvalid, 'Item should not be valid');
        assert(component.editRows[0].state === 'draft', 'Row should be saved as draft if it has errors');
        done();
      }).catch(done);
    });

    it('Should not show row errors alerts if drafts enabled in modal-edit EditGrid', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      ModalEditGrid.components[0].rowDrafts = true;

      form.setForm(ModalEditGrid).then(() => {
        const editGrid = form.components[0];
        editGrid.addRow();

        setTimeout(() => {
          editGrid.saveRow(0);

          setTimeout(() => {
            editGrid.editRow(0).then(() => {
              const textField = form.getComponent(['editGrid', 0, 'form', 'textField']);

              textField.setValue('someValue');

              setTimeout(() => {
                Harness.dispatchEvent('click', editGrid.editRows[0].dialog, `.editgrid-row-modal-${editGrid.id} [ref="dialogClose"]`);
                setTimeout(() => {
                  const dialog = editGrid.editRows[0].confirmationDialog;

                  Harness.dispatchEvent('click', dialog, '[ref="dialogYesButton"]');

                  setTimeout(() => {
                    editGrid.editRow(0).then(() => {
                      textField.setValue('someValue');

                      setTimeout(() => {
                        const errorAlert = editGrid.editRows[0].dialog.querySelector(`#error-list-${editGrid.id}`);
                        const hasError = textField.className.includes('has-error');
                        assert(!hasError, 'Should stay valid until form is submitted');
                        assert.equal(errorAlert, null, 'Should be valid');

                        done();
                      }, 100);
                    });
                  }, 100);
                }, 100);
              }, 100);
            });
          }, 100);
        }, 100);
      }).catch(done)
      .finally(() => {
        ModalEditGrid.components[0].rowDrafts = false;
      });
    });

    it('Should keep fields valid inside NestedForms if drafts are enabled', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      ModalEditGrid.components[0].rowDrafts = true;

      form.setForm(ModalEditGrid).then(() => {
        const editGrid = form.components[0];

        form.checkValidity(form._data, true, form._data);
        assert.equal(form.errors.length, 1, 'Should have an error saying that EditGrid is required');

        // 1. Add a row
        editGrid.addRow();

        setTimeout(() => {
          const editRow = editGrid.editRows[0];
          const dialog = editRow.dialog;

          // 2. Save the row
          Harness.dispatchEvent('click', dialog, '.btn.btn-primary');

          setTimeout(() => {
            const alert = dialog.querySelector('.alert.alert-danger');
            assert.equal(form.errors.length, 0, 'Should not add new errors when drafts are enabled');
            assert(!alert, 'Should not show an error alert when drafts are enabled and form is not submitted');

            const textField = editRow.components[0].getComponent('textField');

            // 3. Edit the row
            editGrid.editRow(0);

            setTimeout(() => {
              // 4. Change the value of the text field
              textField.setValue('new value', { modified: true });

              setTimeout(() => {
                assert.equal(textField.dataValue, 'new value');
                // 5. Clear the value of the text field
                textField.setValue('', { modified: true });

                setTimeout(() => {
                  assert.equal(textField.dataValue, '');
                  assert.equal(editGrid.editRows[0].errors.length, 0, 'Should not add error to components inside draft row');

                  const textFieldComponent = textField.element;
                  assert(textFieldComponent.className.includes('has-error'), 'Should add error class to component even when drafts enabled if the component is not pristine');

                  document.innerHTML = '';
                  done();
                }, 300);
              }, 300);
            }, 150);
          }, 100);
        }, 100);
      }).catch(done)
      .finally(() => {
        delete ModalEditGrid.components[0].rowDrafts;
      });
    });

    it('Should keep fields valid inside NestedForms if drafts are enabled', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      ModalEditGrid.components[0].rowDrafts = true;

      form.setForm(ModalEditGrid).then(() => {
        const editGrid = form.components[0];
        // 1. Add a row
        editGrid.addRow();

        setTimeout(() => {
          const editRow = editGrid.editRows[0];
          const dialog = editRow.dialog;

          // 2. Save the row
          Harness.dispatchEvent('click', dialog, '.btn.btn-primary');

          setTimeout(() => {
            // 3. Submit the form
            Harness.dispatchEvent('click', form.element, '[name="data[submit]"]');

            setTimeout(() => {
              assert.equal(editGrid.errors.length, 3, 'Should be validated after an attempt to submit');
              assert.equal(editGrid.editRows[0].errors.length, 2, 'Should dd errors to the row after an attempt to submit');
              const rows = editGrid.element.querySelectorAll('[ref="editgrid-editGrid-row"]');
              const firstRow = rows[0];
              Harness.dispatchEvent('click', firstRow, '.editRow');

              setTimeout(() => {
                assert(form.submitted, 'Form should be submitted');
                const editRow = editGrid.editRows[0];
                assert(editRow.alerts, 'Should add an error alert to the modal');
                assert.equal(editRow.errors.length, 2, 'Should add errors to components inside draft row aftre it was submitted');
                const textField = editRow.components[0].getComponent('textField');

                const alert = editGrid.alert;
                assert(alert, 'Should show an error alert when drafts are enabled and form is submitted');
                assert(textField.element.className.includes('has-error'), 'Should add error class to component even when drafts enabled if the form was submitted');

                // 4. Change the value of the text field
                textField.setValue('new value', { modified: true });

                setTimeout(() => {
                  const textFieldEl = textField.element;
                  assert.equal(textField.dataValue, 'new value');
                  assert(!textFieldEl.className.includes('has-error'), 'Should remove an error class from component when it was fixed');
                  const editRow = editGrid.editRows[0];
                  const textField2 = editRow.components[0].getComponent('textField2');

                  textField2.setValue('test val', { modified: true });

                  setTimeout(() => {
                    assert.equal(textField2.dataValue, 'test val');
                    assert(!textField2.element.className.includes('has-error'), 'Should remove an error class from component when it was fixed');

                    editGrid.saveRow(0);

                    setTimeout(() => {
                      assert(!form.alert, 'Should remove an error alert after all the rows were fixed');

                      const rows = editGrid.element.querySelectorAll('[ref="editgrid-editGrid-row"]');
                      const firstRow = rows[0];
                      Harness.dispatchEvent('click', firstRow, '.editRow');
                      setTimeout(() => {
                        const editRow = editGrid.editRows[0];
                        const textField2 = editRow.components[0].getComponent('textField2');

                        Harness.dispatchEvent(
                          'input',
                          editRow.dialog,
                          '[name="data[textField2]"',
                          (i) => i.value = ''
                        );
                        setTimeout(() => {
                          assert.equal(textField2.dataValue, '');
                          Harness.dispatchEvent(
                            'click',
                            editGrid.editRows[0].dialog,
                            `.editgrid-row-modal-${editGrid.id} [ref="dialogClose"]`
                          );
                          setTimeout(() => {
                            const dialog = editGrid.editRows[0].confirmationDialog;

                            Harness.dispatchEvent('click', dialog, '[ref="dialogYesButton"]');

                              setTimeout(() => {
                                assert(
                                  !document.querySelector(`#error-list-${form.id}`),
                                  'Should not add an error alert when the changes that made the row invalid, were discarded by Cancel'
                                );
                                document.innerHTML = '';
                                done();
                            }, 100);
                          }, 100);
                        }, 200);
                      }, 300);
                    }, 300);
                  }, 300);
                }, 300);
              }, 450);
            }, 250);
          }, 100);
        }, 100);
      }).catch(done)
        .finally(() => {
          delete ModalEditGrid.components[0].rowDrafts;
        });
    });

    // it('', (done) => {
    //   const formElement = document.createElement('div');
    //   const form = new Webform(formElement);
    //   form.setForm(ModalEditGrid).then(() => {
    //
    //   }).catch(done);
    // });
  });

  it('Test simple conditions based on the EditGrid\'s child\'s value and default values when adding rows', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm({ display: 'form', components: [comp7], type: 'form' }).then(() => {
      const component = form.getComponent(['editGrid']);
      component.addRow();
      setTimeout(() => {
        Harness.getInputValue(component, 'data[editGrid][0][checkbox]', true, 'checked');
        Harness.testComponentVisibility(component, '.formio-component-editGridChild', true);
        Harness.testComponentVisibility(component, '.formio-component-panelChild', true);
        done();
      }, 250);
    }).catch(done);
  });

  it('Test clearOnHide inside EditGrid', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm({ display: 'form', components: [comp7], type: 'form' }).then(() => {
      form.submission = {
        data: {
          editGrid: [
            {
              checkbox: true,
              editGridChild: 'Has Value',
              panelChild: 'Has Value Too',
            }
          ]
        }
      };
      setTimeout(() => {
        const editGrid = form.getComponent(['editGrid']);
        editGrid.editRow(0).then(() => {
          Harness.dispatchEvent('click', editGrid.element, '[name="data[editGrid][0][checkbox]"]', el => el.checked = false);
          setTimeout(() => {
            Harness.testComponentVisibility(editGrid, '.formio-component-editGridChild', false);
            Harness.testComponentVisibility(editGrid, '.formio-component-panelChild', false);
            editGrid.saveRow(0, true);
            setTimeout(() => {
              assert(!form.data.editGrid[0].editGridChild, 'Should be cleared');
              assert(!form.data.editGrid[0].panelChild, 'Should be cleared');
              done();
            }, 150);
          }, 150);
        }, 150);
        });
    }).catch(done);
  });

  it('Test refreshing inside EditGrid', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm({ display: 'form', components: [comp8], type: 'form' }).then(() => {
      const editGrid = form.getComponent(['editGrid1']);
      editGrid.addRow();
      const makeSelect = form.getComponent(['editGrid1', 0, 'make']);
      const modelSelect = form.getComponent(['editGrid1', 0, 'model']);
      makeSelect.setValue('ford');
      setTimeout(() => {
        modelSelect.setValue('Focus');
        setTimeout(() => {
          editGrid.saveRow(0, true);
          setTimeout(() => {
            assert.equal(form.data.editGrid1[0].model, 'Focus', 'Should be saved properly');
            done();
          }, 150);
        }, 100);
      }, 150);
    }).catch(done);
  });

  it('Should display summary with values only for components that are visible at least in one row', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm(comp9).then(() => {
      const editGrid = form.getComponent('editGrid');

      const checkRows = (columnsNumber, rowsNumber) => {
        const rowWithColumns = editGrid.element.querySelector('.row');
        const rowsWithValues = editGrid.element.querySelectorAll('[ref="editgrid-editGrid-row"]');

        assert.equal(rowWithColumns.children.length, columnsNumber, 'Row should contain values only for visible components');
        assert.equal(rowsWithValues.length, rowsNumber, 'Should have corrent number of rows');
      };

      checkRows(2, 0);
      form.setValue({
        data: {
          editGrid: [
            { textField: 'test1', checkbox: false },
            { textField: 'test2', checkbox: false },
          ],
        }
      });
      setTimeout(() => {
        checkRows(2, 2);
        form.setValue({
          data: {
            editGrid: [
              { textField: 'test1', checkbox: false },
              { textField: 'test2', checkbox: true },
            ],
          }
        });

        setTimeout(() => {
          checkRows(3, 2);
          form.setValue({
            data: {
              editGrid: [
                { textField: 'test1', checkbox: false },
                { textField: 'test2', checkbox: true, textArea: 'test22' },
                { textField: 'show', checkbox: true, container: { number1: 1111 }, textArea: 'test3' }
              ],
            }
          });

          setTimeout(() => {
            checkRows(4, 3);
            form.setValue({
              data: {
                editGrid: [
                  { textField: 'test1', checkbox: false },
                  { textField: 'test2', checkbox: false },
                  { textField: 'show', checkbox: false, container: { number1: 1111 } }
                ],
              }
            });

            setTimeout(() => {
              checkRows(3, 3);

              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });

  it('Should add component to the header only if it is visible in saved row', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm(comp9).then(() => {
      const editGrid = form.getComponent('editGrid');

      const checkHeader = (componentsNumber) => {
        const header = editGrid.element.querySelector('.list-group-header').querySelector('.row');

        assert.equal(editGrid.visibleInHeader.length, componentsNumber);
        assert.equal(header.children.length, componentsNumber);
      };

      const clickElem = (elem) => {
        const clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };
      const clickAddRow = () => {
        const addAnotherBtn = editGrid.refs['editgrid-editGrid-addRow'][0];
        clickElem(addAnotherBtn);
      };

      checkHeader(2);
      clickAddRow();

      setTimeout(() => {
        assert.equal(editGrid.editRows.length, 1);
        checkHeader(2);
        const checkbox = editGrid.getComponent('checkbox')[0];
        checkbox.setValue(true);

        setTimeout(() => {
          checkHeader(2);
          assert.equal(editGrid.getComponent('textArea')[0].visible, true);
          clickAddRow();

          setTimeout(() => {
            assert.equal(editGrid.editRows.length, 2);
            checkHeader(2);
            const saveFirstRowBtn = editGrid.refs['editgrid-editGrid-saveRow'][0];
            clickElem(saveFirstRowBtn);

            setTimeout(() => {
              assert.equal(editGrid.editRows[0].state, 'saved');
              checkHeader(3);

              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  }).timeout(3000);

  it('Should add/save/cancel/delete/edit rows', (done) => {
    const form = _.cloneDeep(comp10);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const editGrid = form.getComponent('editGrid');

      const click = (btn, index, selector) => {
        let elem;

        if (selector) {
          elem = editGrid.element.querySelectorAll(`.${btn}`)[index];
        }
        else {
          elem = editGrid.refs[`editgrid-editGrid-${btn}`][index];
        }

        const clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      assert.equal(editGrid.refs['editgrid-editGrid-row'].length, 0, 'Should not have rows');
      assert.equal(editGrid.editRows.length, 0, 'Should not have rows');

      click('addRow', 0);

      setTimeout(() => {
        assert.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');
        assert.equal(editGrid.editRows.length, 1, 'Should have 1 row');
        assert.equal(editGrid.editRows[0].state, 'new', 'Should have state "new"');
        editGrid.editRows[0].components.forEach((comp) => {
          comp.setValue(11111);
        });

        setTimeout(() => {
          assert.deepEqual(editGrid.editRows[0].data, { number: 11111, textField: '11111' }, 'Should set row data');
          click('saveRow', 0);

          setTimeout(() => {
            assert.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');
            assert.equal(editGrid.editRows.length, 1, 'Should have 1 row');
            assert.equal(editGrid.editRows[0].state, 'saved', 'Should have state "saved"');
            assert.deepEqual(editGrid.editRows[0].data, { number: 11111, textField: '11111' }, 'Should set row data');
            click('editRow', 0, true);

            setTimeout(() => {
              assert.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');
              assert.equal(editGrid.editRows.length, 1, 'Should have 1 row');
              assert.equal(editGrid.editRows[0].state, 'editing', 'Should have state "editing"');
              editGrid.editRows[0].components.forEach((comp) => {
                comp.setValue(22222);
              });

              setTimeout(() => {
                assert.deepEqual(editGrid.editRows[0].data, { number: 22222, textField: '22222' }, 'Should set row data');
                click('cancelRow', 0);

                setTimeout(() => {
                  assert.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');
                  assert.equal(editGrid.editRows.length, 1, 'Should have 1 row');
                  assert.equal(editGrid.editRows[0].state, 'saved', 'Should have state "saved"');
                  assert.deepEqual(editGrid.editRows[0].data, { number: 11111, textField: '11111' }, 'Should cancel changed data');
                  click('removeRow', 0, true);

                  setTimeout(() => {
                    assert.equal(editGrid.refs['editgrid-editGrid-row'].length, 0, 'Should not have rows');
                    assert.equal(editGrid.editRows.length, 0, 'Should have 0 rows');

                    document.innerHTML = '';
                    done();
                  }, 200);
                }, 200);
              }, 200);
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  }).timeout(3000);

  it('Should open first row when empty and allow saving openned row', (done) => {
    const form = _.cloneDeep(comp10);
    const element = document.createElement('div');
    form.components[0].openWhenEmpty = true;

    Formio.createForm(element, form).then(form => {
      const editGrid = form.getComponent('editGrid');

      const click = (btn, index, selector) => {
        let elem;

        if (selector) {
          elem = editGrid.element.querySelectorAll(`.${btn}`)[index];
        }
        else {
          elem = editGrid.refs[`editgrid-editGrid-${btn}`][index];
        }

        const clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      assert.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');
      assert.equal(editGrid.editRows.length, 1, 'Should have 1 row');
      assert.equal(editGrid.editRows[0].state, 'new', 'Should have state "new"');
      click('saveRow', 0);

        setTimeout(() => {
          assert.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');
          assert.equal(editGrid.editRows.length, 1, 'Should have 1 row');
          assert.equal(editGrid.editRows[0].state, 'saved', 'Should have state "saved"');

          document.innerHTML = '';
          done();
      }, 200);
    }).catch(done);
  }).timeout(3000);

  it('Should disable adding/removing rows', (done) => {
    const form = _.cloneDeep(comp10);
    const element = document.createElement('div');
    form.components[0].disableAddingRemovingRows = true;
    const value = [{ number: 1, textField: 'test' }, { number: 2, textField: 'test2' }];

    Formio.createForm(element, form).then(form => {
      const editGrid = form.getComponent('editGrid');
      editGrid.setValue(value);

        setTimeout(() => {
          assert.equal(editGrid.refs['editgrid-editGrid-row'].length, 2, 'Should have 2 rows');
          assert.equal(editGrid.editRows.length, 2, 'Should have 2 rows');
          assert.equal(editGrid.refs['editgrid-editGrid-addRow'].length, 0, 'Should not have add row btn');
          assert.equal(editGrid.element.querySelectorAll('.removeRow').length, 0, 'Should not have remove row btn');

          document.innerHTML = '';
          done();
      }, 200);
    }).catch(done);
  });

  it('Should show conditional eddRow btn if condition is met', (done) => {
    const form = _.cloneDeep(comp10);
    const element = document.createElement('div');
    form.components[0].conditionalAddButton = 'show = data.number11 === 5';
    form.components.unshift({
      label: 'Number',
      mask: false,
      spellcheck: true,
      tableView: false,
      delimiter: false,
      requireDecimal: false,
      inputFormat: 'plain',
      key: 'number11',
      type: 'number',
      input: true
    });
    Formio.createForm(element, form).then(form => {
      const editGrid = form.getComponent('editGrid');
      assert.equal(editGrid.refs['editgrid-editGrid-addRow'].length, 0, 'Should not have add row btn');
      const numberComp = form.getComponent('number11');
      const inputEvent = new Event('input');
      const numberInput = numberComp.refs.input[0];
      numberInput.value = 5;
      numberInput.dispatchEvent(inputEvent);

        setTimeout(() => {
          assert.equal(editGrid.refs['editgrid-editGrid-addRow'].length, 1, 'Should have add row btn');

          document.innerHTML = '';
          done();
      }, 400);
    }).catch(done);
  });

  it('Should use custom text for save/cancel/add btns', (done) => {
    const form = _.cloneDeep(comp10);
    const element = document.createElement('div');
    form.components[0].addAnother = 'add custom';
    form.components[0].saveRow = 'save custom';
    form.components[0].removeRow = 'cancel custom';

    Formio.createForm(element, form).then(form => {
      const editGrid = form.getComponent('editGrid');
      assert.equal(editGrid.refs['editgrid-editGrid-addRow'][0].textContent.trim(), 'add custom');
      const clickEvent = new Event('click');
      editGrid.refs['editgrid-editGrid-addRow'][0].dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(editGrid.refs['editgrid-editGrid-saveRow'][0].textContent.trim(), 'save custom');
          assert.equal(editGrid.refs['editgrid-editGrid-cancelRow'][0].textContent.trim(), 'cancel custom');

          document.innerHTML = '';
          done();
      }, 400);
    }).catch(done);
  });

  it('Should render headers when openWhenEmpry is enabled', (done) => {
    const form = _.cloneDeep(comp11);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const editGrid = form.getComponent('editGrid');
      const rowComponents = editGrid.component.components;
      const headerEls = editGrid.element.querySelector('.list-group-header').firstElementChild.children;
      assert.equal(headerEls.length, rowComponents.length);
      for (let index = 0; index < headerEls.length; index++) {
        const el = headerEls[index];
        assert.equal(el.textContent.trim(), rowComponents[index].label, `Should render ${rowComponents[index].key} component label in header`);
      }
      done();
    }).catch(done);
  });

  it('Should show validation when saving a row with required conditional filed inside container', (done) => {
    const form = _.cloneDeep(comp12);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const editGrid = form.getComponent('editGrid');
      const clickEvent = new Event('click');
      editGrid.refs['editgrid-editGrid-addRow'][0].dispatchEvent(clickEvent);

      setTimeout(() => {
        const firstRowContainer = editGrid.components[0];
        const firstRowNumber = firstRowContainer.components[0];
        const firstRowTextField = firstRowContainer.components[1];

        assert.equal(firstRowTextField.visible, false);

        const inputEvent = new Event('input');
        const numberInput = firstRowNumber.refs.input[0];

        numberInput.value = 5;
        numberInput.dispatchEvent(inputEvent);

        setTimeout(() => {
          assert.equal(firstRowTextField.visible, true);
          editGrid.refs['editgrid-editGrid-saveRow'][0].dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(!!firstRowTextField.error, true);
            assert.equal(editGrid.editRows[0].errors.length, 1);
            assert.equal(editGrid.editRows[0].state, 'new');

            document.innerHTML = '';
            done();
          }, 200);
        }, 250);
      }, 300);
    }).catch(done);
  });

  it('Should render form with a submission in a draft-state without validation errors', (done) => {
    const form = _.cloneDeep(comp13);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      form.submission = {
        data: {
          'container': {
            'textField': '',
          },
          'editGrid': []
        }
      };

      setTimeout(() => {
        const editGrid = form.getComponent(['editGrid']);
        assert.equal(editGrid.errors.length, 0);
        done();
      }, 100);
    }).catch(done);
  });
});

describe('EditGrid Open when Empty', () => {
  it('Should be opened when shown conditionally', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(formElement, withOpenWhenEmptyAndConditions)
      .then((form) => {
        const radio = form.getComponent(['radio']);
        radio.setValue('show');

        setTimeout(() => {
          const editGrid = form.getComponent(['editGrid']);
          assert.equal(editGrid.visible, true, 'Should be visible');
          assert.equal(editGrid.editRows.length, 1, 'Should have 1 row');
          const textField = editGrid.editRows[0].components[0];
          Harness.dispatchEvent(
            'input',
            textField.element,
            '[name="data[editGrid][0][textField]"]',
            (input) => input.value = 'Value'
          );

          setTimeout(() => {
            const row = editGrid.editRows[0];
            assert.equal(row.data.textField, 'Value', 'Value should be set properly');
            editGrid.saveRow(0);
            setTimeout(() => {
              assert.deepEqual(form.data.editGrid, [{ textField: 'Value', select1: '' }], 'Value should be saved correctly');
              radio.setValue('hide');

              setTimeout(() => {
                assert.equal(editGrid.visible, false, 'Should be hidden');
                radio.setValue('show');

                setTimeout(() => {
                  assert.equal(editGrid.visible, true, 'Should be visible');
                  assert.equal(editGrid.editRows.length, 1, 'Should have 1 row');
                  assert.equal(editGrid.editRows[0].state, 'new', 'Row should be a new one');
                  done();
                }, 300);
              }, 300);
            }, 250);
          }, 350);
        }, 300);
      })
      .catch(done);
  });

  it('Should create new row with empty data and no defaults', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(formElement, compOpenWhenEmpty, { noDefaults: true })
      .then((form) => {
        form.data = {};
        setTimeout(() => {
          const editGrid = form.getComponent(['editGrid']);
          assert.equal(editGrid.editRows.length, 1);
          assert.equal(editGrid.editRows[0].state, 'new');
          done();
        }, 300);
      })
      .catch(done);
  });

  it('Should always add a first row', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(formElement, compOpenWhenEmpty)
      .then((form) => {
        const editGrid = form.getComponent(['editGrid']);
        assert.equal(editGrid.editRows.length, 1, 'Should have 1 row on create');
        const textField = editGrid.editRows[0].components[0];
        Harness.dispatchEvent(
          'input',
          textField.element,
          '[name="data[editGrid][0][textField]"]',
          (input) => input.value = 'Value'
        );

        setTimeout(() => {
          const row = editGrid.editRows[0];
          assert.equal(row.data.textField, 'Value', 'Value should be set properly');

          setTimeout(() => {
            editGrid.cancelRow(0);

            setTimeout(() => {
              assert.equal(editGrid.editRows.length, 1, 'Should still have 1 row');
              const textField = editGrid.editRows[0].components[0];
              assert.equal(textField.dataValue, '', 'Value should be cleared after cancelling the row');

              editGrid.saveRow(0);

              setTimeout(() => {
                assert.equal(editGrid.editRows.length, 1, 'Should have 1 row');
                assert.equal(editGrid.editRows[0].state === 'saved', 1, 'Row should be saved');

                editGrid.removeRow(0);

                setTimeout(() => {
                  assert.equal(editGrid.editRows.length, 1, 'Should add the first row when delete the last one');
                  assert.equal(editGrid.editRows[0].state === 'new', 1, 'Should add the new row when the last one was deleted');

                  done();
                }, 250);
              }, 250);
            }, 250);
          }, 250);
        }, 250);
      })
      .catch(done);
  });
});

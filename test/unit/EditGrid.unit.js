import assert from 'power-assert';
import _ from 'lodash';
import Harness from '../harness';
import EditGridComponent from '../../src/components/editgrid/EditGrid';
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
  comp16,
  comp17,
  comp19,
  comp20,
  withOpenWhenEmptyAndConditions,
  compOpenWhenEmpty,
  compWithCustomDefaultValue,
  compTestEvents
} from './fixtures/editgrid';
import formsWithEditGridAndConditions from './fixtures/editgrid/formsWithEditGridAndConditions';

import ModalEditGrid from '../forms/modalEditGrid';
import EditGridOpenWhenEmpty from '../forms/editGridOpenWhenEmpty';
import Webform from '../../src/Webform'
import { displayAsModalEditGrid } from '../formtest';
import { Formio } from '../../src/Formio';
import { fastCloneDeep } from '@formio/core';

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
      assert(component.checkValidity(), 'Item should be valid');
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
      assert(component.checkValidity(), 'Item should be valid');
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
      assert(!component.checkValidity(null, true), 'Item should not be valid');
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
      assert(component.checkValidity(), 'Item should be valid');
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
      assert(component.checkValidity(null, true), 'Item should be valid');
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
      assert(component.checkValidity(null, true), 'Item should be valid');
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
      assert(!component.checkValidity(null, true), 'Item should not be valid');
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
      assert(component.checkValidity(null, true), 'Item should be valid');
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
      assert(component.checkValidity(null, true), 'Item should be valid');
    });
  });

  // TODO: find out if this is deprecated in the new (3.x and above) versions of the renderer, if so ditch this test
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
      assert(!component.checkValidity(null, true), 'Item should not be valid');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.has-error div.editgrid-row-error', 'Must be good');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.has-error div.editgrid-row-error', 'Must be good');
    });
  });

  it('Should not allow saving when errors exist', () => {
    return Harness.testCreate(EditGridComponent, comp1).then((component) => {
      Harness.clickElement(component, 'button.btn-primary');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      Harness.getInputValue(component, 'data[editgrid][0][field1]', '');
      Harness.getInputValue(component, 'data[editgrid][0][field2]', '');
      assert(!component.checkValidity(null, true), 'Item should not be valid');
      Harness.setInputValue(component, 'data[editgrid][0][field2]', 'baz');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      Harness.getInputValue(component, 'data[editgrid][0][field1]', '');
      Harness.getInputValue(component, 'data[editgrid][0][field2]', 'baz');
      assert(!component.checkValidity(null, true), 'Item should not be valid');
      Harness.setInputValue(component, 'data[editgrid][0][field1]', 'bad');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      Harness.getInputValue(component, 'data[editgrid][0][field1]', 'bad');
      Harness.getInputValue(component, 'data[editgrid][0][field2]', 'baz');
      assert(!component.checkValidity(null, true), 'Item should not be valid');
      Harness.setInputValue(component, 'data[editgrid][0][field1]', 'good');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      assert(component.checkValidity(null, true), 'Item should be valid');
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
      assert(!component.checkValidity(null, true), 'Item should not be valid');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-primary');
      assert(component.checkValidity(null, true), 'Item should be valid');
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      assert(!component.checkValidity(null, true), 'Item should not be valid');
      Harness.clickElement(component, 'div.editgrid-actions button.btn-danger');
      assert(component.checkValidity(null, true), 'Item should be valid');
    });
  });

  it('Should not allow to go to the next page if row is not saved', (done) => {
    const form = _.cloneDeep(comp16);
    const element = document.createElement('div');
    Formio.createForm(element, form).then((form) => {
      const editGrid = form.getComponent('editGrid');
      assert(editGrid.checkValidity(null, true), 'Item should be valid');
      assert.equal(form.page, 0);
      editGrid.addRow();
      const clickEvent = new Event('click');
      setTimeout(() => {
        const nextBtn = _.get(form.refs, `wizard-${form.originalComponent.id}-next`);
        nextBtn.dispatchEvent(clickEvent);
        setTimeout(()=> {
          assert(!editGrid.checkValidity(null, true), 'Item should not be valid');
          assert.equal(form.page, 0);
          assert.equal(form.errors.length, 1);
          done();
        }, 500)

      }, 200)
    }).catch(done);
  })

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
        const isInvalid = !component.checkValidity(null, true);
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
              const textField = form.getComponent(['editGrid', 0, 'form', 'data', 'textField']);

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
                  const textFieldComponent = textField.element;
                  assert(textFieldComponent.className.includes('has-error'), 'Should add error class to component even when drafts enabled if the component is not pristine');
                  document.innerHTML = '';
                  done();
                }, 300);
              }, 300);
            }, 150);
          }, 800);
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
            form.submit().finally(() => {
              assert.equal(form.errors.length, 2, 'Should be validated after an attempt to submit');
              assert.equal(editGrid.editRows[0].errors.length, 2, 'Should add errors to the row after an attempt to submit');
              const rows = editGrid.element.querySelectorAll('[ref="editgrid-editGrid-row"]');
              const firstRow = rows[0];
              Harness.dispatchEvent('click', firstRow, '.editRow');

              setTimeout(() => {
                assert(form.submitted, 'Form should be submitted');
                const editRow = editGrid.editRows[0];
                assert(editRow.alerts, 'Should add an error alert to the modal');
                assert.equal(editRow.errors.length, 2, 'Should add errors to components inside draft row after it was submitted');
                const textField = editRow.components[0].getComponent('textField');

                const alert = editGrid.alert;
                assert(alert, 'Should show an error alert when drafts are enabled and form is submitted');
                assert(textField.element.className.includes('error'), 'Should add error class to component even when drafts enabled if the form was submitted');

                // 4. Change the value of the text field
                textField.setValue('new value', { modified: true });

                setTimeout(() => {
                  const textFieldEl = textField.element;
                  assert.equal(textField.dataValue, 'new value');
                  assert(!textFieldEl.className.includes('error'), 'Should remove an error class from component when it was fixed');
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
            });
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
        const checkbox = editGrid.getComponent('checkbox');
        checkbox.setValue(true);

        setTimeout(() => {
          checkHeader(2);
          assert.equal(editGrid.getComponent('textArea').visible, true);
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

  it('Should show validation when saving a row with required conditional field inside container', (done) => {
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
            assert.equal(!!firstRowTextField.errors, true);
            assert.equal(editGrid.editRows[0].errors.length, 1);
            assert.equal(editGrid.editRows[0].state, 'new');

            document.innerHTML = '';
            done();
          }, 200);
        }, 250);
      }, 300);
    }).catch(done);
  });

  it('Should submit a form with a submission in a draft-state without validation errors', (done) => {
    const form = _.cloneDeep(comp13);
    const element = document.createElement('div');
    Formio.createForm(element, form).then(form => {
      form.nosubmit = true;
      form.setSubmission({
        state: 'draft',
        data: {
          'container': {
            'textField': '',
          },
          'editGrid': []
        }
      }).then(() => {
        form.submitForm().then((event) => {
          // It should allow the submission in the renderer.
          assert.equal(event.submission.state, 'draft');
          done();
        }).catch((err) => done(err));
      }).catch(done);
    }).catch(done);
  });

  it('Should set value for conditional editGrid inside editGrid on event when form is not pristine ', (done) => {
    const element = document.createElement('div');

    Formio.createForm(element, formsWithEditGridAndConditions.form2).then(form => {
      form.setPristine(false);
      const editGrid1 = form.getComponent('editGrid1');
      editGrid1.addRow();

      setTimeout(() => {
        const btn = editGrid1.getComponent('setPanelValue');
        const clickEvent = new Event('click');
        btn.refs.button.dispatchEvent(clickEvent);
        setTimeout(() => {
          const conditionalEditGrid = editGrid1.getComponent('editGrid');
          assert.deepEqual(conditionalEditGrid.dataValue, [{ textField:'testyyyy' }]);
          assert.equal(conditionalEditGrid.editRows.length, 1);
          done();
        }, 500);
      }, 300);
    }).catch(done);
  });

  it('Should calculate editGrid value when condition is met in advanced logic', (done) => {
    const element = document.createElement('div');

    Formio.createForm(element, formsWithEditGridAndConditions.form6).then(form => {
      form.getComponent('textField').setValue('show');

      setTimeout(() => {
        const editGrid = form.getComponent('editGrid');
        assert.deepEqual(editGrid.dataValue, [{ number:1, textArea: 'test' }, { number:2, textArea: 'test2' }]);
        assert.deepEqual(editGrid.editRows.length, 2);

        done();
      }, 300);
    }).catch(done);
  });

  it('Should not show validation in new row with required conditional fields before attempt to save', (done) => {
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
          assert.equal(editGrid.editRows[0].errors.length, 0);

          editGrid.refs['editgrid-editGrid-saveRow'][0].dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(!!firstRowTextField.errors, true);
            assert.equal(editGrid.editRows[0].errors.length, 1);
            assert.equal(editGrid.editRows[0].state, 'new');

            document.innerHTML = '';
            done();
          }, 200);
        }, 250);
      }, 300);
    }).catch(done);
  });

  it('Should trigger validation onChange before attempt to save', (done) => {
    const form = _.cloneDeep(comp20);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const rootTextField = form.getComponent('text');
      rootTextField.setValue('test');
      const editGrid = form.getComponent('editGrid');
      const clickEvent = new Event('click');
      editGrid.refs['editgrid-editGrid-addRow'][0].dispatchEvent(clickEvent);

      setTimeout(() => {
        const egRowTextField = editGrid.components[0];

        const inputEvent = new Event('input');
        const textFieldEGInput = egRowTextField.refs.input[0];

        textFieldEGInput.value = 'te';
        textFieldEGInput.dispatchEvent(inputEvent);

        setTimeout(() => {
          assert.equal(editGrid.editRows[0].errors.length, 1, 'Should include custom validation error');
          assert.equal(editGrid.editRows[0].errors[0].message, 'data must match root textfield');
          textFieldEGInput.value = 'test';
          textFieldEGInput.dispatchEvent(inputEvent);

          setTimeout(() => {
            assert.equal(editGrid.editRows[0].errors.length, 0, 'Should not include custom validation error');
            document.innerHTML = '';
            done();
          }, 300);
        }, 300);
      }, 300)
    }).catch(done);
  });

  it('Should not allow to save invalid row when there are required components inside columns in the editGrod row', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);

    form.setForm(comp19).then(() => {
      const editGrid = form.components[0];

      setTimeout(() => {
        Harness.dispatchEvent('click', form.element, '[ref="editgrid-editGrid-addRow"]');
          setTimeout(() => {
            assert.equal(editGrid.editRows.length, 1);
            assert.equal(!!editGrid.editRows[0].errors?.length, false);
            assert.equal(editGrid.editRows[0].state, 'new');
            Harness.dispatchEvent('click', form.element, '[ref="editgrid-editGrid-saveRow"]');
            setTimeout(() => {
              assert.equal(editGrid.editRows.length, 1);
              assert.equal(editGrid.editRows[0].errors?.length, 1);
              assert.equal(editGrid.editRows[0].state, 'new');
              done();
            }, 300);
          }, 300);
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

  it('Should correctly set data in EditGrid when noDefaults is set', async () => {
    const element = document.createElement('div');
    const form = await Formio.createForm(element, compOpenWhenEmpty, { noDefaults: true });

    // Function to add a row and set value to the textField
    const addRowAndSetValue = async (rowIndex, value) => {
      await editGrid.addRow();
      await new Promise((resolve) => setTimeout(resolve, 200));
      const textField = editGrid.getComponent([rowIndex, 'textField']);
      textField.setValue(value);
    };

    const editGrid = form.getComponent('editGrid');

    await addRowAndSetValue(0, '1');
    editGrid.saveRow(0)
    await addRowAndSetValue(1, '2');
    editGrid.saveRow(1)

    assert.equal(form._data.editGrid.length, 2);
    assert.deepEqual(form._data, { editGrid: [ { textField: '1' }, { textField: '2' } ] });

    const event = await form.submitForm()
    const submissionData = event.submission.data;

    assert.deepEqual(submissionData, { editGrid: [ { textField: '1' }, { textField: '2' } ] });
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

  it('Should restore focus on the proper component after change event', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(formElement, compWithCustomDefaultValue)
      .then((form) => {
        const editGrid = form.getComponent(['selectedFunds2']);
        editGrid.removeRow(2, true);
        setTimeout(() => {
          assert.equal(editGrid.editRows.length, 4, 'Should remove a row');
          editGrid.editRow(2);

          setTimeout(() => {
            const currency = form.getComponent(['selectedFunds2', 2, 'allocationAmount2']);
            currency.focus();
            currency.setValue(250);
            editGrid.redraw();

            setTimeout(() => {
              assert.equal(editGrid.editRows[2].state, 'editing', 'Should keep the row in the editing state');
              assert.equal(editGrid.editRows[3].state, 'saved', 'Should keep the next row in the saved state');
              done();
            }, 200);
          }, 200);
        }, 200);
      })
      .catch(done);
  });

  it('Should submit form with empty rows when submit button is pressed and no rows are saved', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);

    form.setForm(compOpenWhenEmpty).then(() => {
      const editGrid = form.components[0];

      setTimeout(() => {
        Harness.dispatchEvent('click', form.element, '[name="data[submit]"]');
          setTimeout(() => {
            const editRow = editGrid.editRows[0];
            assert.equal(editRow.errors.length, 0, 'Should not be any errors on open row');
            assert.equal(form.submission.state, 'submitted', 'Form should be submitted');
            done();
          }, 450);
      }, 100);
    }).catch(done);
  });

  it('Should not submit form if any row inputs are set as required', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);

    form.setForm(EditGridOpenWhenEmpty).then(() => {
      const editGrid = form.components[0];

      setTimeout(() => {
        Harness.dispatchEvent('click', form.element, '[name="data[submit]"]');
          setTimeout(() => {
            assert(!form.submission.state, 'Form should not be submitted');
            const editRow = editGrid.editRows[0];
            assert.equal(editRow.errors.length, 1, 'Should show error on row');
            const textField = editRow.components[0];
            assert(textField.element.className.includes('formio-error-wrapper'), 'Should add error class to component');
            done();
          }, 450);
      }, 100);
    }).catch(done);
  });
});

describe('EditGrid Fired Events', () => {
  const eventParams = ['row', 'component', 'instance']
  it('Should fire editGridEditRow event on the row edit button click', (done) => {
    const formElement = document.createElement('div');
    let eventsCount = 0;
    Formio.createForm(formElement, compTestEvents)
      .then((form) => {
        form.on('editGridEditRow', (eventArgs) => {
          _.each(eventParams, (param) => {
            assert.equal(!!eventArgs[param], true);
          });
          eventsCount = eventsCount + 1;
        });

        form.setSubmission({
          data: {
          editGrid: [
              {
                  textField: 'test1'
              },
              {
                  textField: 'test2'
              }
          ],
        }})
        .then(() => {
          const editBtn = form.element.querySelector('.editRow');
          const clickEvent = new Event('click');
          editBtn.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(eventsCount, 1);
            done();

          }, 350);
        });
      })
      .catch(done);
  });

  it('Should fire editGridOpenModal event on the row edit button click when modal is enabled', (done) => {
    const formElement = document.createElement('div');
    let eventsCount = 0;
    const testForm = fastCloneDeep(compTestEvents);
    testForm.components[0].modal = true;

    Formio.createForm(formElement, testForm)
      .then((form) => {
        form.on('editGridOpenModal', (eventArgs) => {
          _.each(eventParams, (param) => {
            assert.equal(!!eventArgs[param], true);
          });
          eventsCount = eventsCount + 1;
        });

        form.setSubmission({
          data: {
          editGrid: [
              {
                  textField: 'test1'
              },
              {
                  textField: 'test2'
              }
          ],
        }})
        .then(() => {
          const editBtn = form.element.querySelector('.editRow');
          const clickEvent = new Event('click');
          editBtn.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(eventsCount, 1);
            done();
          }, 350);
        })
      })
      .catch(done);
  });

  it('Should fire editGridOpenModal event when adding new row and modal is enabled', (done) => {
    const formElement = document.createElement('div');
    let eventsCount = 0;
    const testForm = fastCloneDeep(compTestEvents);
    testForm.components[0].modal = true;

    Formio.createForm(formElement, testForm)
      .then((form) => {
        form.on('editGridOpenModal', (eventArgs) => {
          _.each(eventParams, (param) => {
            assert.equal(!!eventArgs[param], true);
          });
          eventsCount = eventsCount + 1;
        });

        const editGrid = form.getComponent('editGrid');
          const addBtn = editGrid.refs['editgrid-editGrid-addRow'][0];
          const clickEvent = new Event('click');
          addBtn.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(eventsCount, 1);
            done();
          }, 350);
      })
      .catch(done);
  });

  it('Should prepare correct email table template with nested layout components', (done) => {
    const formElement = document.createElement('div');
    const testForm = fastCloneDeep(comp17);
    Formio.createForm(formElement, testForm)
      .then((form) => {
        form.setSubmission({
          data: {
            editGrid: [{
              radio: 'yes',
              textArea: 'text area 1',
            }, {
              radio: 'no',
              textArea: 'text area 2',
            }],
          },
        });

        const editGridComp = form.getComponent('editGrid');

        setTimeout(() => {
          const table = editGridComp.getValueAsString(editGridComp.dataValue, { email: true});
          assert.ok(table.includes('table'));
          assert.ok(table.includes('Radio'));
          assert.ok(table.includes('Text Area'));
          assert.ok(table.includes('yes'));
          assert.ok(table.includes('text area 1'));
          assert.ok(table.includes('no'));
          assert.ok(table.includes('text area 2'));
          done();
        }, 200);
      })
      .catch(done);
  });
});

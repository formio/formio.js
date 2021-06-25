import assert from 'power-assert';
import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import each from 'lodash/each';
import i18next from 'i18next';
import Harness from '../test/harness';
import FormTests from '../test/forms';
import Webform from './Webform';
import 'flatpickr';
import Formio from './Formio';
import {
  settingErrors,
  clearOnHide,
  manualOverride,
  validationOnBlur,
  calculateValueWithManualOverride,
  formWithAdvancedLogic,
  formWithPatternValidation,
  calculatedSelectboxes,
  calculateZeroValue,
  formWithConditionalLogic,
  formWithCalculatedValueWithoutOverriding,
  formWithTimeComponent,
  formWithEditGridModalDrafts,
  formWithBlurValidationInsidePanel,
  modalEditComponents,
  calculatedNotPersistentValue,
  calculateValueInEditingMode,
  initiallyCollapsedPanel,
  multipleTextareaInsideConditionalComponent,
  disabledNestedForm,
  propertyActions,
  formWithEditGridAndNestedDraftModalRow,
  formWithDateTimeComponents,
  formWithCollapsedPanel,
  formWithCustomFormatDate
} from '../test/formtest';
import DataGridOnBlurValidation from '../test/forms/dataGridOnBlurValidation';
import UpdateErrorClassesWidgets from '../test/forms/updateErrorClasses-widgets';
import nestedModalWizard from '../test/forms/nestedModalWizard';
import disableSubmitButton from '../test/forms/disableSubmitButton';
import formWithAddressComponent from '../test/forms/formWithAddressComponent';
import formWithDataGridInitEmpty from '../test/forms/dataGridWithInitEmpty';
import nestedFormInsideDataGrid from '../test/forms/dataGrid-nestedForm';
import formWithDataGrid from '../test/forms/formWithDataGrid';
import translationTestForm from '../test/forms/translationTestForm';
import formWithDataGridWithCondColumn from '../test/forms/dataGridWithConditionalColumn';
import formWithDataGridWithContainerAndConditionals from '../test/forms/dataGridContainerConditionals';
import { nestedFormInWizard } from '../test/fixtures';
import NativePromise from 'native-promise-only';
import { fastCloneDeep } from '../lib/utils/utils';
import truncateMultipleSpaces from '../test/forms/truncateMultipleSpaces';
import htmlRenderMode from '../test/forms/htmlRenderMode';
import calculatedValue from '../test/forms/calculatedValue';
import conditionalDataGridWithTableAndRadio from '../test/forms/conditionalDataGridWithTableAndRadio';
import calculateValueWithManualOverrideLableValueDataGrid
  from '../test/forms/calculateValueWithManualOverrideLableValueDataGrid';

/* eslint-disable max-statements */
describe('Webform tests', function() {
  this.retries(3);

  it('Should not translate en value if _userInput option is provided and value presents in reserved translation names', done => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, {
     language: 'en'
    });
    form.setForm(translationTestForm).then(() => {
      setTimeout(() => {
        const selectComp = form.getComponent('select');
        const options = selectComp.element.querySelector('[role="listbox"]').children;
        const option1 = options[0].textContent.trim();
        const option2 = options[1].textContent.trim();
        const label = selectComp.element.querySelector('label').textContent.trim();
        assert.equal(option1, translationTestForm.components[0].data.values[0].label);
        assert.equal(option2, translationTestForm.components[0].data.values[1].label);
        assert.equal(label, translationTestForm.components[0].label);
        document.body.innerHTML = '';
        done();
      }, 100);
    }).catch(done);
  });

  it('Should translate in English if _userInput option is provided and value does not present in reserved translation names', done => {
    const formElement = document.createElement('div');
    const selectLabel = 'Select test label';
    const translationForm = fastCloneDeep(translationTestForm);
    translationForm.components[0].label = selectLabel;
    const form = new Webform(formElement, {
      language: 'en',
      i18n: {
        en: {
          'Select test label': 'English Label'
        },
        fr: {
          'Select test label': 'French Label'
        }
      }
    });

    form.setForm(translationForm).then(() => {
      const selectComp = form.getComponent('select');
      const label = selectComp.element.querySelector('label').textContent.trim();

      assert.equal(label, 'English Label');
      document.body.innerHTML = '';
      done();
    }).catch(done);
  });

  it('Should translate value in franch if _userInput option is provided and value does not present in reserved translation names', done => {
    const formElement = document.createElement('div');
    const selectLabel = 'Select test label';
    const translationForm = fastCloneDeep(translationTestForm);
    translationForm.components[0].label = selectLabel;
    const form = new Webform(formElement, {
      language: 'fr',
      i18n: {
        en: {
          'Select test label': 'English Label'
        },
        fr: {
          'Select test label': 'French Label'
        }
      }
    });

    form.setForm(translationForm).then(() => {
      const selectComp = form.getComponent('select');
      const label = selectComp.element.querySelector('label').textContent.trim();

      assert.equal(label, 'French Label');
      document.body.innerHTML = '';
      done();
    }).catch(done);
  });

  it('Should display dataGrid conditional column once the condition is met', function(done) {
    const formElement = document.createElement('div');
    const formWithCondDataGridColumn = new Webform(formElement);

    formWithCondDataGridColumn.setForm(formWithDataGridWithCondColumn).then(() => {
      const condDataGridField = formWithCondDataGridColumn.element.querySelector( '[name="data[dataGrid][0][numberCond]"]');
      assert.equal(!!condDataGridField, false);

      const textField = formWithCondDataGridColumn.element.querySelector( '[name="data[textField]"]');
      textField.value = 'show';

      const inputEvent = new Event('input');
      textField.dispatchEvent(inputEvent);

      setTimeout(() => {
        const condDataGridFieldAfterFulfillingCond = formWithCondDataGridColumn.element.querySelector( '[name="data[dataGrid][0][numberCond]"]');
        assert.equal(!!condDataGridFieldAfterFulfillingCond, true);

        done();
      }, 300);
    }).catch((err) => done(err));
  });

  it('Should remove dataGrid extra rows and components after setting value with less row number', function(done) {
    const formElement = document.createElement('div');
    const formWithDG = new Webform(formElement);

    formWithDG.setForm(formWithDataGrid.form).then(() => {
    formWithDG.setSubmission(formWithDataGrid.submission3rows);

      setTimeout(() => {
        assert.equal(formWithDG.components[0].rows.length, 3);
        assert.equal(formWithDG.components[0].components.length, 3);

        formWithDG.setSubmission(formWithDataGrid.submission1row);

        setTimeout(() => {
          assert.equal(formWithDG.components[0].rows.length, 1);
          assert.equal(formWithDG.components[0].components.length, 1);

          done();
        }, 200);
      }, 100);
    }).catch((err) => done(err));
  });

  it('Should not delete/change date value in dataGrid after adding new row', function(done) {
    const formElement = document.createElement('div');
    const formWithDate = new Webform(formElement);

    formWithDate.setForm(formWithCustomFormatDate).then(() => {
      setTimeout(() => {
        const clickEvent = new Event('click');

        const dateCompInputWidget = formWithDate.element.querySelector('.formio-component-textField').querySelector('.flatpickr-input').widget;
        const dateAltFormat = dateCompInputWidget.calendar.config.altFormat;
        dateCompInputWidget.calendar.setDate('30-05-2020', true, dateAltFormat);

        const dateCompInputWidget1 = formWithDate.element.querySelector('.formio-component-dateTime').querySelector('.flatpickr-input').widget;
        const dateAltFormat1 = dateCompInputWidget1.calendar.config.altFormat;
        dateCompInputWidget1.calendar.setDate('30-05-2020', true, dateAltFormat1);

        const dateCompInputWidget2 = formWithDate.element.querySelector('.formio-component-textField2').querySelector('.flatpickr-input').widget;
        const dateAltFormat2 = dateCompInputWidget2.calendar.config.altFormat;
        dateCompInputWidget2.calendar.setDate('30-05-2020', true, dateAltFormat2);

        setTimeout(() => {
        const dateCompAltInput = formWithDate.element.querySelector('.formio-component-textField').querySelector('.flatpickr-input');
        const dateComp = formWithDate.element.querySelector('.formio-component-textField').querySelector('[type="text"]');

        const dateCompAltInput1 = formWithDate.element.querySelector('.formio-component-dateTime').querySelector('.flatpickr-input');
        const dateComp1 = formWithDate.element.querySelector('.formio-component-dateTime').querySelector('[type="text"]');

        const dateCompAltInput2 = formWithDate.element.querySelector('.formio-component-textField2').querySelector('.flatpickr-input');
        const dateComp2 = formWithDate.element.querySelector('.formio-component-textField2').querySelector('[type="text"]');

        assert.equal(dateCompAltInput.value,'30-05-2020');
        assert.equal(dateComp.value,'30-05-2020');

        assert.equal(dateCompAltInput1.value,'2020-05-30T00:00:00');
        assert.equal(dateComp1.value,'30-05-2020');

        assert.equal(dateCompAltInput2.value,'2020-05-30T00:00:00');
        assert.equal(dateComp2.value,'30-05-2020');

        const addNewRowBtn = formWithDate.element.querySelector('.formio-button-add-row');
        addNewRowBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          const dataGridRows = formWithDate.element.querySelectorAll('[ref="datagrid-dataGrid-row"]');
          assert.equal(dataGridRows.length, 2);

          const dateCompAltInputAfterAddingRow = formWithDate.element.querySelectorAll('.formio-component-textField')[0].querySelector('.flatpickr-input');
          const dateCompAfterAddingRow = formWithDate.element.querySelectorAll('.formio-component-textField')[0].querySelector('[type="text"]');

          const dateCompAltInputAfterAddingRow1 = formWithDate.element.querySelectorAll('.formio-component-dateTime')[0].querySelector('.flatpickr-input');
          const dateCompAfterAddingRow1 = formWithDate.element.querySelectorAll('.formio-component-dateTime')[0].querySelector('[type="text"]');

          const dateCompAltInputAfterAddingRow2 = formWithDate.element.querySelectorAll('.formio-component-textField2')[0].querySelector('.flatpickr-input');
          const dateCompAfterAddingRow2 = formWithDate.element.querySelectorAll('.formio-component-textField2')[0].querySelector('[type="text"]');

          assert.equal(dateCompAltInputAfterAddingRow.value,'30-05-2020');
          assert.equal(dateCompAfterAddingRow.value,'30-05-2020');

          assert.equal(dateCompAltInputAfterAddingRow1.value,'2020-05-30T00:00:00');
          assert.equal(dateCompAfterAddingRow1.value,'30-05-2020');

          assert.equal(dateCompAltInputAfterAddingRow2.value,'2020-05-30T00:00:00');
          assert.equal(dateCompAfterAddingRow2.value,'30-05-2020');

          done();
         }, 150);
        }, 50);
      }, 100);
    }).catch((err) => done(err));
  });

  it('Should open collapsed panel with invalid components inside container that is inside the panel on submit', function(done) {
    const formElement = document.createElement('div');
    const formWithPanel = new Webform(formElement);

    formWithPanel.setForm(formWithCollapsedPanel).then(() => {
      const clickEvent = new Event('click');

      assert.equal(formWithPanel.components[0].collapsed, true);

      const submitBtn = formWithPanel.element.querySelector('[name="data[submit]"]');
      submitBtn.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(formWithPanel.components[0].collapsed, false);
        done();
      }, 200);
    }).catch((err) => done(err));
  });

  it('Should correctly set date after collapsing and openning the panel', function(done) {
    const formElement = document.createElement('div');
    const formWithDate = new Webform(formElement);

    formWithDate.setForm(formWithDateTimeComponents).then(() => {
      const clickEvent = new Event('click');

      const dateTimeCompInputWidget = formWithDate.element.querySelector('.formio-component-dateTime1').querySelector('.flatpickr-input').widget;
      const dateTimeAltFormat = dateTimeCompInputWidget.calendar.config.altFormat;
      dateTimeCompInputWidget.calendar.setDate('05-05-2020T00:00:00', true, dateTimeAltFormat);

      const textFieldDateCompWidget = formWithDate.element.querySelector('.formio-component-textField1').querySelector('.flatpickr-input').widget;
      const textFieldDateAltFormat = textFieldDateCompWidget.calendar.config.altFormat;
      textFieldDateCompWidget.calendar.setDate('04-04-2020T00:00:00', true, textFieldDateAltFormat);

      setTimeout(() => {
      const dateTimeCompAltInput = formWithDate.element.querySelector('.formio-component-dateTime1').querySelector('.flatpickr-input');
      const textFieldDateCompAltInput = formWithDate.element.querySelector('.formio-component-textField1').querySelector('.flatpickr-input');

      const dateTimeComp = formWithDate.element.querySelector('.formio-component-dateTime1').querySelector('[type="text"]');
      const textFieldDateComp = formWithDate.element.querySelector('.formio-component-textField1').querySelector('[type="text"]');

      assert.equal(dateTimeCompAltInput.value,'2020-05-05T00:00:00');
      assert.equal(textFieldDateCompAltInput.value,'2020-04-04T00:00:00');

      assert.equal(dateTimeComp.value,'05-05-2020');
      assert.equal(textFieldDateComp.value,'04-04-2020');

      const panelCollapseBtn = formWithDate.element.querySelector('.formio-collapse-icon');
      panelCollapseBtn.dispatchEvent(clickEvent);

      setTimeout(() => {
        const panelBody = formWithDate.element.querySelector('.panel-body');
        assert.equal(!!panelBody, false);

        formWithDate.element.querySelector('.formio-collapse-icon').dispatchEvent(clickEvent);

        setTimeout(() => {
          const dateTimeCompAfterOpenningPanel = formWithDate.element.querySelector('.formio-component-dateTime1').querySelector('[type="text"]');
          const textFieldDateCompAfterOpenningPanel = formWithDate.element.querySelector('.formio-component-textField1').querySelector('[type="text"]');

          const dateTimeCompAltInputAfterOpenningPanel = formWithDate.element.querySelector('.formio-component-dateTime1').querySelector('.flatpickr-input');
          const textFieldDateCompAltInputAfterOpenningPanel = formWithDate.element.querySelector('.formio-component-textField1').querySelector('.flatpickr-input');

          assert.equal(dateTimeCompAltInputAfterOpenningPanel.value,'2020-05-05T00:00:00');
          assert.equal(textFieldDateCompAltInputAfterOpenningPanel.value,'2020-04-04T00:00:00');

          assert.equal(dateTimeCompAfterOpenningPanel.value,'05-05-2020');
          assert.equal(textFieldDateCompAfterOpenningPanel.value,'04-04-2020');
          done();
         }, 250);
       }, 150);
      }, 50);
    }).catch((err) => done(err));
  });

  it(`Should show confirmation alert when clicking X btn or clicking outside modal window after editing
  editGrid modal draft row`, function(done) {
   const formElement = document.createElement('div');
   const formWithNestedDraftModals = new Webform(formElement);

   formWithNestedDraftModals.setForm(formWithEditGridAndNestedDraftModalRow).then(() => {
     const editGrid = formWithNestedDraftModals.getComponent('editGrid');
     const clickEvent = new Event('click');
     const inputEvent = new Event('input');

     const addRowBtn = formWithNestedDraftModals.element.querySelector( '[ref="editgrid-editGrid-addRow"]');
     //click to open row in modal view
     addRowBtn.dispatchEvent(clickEvent);

     setTimeout(() => {
       const rowModal = document.querySelector(`.editgrid-row-modal-${editGrid.id}`);
       //checking if row modal was openned
       assert.equal(!!rowModal, true);

       const textField = rowModal.querySelector('[name="data[textField]"]');
       textField.value = 'test';
       //input value
       textField.dispatchEvent(inputEvent);

       setTimeout(() => {
         //checking if the value was set inside the field
         assert.equal(textField.value, 'test');

         const saveModalBtn = rowModal.querySelector('.btn-primary');
         //clicking save button to save row draft
         saveModalBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          const editGridRows = formWithNestedDraftModals.element.querySelectorAll('[ref="editgrid-editGrid-row"]');
          //checking if the editGrid row was created
          assert.equal(editGridRows.length, 1);

          const editRowBtn = editGridRows[0].querySelector('.editRow');
          //click the edit btn to open the row again
          editRowBtn.dispatchEvent(clickEvent);

          setTimeout(() => {
            const rowModalForEditing = document.querySelector(`.editgrid-row-modal-${editGrid.id}`);
            const textFieldInputForEditing = rowModalForEditing.querySelector('[name="data[textField]"]');
            textFieldInputForEditing.value = 'changed value';
            //changing textfield value
            textFieldInputForEditing.dispatchEvent(inputEvent);

            setTimeout(() => {
              //checking if the textfield value was changed
              const inputValue = textFieldInputForEditing.value;
              assert.equal(inputValue, 'changed value');

              const XCloseBtn = rowModalForEditing.querySelector('[ref="dialogClose"]');
              //clicking modal close btn
              XCloseBtn.dispatchEvent(clickEvent);

                setTimeout(() => {
                  const dialogConfirmationWindows = document.querySelectorAll(`.editgrid-row-modal-confirmation-${editGrid.id}`);
                  //checking if confirmation dialog is openned
                  assert.equal(dialogConfirmationWindows.length, 1);

                  const dialogCancelBtn = dialogConfirmationWindows[0].querySelector('[ref="dialogCancelButton"]');
                  //closing confirmation dialog
                  dialogCancelBtn.dispatchEvent(clickEvent);

                  setTimeout(() => {
                    const confirmationWindows = document.querySelectorAll(`.editgrid-row-modal-confirmation-${editGrid.id}`);
                    //checking if confirmation dialig is closed
                    assert.equal(confirmationWindows.length, 0);

                    const dialog = document.querySelector(`.editgrid-row-modal-${editGrid.id}`);
                    const overlay = dialog.querySelector('[ref="dialogOverlay"]');
                    //clocking model overlay to open confirmation dialog again
                    overlay.dispatchEvent(clickEvent);

                    setTimeout(() => {
                      const confirmationDialogsAfterClickingOverlay = document.querySelectorAll(`.editgrid-row-modal-confirmation-${editGrid.id}`);
                      assert.equal(confirmationDialogsAfterClickingOverlay.length, 1);

                      document.body.innerHTML = '';
                      done();
                     }, 190);
                   }, 170);
                 }, 150);
              }, 130);
            }, 110);
          }, 100);
        }, 70);
      }, 50);
    }).catch((err) => done(err));
 });

  it('Should not show validation errors when saving invalid draft row in dataGrid', function(done) {
    const formElement = document.createElement('div');
    const formWithDraftModals = new Webform(formElement);

    formWithDraftModals.setForm(formWithEditGridModalDrafts).then(() => {
      const clickEvent = new Event('click');
      const inputEvent = new Event('input');

      const addRowBtn =  formWithDraftModals.element.querySelector( '[ref="editgrid-editGrid-addRow"]');
      //click to open row in modal view
      addRowBtn.dispatchEvent(clickEvent);

      setTimeout(() => {
        const rowModal = document.querySelector('.formio-dialog-content');
        //checking if row modal was openned
        assert.equal(!!rowModal, true);

        const textFieldInput = rowModal.querySelector('[name="data[editGrid][0][textField]"]');
        textFieldInput.value = 'test';
        //input value in one of required row fields
        textFieldInput.dispatchEvent(inputEvent);

        setTimeout(() => {
          //checking if the value was set inside the field
          assert.equal(textFieldInput.value, 'test');

          const saveModalBtn = rowModal.querySelector('.btn-primary');
          //clicking save button to save row draft
          saveModalBtn.dispatchEvent(clickEvent);

          setTimeout(() => {
            const editGridRows = formWithDraftModals.element.querySelectorAll( '[ref="editgrid-editGrid-row"]');
            //checking if the editGrid row was created
            assert.equal(editGridRows.length, 1);
            const rowError = formWithDraftModals.element.querySelector('.editgrid-row-error').textContent.trim();
            const editGridError = formWithDraftModals.element.querySelector('[ref="messageContainer"]').querySelector('.error');

            assert.equal(!!rowError, false);
            assert.equal(!!editGridError, false);

            done();
          }, 200);
        }, 100);
      }, 50);
    }).catch((err) => done(err));
  });

  it('Should show dataGrid rows when viewing submission in dataGrid with initEmpty option', function(done) {
    const formElement = document.createElement('div');
    const formWithDataGridInitEmptyOption = new Webform(formElement);

    formWithDataGridInitEmptyOption.setForm(formWithDataGridInitEmpty.form).then(() => {
      formWithDataGridInitEmptyOption.setSubmission(formWithDataGridInitEmpty.submission2);

      setTimeout(() => {
        const dataGridRows =  formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid-row"]');
        const dataGrid1Rows =  formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid1-row"]');

        assert.equal(dataGrid1Rows.length, 1);
        assert.equal(dataGridRows.length, 1);

        formWithDataGridInitEmptyOption.setSubmission(formWithDataGridInitEmpty.submission3);

        setTimeout(() => {
          const dataGridRows1 =  formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid-row"]');
          const dataGrid1Rows1 =  formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid1-row"]');
          const dataGridSecondRowComponentValue = formWithDataGridInitEmptyOption.element.querySelector('[name = "data[dataGrid][1][textField]"]');
          const dataGrid1FirstRowComponentValue = formWithDataGridInitEmptyOption.element.querySelector('[name = "data[dataGrid1][0][textArea]"]');
          const dataGrid1SecondRowComponentValue = formWithDataGridInitEmptyOption.element.querySelector('[name = "data[dataGrid1][1][number]"]');

          assert.equal(dataGrid1Rows1.length, 2);
          assert.equal(dataGridRows1.length, 2);
          assert.equal(dataGridSecondRowComponentValue.value, 'test2');
          assert.equal(dataGrid1FirstRowComponentValue.textContent, 'test3');
          assert.equal(dataGrid1SecondRowComponentValue.value, 222);

          done();
        }, 300);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should not show dataGrid rows when empty submission is set for dataGrid with initEmpty', function(done) {
    const formElement = document.createElement('div');
    const formWithDataGridInitEmptyOption = new Webform(formElement);

    formWithDataGridInitEmptyOption.setForm(formWithDataGridInitEmpty.form).then(() => {
      formWithDataGridInitEmptyOption.setSubmission(formWithDataGridInitEmpty.submission1);

      setTimeout(() => {
        const dataGridRows =  formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid-row"]');
        const dataGrid1Rows =  formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid1-row"]');

        assert.equal(dataGridRows.length, 0);
        assert.equal(dataGrid1Rows.length, 0);

        formWithDataGridInitEmptyOption.setSubmission({ data: {} });
        setTimeout(() => {
          const dataGridRows1 =  formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid-row"]');
          const dataGrid1Rows1 =  formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid1-row"]');

          assert.equal(dataGridRows1.length, 0);
          assert.equal(dataGrid1Rows1.length, 0);

          done();
        }, 300);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should show address submission data inside dataGrid', function(done) {
    const formElement = document.createElement('div');
    const formWithAddress = new Webform(formElement);

    formWithAddress.setForm(formWithAddressComponent.form).then(() => {
      formWithAddress.setSubmission({ data: formWithAddressComponent.submission });

      setTimeout(() => {
        const addressInput = formWithAddress.element.querySelector('[name = "data[dataGrid][0][address]"]');

        assert.equal(addressInput.value, formWithAddressComponent.submission.dataGrid[0].address['formatted_address']);

        done();
      }, 300);
    })
    .catch((err) => done(err));
  });

  it('Should validate field on blur inside panel', function(done) {
    const formElement = document.createElement('div');
    const formWithBlurValidation = new Webform(formElement);

    formWithBlurValidation.setForm(formWithBlurValidationInsidePanel).then(() => {
      const inputEvent = new Event('input');
      const focusEvent = new Event('focus');
      const blurEvent = new Event('blur');
      const fieldWithBlurValidation = formWithBlurValidation.element.querySelector('[name="data[textField]"]');

      fieldWithBlurValidation.dispatchEvent(focusEvent);
        'test'.split('').forEach(character => {
          fieldWithBlurValidation.value = fieldWithBlurValidation.value + character;
          fieldWithBlurValidation.dispatchEvent(inputEvent);
      });

      setTimeout(() => {
        const validationErrorBeforeBlur = formWithBlurValidation.element.querySelector('.error');
        assert.equal(!!validationErrorBeforeBlur, false);
        assert.equal(formWithBlurValidation.data.textField, 'test');

        fieldWithBlurValidation.dispatchEvent(blurEvent);

        setTimeout(() => {
          const validationErrorAfterBlur = formWithBlurValidation.element.querySelector('.error');

          assert.equal(!!validationErrorAfterBlur, true);
          assert.equal(validationErrorAfterBlur.textContent, 'Text Field must have at least 5 characters.');

          done();
        }, 350);
      }, 300);
    })
    .catch((err) => done(err));
  });

  it('Should submit form with empty time field when time field is not required', function(done) {
    const formElement = document.createElement('div');
    const formWithTime = new Webform(formElement);

    formWithTime.setForm(formWithTimeComponent).then(() => {
      const clickEvent = new Event('click');
      const submitBtn = formWithTime.element.querySelector('[name="data[submit]"]');

      submitBtn.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(formWithTime.errors.length, 0);
        assert.equal(formWithTime.data.submit, true);

        done();
      }, 200);
    })
    .catch((err) => done(err));
  });

  it(`Should show validation errors and update validation errors list when openning and editing edit grid rows
  in draft modal mode after pushing submit btn`, function(done) {
    const formElement = document.createElement('div');
    const formWithDraftModals = new Webform(formElement);

    formWithDraftModals.setForm(formWithEditGridModalDrafts).then(() => {
      const clickEvent = new Event('click');
      const inputEvent = new Event('input');

      const addRowBtn =  formWithDraftModals.element.querySelector( '[ref="editgrid-editGrid-addRow"]');
      //click to open row in modal view
      addRowBtn.dispatchEvent(clickEvent);

      setTimeout(() => {
        const editGrid = formWithDraftModals.getComponent('editGrid');

        assert.equal(editGrid.editRows.length, 1, 'Should create a row');

        const rowModal = editGrid.editRows[0].dialog;
        //checking if row modal was openned
        assert.equal(!!rowModal, true, 'Should open a modal window');

        const textFieldInput = rowModal.querySelector('[name="data[editGrid][0][textField]"]');
        textFieldInput.value = 'test';
        //input value in one of required row fields
        textFieldInput.dispatchEvent(inputEvent);

        setTimeout(() => {
          //checking if the value was set inside the field
          assert.equal(textFieldInput.value, 'test');

          const saveModalBtn = rowModal.querySelector('.btn-primary');
          //clicking save button to save row draft
          saveModalBtn.dispatchEvent(clickEvent);

          setTimeout(() => {
            const editGridRows = formWithDraftModals.element.querySelectorAll( '[ref="editgrid-editGrid-row"]');
            //checking if the editGrid row was created
            assert.equal(editGridRows.length, 1);

            const submitBtn = formWithDraftModals.element.querySelector('[name="data[submit]"');
            //pushing submit button to trigger validation
            submitBtn.dispatchEvent(clickEvent);

            setTimeout(() => {
              //checking the number of appeared errors
              assert.equal(formWithDraftModals.errors.length, 2);

              const rowError = formWithDraftModals.element.querySelector('.editgrid-row-error').textContent.trim();
              const editGridError = formWithDraftModals.element.querySelector('[ref="messageContainer"]').querySelector('.error').textContent;
              //checking if right errors were shown in right places
              assert.equal(rowError, 'Invalid row. Please correct it or delete.');
              assert.equal(editGridError, 'Please correct invalid rows before proceeding.');

              const rowEditBtn = editGridRows[0].querySelector('.editRow');
              //open row modal again to check if there are errors
              rowEditBtn.dispatchEvent(clickEvent);

              setTimeout(() => {
                const rowModalAfterValidation = editGrid.editRows[0].dialog;

                const alertWithErrorText = rowModalAfterValidation.querySelector('.alert-danger');
                //checking if alert with errors list appeared inside the modal
                assert.equal(!!alertWithErrorText, true, 'Should show error alert');

                const alertErrorMessages = rowModalAfterValidation.querySelectorAll('[ref="messageRef"]');
                assert.equal(alertErrorMessages.length, 1);

                const numberComponentError = rowModalAfterValidation.querySelector('.formio-component-number').querySelector('.error').textContent;
                //checking if error was shown for empty required field
                assert.equal(numberComponentError, 'Number is required');

                const numberInput = rowModalAfterValidation.querySelector('[name="data[editGrid][0][number]"]');
                numberInput.value = 123;
                //input value to make the field valid
                numberInput.dispatchEvent(inputEvent);

                setTimeout(() => {
                  const rowModalWithValidFields = document.querySelector(`.editgrid-row-modal-${editGrid.id}`);
                  const alertErrorMessagesAfterInputtingValidValues = rowModalWithValidFields.querySelectorAll('[ref="messageRef"]');
                  assert.equal(alertErrorMessagesAfterInputtingValidValues.length, 0);

                  //input values to make all row fields invalid
                  const validNumberInput = rowModalWithValidFields.querySelector('[name="data[editGrid][0][number]"]');
                  validNumberInput.value = null;
                  validNumberInput.dispatchEvent(inputEvent);

                  const validTextInput = rowModalWithValidFields.querySelector('[name="data[editGrid][0][textField]"]');
                  validTextInput.value = '';
                  validTextInput.dispatchEvent(inputEvent);

                  setTimeout(() => {
                    const alertErrorMessagesAfterInputtingInvalidValues = document
                      .querySelector(`.editgrid-row-modal-${editGrid.id}`)
                      .querySelectorAll('[ref="messageRef"]');

                    assert.equal(alertErrorMessagesAfterInputtingInvalidValues.length, 2);
                    document.body.innerHTML = '';

                    done();
                  }, 280);
                }, 240);
              }, 200);
            }, 160);
          }, 120);
        }, 80);
      }, 50);
    }).catch((err) => done(err));
  });

  it('Should not override calculated value', function(done) {
    const formElement = document.createElement('div');
    const formWithCalculatedAmount = new Webform(formElement);

    formWithCalculatedAmount.setForm(formWithCalculatedValueWithoutOverriding).then(() => {
      const inputEvent = new Event('input');

      const amountInput1 = formWithCalculatedAmount.element.querySelector('[name="data[amount1]"]');
      const amountInput2 = formWithCalculatedAmount.element.querySelector('[name="data[amount2]"]');

      amountInput1.value = 6;
      amountInput2.value = 4;

      amountInput1.dispatchEvent(inputEvent);
      amountInput2.dispatchEvent(inputEvent);

      setTimeout(() => {
        const totalAmountInput = formWithCalculatedAmount.element.querySelector('[name="data[currency]"]');
        //checking if the value was calculated correctly
        assert.equal(totalAmountInput.value, '$10.00');

        const inputEvent = new Event('input');
        //trying to override calculated value
        totalAmountInput.value =  55;
        totalAmountInput.dispatchEvent(inputEvent);

        setTimeout(() => {
          const totalAmountInput = formWithCalculatedAmount.element.querySelector('[name="data[currency]"]');
          //checking if the value was overridden
          assert.equal(totalAmountInput.value, '$10.00');

          done();
        }, 400);
      }, 300);
    })
    .catch((err) => done(err));
  });

  it(`Should show field only in container where radio component has 'yes' value when containers contain radio
  components with the same key`, function(done) {
    const formElement = document.createElement('div');
    const formWithCondition = new Webform(formElement);

    formWithCondition.setForm(formWithConditionalLogic).then(() => {
      Harness.clickElement(formWithCondition, formWithCondition.element.querySelector('.formio-component-container1').querySelector('[value="yes"]'));

      setTimeout(() => {
        const conditionalFieldInContainer1 = formWithCondition.element.querySelector('[name="data[container1][textField]"]');
        const conditionalFieldInContainer2 = formWithCondition.element.querySelector('[name="data[container2][textField]"]');

        assert.equal(!!conditionalFieldInContainer1, true);
        assert.equal(!!conditionalFieldInContainer2, false);

        done();
      }, 400);
    })
    .catch((err) => done(err));
  });

  it('Should show only "required field" error when submitting empty required field with pattern validation', function(done) {
    const formElement = document.createElement('div');
    const formWithPattern = new Webform(formElement);

    formWithPattern.setForm(formWithPatternValidation).then(() => {
    Harness.clickElement(formWithPattern, formWithPattern.element.querySelector('[name="data[submit]"]'));

    setTimeout(() => {
      assert.equal(formWithPattern.element.querySelector('.formio-component-textField').querySelectorAll('.error').length, 1);
      assert.equal(formWithPattern.errors[0].messages.length, 1);
      assert.equal(formWithPattern.errors[0].messages[0].message, 'Text Field is required');
      assert.equal(formWithPattern.element.querySelector('[ref="errorRef"]').textContent, 'Text Field is required');
      done();
    }, 500);
    })
    .catch((err) => done(err));
  });

  it('Should disable field applying advanced logic if dot is used inside component key', function(done) {
    const formElement = document.createElement('div');
    const formWithLogic = new Webform(formElement);

    formWithLogic.setForm(formWithAdvancedLogic).then(() => {
      assert.equal(formWithLogic.components[1].disabled, false);

      Harness.clickElement(formWithLogic, formWithLogic.element.querySelector('[name="data[requestedCovers.HOUSECONTENT_JEWELRY]"]'));

      setTimeout(() => {
        assert.equal(formWithLogic.components[1].disabled, true);
        done();
      }, 500);
    })
    .catch((err) => done(err));
  });

  let formWithCalculatedValue;

  it('Should calculate the field value after validation errors appeared on submit', function(done) {
    const formElement = document.createElement('div');
    formWithCalculatedValue = new Webform(formElement);
    formWithCalculatedValue.setForm(manualOverride).then(() => {
      Harness.clickElement(formWithCalculatedValue, formWithCalculatedValue.components[2].refs.button);
      setTimeout(() => {
        const inputEvent = new Event('input');
        const input1 = formWithCalculatedValue.components[0].refs.input[0];

          input1.value =  55;
          input1.dispatchEvent(inputEvent);

        setTimeout(() => {
          const input2 = formElement.querySelector('input[name="data[number2]"]');
          assert.equal(input2.value, '55');
          assert.equal(input1.value, 55);
          done();
        }, 250);
      }, 250);
    })
    .catch((err) => done(err));
  });

  it('Should calculate the value when editing set values with possibility of manual override', function(done) {
    const formElement = document.createElement('div');
    formWithCalculatedValue = new Webform(formElement);
    formWithCalculatedValue.setForm(manualOverride).then(() => {
      formWithCalculatedValue.setSubmission({
        data:{
          number1: 66,
          number2:66
        }
      }).then(()=>{
        setTimeout(()=>{
          const input1 = formElement.querySelector('input[name="data[number1]"]');
          const input2 = formElement.querySelector('input[name="data[number2]"]');

          assert.equal(input2.value, '66');
          assert.equal(input1.value, 66);

          const inputEvent = new Event('input');

          input1.value =  `${input1.value}` + '78';
          input1.dispatchEvent(inputEvent);

          setTimeout(() => {
            assert.equal(input2.value, '6678');
            assert.equal(input1.value, 6678);
            //set a number as calculated value
            formWithCalculatedValue.components[1].calculatedValue = 6678;
            //change the value
            input1.value =  +(`${input1.value}` + '90');
            input1.dispatchEvent(inputEvent);

            setTimeout(() => {
              assert.equal(input2.value, '667890');
              assert.equal(input1.value, 667890);
              done();
            }, 250);
          }, 250);
        }, 900);
      });
    });
  });

  let simpleForm = null;
  it('Should create a simple form', (done) => {
    const formElement = document.createElement('div');
    simpleForm = new Webform(formElement);
    simpleForm.setForm({
      title: 'Simple Form',
      components: [
        {
          type: 'textfield',
          key: 'firstName',
          input: true
        },
        {
          type: 'textfield',
          key: 'lastName',
          input: true
        }
      ]
    }).then(() => {
      Harness.testElements(simpleForm, 'input[type="text"]', 2);
      Harness.testElements(simpleForm, 'input[name="data[firstName]"]', 1);
      Harness.testElements(simpleForm, 'input[name="data[lastName]"]', 1);
      done();
    }).catch(done);
  });

  it('Should set a submission to the form.', () => {
    Harness.testSubmission(simpleForm, { data: {
      firstName: 'Joe',
      lastName: 'Smith'
    } });
  });

  it('Should translate a form from options', done => {
    const formElement = document.createElement('div');
    const translateForm = new Webform(formElement, {
      template: 'bootstrap3',
      language: 'es',
      i18n: {
        es: {
          'Default Label': 'Spanish Label'
        }
      }
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [
        {
          type: 'textfield',
          label: 'Default Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {}
        }
      ]
    }).then(() => {
      const label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML.trim(), 'Spanish Label');
      done();
    }).catch(done);
  });

  it('Should treat double colons as i18next namespace separators', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm({
      title: 'Test Form',
      components: []
    }).then(() => {
      const str = 'Test: this is only a test';

      assert.equal(form.t(str), str);
      assert.equal(form.t(`Namespace::${str}`), str);

      done();
    }).catch(done);
  });

  it('Should get the language passed via options', () => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, {
      language: 'es'
    });

    assert.equal(form.language, 'es');
  });

  it('Should translate form errors in alerts', () => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, {
      language: 'es',
      i18n: {
        es: {
          alertMessage: '{{message}}',
          required: '{{field}} es obligatorio'
        }
      }
    });

    return form.setForm({
      components: [
        {
          type: 'textfield',
          label: 'Field Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {
            required: true
          }
        }
      ]
    })
      .then(() => form.submit())
      .catch(() => {
        // console.warn('nooo:', error)
      })
      .then(() => {
        const ref = formElement.querySelector('[ref="errorRef"]');
        assert.equal(ref.textContent, 'Field Label es obligatorio');
      });
  });

  it('Should translate a form after instantiate', done => {
    const formElement = document.createElement('div');
    const translateForm = new Webform(formElement, {
      template: 'bootstrap3',
      i18n: {
        es: {
          'Default Label': 'Spanish Label'
        }
      }
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [
        {
          type: 'textfield',
          label: 'Default Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {}
        }
      ]
    }).then(() => {
      translateForm.language = 'es';
      const label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML.trim(), 'Spanish Label');
      done();
    }).catch(done);
  });

  it('Should add a translation after instantiate', done => {
    const formElement = document.createElement('div');
    const translateForm = new Webform(formElement, {
      template: 'bootstrap3',
      i18n: {
        language: 'es',
        es: {
          'Default Label': 'Spanish Label'
        },
        fr: {
          'Default Label': 'French Label'
        }
      }
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [
        {
          type: 'textfield',
          label: 'Default Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {}
        }
      ]
    }).then(() => {
      translateForm.language = 'fr';
      const label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML.trim(), 'French Label');
      done();
    }).catch(done);
  });

  it('Should switch a translation after instantiate', done => {
    const formElement = document.createElement('div');
    const translateForm = new Webform(formElement, {
      template: 'bootstrap3',
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [
        {
          type: 'textfield',
          label: 'Default Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {}
        }
      ]
    }).then(() => {
      translateForm.addLanguage('es', { 'Default Label': 'Spanish Label' }, true);
      const label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML.trim(), 'Spanish Label');
      done();
    }).catch(done);
  });

  it('Should keep translation after redraw', done => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, {
      template: 'bootstrap3',
    });
    const schema = {
      title: 'Translate Form',
      components: [
        {
          type: 'textfield',
          label: 'Default Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {}
        }
      ]
    };

    try {
      form.setForm(schema)
        .then(() => {
          form.addLanguage('ru', { 'Default Label': 'Russian Label' }, true);
          return form.language = 'ru';
        }, done)
        .then(() => {
          expect(form.options.language).to.equal('ru');
          expect(formElement.querySelector('.control-label').innerHTML.trim()).to.equal('Russian Label');
          form.redraw();
          expect(form.options.language).to.equal('ru');
          expect(formElement.querySelector('.control-label').innerHTML.trim()).to.equal('Russian Label');
          done();
        }, done)
        .catch(done);
    }
    catch (error) {
      done(error);
    }
  });

  it('Should fire languageChanged event when language is set', done => {
    let isLanguageChangedEventFired = false;
    const formElement = document.createElement('div');
    const form = new Webform(formElement, {
      template: 'bootstrap3',
    });
    const schema = {
      title: 'Translate Form',
      components: [
        {
          type: 'textfield',
          label: 'Default Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {}
        }
      ]
    };

    try {
      form.setForm(schema)
        .then(() => {
          form.addLanguage('ru', { 'Default Label': 'Russian Label' }, false);
          form.on('languageChanged', () => {
            isLanguageChangedEventFired = true;
          });
          return form.language = 'ru';
        }, done)
        .then(() => {
          assert(isLanguageChangedEventFired);
          done();
        }, done)
        .catch(done);
    }
    catch (error) {
      done(error);
    }
  });

  it('When submitted should strip fields with persistent: client-only from submission', done => {
    const formElement = document.createElement('div');
    simpleForm = new Webform(formElement);
    /* eslint-disable quotes */
    simpleForm.setForm({
      title: 'Simple Form',
      components: [
        {
          "label": "Name",
          "allowMultipleMasks": false,
          "showWordCount": false,
          "showCharCount": false,
          "tableView": true,
          "type": "textfield",
          "input": true,
          "key": "name",
          "widget": {
            "type": ""
          }
        },
        {
          "label": "Age",
          "persistent": "client-only",
          "mask": false,
          "tableView": true,
          "type": "number",
          "input": true,
          "key": "age"
        }
      ]
    });
    /* eslint-enable quotes */

    Harness.testSubmission(simpleForm, {
      data: { name: 'noname', age: '1' }
    });

    simpleForm.submit().then((submission) => {
      assert.deepEqual(submission.data, { name: 'noname' });
      done();
    });
  });

  it('Should not mutate the global i18next if it gets an instance', async function() {
    await i18next.init({ lng: 'en' });
    const instance = i18next.createInstance();

    const formElement = document.createElement('div');
    const translateForm = new Webform(formElement, {
      template: 'bootstrap3',
      language: 'es',
      i18next: instance,
      i18n: {
        es: {
          'Default Label': 'Spanish Label'
        }
      }
    });

    return translateForm.setForm({
      title: 'Translate Form',
      components: [
        {
          type: 'textfield',
          label: 'Default Label',
          key: 'myfield',
          input: true,
          inputType: 'text',
          validate: {}
        }
      ]
    }).then(() => {
      assert.equal(i18next.language, 'en');
      assert.equal(translateForm.i18next.language, 'es');
      assert.equal(translateForm.i18next, instance);

      const label = formElement.querySelector('.control-label');
      assert.equal(label.innerHTML.trim(), 'Spanish Label');
    });
  });

  it('Should keep components valid if they are pristine', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
    form.setForm(settingErrors).then(() => {
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      const input = form.element.querySelector('input[name="data[textField]"]');
      for (let i = 0; i < 50; i++) {
        input.value += i;
        input.dispatchEvent(inputEvent);
      }

      setTimeout(() => {
        assert.equal(form.errors.length, 0);
        Harness.setInputValue(form, 'data[textField]', '');
        setTimeout(() => {
          assert.equal(form.errors.length, 1);
          done();
        }, 250);
      }, 250);
    }).catch(done);
  });

  it('Should delete value of hidden component if clearOnHide is turned on', function(done) {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
    form.setForm(clearOnHide).then(() => {
      const visibleData = {
        data: {
          visible: 'yes',
          clearOnHideField: 'some text',
          submit: false
        },
        metadata: {}
      };

      const hiddenData = {
        data: {
          visible: 'no',
          submit: false
        }
      };
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      const textField = form.element.querySelector('input[name="data[clearOnHideField]"]');
      textField.value = 'some text';
      textField.dispatchEvent(inputEvent);
      this.timeout(1000);
      setTimeout(() => {
        assert.deepEqual(form.data, visibleData.data);
        Harness.setInputValue(form, 'data[visible]', 'no');

        setTimeout(() => {
          assert.deepEqual(form.data, hiddenData.data);
          done();
        }, 250);
      }, 250);
    });
  });

  const formElement = document.createElement('div');
  const checkForErrors = function(form, flags = {}, submission, numErrors, done) {
    form.setSubmission(submission, flags).then(() => {
      setTimeout(() => {
        const errors = formElement.querySelectorAll('.formio-error-wrapper');
        expect(errors.length).to.equal(numErrors);
        expect(form.errors.length).to.equal(numErrors);
        done();
      }, 100);
    }).catch(done);
  };

  it('Should not fire validations when fields are either protected or not persistent.', (done) => {
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      {
        title: 'protected and persistent',
        components: [
          {
            type: 'textfield',
            label: 'A',
            key: 'a',
            validate: {
              required: true
            }
          },
          {
            type: 'textfield',
            label: 'B',
            key: 'b',
            protected: true,
            validate: {
              required: true
            }
          }
        ],
      }).then(() => {
        checkForErrors(form, {}, {}, 0, () => {
          checkForErrors(form, {}, {
            data: {
              a: 'Testing',
              b: ''
            }
          }, 1, () => {
            checkForErrors(form, {}, {
              _id: '123123123',
              data: {
                a: 'Testing',
                b: ''
              }
            }, 0, done);
          });
        });
    });
  });

  it('Should not fire validation on init.', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }).then(() => {
        checkForErrors(form, {}, {}, 0, done);
    });
  });

  it('Should validation on init when alwaysDirty flag is set.', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement, {
      language: 'en',
      template: 'bootstrap3',
      alwaysDirty: true
    });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }).then(() => {
      checkForErrors(form, {}, {}, 2, done);
    });
  });

  it('Should validation on init when dirty flag is set.', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }).then(() => {
      checkForErrors(form, {
        dirty: true
      }, {}, 2, done);
    });
  });

  it('Should not show any errors on setSubmission when providing an empty data object', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }
    ).then(() => {
      checkForErrors(form, {}, {}, 0, done);
    });
  });

  it('Should not show errors when providing empty data object with data set.', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }
    ).then(() => {
      checkForErrors(form, {}, { data: {} }, 0, done);
    });
  });

  it('Should show errors on setSubmission when providing explicit data values.', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }
    ).then(() => {
      checkForErrors(form, {}, {
        data:{
          number: 2,
          textArea: ''
        }
      }, 2, done);
    });
  });

  it('Should not show errors on setSubmission with noValidate:TRUE', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement,{ language: 'en', template: 'bootstrap3' });
    form.setForm(
      { title: 'noValidation flag',
        components: [{
          label: 'Number',
          validate: {
            required: true,
            min: 5
          },
          key: 'number',
          type: 'number',
          input: true
        }, {
          label: 'Text Area',
          validate: {
            required: true,
            minLength: 10
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        }],
      }
    ).then(() => {
      checkForErrors(form, {
        noValidate:true
      }, {
        data:{
          number: 2,
          textArea: ''
        }
      }, 0, done);
    });
  });

  it('Should set calculated value correctly', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement);
    form.setForm(calculateZeroValue).then(() => {
      const a = form.components[0];
      const b = form.components[1];
      const sum = form.components[2];

      a.setValue(10);
      b.setValue(5);
      setTimeout(() => {
        assert.equal(a.dataValue, 10);
        assert.equal(b.dataValue, 5);
        assert.equal(sum.dataValue, 15);

        a.setValue('0');
        b.setValue('0');
        setTimeout(() => {
          assert.equal(a.dataValue, 0);
          assert.equal(b.dataValue,0);
          assert.equal(sum.dataValue, 0);

          done();
        }, 250);
      }, 250);
    }).catch(done);
  });

  it('Should render Nested Modal Wizard Form correclty', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement);
    form.setForm(nestedModalWizard).then(() => {
      const openModalRef = form.element.querySelector('[ref="openModal"]');
      assert(openModalRef, 'Should render Open Modal button');
      const wizard = form.components[1].subForm;
      wizard.setPage(1);
      setTimeout(() => {
        const openModalRef = form.element.querySelector('[ref="openModal"]');
        assert(openModalRef, 'Should render Open Modal button after the page was changed');
        done();
      }, 250);
    }).catch(done);
  });

  it('Should set calculated value correctly', (done) => {
    formElement.innerHTML = '';
    const form = new Webform(formElement);
    form.setForm(disableSubmitButton).then(() => {
      const textField = form.getComponent(['textField']);
      const fileA = form.getComponent(['upload']);
      const fileB = form.getComponent(['file']);
      const submitButton = form.getComponent(['submit']);
      assert.equal(submitButton.disabled, false, 'Button should be enabled at the beginning');

      const simulateFileUploading = (comp, debounce = 250) => {
        const filePromise = new NativePromise((resolve) => {
          setTimeout(() => resolve(), debounce);
        });
        filePromise.then(() => comp.emit('fileUploadingEnd', filePromise));
        comp.emit('fileUploadingStart', filePromise);
      };

      simulateFileUploading(fileA, 1000);
      textField.setValue('12345');
      setTimeout(() => {
        assert.equal(submitButton.filesUploading.length, 1);
        assert.equal(submitButton.isDisabledOnInvalid, true, 'Should be disabled on invalid due to the invalid TextField\'s value');
        assert.equal(submitButton.disabled, true, 'Should be disabled');
        simulateFileUploading(fileB, 500);
        setTimeout(() => {
          assert.equal(submitButton.filesUploading.length, 2);
          assert.equal(submitButton.disabled, true, 'Should be disabled');
          setTimeout(() => {
            assert.equal(submitButton.filesUploading.length, 0);
            assert.equal(submitButton.disabled, true, 'Should be disabled since TextField is still invalid');
            textField.setValue('123');
            setTimeout(() => {
              assert.equal(submitButton.disabled, false, 'Should be enabled');
              done();
            }, 250);
          }, 650);
        }, 100);
      }, 250);
    }).catch(done);
  });

  describe('set/get nosubmit', () => {
    it('should set/get nosubmit flag and emit nosubmit event', () => {
      const form = new Webform(null, {});
      const emit = sinon.spy(form, 'emit');
      expect(form.nosubmit).to.be.false;
      form.nosubmit = true;
      expect(form.nosubmit).to.be.true;
      expect(emit.callCount).to.equal(1);
      expect(emit.args[0]).to.deep.equal(['nosubmit', true]);
      form.nosubmit = false;
      expect(form.nosubmit).to.be.false;
      expect(emit.callCount).to.equal(2);
      expect(emit.args[1]).to.deep.equal(['nosubmit', false]);
    });
  });

  describe('getValue and setValue', () => {
    it('should setValue and getValue', (done) => {
      formElement.innerHTML = '';
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
      form.setForm({
        components: [
          {
            type: 'textfield',
            key: 'a'
          },
          {
            type: 'container',
            key: 'b',
            components: [
              {
                type: 'datagrid',
                key: 'c',
                components: [
                  {
                    type: 'textfield',
                    key: 'd'
                  },
                  {
                    type: 'textfield',
                    key: 'e'
                  },
                  {
                    type: 'editgrid',
                    key: 'f',
                    components: [
                      {
                        type: 'textfield',
                        key: 'g'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }).then(() => {
        let count = 0;
        const onChange = form.onChange;
        form.onChange = function(...args) {
          count++;
          return onChange.apply(form, args);
        };

        // Ensure that it says it changes.
        assert.equal(form.setValue({
          a: 'a',
          b: {
            c: [
              { d: 'd1', e: 'e1', f: [{ g: 'g1' }] },
              { d: 'd2', e: 'e2', f: [{ g: 'g2' }] },
            ]
          }
        }), true);

        setTimeout(() => {
          // It should have only updated once.
          assert.equal(count, 1);
          done();
        }, 500);
      });
    });
  });

  describe('ReadOnly Form', () => {
    it('Should apply conditionals when in readOnly mode.', (done) => {
      done = _.once(done);
      const Conditions = require('../test/forms/conditions').default;
      const formElement = document.createElement('div');
      const form = new Webform(formElement, {
        readOnly: true,
        language: 'en',
        template: 'bootstrap3'
      });
      form.setForm(Conditions.form).then(() => {
        Harness.testConditionals(form, {
          data: {
            typeShow: 'Show',
            typeMe: 'Me',
            typeThe: 'The',
            typeMonkey: 'Monkey!'
          }
        }, [], (error) => {
          form.destroy();
          if (error) {
            throw new Error(error);
          }
          done();
        });
      });
    });
  });

  describe('Validate onBlur', () => {
    it('Should keep component valid onChange', (done) => {
      formElement.innerHTML = '';
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
      form.setForm(validationOnBlur).then(() => {
        const field = form.components[0];
        const field2 = form.components[1];
        const fieldInput = field.refs.input[0];

        Harness.setInputValue(field, 'data[textField]', '12');

        setTimeout(() => {
          assert(!field.error, 'Should be valid while changing');
          const blurEvent = new Event('blur');
          fieldInput.dispatchEvent(blurEvent);

          setTimeout(() => {
            assert(field.error, 'Should set error aftre component was blured');
            Harness.setInputValue(field2, 'data[textField1]', 'ab');

            setTimeout(() => {
              assert(field.error, 'Should keep error when editing another component');
              done();
            }, 250);
          }, 250);
        }, 250);
      }).catch(done);
    });

    it('Should keep components inside DataGrid valid onChange', (done) => {
      formElement.innerHTML = '';
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
      form.setForm(DataGridOnBlurValidation).then(() => {
        const component = form.components[0];
        Harness.setInputValue(component, 'data[dataGrid][0][textField]', '12');
        const textField = component.iteratableRows[0].components.textField;
        setTimeout(() => {
          assert.equal(textField.error, '', 'Should stay valid on input');
          const blur = new Event('blur', { bubbles: true, cancelable: true });
          const input = textField.refs.input[0];
          input.dispatchEvent(blur);
          textField.element.dispatchEvent(blur);
            setTimeout(() => {
              assert(textField.error, 'Should be validated after blur');
              done();
            }, 250);
        }, 250);
      }).catch(done);
    });
  });

  describe('Reset values', () => {
    it('Should reset all values correctly.', () => {
      formElement.innerHTML = '';
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
      return form.setForm(
        {
          components: [
            {
              type: 'textfield',
              key: 'firstName',
              label: 'First Name',
              placeholder: 'Enter your first name.',
              input: true,
              tooltip: 'Enter your <strong>First Name</strong>',
              description: 'Enter your <strong>First Name</strong>'
            },
            {
              type: 'textfield',
              key: 'lastName',
              label: 'Last Name',
              placeholder: 'Enter your last name',
              input: true,
              tooltip: 'Enter your <strong>Last Name</strong>',
              description: 'Enter your <strong>Last Name</strong>'
            },
            {
              type: 'select',
              label: 'Favorite Things',
              key: 'favoriteThings',
              placeholder: 'These are a few of your favorite things...',
              data: {
                values: [
                  {
                    value: 'raindropsOnRoses',
                    label: 'Raindrops on roses'
                  },
                  {
                    value: 'whiskersOnKittens',
                    label: 'Whiskers on Kittens'
                  },
                  {
                    value: 'brightCopperKettles',
                    label: 'Bright Copper Kettles'
                  },
                  {
                    value: 'warmWoolenMittens',
                    label: 'Warm Woolen Mittens'
                  }
                ]
              },
              dataSrc: 'values',
              template: '<span>{{ item.label }}</span>',
              multiple: true,
              input: true
            },
            {
              type: 'number',
              key: 'number',
              label: 'Number',
              input: true
            },
            {
              type: 'button',
              action: 'submit',
              label: 'Submit',
              theme: 'primary'
            }
          ]
        }
      ).then(() => {
        form.setSubmission({
          data: {
            firstName: 'Joe',
            lastName: 'Bob',
            favoriteThings: ['whiskersOnKittens', 'warmWoolenMittens'],
            number: 233
          }
        }).then(() => {
          expect(form.submission).to.deep.equal({
            data: {
              firstName: 'Joe',
              lastName: 'Bob',
              favoriteThings: ['whiskersOnKittens', 'warmWoolenMittens'],
              number: 233,
              submit: false
            }
          });
          form.setSubmission({ data: {} }).then(() => {
            expect(form.submission).to.deep.equal({
              data: {
                firstName: '',
                lastName: '',
                favoriteThings: [],
                submit: false
              }
            });
          });
        });
      });
    });
  });

  describe('Calculate Value with allowed manual override', () => {
    const initialSubmission = {
      data: {
        dataGrid: [
          { label: 'yes', value: 'yes' },
          { label: 'no', value: 'no' },
        ],
        checkbox: false,
        submit: false
      },
      metadata: {}
    };
    const submissionWithOverridenValues = {
      data: {
        dataGrid: [
          { label: 'yes', value: 'y' },
          { label: 'no', value: 'n' },
        ],
        checkbox: false,
        submit: false
      },
      metadata: {}
    };
    const submissionWithOverridenValues2 = {
      data: {
        dataGrid: [
          { label: 'yes2', value: 'yes2' },
          { label: 'no', value: 'n' },
        ],
        checkbox: false,
        submit: false
      },
      metadata: {}
    };
    it('Should reset all values correctly.', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
      form.setForm(calculateValueWithManualOverride).then(() => {
        const dataGrid = form.getComponent('dataGrid');
        dataGrid.setValue([{ label: 'yes' }, { label: 'no' }]);
        setTimeout(() => {
          expect(form.submission).to.deep.equal(initialSubmission);
          const row1Value = form.getComponent(['dataGrid', 0, 'value']);
          const row2Value = form.getComponent(['dataGrid', 1, 'value']);
          row1Value.setValue('y');
          row2Value.setValue('n');

          setTimeout(() => {
            expect(form.submission).to.deep.equal(submissionWithOverridenValues);
            const row1Label = form.getComponent(['dataGrid', 0, 'label']);
            row1Label.setValue('yes2');
            setTimeout(() => {
              expect(form.submission).to.deep.equal(submissionWithOverridenValues2);
              form.setSubmission(submissionWithOverridenValues).then(() => {
                setTimeout(() => {
                  const tabs = form.getComponent(['tabs']);
                  tabs.setTab(1);
                  setTimeout(() => {
                    expect(form.submission).to.deep.equal(submissionWithOverridenValues);
                    done();
                  }, 250);
                }, 150);
              });
            }, 250);
          }, 250);
        }, 250);
      }).catch(done);
    });

    it('Should allow to change value.', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
      form.setForm(calculatedSelectboxes).then(() => {
        const radio = form.getComponent(['radio']);
        radio.setValue('a');
        setTimeout(() => {
          assert.equal(radio.dataValue, 'a');
          const selectBoxes = form.getComponent(['selectBoxes']);
          assert.equal(selectBoxes.dataValue['a'], true, 'Should calculate value and set it to "a"');
          selectBoxes.setValue({
            'a': true,
            'b': true,
            'c': false
          });
          setTimeout(() => {
            assert.deepEqual(selectBoxes.dataValue, {
              'a': true,
              'b': true,
              'c': false
            }, 'Should change the value');
            done();
          }, 250);
        }, 250);
      }).catch(done);
    });
  });

  describe('Modal Edit', () => {
    const submission = {
      state: 'submitted',
      data: {
        checkbox: true,
        selectBoxes: {
          a: true,
          b: true
        },
        textfield: 'My Text',
        select: 'f',
        submit: true
      }
    };
    const componentsKeys = ['checkbox', 'selectBoxes', 'select', 'textfield'];
    const expectedValues = {
      checkbox: 'Yes',
      selectBoxes: 'a, b',
      select: 'f',
      textfield: 'My Text'
    };
    it('Test rendering previews after the submission is set', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
      form.setForm(modalEditComponents).then(() => {
        return form.setSubmission(submission, { fromSubmission: true }).then(() => {
          componentsKeys.forEach((key) => {
            const comp = form.getComponent([key]);
            assert(comp);
            const preview = comp.componentModal.refs.openModal;
            assert(preview);
            assert.equal(preview.textContent.replace(/\n|\t/g, '').trim(), expectedValues[key]);
          });
          done();
        });
      }).catch(done);
    });

    it('Test updating previews after aboting changes', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
      form.setForm(modalEditComponents).then(() => {
        return form.setSubmission(submission, { fromSubmission: true }).then(() => {
          const comp = form.getComponent(['textfield']);
          comp.componentModal.openModal();
          Harness.dispatchEvent('input', comp.componentModal.refs.modalContents, '[name="data[textfield]"]', (el) => {
            el.value = 'My Text v2';
          });
          setTimeout(() => {
            const fakeEvent = {
              preventDefault: () => {}
            };
            comp.componentModal.closeModalHandler(fakeEvent);
            const preview = comp.componentModal.refs.openModal;
            assert.equal(preview.textContent.replace(/\n|\t/g, '').trim(), 'My Text');
            done();
          }, 100);
        });
      }).catch(done);
    });
  });

  describe('Initially Collapsed Panel', () => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
    form.setForm(initiallyCollapsedPanel).then(() => {
      it('Should be collapsed', (done) => {
        try {
          const panelBody = form.element.querySelector('[ref=nested-panel]');
          assert.equal(panelBody, null, 'Should not render the panel\'s body when initially collapsed');
          done();
        }
        catch (err) {
          done(err);
        }
      });
      it('Should open when an Error occured', (done) => {
        form.executeSubmit().catch(() => {
          try {
            const panelBody = form.element.querySelector('[ref=nested-panel]');
            assert(panelBody, 'Should open the panel when an error occured');
            done();
          }
          catch (err) {
            done(err);
          }
        });
      });
    }).catch((err) => console.error(err));
  });

  describe('Calculate Value', () => {
    it('Should calculate value when set submission if the component is not persistent', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3', pdf: true });
      form.setForm(calculatedNotPersistentValue).then(() => {
        form.setSubmission({
          data:
            {
              a: 'testValue'
            },
          state: 'submitted'
        });
        setTimeout(() => {
          const persistentField = form.getComponent(['a']);
          assert.equal(persistentField.dataValue, 'testValue', 'Should set the value from the submission');
          const notPersistentFieldInput = form.element.querySelector('input[name="data[textField]"]');
          assert.equal(notPersistentFieldInput.value, 'testValue', 'Should calculate the value');
          done();
        }, 550);
      }).catch(done);
    });
    it('Should calculate value by datasouce component when editing mode is on', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3', pdf: true });
      form.setForm(calculateValueInEditingMode).then(() => {
        form.editing = true;
        form.setSubmission({
          data:
            {
              select: { label: 'Dummy #1', value: 'dummy1' },
              dataSourceDisplay: 'some value'
            },
          state: 'submitted'
        });
        setTimeout(() => {
          const dataSourceDisplay = form.getComponent('dataSourceDisplay');
          assert.equal(dataSourceDisplay.dataValue, 'some value', 'Should set and keep the value');
          done();
        }, 1000);
      }).catch(done);
    });
    it('Should calculate value properly in editing mode', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3', pdf: true });
      form.setForm(calculatedValue).then(() => {
        form.editing = true;
        form.setSubmission({
          data:
            {
              a: 4,
              b: 5,
              total: 9,
            },
          state: 'submitted'
        });
        setTimeout(() => {
          const total = form.getComponent(['total']);
          assert.equal(total.dataValue, 9, 'Should set and keep the value');

          const b = form.getComponent(['b']);
          Harness.dispatchEvent('input', b.element, 'input', (i) => i.value = '6');

          setTimeout(() => {
            assert.equal(total.dataValue, 10, 'Should recalculate the value');
          }, 300);
          done();
        }, 1000);
      }).catch(done);
    });
    it('Should not override value which was set from submission', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3', pdf: true });
      form.setForm(calculateValueWithManualOverrideLableValueDataGrid).then(() => {
        form.editing = true;
        form.setSubmission({
          state: 'submitted',
          data: {
            dataGrid: [
              { label: '1', value: '1a' },
              { label: '2', value: '2a' },
              { label: '3', value: '3a' },
            ]
          },
        });
        setTimeout(() => {
          const value1 = form.getComponent(['dataGrid', 0, 'value']);
          assert.equal(value1.dataValue, '1a', 'Should have a value set from submission');
          const value2 = form.getComponent(['dataGrid', 1, 'value']);
          assert.equal(value2.dataValue, '2a', 'Should have a value set from submission');
          const value3 = form.getComponent(['dataGrid', 2, 'value']);
          assert.equal(value3.dataValue, '3a', 'Should have a value set from submission');
          done();
        }, 1000);
      }).catch(done);
    });
  });

  it('Should set different ids for components inside different Table rows', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, { language: 'en', template: 'bootstrap3', pdf: true });
    form.setForm(conditionalDataGridWithTableAndRadio).then(() => {
      const radioInspection0 = form.getComponent(['inspectionDataGrid', 0, 'initialExam']);
      Harness.dispatchEvent(
        'click',
        radioInspection0.element,
        'input[value="reject"]',
        i => i.checked = true,
      );

      setTimeout(() => {
        const repairDataGrid0 = form.getComponent(['inspectionDataGrid', 0, 'repairDataGrid']);
        assert.equal(radioInspection0.dataValue, 'reject', 'Should set value');
        assert.equal(repairDataGrid0.visible, true, 'Should become visible');

        const radioRepair0 = form.getComponent(['inspectionDataGrid', 0, 'repairDataGrid', 0, 'repairExam']);
        Harness.dispatchEvent(
          'click',
          radioRepair0.element,
          'input[value="accept"]',
            i => i.checked = true,
        );

        setTimeout(() => {
          assert.equal(radioRepair0.dataValue, 'accept', 'Should set value');
          const inspectionDataGrid = form.getComponent(['inspectionDataGrid']);
          inspectionDataGrid.addRow();

          setTimeout(() => {
            assert.equal(inspectionDataGrid.rows.length, 2, 'Should add a row');

            const radioInspection1 = form.getComponent(['inspectionDataGrid', 1, 'initialExam']);
            Harness.dispatchEvent(
              'click',
              radioInspection1.element,
              'input[value="reject"]',
              i => i.checked = true,
            );

            setTimeout(() => {
              const repairDataGrid1 = form.getComponent(['inspectionDataGrid', 1, 'repairDataGrid']);
              assert.equal(radioInspection1.dataValue, 'reject', 'Should set value');
              assert.equal(repairDataGrid1.visible, true, 'Should become visible');

              const radioRepair1 = form.getComponent(['inspectionDataGrid', 1, 'repairDataGrid', 0, 'repairExam']);
              Harness.dispatchEvent(
                'click',
                form.element,
                form.element.querySelector(`#${radioRepair1.id}${radioRepair1.row}-accept`),
                i => i.checked = true
              );

              setTimeout(() => {
                assert.equal(radioRepair1.dataValue, 'accept', 'Should set value of the clicked radio');
                assert.equal(radioRepair0.dataValue, 'accept', 'Value of the radio inside another row should stay the same');

                done();
              }, 300);
            }, 350);
          }, 300);
        }, 250);
      }, 350);
    }).catch(done);
  });

  it('Should render components properly', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
    form.setForm(multipleTextareaInsideConditionalComponent).then(() => {
      form.setSubmission({
        data: {
          textArea2: [
            'test'
          ],
          didAnyBehavioralIssuesOccurOnYourShift: 'yes',
          submit: false,
        }
      });
      setTimeout(() => {
        const textarea = form.getComponent(['textArea2']);
        const panel = form.getComponent(['behavioralIssues']);
        assert.equal(panel.visible, true, 'Should be visible');
        assert.deepEqual(textarea.dataValue, ['test'], 'Should set the value from the submission');
        const inputRows = textarea.element.querySelectorAll('[ref="input"]');
        assert.equal(inputRows.length, 1, 'Should render all the rows of the Textarea');
        done();
      }, 750);
    }).catch(done);
  });

  it('Should disable all the components inside Nested Form if it is disabled', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
    form.setForm(disabledNestedForm).then(() => {
      assert.equal(form.components[0].disabled, false, 'Component that is outside of disabled Nested Form should be editable');
      const subFormComponents = form.components[1].subForm.components;
      assert.deepEqual([subFormComponents[0].disabled, subFormComponents[1].disabled], [true, true], 'Components that are inside of disabled Nested Form should be disabled');
      done();
    }).catch(done);
  });

  it('Should restore value correctly if NestedForm is saved as reference', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
    form.setForm(nestedFormInsideDataGrid).then(() => {
      const nestedForm = form.getComponent(['dataGrid', 0, 'form1']);
      const submissionWithIdOnly = { _id: '1232', data: {} };
      nestedForm.dataValue = { ...submissionWithIdOnly };
      nestedForm.restoreValue();

      setTimeout(() => {
        assert.deepEqual(nestedForm.dataValue, submissionWithIdOnly, 'Should not set to defaultValue after restore');
        done();
      }, 350);
    }).catch(done);
  });

  it('Should not set the default value if there is only Radio with False value', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(formElement, nestedFormInWizard).then((form) => {
      const nestedForm = form.getComponent(['form']);
      const submission = {
        data: {
          radio: false
        }
      };

      nestedForm.dataValue = { ...submission };

      setTimeout(() => {
        assert.deepEqual(nestedForm.dataValue, submission, 'Should set submission');
        nestedForm.valueChanged = true;
        form.setPage(1);

        setTimeout(() => {
          assert.deepEqual(nestedForm.dataValue.data, submission.data, 'Should not set to defaultValue after restore');
          done();
        }, 300);
      }, 300);
    }).catch(done);
  });

  it('Should add and clear input error classes correclty', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });

    form.setForm(UpdateErrorClassesWidgets).then(() => {
      const checkbox = form.getComponent('showDate');
      checkbox.setValue(true);
      setTimeout(() => {
        const dateTimeComponent = form.getComponent('condtionalDate');
        const dateComponentElement = dateTimeComponent.element;
        assert.equal(!dateComponentElement.className.includes('formio-hidden'), true, 'Should not be hidden');

        form.submit();

        setTimeout(() => {
          const dateVisibleInput = dateComponentElement.querySelector('.input');
          const flatpickerInput = dateComponentElement.querySelector('.flatpickr-input');

          assert(dateVisibleInput.className.includes('is-invalid'), 'Visible field should has invalid class');
          assert(flatpickerInput.className.includes('is-invalid'), 'Flatpickr field should has invalid class as well');

          dateTimeComponent.setValue('2020-12-09T00:00:00');

          setTimeout(() => {
            assert.equal(dateTimeComponent.dataValue, '2020-12-09T00:00:00', 'Should set value');
            assert(!dateVisibleInput.className.includes('is-invalid'), 'Invalid class should be removed');
            assert(!flatpickerInput.className.includes('is-invalid'), 'Invalid class should be removed from flatpickr field as well');

            checkbox.setValue(false);

            setTimeout(() => {
              const dateComponentElement = dateTimeComponent.element;
              assert.equal(dateComponentElement.className.includes('formio-hidden'), true, 'Should be hidden');
              checkbox.setValue(true);

              setTimeout(() => {
                const dateComponentElement = dateTimeComponent.element;
                assert.equal(!dateComponentElement.className.includes('formio-hidden'), true, 'Should be visible');
                const dateVisibleInput = dateComponentElement.querySelector('.input:not([type="hidden"]');
                const flatpickerInput = dateComponentElement.querySelector('.flatpickr-input');

                assert(dateVisibleInput.className.includes('is-invalid'), 'Visible field should has invalid class');
                assert(flatpickerInput.className.includes('is-invalid'), 'Flatpickr field should has invalid class as well');

                dateTimeComponent.setValue('2020-10-19T00:00:00');
                setTimeout(() => {
                  assert.equal(dateTimeComponent.dataValue, '2020-10-19T00:00:00', 'Should set value');
                  assert(!dateVisibleInput.className.includes('is-invalid'), 'Invalid class should be removed');
                  assert(!flatpickerInput.className.includes('is-invalid'), 'Invalid class should be removed from flatpickr field as well');
                  done();
                }, 300);
              }, 400);
            }, 300);
          }, 300);
        }, 300);
      }, 350);
    }).catch(done);
  }).timeout(3000);

  it('Should have number and currency fields in empty form submission', function(done) {
    const formElement = document.createElement('div');
    const form= new Webform(formElement);
    const formJson = {
      components: [
        {
          label: 'Number',
          key: 'number',
          type: 'number'
        },
        {
          label: 'Currency',
          key: 'currency',
          type: 'currency'
        },
        {
          type: 'button',
          label: 'Submit',
          key: 'submit'
        },
      ],
    };

    const emptySubmissionData = {
      number: '',
      currency: '',
      submit: true
    };

    form.setForm(formJson).then(() => {
      const clickEvent = new Event('click');
      const submitBtn = form.element.querySelector('[name="data[submit]"]');

      submitBtn.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.deepEqual(form.data, emptySubmissionData);
        done();
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Test Truncate Multiple Spaces', (done) => {
    const formElement = document.createElement('div');
    const form= new Webform(formElement);

    form.setForm(truncateMultipleSpaces).then(() => {
      const textFieldRequired = form.getComponent(['textField1']);
      const textFieldMinMaxLength = form.getComponent(['textField']);
      const textAreaMinMaxLength = form.getComponent(['textArea']);
      Harness.dispatchEvent('input', textFieldRequired.element, 'input', (i) => i.value = '        ');
      Harness.dispatchEvent(
        'input',
        textFieldMinMaxLength.element,
        'input',
        (i) => i.value = '     546       456     '
      );
      Harness.dispatchEvent(
        'input',
        textAreaMinMaxLength.element,
        'textarea',
        (i) => i.value = '     546       456     '
      );

      setTimeout(() => {
        assert.equal(textFieldRequired.dataValue, '        ', 'Should set value');
        assert.equal(textFieldMinMaxLength.dataValue, '     546       456     ', 'Should set value');
        assert.equal(textAreaMinMaxLength.dataValue, '     546       456     ', 'Should set value');

        assert.equal(textFieldRequired.errors.length, 1, 'Should be invalid since it does not have a value');
        assert.equal(
          textFieldMinMaxLength.errors.length,
          0,
          'Should be valid since it value does not exceed the max length after truncating spaces'
        );
        assert.equal(
          textAreaMinMaxLength.errors.length,
          0,
          'Should be valid since it value does not exceed the max length after truncating spaces'
        );

        form.submit(false, {}).finally(() => {
          assert.equal(textFieldRequired.dataValue, '', 'Should truncate the value before submit');
          assert.equal(textFieldMinMaxLength.dataValue, '546 456', 'Should truncate the value before submit');
          assert.equal(textAreaMinMaxLength.dataValue, '546 456', 'Should truncate the value before submit');

          done();
        });
      }, 400);
    }).catch(done);
  });

  it('HTML render mode', (done) => {
    const element = document.createElement('div');

    Formio.createForm(element, htmlRenderMode, {
      readOnly: true,
      renderMode: 'html',
    }).then(form => {
      form.submission = {
        data: {
          textfieldonPage3: 'test',
          signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABTIAAACWCAYAAADt5XcLAAAgAElEQVR4Xu3dfWydV30H8NM1dLRdndIOKKJxGHSh0MalgBilpLAJyIsatQgJu4rT8peNiFOEhl0pyR8gxZHq/DGJJAhHCNbEEU5BHVWyJpWYuja0tOPdSctLQVBHWmAwkTi0lEFh+j3h3tqOG9vJvfa59/kcybKT3Ps85/mcE0f+5nfOOe/ZZ3/156QRIECAAAECBAgQIECAAAECBAgQIEAgY4HzBJkZj46uESBAgAABAgQIECBAgAABAgQIECBQCAgyTQQCBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIO1Fjhx4kQaGTlSXHbhwoXFx6WXthSfNQIECBAgQIAAAQIECBAgQIAAgTwFBJl5jotezUIggslnnjmaTpwY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sVhGHh8aAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIEL7bi68AAAGrSURBVCBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv8D/A4EQEWXi+YzZAAAAAElFTkSuQmCC',
          panelDataGrid: [
            {
              panelDataGridD: 'd',
              panelDataGridC: 'c',
              panelDataGridB: 'b',
              panelDataGridA: 'a'
            },
            {
              panelDataGridD: 'h',
              panelDataGridC: 'g',
              panelDataGridB: 'f',
              panelDataGridA: 'e'
            },
            {
              panelDataGridD: 'l',
              panelDataGridC: 'k',
              panelDataGridB: 'j',
              panelDataGridA: 'i'
            }
          ],
          textfield: 'testing',
          page2Customer: 'bob@example.com',
          textfieldonPage2: 'test',
          numberField: 234,
          textfieldonpage1: [
            'a',
            'b',
            'c'
          ],
          panelHtml5Select: 'banana',
          page3Iagreetothefollowtherules: true,
          panelText: 'hello'
        },
      };

      setTimeout(() => {
        const customerSelectEl = form.element.querySelector('.formio-component-page2Customer');
        const customerSelectValueEl = customerSelectEl.querySelector('[ref="value"]');
        const htmlSelectEl = form.element.querySelector('.formio-component-panelHtml5Select');
        const htmlSelectValueEl = htmlSelectEl.querySelector('[ref="value"]');
        const checkboxEl = form.element.querySelector('.formio-component-page3Iagreetothefollowtherules');
        const checkboxValueEl = checkboxEl.querySelector('[ref="value"]');

        assert.equal(customerSelectValueEl.textContent.trim(), 'bob@example.com', 'Should render Select value properly');
        assert.equal(htmlSelectValueEl.textContent.trim(), 'banana', 'Should render HTML5 Select value properly');
        assert.equal(checkboxValueEl.textContent.trim(), 'True', 'Should render Checkbox value properly');

        done();
      }, 300);
    }).catch(done);
  });

  describe('Custom Logic', () => {
    it('Should rerender components using updated properties', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
      form.setForm(propertyActions).then(() => {
        form.emit('disabled');
        form.emit('hide');
        form.emit('require');
        setTimeout(() => {
          const textFieldDisabled = form.getComponent(['textField']);
          const textFieldHidden = form.getComponent(['textField1']);
          const textFieldRequired = form.getComponent(['textField2']);
          assert.equal(textFieldDisabled.component.disabled, true, 'Should be disabled');
          assert.equal(textFieldHidden.component.hidden, true, 'Should be hidden');
          assert.equal(textFieldRequired.component.validate.required, true, 'Should be required');
          const disabledInput = textFieldDisabled.element.querySelector('[ref="input"]');
          assert.equal(disabledInput.disabled, true, 'Should found a disabled input');
          const hiddenInput = textFieldHidden.element.querySelector('[ref="input"]');
          assert(!hiddenInput, 'Should not found a hidden input');
          const requiredFieldLabel = textFieldRequired.element.querySelector('label');
          assert(requiredFieldLabel.classList.contains('field-required'), 'Should mark a field as required');
          done();
        }, 550);
      }).catch(done);
    });
  });

  describe('Conditionals', () => {
    it('Should always checkConditions with correct context', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });

      form.setForm(formWithDataGridWithContainerAndConditionals).then(() => {
        const radioTrigger = form.getComponent(['dataGrid', 0, 'radio1']);
        const radioConditional = form.getComponent(['dataGrid', 0, 'radio2']);
        radioTrigger.setValue('yes', { modified: true });

        setTimeout(() => {
          assert.equal(radioTrigger.dataValue, 'yes', 'Should set value');
          assert.equal(radioConditional.visible, true, 'Should become visible');

          radioConditional.setValue('one', { modified: true });
          setTimeout(() => {
            assert.equal(radioConditional.dataValue, 'one', 'Should set value and clearOnHide should not be triggered');
            assert.equal(radioConditional.visible, true, 'Should stay visible');

            done();
          }, 250);
        }, 250);
      }).catch(done);
    });
  });

  each(FormTests, (formTest) => {
    const useDoneInsteadOfPromise = formTest.useDone;

    if (useDoneInsteadOfPromise) {
      describe(formTest.title || '', () => {
        each(formTest.tests, (formTestTest, title) => {
          it(title, function(done) {
            const self = this;
            const formElement = document.createElement('div');
            let form = new Webform(formElement, _.cloneDeep(formTest.formOptions || {}));
            form.setForm(formTest.form).then(function() {
              formTestTest(form, function(error) {
                form = null;
                formElement.innerHTML = '';
                if (error) {
                  throw new Error(error);
                }
                done();
              }, self);
            });
          });
        });
      });
    }
    else {
      describe(formTest.title || '', () => {
        each(formTest.tests, (formTestTest, title) => {
          it(title, function() {
            const formElement = document.createElement('div');
            const form = new Webform(formElement, { template: 'bootstrap3', language: 'en' });
            return form.setForm(formTest.form).then(function() {
              formTestTest(form, function(error) {
                form.destroy();
                if (error) {
                  throw new Error(error);
                }
              });
            });
          });
        });
      });
    }
  });
});

// describe('Test the saveDraft and restoreDraft feature', () => {
//   APIMock.submission('https://savedraft.form.io/myform', {
//     components: [
//       {
//         type: 'textfield',
//         key: 'a',
//         label: 'A'
//       },
//       {
//         type: 'textfield',
//         key: 'b',
//         label: 'B'
//       }
//     ]
//   });
//
//   const saveDraft = function(user, draft, newData, done) {
//     const formElement = document.createElement('div');
//     const form = new Webform(formElement, {
//       saveDraft: true,
//       saveDraftThrottle: false
//     });
//     form.src = 'https://savedraft.form.io/myform';
//     Formio.setUser(user);
//     form.on('restoreDraft', (existing) => {
//       assert.deepEqual(existing ? existing.data : null, draft);
//       form.setSubmission({ data: newData }, { modified: true });
//     });
//     form.on('saveDraft', (saved) => {
//       // Make sure the modified class was added to the components.
//       const a = form.getComponent('a');
//       const b = form.getComponent('b');
//       assert.equal(a.hasClass(a.getElement(), 'formio-modified'), true);
//       assert.equal(b.hasClass(b.getElement(), 'formio-modified'), true);
//       assert.deepEqual(saved.data, newData);
//       form.draftEnabled = false;
//       done();
//     });
//     form.formReady.then(() => {
//       assert.equal(form.savingDraft, true);
//     });
//   };
//
//   it('Should allow a user to start a save draft session.', (done) => saveDraft({
//     _id: '1234',
//     data: {
//       firstName: 'Joe',
//       lastName: 'Smith'
//     }
//   }, null, {
//     a: 'one',
//     b: 'two'
//   }, done));
//
//   it('Should allow a different user to start a new draft session', (done) => saveDraft({
//     _id: '2468',
//     data: {
//       firstName: 'Sally',
//       lastName: 'Thompson'
//     }
//   }, null, {
//     a: 'three',
//     b: 'four'
//   }, done));
//
//   it('Should restore a users existing draft', (done) => saveDraft({
//     _id: '1234',
//     data: {
//       firstName: 'Joe',
//       lastName: 'Smith'
//     }
//   }, {
//     a: 'one',
//     b: 'two'
//   }, {
//     a: 'five',
//     b: 'six'
//   }, done));
// });
/* eslint-enable max-statements */

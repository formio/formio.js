"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("regenerator-runtime/runtime");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _lodash = _interopRequireDefault(require("lodash"));

var _each = _interopRequireDefault(require("lodash/each"));

var _i18next = _interopRequireDefault(require("i18next"));

var _harness = _interopRequireDefault(require("../test/harness"));

var _forms = _interopRequireDefault(require("../test/forms"));

var _Webform = _interopRequireDefault(require("./Webform"));

require("flatpickr");

var _formtest = require("../test/formtest");

var _dataGridOnBlurValidation = _interopRequireDefault(require("../test/forms/dataGridOnBlurValidation"));

var _nestedModalWizard = _interopRequireDefault(require("../test/forms/nestedModalWizard"));

var _disableSubmitButton = _interopRequireDefault(require("../test/forms/disableSubmitButton"));

var _formWithAddressComponent = _interopRequireDefault(require("../test/forms/formWithAddressComponent"));

var _dataGridWithInitEmpty = _interopRequireDefault(require("../test/forms/dataGridWithInitEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable max-statements */
describe('Webform tests', function () {
  this.retries(3);
  it('Should not delete/change date value in dataGrid after adding new row', function (done) {
    var formElement = document.createElement('div');
    var formWithDate = new _Webform.default(formElement);
    formWithDate.setForm(_formtest.formWithCustomFormatDate).then(function () {
      var clickEvent = new Event('click');
      var dateCompInputWidget = formWithDate.element.querySelector('.formio-component-textField').querySelector('.flatpickr-input').widget;
      var dateAltFormat = dateCompInputWidget.calendar.config.altFormat;
      dateCompInputWidget.calendar.setDate('30-05-2020', true, dateAltFormat);
      var dateCompInputWidget1 = formWithDate.element.querySelector('.formio-component-dateTime').querySelector('.flatpickr-input').widget;
      var dateAltFormat1 = dateCompInputWidget1.calendar.config.altFormat;
      dateCompInputWidget1.calendar.setDate('30-05-2020', true, dateAltFormat1);
      var dateCompInputWidget2 = formWithDate.element.querySelector('.formio-component-textField2').querySelector('.flatpickr-input').widget;
      var dateAltFormat2 = dateCompInputWidget2.calendar.config.altFormat;
      dateCompInputWidget2.calendar.setDate('30-05-2020', true, dateAltFormat2);
      setTimeout(function () {
        var dateCompAltInput = formWithDate.element.querySelector('.formio-component-textField').querySelector('.flatpickr-input');
        var dateComp = formWithDate.element.querySelector('.formio-component-textField').querySelector('[type="text"]');
        var dateCompAltInput1 = formWithDate.element.querySelector('.formio-component-dateTime').querySelector('.flatpickr-input');
        var dateComp1 = formWithDate.element.querySelector('.formio-component-dateTime').querySelector('[type="text"]');
        var dateCompAltInput2 = formWithDate.element.querySelector('.formio-component-textField2').querySelector('.flatpickr-input');
        var dateComp2 = formWithDate.element.querySelector('.formio-component-textField2').querySelector('[type="text"]');

        _powerAssert.default.equal(dateCompAltInput.value, '30-05-2020');

        _powerAssert.default.equal(dateComp.value, '30-05-2020');

        _powerAssert.default.equal(dateCompAltInput1.value, '2020-05-30T00:00:00');

        _powerAssert.default.equal(dateComp1.value, '30-05-2020');

        _powerAssert.default.equal(dateCompAltInput2.value, '2020-05-30T00:00:00');

        _powerAssert.default.equal(dateComp2.value, '30-05-2020');

        var addNewRowBtn = formWithDate.element.querySelector('.formio-button-add-row');
        addNewRowBtn.dispatchEvent(clickEvent);
        setTimeout(function () {
          var dataGridRows = formWithDate.element.querySelectorAll('[ref="datagrid-dataGrid-row"]');

          _powerAssert.default.equal(dataGridRows.length, 2);

          var dateCompAltInputAfterAddingRow = formWithDate.element.querySelectorAll('.formio-component-textField')[0].querySelector('.flatpickr-input');
          var dateCompAfterAddingRow = formWithDate.element.querySelectorAll('.formio-component-textField')[0].querySelector('[type="text"]');
          var dateCompAltInputAfterAddingRow1 = formWithDate.element.querySelectorAll('.formio-component-dateTime')[0].querySelector('.flatpickr-input');
          var dateCompAfterAddingRow1 = formWithDate.element.querySelectorAll('.formio-component-dateTime')[0].querySelector('[type="text"]');
          var dateCompAltInputAfterAddingRow2 = formWithDate.element.querySelectorAll('.formio-component-textField2')[0].querySelector('.flatpickr-input');
          var dateCompAfterAddingRow2 = formWithDate.element.querySelectorAll('.formio-component-textField2')[0].querySelector('[type="text"]');

          _powerAssert.default.equal(dateCompAltInputAfterAddingRow.value, '30-05-2020');

          _powerAssert.default.equal(dateCompAfterAddingRow.value, '30-05-2020');

          _powerAssert.default.equal(dateCompAltInputAfterAddingRow1.value, '2020-05-30T00:00:00');

          _powerAssert.default.equal(dateCompAfterAddingRow1.value, '30-05-2020');

          _powerAssert.default.equal(dateCompAltInputAfterAddingRow2.value, '2020-05-30T00:00:00');

          _powerAssert.default.equal(dateCompAfterAddingRow2.value, '30-05-2020');

          done();
        }, 150);
      }, 50);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should open collapsed panel with invalid components inside container that is inside the panel on submit', function (done) {
    var formElement = document.createElement('div');
    var formWithPanel = new _Webform.default(formElement);
    formWithPanel.setForm(_formtest.formWithCollapsedPanel).then(function () {
      var clickEvent = new Event('click');

      _powerAssert.default.equal(formWithPanel.components[0].collapsed, true);

      var submitBtn = formWithPanel.element.querySelector('[name="data[submit]"]');
      submitBtn.dispatchEvent(clickEvent);
      setTimeout(function () {
        _powerAssert.default.equal(formWithPanel.components[0].collapsed, false);

        done();
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should correctly set date after collapsing and openning the panel', function (done) {
    var formElement = document.createElement('div');
    var formWithDate = new _Webform.default(formElement);
    formWithDate.setForm(_formtest.formWithDateTimeComponents).then(function () {
      var clickEvent = new Event('click');
      var dateTimeCompInputWidget = formWithDate.element.querySelector('.formio-component-dateTime1').querySelector('.flatpickr-input').widget;
      var dateTimeAltFormat = dateTimeCompInputWidget.calendar.config.altFormat;
      dateTimeCompInputWidget.calendar.setDate('05-05-2020T00:00:00', true, dateTimeAltFormat);
      var textFieldDateCompWidget = formWithDate.element.querySelector('.formio-component-textField1').querySelector('.flatpickr-input').widget;
      var textFieldDateAltFormat = textFieldDateCompWidget.calendar.config.altFormat;
      textFieldDateCompWidget.calendar.setDate('04-04-2020T00:00:00', true, textFieldDateAltFormat);
      setTimeout(function () {
        var dateTimeCompAltInput = formWithDate.element.querySelector('.formio-component-dateTime1').querySelector('.flatpickr-input');
        var textFieldDateCompAltInput = formWithDate.element.querySelector('.formio-component-textField1').querySelector('.flatpickr-input');
        var dateTimeComp = formWithDate.element.querySelector('.formio-component-dateTime1').querySelector('[type="text"]');
        var textFieldDateComp = formWithDate.element.querySelector('.formio-component-textField1').querySelector('[type="text"]');

        _powerAssert.default.equal(dateTimeCompAltInput.value, '2020-05-05T00:00:00');

        _powerAssert.default.equal(textFieldDateCompAltInput.value, '2020-04-04T00:00:00');

        _powerAssert.default.equal(dateTimeComp.value, '05-05-2020');

        _powerAssert.default.equal(textFieldDateComp.value, '04-04-2020');

        var panelCollapseBtn = formWithDate.element.querySelector('.formio-collapse-icon');
        panelCollapseBtn.dispatchEvent(clickEvent);
        setTimeout(function () {
          var panelBody = formWithDate.element.querySelector('.panel-body');

          _powerAssert.default.equal(!!panelBody, false);

          formWithDate.element.querySelector('.formio-collapse-icon').dispatchEvent(clickEvent);
          setTimeout(function () {
            var dateTimeCompAfterOpenningPanel = formWithDate.element.querySelector('.formio-component-dateTime1').querySelector('[type="text"]');
            var textFieldDateCompAfterOpenningPanel = formWithDate.element.querySelector('.formio-component-textField1').querySelector('[type="text"]');
            var dateTimeCompAltInputAfterOpenningPanel = formWithDate.element.querySelector('.formio-component-dateTime1').querySelector('.flatpickr-input');
            var textFieldDateCompAltInputAfterOpenningPanel = formWithDate.element.querySelector('.formio-component-textField1').querySelector('.flatpickr-input');

            _powerAssert.default.equal(dateTimeCompAltInputAfterOpenningPanel.value, '2020-05-05T00:00:00');

            _powerAssert.default.equal(textFieldDateCompAltInputAfterOpenningPanel.value, '2020-04-04T00:00:00');

            _powerAssert.default.equal(dateTimeCompAfterOpenningPanel.value, '05-05-2020');

            _powerAssert.default.equal(textFieldDateCompAfterOpenningPanel.value, '04-04-2020');

            done();
          }, 250);
        }, 150);
      }, 50);
    }).catch(function (err) {
      return done(err);
    });
  });
  it("Should show confirmation alert when clicking X btn or clicking outside modal window after editing\n  editGrid modal draft row", function (done) {
    var formElement = document.createElement('div');
    var formWithNestedDraftModals = new _Webform.default(formElement);
    formWithNestedDraftModals.setForm(_formtest.formWithEditGridAndNestedDraftModalRow).then(function () {
      var clickEvent = new Event('click');
      var inputEvent = new Event('input');
      var addRowBtn = formWithNestedDraftModals.element.querySelector('[ref="editgrid-editGrid-addRow"]'); //click to open row in modal view

      addRowBtn.dispatchEvent(clickEvent);
      setTimeout(function () {
        var rowModal = document.querySelector('.formio-dialog-content'); //checking if row modal was openned

        _powerAssert.default.equal(!!rowModal, true);

        var textField = rowModal.querySelector('[name="data[textField]"]');
        textField.value = 'test'; //input value

        textField.dispatchEvent(inputEvent);
        setTimeout(function () {
          //checking if the value was set inside the field
          _powerAssert.default.equal(textField.value, 'test');

          var saveModalBtn = rowModal.querySelector('.btn-primary'); //clicking save button to save row draft

          saveModalBtn.dispatchEvent(clickEvent);
          setTimeout(function () {
            var editGridRows = formWithNestedDraftModals.element.querySelectorAll('[ref="editgrid-editGrid-row"]'); //checking if the editGrid row was created

            _powerAssert.default.equal(editGridRows.length, 1);

            var editRowBtn = editGridRows[0].querySelector('.editRow'); //click the edit btn to open the row again

            editRowBtn.dispatchEvent(clickEvent);
            setTimeout(function () {
              var rowModalForEditing = document.querySelector('.formio-dialog-content');
              var textFieldInputForEditing = rowModalForEditing.querySelector('[name="data[textField]"]');
              textFieldInputForEditing.value = 'changed value'; //changing textfield value

              textFieldInputForEditing.dispatchEvent(inputEvent);
              setTimeout(function () {
                //checking if the textfield value was changed
                var inputValue = textFieldInputForEditing.value;

                _powerAssert.default.equal(inputValue, 'changed value');

                var XCloseBtn = rowModalForEditing.querySelector('[ref="dialogClose"]'); //clicking modal close btn

                XCloseBtn.dispatchEvent(clickEvent);
                setTimeout(function () {
                  var dialogWindows = document.querySelectorAll('.formio-dialog-content'); //checking if confirmation dialog is openned

                  _powerAssert.default.equal(dialogWindows.length, 2);

                  var dialogCancelBtn = document.querySelector('[ref="dialogCancelButton"]'); //closing confirmation dialog

                  dialogCancelBtn.dispatchEvent(clickEvent);
                  setTimeout(function () {
                    var dialogWindowsAfterClosingConfirmation = document.querySelectorAll('.formio-dialog-content'); //checking if confirmation dialig is closed

                    _powerAssert.default.equal(dialogWindowsAfterClosingConfirmation.length, 1);

                    var overlay = document.querySelector('[ref="dialogOverlay"]'); //clocking model overlay to open confirmation dialog again

                    overlay.dispatchEvent(clickEvent);
                    setTimeout(function () {
                      var dialogWindowsAfterClickingOverlay = document.querySelectorAll('.formio-dialog-content');

                      _powerAssert.default.equal(dialogWindowsAfterClickingOverlay.length, 2);

                      document.body.innerHTML = '';
                      done();
                    }, 190);
                  }, 170);
                }, 150);
              }, 130);
            }, 110);
          }, 90);
        }, 70);
      }, 50);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should not show validation errors when saving invalid draft row in dataGrid', function (done) {
    var formElement = document.createElement('div');
    var formWithDraftModals = new _Webform.default(formElement);
    formWithDraftModals.setForm(_formtest.formWithEditGridModalDrafts).then(function () {
      var clickEvent = new Event('click');
      var inputEvent = new Event('input');
      var addRowBtn = formWithDraftModals.element.querySelector('[ref="editgrid-editGrid-addRow"]'); //click to open row in modal view

      addRowBtn.dispatchEvent(clickEvent);
      setTimeout(function () {
        var rowModal = document.querySelector('.formio-dialog-content'); //checking if row modal was openned

        _powerAssert.default.equal(!!rowModal, true);

        var textFieldInput = rowModal.querySelector('[name="data[editGrid][0][textField]"]');
        textFieldInput.value = 'test'; //input value in one of required row fields

        textFieldInput.dispatchEvent(inputEvent);
        setTimeout(function () {
          //checking if the value was set inside the field
          _powerAssert.default.equal(textFieldInput.value, 'test');

          var saveModalBtn = rowModal.querySelector('.btn-primary'); //clicking save button to save row draft

          saveModalBtn.dispatchEvent(clickEvent);
          setTimeout(function () {
            var editGridRows = formWithDraftModals.element.querySelectorAll('[ref="editgrid-editGrid-row"]'); //checking if the editGrid row was created

            _powerAssert.default.equal(editGridRows.length, 1);

            var rowError = formWithDraftModals.element.querySelector('.editgrid-row-error').textContent.trim();
            var editGridError = formWithDraftModals.element.querySelector('[ref="messageContainer"]').querySelector('.error');

            _powerAssert.default.equal(!!rowError, false);

            _powerAssert.default.equal(!!editGridError, false);

            done();
          }, 200);
        }, 100);
      }, 50);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should show dataGrid rows when viewing submission in dataGrid with initEmpty option', function (done) {
    var formElement = document.createElement('div');
    var formWithDataGridInitEmptyOption = new _Webform.default(formElement);
    formWithDataGridInitEmptyOption.setForm(_dataGridWithInitEmpty.default.form).then(function () {
      formWithDataGridInitEmptyOption.setSubmission(_dataGridWithInitEmpty.default.submission2);
      setTimeout(function () {
        var dataGridRows = formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid-row"]');
        var dataGrid1Rows = formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid1-row"]');

        _powerAssert.default.equal(dataGrid1Rows.length, 1);

        _powerAssert.default.equal(dataGridRows.length, 1);

        formWithDataGridInitEmptyOption.setSubmission(_dataGridWithInitEmpty.default.submission3);
        setTimeout(function () {
          var dataGridRows1 = formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid-row"]');
          var dataGrid1Rows1 = formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid1-row"]');
          var dataGridSecondRowComponentValue = formWithDataGridInitEmptyOption.element.querySelector('[name = "data[dataGrid][1][textField]"]');
          var dataGrid1FirstRowComponentValue = formWithDataGridInitEmptyOption.element.querySelector('[name = "data[dataGrid1][0][textArea]"]');
          var dataGrid1SecondRowComponentValue = formWithDataGridInitEmptyOption.element.querySelector('[name = "data[dataGrid1][1][number]"]');

          _powerAssert.default.equal(dataGrid1Rows1.length, 2);

          _powerAssert.default.equal(dataGridRows1.length, 2);

          _powerAssert.default.equal(dataGridSecondRowComponentValue.value, 'test2');

          _powerAssert.default.equal(dataGrid1FirstRowComponentValue.textContent, 'test3');

          _powerAssert.default.equal(dataGrid1SecondRowComponentValue.value, 222);

          done();
        }, 300);
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should not show dataGrid rows when empty submission is set for dataGrid with initEmpty', function (done) {
    var formElement = document.createElement('div');
    var formWithDataGridInitEmptyOption = new _Webform.default(formElement);
    formWithDataGridInitEmptyOption.setForm(_dataGridWithInitEmpty.default.form).then(function () {
      formWithDataGridInitEmptyOption.setSubmission(_dataGridWithInitEmpty.default.submission1);
      setTimeout(function () {
        var dataGridRows = formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid-row"]');
        var dataGrid1Rows = formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid1-row"]');

        _powerAssert.default.equal(dataGridRows.length, 0);

        _powerAssert.default.equal(dataGrid1Rows.length, 0);

        formWithDataGridInitEmptyOption.setSubmission({
          data: {}
        });
        setTimeout(function () {
          var dataGridRows1 = formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid-row"]');
          var dataGrid1Rows1 = formWithDataGridInitEmptyOption.element.querySelectorAll('[ref = "datagrid-dataGrid1-row"]');

          _powerAssert.default.equal(dataGridRows1.length, 0);

          _powerAssert.default.equal(dataGrid1Rows1.length, 0);

          done();
        }, 300);
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should show address submission data inside dataGrid', function (done) {
    var formElement = document.createElement('div');
    var formWithAddress = new _Webform.default(formElement);
    formWithAddress.setForm(_formWithAddressComponent.default.form).then(function () {
      formWithAddress.setSubmission({
        data: _formWithAddressComponent.default.submission
      });
      setTimeout(function () {
        var addressInput = formWithAddress.element.querySelector('[name = "data[dataGrid][0][address]"]');

        _powerAssert.default.equal(addressInput.value, _formWithAddressComponent.default.submission.dataGrid[0].address['formatted_address']);

        done();
      }, 300);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should validate field on blur inside panel', function (done) {
    var formElement = document.createElement('div');
    var formWithBlurValidation = new _Webform.default(formElement);
    formWithBlurValidation.setForm(_formtest.formWithBlurValidationInsidePanel).then(function () {
      var inputEvent = new Event('input');
      var focusEvent = new Event('focus');
      var blurEvent = new Event('blur');
      var fieldWithBlurValidation = formWithBlurValidation.element.querySelector('[name="data[textField]"]');
      fieldWithBlurValidation.dispatchEvent(focusEvent);
      'test'.split('').forEach(function (character) {
        fieldWithBlurValidation.value = fieldWithBlurValidation.value + character;
        fieldWithBlurValidation.dispatchEvent(inputEvent);
      });
      setTimeout(function () {
        var validationErrorBeforeBlur = formWithBlurValidation.element.querySelector('.error');

        _powerAssert.default.equal(!!validationErrorBeforeBlur, false);

        _powerAssert.default.equal(formWithBlurValidation.data.textField, 'test');

        fieldWithBlurValidation.dispatchEvent(blurEvent);
        setTimeout(function () {
          var validationErrorAfterBlur = formWithBlurValidation.element.querySelector('.error');

          _powerAssert.default.equal(!!validationErrorAfterBlur, true);

          _powerAssert.default.equal(validationErrorAfterBlur.textContent, 'Text Field must have at least 5 characters.');

          done();
        }, 350);
      }, 300);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should submit form with empty time field when time field is not required', function (done) {
    var formElement = document.createElement('div');
    var formWithTime = new _Webform.default(formElement);
    formWithTime.setForm(_formtest.formWithTimeComponent).then(function () {
      var clickEvent = new Event('click');
      var submitBtn = formWithTime.element.querySelector('[name="data[submit]"]');
      submitBtn.dispatchEvent(clickEvent);
      setTimeout(function () {
        _powerAssert.default.equal(formWithTime.errors.length, 0);

        _powerAssert.default.equal(formWithTime.data.submit, true);

        done();
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  it("Should show validation errors and update validation errors list when openning and editing edit grid rows\n  in draft modal mode after pushing submit btn", function (done) {
    var formElement = document.createElement('div');
    var formWithDraftModals = new _Webform.default(formElement);
    formWithDraftModals.setForm(_formtest.formWithEditGridModalDrafts).then(function () {
      var clickEvent = new Event('click');
      var inputEvent = new Event('input');
      var addRowBtn = formWithDraftModals.element.querySelector('[ref="editgrid-editGrid-addRow"]'); //click to open row in modal view

      addRowBtn.dispatchEvent(clickEvent);
      setTimeout(function () {
        var rowModal = document.querySelector('.formio-dialog-content'); //checking if row modal was openned

        _powerAssert.default.equal(!!rowModal, true);

        var textFieldInput = rowModal.querySelector('[name="data[editGrid][0][textField]"]');
        textFieldInput.value = 'test'; //input value in one of required row fields

        textFieldInput.dispatchEvent(inputEvent);
        setTimeout(function () {
          //checking if the value was set inside the field
          _powerAssert.default.equal(textFieldInput.value, 'test');

          var saveModalBtn = rowModal.querySelector('.btn-primary'); //clicking save button to save row draft

          saveModalBtn.dispatchEvent(clickEvent);
          setTimeout(function () {
            var editGridRows = formWithDraftModals.element.querySelectorAll('[ref="editgrid-editGrid-row"]'); //checking if the editGrid row was created

            _powerAssert.default.equal(editGridRows.length, 1);

            var submitBtn = formWithDraftModals.element.querySelector('[name="data[submit]"'); //pushing submit button to trigger validation

            submitBtn.dispatchEvent(clickEvent);
            setTimeout(function () {
              //checking the number of appeared errors
              _powerAssert.default.equal(formWithDraftModals.errors.length, 2);

              var rowError = formWithDraftModals.element.querySelector('.editgrid-row-error').textContent;
              var editGridError = formWithDraftModals.element.querySelector('[ref="messageContainer"]').querySelector('.error').textContent; //checking if right errors were shown in right places

              _powerAssert.default.equal(rowError, 'Invalid row. Please correct it or delete.');

              _powerAssert.default.equal(editGridError, 'Please correct invalid rows before proceeding.');

              var rowEditBtn = editGridRows[0].querySelector('.editRow'); //open row modal again to check if there are errors

              rowEditBtn.dispatchEvent(clickEvent);
              setTimeout(function () {
                var rowModalAfterValidation = document.querySelector('.formio-dialog-content');
                var alertWithErrorText = rowModalAfterValidation.querySelector('.alert-danger'); //checking if alert with errors list appeared inside the modal

                _powerAssert.default.equal(!!alertWithErrorText, true);

                var alertErrorMessages = rowModalAfterValidation.querySelectorAll('[ref="messageRef"]');

                _powerAssert.default.equal(alertErrorMessages.length, 1);

                var numberComponentError = rowModalAfterValidation.querySelector('.formio-component-number').querySelector('.error').textContent; //checking if error was shown for empty required field

                _powerAssert.default.equal(numberComponentError, 'Number is required');

                var numberInput = rowModalAfterValidation.querySelector('[name="data[editGrid][0][number]"]');
                numberInput.value = 123; //input value to make the field valid

                numberInput.dispatchEvent(inputEvent);
                setTimeout(function () {
                  var rowModalWithValidFields = document.querySelector('.formio-dialog-content');
                  var alertErrorMessagesAfterInputtingValidValues = rowModalWithValidFields.querySelectorAll('[ref="messageRef"]');

                  _powerAssert.default.equal(alertErrorMessagesAfterInputtingValidValues.length, 0); //input values to make all row fields invalid


                  var validNumberInput = rowModalWithValidFields.querySelector('[name="data[editGrid][0][number]"]');
                  validNumberInput.value = null;
                  validNumberInput.dispatchEvent(inputEvent);
                  var validTextInput = rowModalWithValidFields.querySelector('[name="data[editGrid][0][textField]"]');
                  validTextInput.value = '';
                  validTextInput.dispatchEvent(inputEvent);
                  setTimeout(function () {
                    var alertErrorMessagesAfterInputtingInvalidValues = document.querySelector('.formio-dialog-content').querySelectorAll('[ref="messageRef"]');

                    _powerAssert.default.equal(alertErrorMessagesAfterInputtingInvalidValues.length, 2);

                    document.body.innerHTML = '';
                    done();
                  }, 280);
                }, 240);
              }, 200);
            }, 160);
          }, 120);
        }, 80);
      }, 50);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should not override calculated value', function (done) {
    var formElement = document.createElement('div');
    var formWithCalculatedAmount = new _Webform.default(formElement);
    formWithCalculatedAmount.setForm(_formtest.formWithCalculatedValueWithoutOverriding).then(function () {
      var inputEvent = new Event('input');
      var amountInput1 = formWithCalculatedAmount.element.querySelector('[name="data[amount1]"]');
      var amountInput2 = formWithCalculatedAmount.element.querySelector('[name="data[amount2]"]');
      amountInput1.value = 6;
      amountInput2.value = 4;
      amountInput1.dispatchEvent(inputEvent);
      amountInput2.dispatchEvent(inputEvent);
      setTimeout(function () {
        var totalAmountInput = formWithCalculatedAmount.element.querySelector('[name="data[currency]"]'); //checking if the value was calculated correctly

        _powerAssert.default.equal(totalAmountInput.value, '$10.00');

        var inputEvent = new Event('input'); //trying to override calculated value

        totalAmountInput.value = 55;
        totalAmountInput.dispatchEvent(inputEvent);
        setTimeout(function () {
          var totalAmountInput = formWithCalculatedAmount.element.querySelector('[name="data[currency]"]'); //checking if the value was overridden

          _powerAssert.default.equal(totalAmountInput.value, '$10.00');

          done();
        }, 400);
      }, 300);
    }).catch(function (err) {
      return done(err);
    });
  });
  it("Should show field only in container where radio component has 'yes' value when containers contain radio\n  components with the same key", function (done) {
    var formElement = document.createElement('div');
    var formWithCondition = new _Webform.default(formElement);
    formWithCondition.setForm(_formtest.formWithConditionalLogic).then(function () {
      _harness.default.clickElement(formWithCondition, formWithCondition.element.querySelector('.formio-component-container1').querySelector('[value="yes"]'));

      setTimeout(function () {
        var conditionalFieldInContainer1 = formWithCondition.element.querySelector('[name="data[container1][textField]"]');
        var conditionalFieldInContainer2 = formWithCondition.element.querySelector('[name="data[container2][textField]"]');

        _powerAssert.default.equal(!!conditionalFieldInContainer1, true);

        _powerAssert.default.equal(!!conditionalFieldInContainer2, false);

        done();
      }, 400);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should show only "required field" error when submitting empty required field with pattern validation', function (done) {
    var formElement = document.createElement('div');
    var formWithPattern = new _Webform.default(formElement);
    formWithPattern.setForm(_formtest.formWithPatternValidation).then(function () {
      _harness.default.clickElement(formWithPattern, formWithPattern.element.querySelector('[name="data[submit]"]'));

      setTimeout(function () {
        _powerAssert.default.equal(formWithPattern.element.querySelector('.formio-component-textField').querySelectorAll('.error').length, 1);

        _powerAssert.default.equal(formWithPattern.errors[0].messages.length, 1);

        _powerAssert.default.equal(formWithPattern.errors[0].messages[0].message, 'Text Field is required');

        _powerAssert.default.equal(formWithPattern.element.querySelector('[ref="errorRef"]').textContent, 'Text Field: Text Field is required');

        done();
      }, 500);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should disable field applying advanced logic if dot is used inside component key', function (done) {
    var formElement = document.createElement('div');
    var formWithLogic = new _Webform.default(formElement);
    formWithLogic.setForm(_formtest.formWithAdvancedLogic).then(function () {
      _powerAssert.default.equal(formWithLogic.components[1].disabled, false);

      _harness.default.clickElement(formWithLogic, formWithLogic.element.querySelector('[name="data[requestedCovers.HOUSECONTENT_JEWELRY]"]'));

      setTimeout(function () {
        _powerAssert.default.equal(formWithLogic.components[1].disabled, true);

        done();
      }, 500);
    }).catch(function (err) {
      return done(err);
    });
  });
  var formWithCalculatedValue;
  it('Should calculate the field value after validation errors appeared on submit', function (done) {
    var formElement = document.createElement('div');
    formWithCalculatedValue = new _Webform.default(formElement);
    formWithCalculatedValue.setForm(_formtest.manualOverride).then(function () {
      _harness.default.clickElement(formWithCalculatedValue, formWithCalculatedValue.components[2].refs.button);

      setTimeout(function () {
        var inputEvent = new Event('input');
        var input1 = formWithCalculatedValue.components[0].refs.input[0];
        input1.value = 55;
        input1.dispatchEvent(inputEvent);
        setTimeout(function () {
          var input2 = formElement.querySelector('input[name="data[number2]"]');

          _powerAssert.default.equal(input2.value, '55');

          _powerAssert.default.equal(input1.value, 55);

          done();
        }, 250);
      }, 250);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should calculate the value when editing set values with possibility of manual override', function (done) {
    var formElement = document.createElement('div');
    formWithCalculatedValue = new _Webform.default(formElement);
    formWithCalculatedValue.setForm(_formtest.manualOverride).then(function () {
      formWithCalculatedValue.setSubmission({
        data: {
          number1: 66,
          number2: 66
        }
      }).then(function () {
        setTimeout(function () {
          var input1 = formElement.querySelector('input[name="data[number1]"]');
          var input2 = formElement.querySelector('input[name="data[number2]"]');

          _powerAssert.default.equal(input2.value, '66');

          _powerAssert.default.equal(input1.value, 66);

          var inputEvent = new Event('input');
          input1.value = "".concat(input1.value) + '78';
          input1.dispatchEvent(inputEvent);
          setTimeout(function () {
            _powerAssert.default.equal(input2.value, '6678');

            _powerAssert.default.equal(input1.value, 6678); //set a number as calculated value


            formWithCalculatedValue.components[1].calculatedValue = 6678; //change the value

            input1.value = +("".concat(input1.value) + '90');
            input1.dispatchEvent(inputEvent);
            setTimeout(function () {
              _powerAssert.default.equal(input2.value, '667890');

              _powerAssert.default.equal(input1.value, 667890);

              done();
            }, 250);
          }, 250);
        }, 900);
      });
    });
  });
  var simpleForm = null;
  it('Should create a simple form', function (done) {
    var formElement = document.createElement('div');
    simpleForm = new _Webform.default(formElement);
    simpleForm.setForm({
      title: 'Simple Form',
      components: [{
        type: 'textfield',
        key: 'firstName',
        input: true
      }, {
        type: 'textfield',
        key: 'lastName',
        input: true
      }]
    }).then(function () {
      _harness.default.testElements(simpleForm, 'input[type="text"]', 2);

      _harness.default.testElements(simpleForm, 'input[name="data[firstName]"]', 1);

      _harness.default.testElements(simpleForm, 'input[name="data[lastName]"]', 1);

      done();
    }).catch(done);
  });
  it('Should set a submission to the form.', function () {
    _harness.default.testSubmission(simpleForm, {
      data: {
        firstName: 'Joe',
        lastName: 'Smith'
      }
    });
  });
  it('Should translate a form from options', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _Webform.default(formElement, {
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
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    }).then(function () {
      var label = formElement.querySelector('.control-label');

      _powerAssert.default.equal(label.innerHTML.trim(), 'Spanish Label');

      done();
    }).catch(done);
  });
  it('Should treat double colons as i18next namespace separators', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm({
      title: 'Test Form',
      components: []
    }).then(function () {
      var str = 'Test: this is only a test';

      _powerAssert.default.equal(form.t(str), str);

      _powerAssert.default.equal(form.t("Namespace::".concat(str)), str);

      done();
    }).catch(done);
  });
  it('Should translate form errors in alerts', function () {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'es',
      i18n: {
        es: {
          alertMessage: '{{message}}',
          required: '{{field}} es obligatorio'
        }
      }
    });
    return form.setForm({
      components: [{
        type: 'textfield',
        label: 'Field Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {
          required: true
        }
      }]
    }).then(function () {
      return form.submit();
    }).catch(function () {// console.warn('nooo:', error)
    }).then(function () {
      var ref = formElement.querySelector('[ref="errorRef"]');

      _powerAssert.default.equal(ref.textContent, 'Field Label es obligatorio');
    });
  });
  it('Should translate a form after instantiate', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _Webform.default(formElement, {
      template: 'bootstrap3',
      i18n: {
        es: {
          'Default Label': 'Spanish Label'
        }
      }
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    }).then(function () {
      translateForm.language = 'es';
      var label = formElement.querySelector('.control-label');

      _powerAssert.default.equal(label.innerHTML.trim(), 'Spanish Label');

      done();
    }).catch(done);
  });
  it('Should add a translation after instantiate', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _Webform.default(formElement, {
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
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    }).then(function () {
      translateForm.language = 'fr';
      var label = formElement.querySelector('.control-label');

      _powerAssert.default.equal(label.innerHTML.trim(), 'French Label');

      done();
    }).catch(done);
  });
  it('Should switch a translation after instantiate', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _Webform.default(formElement, {
      template: 'bootstrap3'
    });
    translateForm.setForm({
      title: 'Translate Form',
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    }).then(function () {
      translateForm.addLanguage('es', {
        'Default Label': 'Spanish Label'
      }, true);
      var label = formElement.querySelector('.control-label');

      _powerAssert.default.equal(label.innerHTML.trim(), 'Spanish Label');

      done();
    }).catch(done);
  });
  it('Should keep translation after redraw', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      template: 'bootstrap3'
    });
    var schema = {
      title: 'Translate Form',
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    };

    try {
      form.setForm(schema).then(function () {
        form.addLanguage('ru', {
          'Default Label': 'Russian Label'
        }, true);
        return form.language = 'ru';
      }, done).then(function () {
        (0, _chai.expect)(form.options.language).to.equal('ru');
        (0, _chai.expect)(formElement.querySelector('.control-label').innerHTML.trim()).to.equal('Russian Label');
        form.redraw();
        (0, _chai.expect)(form.options.language).to.equal('ru');
        (0, _chai.expect)(formElement.querySelector('.control-label').innerHTML.trim()).to.equal('Russian Label');
        done();
      }, done).catch(done);
    } catch (error) {
      done(error);
    }
  });
  it('Should fire languageChanged event when language is set', function (done) {
    var isLanguageChangedEventFired = false;
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      template: 'bootstrap3'
    });
    var schema = {
      title: 'Translate Form',
      components: [{
        type: 'textfield',
        label: 'Default Label',
        key: 'myfield',
        input: true,
        inputType: 'text',
        validate: {}
      }]
    };

    try {
      form.setForm(schema).then(function () {
        form.addLanguage('ru', {
          'Default Label': 'Russian Label'
        }, false);
        form.on('languageChanged', function () {
          isLanguageChangedEventFired = true;
        });
        return form.language = 'ru';
      }, done).then(function () {
        (0, _powerAssert.default)(isLanguageChangedEventFired);
        done();
      }, done).catch(done);
    } catch (error) {
      done(error);
    }
  });
  it('When submitted should strip fields with persistent: client-only from submission', function (done) {
    var formElement = document.createElement('div');
    simpleForm = new _Webform.default(formElement);
    /* eslint-disable quotes */

    simpleForm.setForm({
      title: 'Simple Form',
      components: [{
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
      }, {
        "label": "Age",
        "persistent": "client-only",
        "mask": false,
        "tableView": true,
        "type": "number",
        "input": true,
        "key": "age"
      }]
    });
    /* eslint-enable quotes */

    _harness.default.testSubmission(simpleForm, {
      data: {
        name: 'noname',
        age: '1'
      }
    });

    simpleForm.submit().then(function (submission) {
      _powerAssert.default.deepEqual(submission.data, {
        name: 'noname'
      });

      done();
    });
  });
  it('Should not mutate the global i18next if it gets an instance', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var instance, formElement, translateForm;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _i18next.default.init({
              lng: 'en'
            });

          case 2:
            instance = _i18next.default.createInstance();
            formElement = document.createElement('div');
            translateForm = new _Webform.default(formElement, {
              template: 'bootstrap3',
              language: 'es',
              i18next: instance,
              i18n: {
                es: {
                  'Default Label': 'Spanish Label'
                }
              }
            });
            return _context.abrupt("return", translateForm.setForm({
              title: 'Translate Form',
              components: [{
                type: 'textfield',
                label: 'Default Label',
                key: 'myfield',
                input: true,
                inputType: 'text',
                validate: {}
              }]
            }).then(function () {
              _powerAssert.default.equal(_i18next.default.language, 'en');

              _powerAssert.default.equal(translateForm.i18next.language, 'es');

              _powerAssert.default.equal(translateForm.i18next, instance);

              var label = formElement.querySelector('.control-label');

              _powerAssert.default.equal(label.innerHTML.trim(), 'Spanish Label');
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('Should keep components valid if they are pristine', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm(_formtest.settingErrors).then(function () {
      var inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
      });
      var input = form.element.querySelector('input[name="data[textField]"]');

      for (var i = 0; i < 50; i++) {
        input.value += i;
        input.dispatchEvent(inputEvent);
      }

      setTimeout(function () {
        _powerAssert.default.equal(form.errors.length, 0);

        _harness.default.setInputValue(form, 'data[textField]', '');

        setTimeout(function () {
          _powerAssert.default.equal(form.errors.length, 1);

          done();
        }, 250);
      }, 250);
    }).catch(done);
  });
  it('Should delete value of hidden component if clearOnHide is turned on', function (done) {
    var _this = this;

    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm(_formtest.clearOnHide).then(function () {
      var visibleData = {
        data: {
          visible: 'yes',
          clearOnHideField: 'some text',
          submit: false
        },
        metadata: {}
      };
      var hiddenData = {
        data: {
          visible: 'no',
          submit: false
        }
      };
      var inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
      });
      var textField = form.element.querySelector('input[name="data[clearOnHideField]"]');
      textField.value = 'some text';
      textField.dispatchEvent(inputEvent);

      _this.timeout(1000);

      setTimeout(function () {
        _powerAssert.default.deepEqual(form.data, visibleData.data);

        _harness.default.setInputValue(form, 'data[visible]', 'no');

        setTimeout(function () {
          _powerAssert.default.deepEqual(form.data, hiddenData.data);

          done();
        }, 250);
      }, 250);
    });
  });
  var formElement = document.createElement('div');

  var checkForErrors = function checkForErrors(form) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var submission = arguments.length > 2 ? arguments[2] : undefined;
    var numErrors = arguments.length > 3 ? arguments[3] : undefined;
    var done = arguments.length > 4 ? arguments[4] : undefined;
    form.setSubmission(submission, flags).then(function () {
      setTimeout(function () {
        var errors = formElement.querySelectorAll('.formio-error-wrapper');
        (0, _chai.expect)(errors.length).to.equal(numErrors);
        (0, _chai.expect)(form.errors.length).to.equal(numErrors);
        done();
      }, 100);
    }).catch(done);
  };

  it('Should not fire validations when fields are either protected or not persistent.', function (done) {
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm({
      title: 'protected and persistent',
      components: [{
        type: 'textfield',
        label: 'A',
        key: 'a',
        validate: {
          required: true
        }
      }, {
        type: 'textfield',
        label: 'B',
        key: 'b',
        protected: true,
        validate: {
          required: true
        }
      }]
    }).then(function () {
      checkForErrors(form, {}, {}, 0, function () {
        checkForErrors(form, {}, {
          data: {
            a: 'Testing',
            b: ''
          }
        }, 1, function () {
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
  it('Should not fire validation on init.', function (done) {
    formElement.innerHTML = '';
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm({
      title: 'noValidation flag',
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
      }]
    }).then(function () {
      checkForErrors(form, {}, {}, 0, done);
    });
  });
  it('Should validation on init when alwaysDirty flag is set.', function (done) {
    formElement.innerHTML = '';
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3',
      alwaysDirty: true
    });
    form.setForm({
      title: 'noValidation flag',
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
      }]
    }).then(function () {
      checkForErrors(form, {}, {}, 2, done);
    });
  });
  it('Should validation on init when dirty flag is set.', function (done) {
    formElement.innerHTML = '';
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm({
      title: 'noValidation flag',
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
      }]
    }).then(function () {
      checkForErrors(form, {
        dirty: true
      }, {}, 2, done);
    });
  });
  it('Should not show any errors on setSubmission when providing an empty data object', function (done) {
    formElement.innerHTML = '';
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm({
      title: 'noValidation flag',
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
      }]
    }).then(function () {
      checkForErrors(form, {}, {}, 0, done);
    });
  });
  it('Should not show errors when providing empty data object with data set.', function (done) {
    formElement.innerHTML = '';
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm({
      title: 'noValidation flag',
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
      }]
    }).then(function () {
      checkForErrors(form, {}, {
        data: {}
      }, 0, done);
    });
  });
  it('Should show errors on setSubmission when providing explicit data values.', function (done) {
    formElement.innerHTML = '';
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm({
      title: 'noValidation flag',
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
      }]
    }).then(function () {
      checkForErrors(form, {}, {
        data: {
          number: 2,
          textArea: ''
        }
      }, 2, done);
    });
  });
  it('Should not show errors on setSubmission with noValidate:TRUE', function (done) {
    formElement.innerHTML = '';
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm({
      title: 'noValidation flag',
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
      }]
    }).then(function () {
      checkForErrors(form, {
        noValidate: true
      }, {
        data: {
          number: 2,
          textArea: ''
        }
      }, 0, done);
    });
  });
  it('Should set calculated value correctly', function (done) {
    formElement.innerHTML = '';
    var form = new _Webform.default(formElement);
    form.setForm(_formtest.calculateZeroValue).then(function () {
      var a = form.components[0];
      var b = form.components[1];
      var sum = form.components[2];
      a.setValue(10);
      b.setValue(5);
      setTimeout(function () {
        _powerAssert.default.equal(a.dataValue, 10);

        _powerAssert.default.equal(b.dataValue, 5);

        _powerAssert.default.equal(sum.dataValue, 15);

        a.setValue('0');
        b.setValue('0');
        setTimeout(function () {
          _powerAssert.default.equal(a.dataValue, 0);

          _powerAssert.default.equal(b.dataValue, 0);

          _powerAssert.default.equal(sum.dataValue, 0);

          done();
        }, 250);
      }, 250);
    }).catch(done);
  });
  it('Should render Nested Modal Wizard Form correclty', function (done) {
    formElement.innerHTML = '';
    var form = new _Webform.default(formElement);
    form.setForm(_nestedModalWizard.default).then(function () {
      var openModalRef = form.element.querySelector('[ref="openModal"]');
      (0, _powerAssert.default)(openModalRef, 'Should render Open Modal button');
      var wizard = form.components[1].subForm;
      wizard.setPage(1);
      setTimeout(function () {
        var openModalRef = form.element.querySelector('[ref="openModal"]');
        (0, _powerAssert.default)(openModalRef, 'Should render Open Modal button after the page was changed');
        done();
      }, 250);
    }).catch(done);
  });
  it('Should set calculated value correctly', function (done) {
    formElement.innerHTML = '';
    var form = new _Webform.default(formElement);
    form.setForm(_disableSubmitButton.default).then(function () {
      var textField = form.getComponent(['textField']);
      var fileA = form.getComponent(['upload']);
      var fileB = form.getComponent(['file']);
      var submitButton = form.getComponent(['submit']);

      _powerAssert.default.equal(submitButton.disabled, false, 'Button should be enabled at the beginning');

      var simulateFileUploading = function simulateFileUploading(comp) {
        var debounce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
        var filePromise = new Promise(function (resolve) {
          setTimeout(function () {
            return resolve();
          }, debounce);
        });
        filePromise.then(function () {
          return comp.emit('fileUploadingEnd', filePromise);
        });
        comp.emit('fileUploadingStart', filePromise);
      };

      simulateFileUploading(fileA, 1000);
      textField.setValue('12345');
      setTimeout(function () {
        _powerAssert.default.equal(submitButton.filesUploading.length, 1);

        _powerAssert.default.equal(submitButton.isDisabledOnInvalid, true, 'Should be disabled on invalid due to the invalid TextField\'s value');

        _powerAssert.default.equal(submitButton.disabled, true, 'Should be disabled');

        simulateFileUploading(fileB, 500);
        setTimeout(function () {
          _powerAssert.default.equal(submitButton.filesUploading.length, 2);

          _powerAssert.default.equal(submitButton.disabled, true, 'Should be disabled');

          setTimeout(function () {
            _powerAssert.default.equal(submitButton.filesUploading.length, 0);

            _powerAssert.default.equal(submitButton.disabled, true, 'Should be disabled since TextField is still invalid');

            textField.setValue('123');
            setTimeout(function () {
              _powerAssert.default.equal(submitButton.disabled, false, 'Should be enabled');

              done();
            }, 250);
          }, 650);
        }, 100);
      }, 250);
    }).catch(done);
  });
  describe('set/get nosubmit', function () {
    it('should set/get nosubmit flag and emit nosubmit event', function () {
      var form = new _Webform.default(null, {});

      var emit = _sinon.default.spy(form, 'emit');

      (0, _chai.expect)(form.nosubmit).to.be.false;
      form.nosubmit = true;
      (0, _chai.expect)(form.nosubmit).to.be.true;
      (0, _chai.expect)(emit.callCount).to.equal(1);
      (0, _chai.expect)(emit.args[0]).to.deep.equal(['nosubmit', true]);
      form.nosubmit = false;
      (0, _chai.expect)(form.nosubmit).to.be.false;
      (0, _chai.expect)(emit.callCount).to.equal(2);
      (0, _chai.expect)(emit.args[1]).to.deep.equal(['nosubmit', false]);
    });
  });
  describe('getValue and setValue', function () {
    it('should setValue and getValue', function (done) {
      formElement.innerHTML = '';
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3'
      });
      form.setForm({
        components: [{
          type: 'textfield',
          key: 'a'
        }, {
          type: 'container',
          key: 'b',
          components: [{
            type: 'datagrid',
            key: 'c',
            components: [{
              type: 'textfield',
              key: 'd'
            }, {
              type: 'textfield',
              key: 'e'
            }, {
              type: 'editgrid',
              key: 'f',
              components: [{
                type: 'textfield',
                key: 'g'
              }]
            }]
          }]
        }]
      }).then(function () {
        var count = 0;
        var onChange = form.onChange;

        form.onChange = function () {
          count++;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return onChange.apply(form, args);
        }; // Ensure that it says it changes.


        _powerAssert.default.equal(form.setValue({
          a: 'a',
          b: {
            c: [{
              d: 'd1',
              e: 'e1',
              f: [{
                g: 'g1'
              }]
            }, {
              d: 'd2',
              e: 'e2',
              f: [{
                g: 'g2'
              }]
            }]
          }
        }), true);

        setTimeout(function () {
          // It should have only updated once.
          _powerAssert.default.equal(count, 1);

          done();
        }, 500);
      });
    });
  });
  describe('ReadOnly Form', function () {
    it('Should apply conditionals when in readOnly mode.', function (done) {
      done = _lodash.default.once(done);

      var Conditions = require('../test/forms/conditions').default;

      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement, {
        readOnly: true,
        language: 'en',
        template: 'bootstrap3'
      });
      form.setForm(Conditions.form).then(function () {
        _harness.default.testConditionals(form, {
          data: {
            typeShow: 'Show',
            typeMe: 'Me',
            typeThe: 'The',
            typeMonkey: 'Monkey!'
          }
        }, [], function (error) {
          form.destroy();

          if (error) {
            throw new Error(error);
          }

          done();
        });
      });
    });
  });
  describe('Validate onBlur', function () {
    it('Should keep component valid onChange', function (done) {
      formElement.innerHTML = '';
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3'
      });
      form.setForm(_formtest.validationOnBlur).then(function () {
        var field = form.components[0];
        var field2 = form.components[1];
        var fieldInput = field.refs.input[0];

        _harness.default.setInputValue(field, 'data[textField]', '12');

        setTimeout(function () {
          (0, _powerAssert.default)(!field.error, 'Should be valid while changing');
          var blurEvent = new Event('blur');
          fieldInput.dispatchEvent(blurEvent);
          setTimeout(function () {
            (0, _powerAssert.default)(field.error, 'Should set error aftre component was blured');

            _harness.default.setInputValue(field2, 'data[textField1]', 'ab');

            setTimeout(function () {
              (0, _powerAssert.default)(field.error, 'Should keep error when editing another component');
              done();
            }, 250);
          }, 250);
        }, 250);
      }).catch(done);
    });
    it('Should keep components inside DataGrid valid onChange', function (done) {
      formElement.innerHTML = '';
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3'
      });
      form.setForm(_dataGridOnBlurValidation.default).then(function () {
        var component = form.components[0];

        _harness.default.setInputValue(component, 'data[dataGrid][0][textField]', '12');

        var textField = component.iteratableRows[0].components.textField;
        setTimeout(function () {
          _powerAssert.default.equal(textField.error, '', 'Should stay valid on input');

          var blur = new Event('blur', {
            bubbles: true,
            cancelable: true
          });
          var input = textField.refs.input[0];
          input.dispatchEvent(blur);
          textField.element.dispatchEvent(blur);
          setTimeout(function () {
            (0, _powerAssert.default)(textField.error, 'Should be validated after blur');
            done();
          }, 250);
        }, 250);
      }).catch(done);
    });
  });
  describe('Reset values', function () {
    it('Should reset all values correctly.', function () {
      formElement.innerHTML = '';
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3'
      });
      return form.setForm({
        components: [{
          type: 'textfield',
          key: 'firstName',
          label: 'First Name',
          placeholder: 'Enter your first name.',
          input: true,
          tooltip: 'Enter your <strong>First Name</strong>',
          description: 'Enter your <strong>First Name</strong>'
        }, {
          type: 'textfield',
          key: 'lastName',
          label: 'Last Name',
          placeholder: 'Enter your last name',
          input: true,
          tooltip: 'Enter your <strong>Last Name</strong>',
          description: 'Enter your <strong>Last Name</strong>'
        }, {
          type: 'select',
          label: 'Favorite Things',
          key: 'favoriteThings',
          placeholder: 'These are a few of your favorite things...',
          data: {
            values: [{
              value: 'raindropsOnRoses',
              label: 'Raindrops on roses'
            }, {
              value: 'whiskersOnKittens',
              label: 'Whiskers on Kittens'
            }, {
              value: 'brightCopperKettles',
              label: 'Bright Copper Kettles'
            }, {
              value: 'warmWoolenMittens',
              label: 'Warm Woolen Mittens'
            }]
          },
          dataSrc: 'values',
          template: '<span>{{ item.label }}</span>',
          multiple: true,
          input: true
        }, {
          type: 'number',
          key: 'number',
          label: 'Number',
          input: true
        }, {
          type: 'button',
          action: 'submit',
          label: 'Submit',
          theme: 'primary'
        }]
      }).then(function () {
        form.setSubmission({
          data: {
            firstName: 'Joe',
            lastName: 'Bob',
            favoriteThings: ['whiskersOnKittens', 'warmWoolenMittens'],
            number: 233
          }
        }).then(function () {
          (0, _chai.expect)(form.submission).to.deep.equal({
            data: {
              firstName: 'Joe',
              lastName: 'Bob',
              favoriteThings: ['whiskersOnKittens', 'warmWoolenMittens'],
              number: 233,
              submit: false
            }
          });
          form.setSubmission({
            data: {}
          }).then(function () {
            (0, _chai.expect)(form.submission).to.deep.equal({
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
  describe('Calculate Value with allowed manual override', function () {
    var initialSubmission = {
      data: {
        dataGrid: [{
          label: 'yes',
          value: 'yes'
        }, {
          label: 'no',
          value: 'no'
        }],
        checkbox: false,
        submit: false
      },
      metadata: {}
    };
    var submissionWithOverridenValues = {
      data: {
        dataGrid: [{
          label: 'yes',
          value: 'y'
        }, {
          label: 'no',
          value: 'n'
        }],
        checkbox: false,
        submit: false
      },
      metadata: {}
    };
    var submissionWithOverridenValues2 = {
      data: {
        dataGrid: [{
          label: 'yes2',
          value: 'yes2'
        }, {
          label: 'no',
          value: 'n'
        }],
        checkbox: false,
        submit: false
      },
      metadata: {}
    };
    it('Should reset all values correctly.', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3'
      });
      form.setForm(_formtest.calculateValueWithManualOverride).then(function () {
        var dataGrid = form.getComponent('dataGrid');
        dataGrid.setValue([{
          label: 'yes'
        }, {
          label: 'no'
        }]);
        setTimeout(function () {
          (0, _chai.expect)(form.submission).to.deep.equal(initialSubmission);
          var row1Value = form.getComponent(['dataGrid', 0, 'value']);
          var row2Value = form.getComponent(['dataGrid', 1, 'value']);
          row1Value.setValue('y');
          row2Value.setValue('n');
          setTimeout(function () {
            (0, _chai.expect)(form.submission).to.deep.equal(submissionWithOverridenValues);
            var row1Label = form.getComponent(['dataGrid', 0, 'label']);
            row1Label.setValue('yes2');
            setTimeout(function () {
              (0, _chai.expect)(form.submission).to.deep.equal(submissionWithOverridenValues2);
              form.setSubmission(submissionWithOverridenValues).then(function () {
                setTimeout(function () {
                  var tabs = form.getComponent(['tabs']);
                  tabs.setTab(1);
                  setTimeout(function () {
                    (0, _chai.expect)(form.submission).to.deep.equal(submissionWithOverridenValues);
                    done();
                  }, 250);
                }, 150);
              });
            }, 250);
          }, 250);
        }, 250);
      }).catch(done);
    });
    it('Should allow to change value.', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3'
      });
      form.setForm(_formtest.calculatedSelectboxes).then(function () {
        var radio = form.getComponent(['radio']);
        radio.setValue('a');
        setTimeout(function () {
          _powerAssert.default.equal(radio.dataValue, 'a');

          var selectBoxes = form.getComponent(['selectBoxes']);

          _powerAssert.default.equal(selectBoxes.dataValue['a'], true, 'Should calculate value and set it to "a"');

          selectBoxes.setValue({
            'a': true,
            'b': true,
            'c': false
          });
          setTimeout(function () {
            _powerAssert.default.deepEqual(selectBoxes.dataValue, {
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
  describe('Modal Edit', function () {
    var submission = {
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
    var componentsKeys = ['checkbox', 'selectBoxes', 'select', 'textfield'];
    var expectedValues = {
      checkbox: 'Yes',
      selectBoxes: 'a, b',
      select: 'f',
      textfield: 'My Text'
    };
    it('Test rendering previews after the submission is set', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3'
      });
      form.setForm(_formtest.modalEditComponents).then(function () {
        return form.setSubmission(submission, {
          fromSubmission: true
        }).then(function () {
          componentsKeys.forEach(function (key) {
            var comp = form.getComponent([key]);
            (0, _powerAssert.default)(comp);
            var preview = comp.componentModal.refs.openModal;
            (0, _powerAssert.default)(preview);

            _powerAssert.default.equal(preview.textContent.replace(/\n|\t/g, '').trim(), expectedValues[key]);
          });
          done();
        });
      }).catch(done);
    });
    it('Test updating previews after aboting changes', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3'
      });
      form.setForm(_formtest.modalEditComponents).then(function () {
        return form.setSubmission(submission, {
          fromSubmission: true
        }).then(function () {
          var comp = form.getComponent(['textfield']);
          comp.componentModal.openModal();

          _harness.default.dispatchEvent('input', comp.componentModal.refs.modalContents, '[name="data[textfield]"]', function (el) {
            el.value = 'My Text v2';
          });

          setTimeout(function () {
            var fakeEvent = {
              preventDefault: function preventDefault() {}
            };
            comp.componentModal.closeModalHandler(fakeEvent);
            var preview = comp.componentModal.refs.openModal;

            _powerAssert.default.equal(preview.textContent.replace(/\n|\t/g, '').trim(), 'My Text');

            done();
          }, 100);
        });
      }).catch(done);
    });
  });
  describe('Initially Collapsed Panel', function () {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm(_formtest.initiallyCollapsedPanel).then(function () {
      it('Should be collapsed', function (done) {
        try {
          var panelBody = form.element.querySelector('[ref=nested-panel]');

          _powerAssert.default.equal(panelBody, null, 'Should not render the panel\'s body when initially collapsed');

          done();
        } catch (err) {
          done(err);
        }
      });
      it('Should open when an Error occured', function (done) {
        form.executeSubmit().catch(function () {
          try {
            var panelBody = form.element.querySelector('[ref=nested-panel]');
            (0, _powerAssert.default)(panelBody, 'Should open the panel when an error occured');
            done();
          } catch (err) {
            done(err);
          }
        });
      });
    }).catch(function (err) {
      return console.error(err);
    });
  });
  describe('Calculate Value', function () {
    it('Should calculate value when set submission if the component is not persistent', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3'
      });
      form.setForm(_formtest.calculatedNotPersistentValue).then(function () {
        form.setSubmission({
          data: {
            a: 'testValue'
          },
          state: 'submitted'
        });
        setTimeout(function () {
          var persistentField = form.getComponent(['a']);

          _powerAssert.default.equal(persistentField.dataValue, 'testValue', 'Should set the value from the submission');

          var notPersistentFieldInput = form.element.querySelector('input[name="data[textField]"]');

          _powerAssert.default.equal(notPersistentFieldInput.value, 'testValue', 'Should calculate the value');

          done();
        }, 550);
      }).catch(done);
    });
  });
  it('Should render components properly', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm(_formtest.multipleTextareaInsideConditionalComponent).then(function () {
      form.setSubmission({
        data: {
          textArea2: ['test'],
          didAnyBehavioralIssuesOccurOnYourShift: 'yes',
          submit: false
        }
      });
      setTimeout(function () {
        var textarea = form.getComponent(['textArea2']);
        var panel = form.getComponent(['behavioralIssues']);

        _powerAssert.default.equal(panel.visible, true, 'Should be visible');

        _powerAssert.default.deepEqual(textarea.dataValue, ['test'], 'Should set the value from the submission');

        var inputRows = textarea.element.querySelectorAll('[ref="input"]');

        _powerAssert.default.equal(inputRows.length, 1, 'Should render all the rows of the Textarea');

        done();
      }, 750);
    }).catch(done);
  });
  it('Should disable all the components inside Nested Form if it is disabled', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm(_formtest.disabledNestedForm).then(function () {
      _powerAssert.default.equal(form.components[0].disabled, false, 'Component that is outside of disabled Nested Form should be editable');

      var subFormComponents = form.components[1].subForm.components;

      _powerAssert.default.deepEqual([subFormComponents[0].disabled, subFormComponents[1].disabled], [true, true], 'Components that are inside of disabled Nested Form should be disabled');

      done();
    }).catch(done);
  });
  describe('Custom Logic', function () {
    it('Should rerender components using updated properties', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3'
      });
      form.setForm(_formtest.propertyActions).then(function () {
        form.emit('disabled');
        form.emit('hide');
        form.emit('require');
        setTimeout(function () {
          var textFieldDisabled = form.getComponent(['textField']);
          var textFieldHidden = form.getComponent(['textField1']);
          var textFieldRequired = form.getComponent(['textField2']);

          _powerAssert.default.equal(textFieldDisabled.component.disabled, true, 'Should be disabled');

          _powerAssert.default.equal(textFieldHidden.component.hidden, true, 'Should be hidden');

          _powerAssert.default.equal(textFieldRequired.component.validate.required, true, 'Should be required');

          var disabledInput = textFieldDisabled.element.querySelector('[ref="input"]');

          _powerAssert.default.equal(disabledInput.disabled, true, 'Should found a disabled input');

          var hiddenInput = textFieldHidden.element.querySelector('[ref="input"]');
          (0, _powerAssert.default)(!hiddenInput, 'Should not found a hidden input');
          var requiredFieldLabel = textFieldRequired.element.querySelector('label');
          (0, _powerAssert.default)(requiredFieldLabel.classList.contains('field-required'), 'Should mark a field as required');
          done();
        }, 550);
      }).catch(done);
    });
  });
  (0, _each.default)(_forms.default, function (formTest) {
    describe(formTest.title || '', function () {
      (0, _each.default)(formTest.tests, function (formTestTest, title) {
        it(title, function () {
          var formElement = document.createElement('div');
          var form = new _Webform.default(formElement, {
            language: 'en',
            template: 'bootstrap3'
          });
          return form.setForm(formTest.form).then(function () {
            formTestTest(form, function (error) {
              form.destroy();

              if (error) {
                throw new Error(error);
              }
            });
          });
        });
      });
    });
  });
}); // describe('Test the saveDraft and restoreDraft feature', () => {
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
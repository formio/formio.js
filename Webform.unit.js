"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.promise.finally.js");

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

var _Formio = _interopRequireDefault(require("./Formio"));

var _formtest = require("../test/formtest");

var _dataGridOnBlurValidation = _interopRequireDefault(require("../test/forms/dataGridOnBlurValidation"));

var _updateErrorClassesWidgets = _interopRequireDefault(require("../test/forms/updateErrorClasses-widgets"));

var _nestedModalWizard = _interopRequireDefault(require("../test/forms/nestedModalWizard"));

var _disableSubmitButton = _interopRequireDefault(require("../test/forms/disableSubmitButton"));

var _formWithAddressComponent = _interopRequireDefault(require("../test/forms/formWithAddressComponent"));

var _dataGridWithInitEmpty = _interopRequireDefault(require("../test/forms/dataGridWithInitEmpty"));

var _dataGridNestedForm = _interopRequireDefault(require("../test/forms/dataGrid-nestedForm"));

var _formWithDataGrid = _interopRequireDefault(require("../test/forms/formWithDataGrid"));

var _translationTestForm = _interopRequireDefault(require("../test/forms/translationTestForm"));

var _dataGridWithConditionalColumn = _interopRequireDefault(require("../test/forms/dataGridWithConditionalColumn"));

var _fixtures = require("../test/fixtures");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _utils = require("../lib/utils/utils");

var _truncateMultipleSpaces = _interopRequireDefault(require("../test/forms/truncateMultipleSpaces"));

var _calculatedValue = _interopRequireDefault(require("../test/forms/calculatedValue"));

var _conditionalDataGridWithTableAndRadio = _interopRequireDefault(require("../test/forms/conditionalDataGridWithTableAndRadio"));

var _calculateValueWithManualOverrideLableValueDataGrid = _interopRequireDefault(require("../test/forms/calculateValueWithManualOverrideLableValueDataGrid"));

var _nestedDataGridsAndContainers = _interopRequireDefault(require("../test/forms/nestedDataGridsAndContainers"));

var _columnWithConditionalComponents = _interopRequireDefault(require("../test/forms/columnWithConditionalComponents"));

var _formWithSurvey = _interopRequireDefault(require("../test/forms/formWithSurvey"));

var _formWithSelectBoxes = _interopRequireDefault(require("../test/forms/formWithSelectBoxes"));

var _formWithDayComp = _interopRequireDefault(require("../test/forms/formWithDayComp"));

var _formWithCalcValue = _interopRequireDefault(require("../test/forms/formWithCalcValue"));

var _formWithAllowCalculateOverride = _interopRequireDefault(require("../test/forms/formWithAllowCalculateOverride"));

var _clearOnHideInsideEditGrid = _interopRequireDefault(require("../test/forms/clearOnHideInsideEditGrid"));

var _nestedDataGridWithInitEmpty = _interopRequireDefault(require("../test/forms/nestedDataGridWithInitEmpty"));

var FormioUtils = _interopRequireWildcard(require("./utils/utils"));

var _htmlRenderMode = _interopRequireDefault(require("../test/forms/htmlRenderMode"));

var _optionalSanitize = _interopRequireDefault(require("../test/forms/optionalSanitize"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

global.requestAnimationFrame = function (cb) {
  return cb();
};

global.cancelAnimationFrame = function () {};
/* eslint-disable max-statements */


describe('Webform tests', function () {
  this.retries(3);
  it('Should recalculate value when submission is being set in edit mode', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_formWithCalcValue.default).then(function () {
      var numberComp = form.getComponent('number');
      var checkbox = form.getComponent('checkbox');
      form.setSubmission({}).then(function () {
        setTimeout(function () {
          _powerAssert.default.equal(numberComp.dataValue, 0);

          _powerAssert.default.equal(checkbox.dataValue, true);

          form.setSubmission({
            data: {
              number: 7,
              checkbox: true
            }
          }).then(function () {
            setTimeout(function () {
              _powerAssert.default.equal(numberComp.dataValue, 7);

              _powerAssert.default.equal(checkbox.dataValue, false);

              done();
            }, 500);
          });
        }, 500);
      });
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should show survey values in html render mode', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      renderMode: 'html',
      readOnly: true
    });
    form.setForm(_formWithSurvey.default).then(function () {
      form.setSubmission({
        data: {
          survey: {
            question1: 'a3',
            question2: 'a1'
          }
        }
      }).then(function () {
        var survey = form.getComponent('survey');
        var values = survey.element.querySelectorAll('td');

        _powerAssert.default.equal(values.length, 2);

        _powerAssert.default.equal(values[0].innerHTML.trim(), 'a3');

        _powerAssert.default.equal(values[1].innerHTML.trim(), 'a1');

        done();
      });
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should show select boxes values in html render mode', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      renderMode: 'html',
      readOnly: true
    });
    form.setForm(_formWithSelectBoxes.default).then(function () {
      form.setSubmission({
        data: {
          selectBoxes: {
            a: true,
            b: true,
            c: false
          }
        }
      }).then(function () {
        var selectBoxes = form.getComponent('selectBoxes');
        var values = selectBoxes.element.querySelector('[ref="value"]').textContent.trim();

        _powerAssert.default.equal(values, 'a, b');

        done();
      });
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should show day value in html render mode', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      renderMode: 'html',
      readOnly: true
    });
    form.setForm(_formWithDayComp.default).then(function () {
      form.setSubmission({
        data: {
          day: '05/07/2020'
        }
      }).then(function () {
        var day = form.getComponent('day');
        var value = day.element.querySelector('[ref="value"]').textContent.trim();

        _powerAssert.default.equal(value, '05/07/2020');

        done();
      });
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should allow to input value and add rows in deeply nested conditional dataGrid', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_nestedDataGridsAndContainers.default).then(function () {
      var parentDataGrid = form.getComponent('dataGrid6');

      _powerAssert.default.equal(parentDataGrid.rows.length, 1);

      _powerAssert.default.equal(parentDataGrid.rows[0].dataGrid5.visible, false);

      var checkbox = form.getComponent('checkbox');
      checkbox.setValue(true);
      setTimeout(function () {
        _powerAssert.default.equal(parentDataGrid.rows.length, 1);

        _powerAssert.default.equal(parentDataGrid.rows[0].dataGrid5.visible, true);

        var numberInput = parentDataGrid.rows[0].dataGrid5.rows[0].number.refs.input[0];
        numberInput.value = 555;
        var inputEvent = new Event('input');
        numberInput.dispatchEvent(inputEvent);
        setTimeout(function () {
          var conditionalDataGrid = form.getComponent('dataGrid6').rows[0].dataGrid5;
          var numberComp = conditionalDataGrid.rows[0].number;

          _powerAssert.default.equal(numberComp.dataValue, 555);

          _powerAssert.default.equal(numberComp.refs.input[0].value, 555);

          var addRowBtn = conditionalDataGrid.refs['datagrid-dataGrid5-addRow'][0];
          var clickEvent = new Event('click');
          addRowBtn.dispatchEvent(clickEvent);
          setTimeout(function () {
            _powerAssert.default.equal(conditionalDataGrid.rows.length, 2);

            done();
          }, 300);
        }, 300);
      }, 300);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should adjust columns when conditional fields appear/disappear', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_columnWithConditionalComponents.default).then(function () {
      var selectBoxes = form.getComponent('selectBoxes');
      var columns = form.getComponent('columns');
      columns.columns.forEach(function (column, index) {
        _powerAssert.default.equal(column[0].visible, false, "Column ".concat(index + 1, " component should be hidden"));

        _powerAssert.default.equal(columns.component.columns[index].currentWidth, 0, "Column ".concat(index + 1, "  width should be 0"));
      });
      selectBoxes.setValue({
        '1': false,
        '2': false,
        '3': true,
        '4': false,
        '5': false,
        '6': true
      });
      setTimeout(function () {
        columns.columns.forEach(function (column, index) {
          if ([3, 6].includes(index + 1)) {
            _powerAssert.default.equal(column[0].visible, true, "Column ".concat(index + 1, " component should be visible"));

            _powerAssert.default.equal(columns.component.columns[index].currentWidth, 2, "Column ".concat(index + 1, "  width should be 2"));
          } else {
            _powerAssert.default.equal(column[0].visible, false, "Column ".concat(index + 1, " component should be hidden"));

            _powerAssert.default.equal(columns.component.columns[index].currentWidth, 0, "Column ".concat(index + 1, "  width should be 0"));
          }
        });
        var visibleTextField1 = columns.columns[2][0].refs.input[0];
        var visibleTextField2 = columns.columns[5][0].refs.input[0];
        visibleTextField1.value = 'test   ';
        visibleTextField2.value = ' some ';
        var inputEvent = new Event('input');
        visibleTextField1.dispatchEvent(inputEvent);
        visibleTextField2.dispatchEvent(inputEvent);
        setTimeout(function () {
          var visibleTextField1 = columns.columns[2][0].refs.input[0];
          var visibleTextField2 = columns.columns[5][0].refs.input[0];

          _powerAssert.default.equal(visibleTextField1.value, 'test   ', 'Should not cut whitespaces while inputting into the conditional component inside column');

          _powerAssert.default.equal(visibleTextField2.value, ' some ', 'Should not cut whitespaces while inputting into the conditional component inside column');

          selectBoxes.setValue({
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
            '6': true
          });
          setTimeout(function () {
            columns.columns.forEach(function (column, index) {
              if ([6].includes(index + 1)) {
                _powerAssert.default.equal(column[0].visible, true, "Column ".concat(index + 1, " component should be visible"));

                _powerAssert.default.equal(columns.component.columns[index].currentWidth, 2, "Column ".concat(index + 1, "  width should be 2"));
              } else {
                _powerAssert.default.equal(column[0].visible, false, "Column ".concat(index + 1, " component should be hidden"));

                _powerAssert.default.equal(columns.component.columns[index].currentWidth, 0, "Column ".concat(index + 1, "  width should be 0"));
              }
            });
            done();
          }, 300);
        }, 300);
      }, 300);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should not translate en value if _userInput option is provided and value presents in reserved translation names', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'en'
    });
    form.setForm(_translationTestForm.default).then(function () {
      setTimeout(function () {
        var selectComp = form.getComponent('select');
        var options = selectComp.element.querySelector('[role="listbox"]').children;
        var option1 = options[0].textContent.trim();
        var option2 = options[1].textContent.trim();
        var label = selectComp.element.querySelector('label').textContent.trim();

        _powerAssert.default.equal(option1, _translationTestForm.default.components[0].data.values[0].label);

        _powerAssert.default.equal(option2, _translationTestForm.default.components[0].data.values[1].label);

        _powerAssert.default.equal(label, _translationTestForm.default.components[0].label);

        document.body.innerHTML = '';
        done();
      }, 100);
    }).catch(done);
  });
  it('Should translate in English if _userInput option is provided and value does not present in reserved translation names', function (done) {
    var formElement = document.createElement('div');
    var selectLabel = 'Select test label';
    var translationForm = (0, _utils.fastCloneDeep)(_translationTestForm.default);
    translationForm.components[0].label = selectLabel;
    var form = new _Webform.default(formElement, {
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
    form.setForm(translationForm).then(function () {
      var selectComp = form.getComponent('select');
      var label = selectComp.element.querySelector('label').textContent.trim();

      _powerAssert.default.equal(label, 'English Label');

      document.body.innerHTML = '';
      done();
    }).catch(done);
  });
  it('Should translate value in franch if _userInput option is provided and value does not present in reserved translation names', function (done) {
    var formElement = document.createElement('div');
    var selectLabel = 'Select test label';
    var translationForm = (0, _utils.fastCloneDeep)(_translationTestForm.default);
    translationForm.components[0].label = selectLabel;
    var form = new _Webform.default(formElement, {
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
    form.setForm(translationForm).then(function () {
      var selectComp = form.getComponent('select');
      var label = selectComp.element.querySelector('label').textContent.trim();

      _powerAssert.default.equal(label, 'French Label');

      document.body.innerHTML = '';
      done();
    }).catch(done);
  });
  it('Should display dataGrid conditional column once the condition is met', function (done) {
    var formElement = document.createElement('div');
    var formWithCondDataGridColumn = new _Webform.default(formElement);
    formWithCondDataGridColumn.setForm(_dataGridWithConditionalColumn.default).then(function () {
      var condDataGridField = formWithCondDataGridColumn.element.querySelector('[name="data[dataGrid][0][numberCond]"]');

      _powerAssert.default.equal(!!condDataGridField, false);

      var textField = formWithCondDataGridColumn.element.querySelector('[name="data[textField]"]');
      textField.value = 'show';
      var inputEvent = new Event('input');
      textField.dispatchEvent(inputEvent);
      setTimeout(function () {
        var condDataGridFieldAfterFulfillingCond = formWithCondDataGridColumn.element.querySelector('[name="data[dataGrid][0][numberCond]"]');

        _powerAssert.default.equal(!!condDataGridFieldAfterFulfillingCond, true);

        done();
      }, 300);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should remove dataGrid extra rows and components after setting value with less row number', function (done) {
    var formElement = document.createElement('div');
    var formWithDG = new _Webform.default(formElement);
    formWithDG.setForm(_formWithDataGrid.default.form).then(function () {
      formWithDG.setSubmission(_formWithDataGrid.default.submission3rows);
      setTimeout(function () {
        _powerAssert.default.equal(formWithDG.components[0].rows.length, 3);

        _powerAssert.default.equal(formWithDG.components[0].components.length, 3);

        formWithDG.setSubmission(_formWithDataGrid.default.submission1row);
        setTimeout(function () {
          _powerAssert.default.equal(formWithDG.components[0].rows.length, 1);

          _powerAssert.default.equal(formWithDG.components[0].components.length, 1);

          done();
        }, 200);
      }, 100);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should not delete/change date value in dataGrid after adding new row', function (done) {
    var formElement = document.createElement('div');
    var formWithDate = new _Webform.default(formElement);
    formWithDate.setForm(_formtest.formWithCustomFormatDate).then(function () {
      setTimeout(function () {
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
      }, 100);
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
      var editGrid = formWithNestedDraftModals.getComponent('editGrid');
      var clickEvent = new Event('click');
      var inputEvent = new Event('input');
      var addRowBtn = formWithNestedDraftModals.element.querySelector('[ref="editgrid-editGrid-addRow"]'); //click to open row in modal view

      addRowBtn.dispatchEvent(clickEvent);
      setTimeout(function () {
        var rowModal = document.querySelector(".editgrid-row-modal-".concat(editGrid.id)); //checking if row modal was openned

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
              var rowModalForEditing = document.querySelector(".editgrid-row-modal-".concat(editGrid.id));
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
                  var dialogConfirmationWindows = document.querySelectorAll(".editgrid-row-modal-confirmation-".concat(editGrid.id)); //checking if confirmation dialog is openned

                  _powerAssert.default.equal(dialogConfirmationWindows.length, 1);

                  var dialogCancelBtn = dialogConfirmationWindows[0].querySelector('[ref="dialogCancelButton"]'); //closing confirmation dialog

                  dialogCancelBtn.dispatchEvent(clickEvent);
                  setTimeout(function () {
                    var confirmationWindows = document.querySelectorAll(".editgrid-row-modal-confirmation-".concat(editGrid.id)); //checking if confirmation dialig is closed

                    _powerAssert.default.equal(confirmationWindows.length, 0);

                    var dialog = document.querySelector(".editgrid-row-modal-".concat(editGrid.id));
                    var overlay = dialog.querySelector('[ref="dialogOverlay"]'); //clocking model overlay to open confirmation dialog again

                    overlay.dispatchEvent(clickEvent);
                    setTimeout(function () {
                      var confirmationDialogsAfterClickingOverlay = document.querySelectorAll(".editgrid-row-modal-confirmation-".concat(editGrid.id));

                      _powerAssert.default.equal(confirmationDialogsAfterClickingOverlay.length, 1);

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
    var formWithDraftModals = new _Webform.default(formElement, {
      sanitize: true
    });
    formWithDraftModals.setForm(_formtest.formWithEditGridModalDrafts).then(function () {
      var clickEvent = new Event('click');
      var inputEvent = new Event('input');
      var addRowBtn = formWithDraftModals.element.querySelector('[ref="editgrid-editGrid-addRow"]'); //click to open row in modal view

      addRowBtn.dispatchEvent(clickEvent);
      setTimeout(function () {
        var editGrid = formWithDraftModals.getComponent('editGrid');

        _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should create a row');

        var rowModal = editGrid.editRows[0].dialog; //checking if row modal was openned

        _powerAssert.default.equal(!!rowModal, true, 'Should open a modal window');

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

            var submitBtn = formWithDraftModals.element.querySelector('[name="data[submit]"]'); //pushing submit button to trigger validation

            submitBtn.dispatchEvent(clickEvent);
            setTimeout(function () {
              //checking the number of appeared errors
              _powerAssert.default.equal(formWithDraftModals.errors.length, 2);

              var rowError = formWithDraftModals.element.querySelector('.editgrid-row-error').textContent.trim();
              var editGridError = formWithDraftModals.element.querySelector('[ref="messageContainer"]').querySelector('.error').textContent; //checking if right errors were shown in right places

              _powerAssert.default.equal(rowError, 'Invalid row. Please correct it or delete.');

              _powerAssert.default.equal(editGridError, 'Please correct invalid rows before proceeding.');

              var rowEditBtn = editGridRows[0].querySelector('.editRow'); //open row modal again to check if there are errors

              rowEditBtn.dispatchEvent(clickEvent);
              setTimeout(function () {
                var rowModalAfterValidation = editGrid.editRows[0].dialog;
                var alertWithErrorText = rowModalAfterValidation.querySelector('.alert-danger'); //checking if alert with errors list appeared inside the modal

                _powerAssert.default.equal(!!alertWithErrorText, true, 'Should show error alert');

                var alertErrorMessages = rowModalAfterValidation.querySelectorAll('[ref="messageRef"]');

                _powerAssert.default.equal(alertErrorMessages.length, 1);

                var numberComponentError = rowModalAfterValidation.querySelector('.formio-component-number').querySelector('.error').textContent; //checking if error was shown for empty required field

                _powerAssert.default.equal(numberComponentError, 'Number is required');

                var numberInput = rowModalAfterValidation.querySelector('[name="data[editGrid][0][number]"]');
                numberInput.value = 123; //input value to make the field valid

                numberInput.dispatchEvent(inputEvent);
                setTimeout(function () {
                  var rowModalWithValidFields = document.querySelector(".editgrid-row-modal-".concat(editGrid.id));
                  var alertErrorMessagesAfterInputtingValidValues = rowModalWithValidFields.querySelectorAll('[ref="messageRef"]');

                  _powerAssert.default.equal(alertErrorMessagesAfterInputtingValidValues.length, 0); //input values to make all row fields invalid


                  var validNumberInput = rowModalWithValidFields.querySelector('[name="data[editGrid][0][number]"]');
                  validNumberInput.value = null;
                  validNumberInput.dispatchEvent(inputEvent);
                  var validTextInput = rowModalWithValidFields.querySelector('[name="data[editGrid][0][textField]"]');
                  validTextInput.value = '';
                  validTextInput.dispatchEvent(inputEvent);
                  setTimeout(function () {
                    var alertErrorMessagesAfterInputtingInvalidValues = document.querySelector(".editgrid-row-modal-".concat(editGrid.id)).querySelectorAll('[ref="messageRef"]');

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
  it('Should modify calculated value only if it was not manually modified when allowCalculateOverride is true', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_formWithAllowCalculateOverride.default).then(function () {
      var labelComp = form.getComponent('label');
      var valueComp = form.getComponent('value');
      var inputEvent = new Event('input');
      var labelInput = labelComp.refs.input[0];
      var valueInput = valueComp.refs.input[0];
      labelInput.value = 'Hello';
      labelInput.dispatchEvent(inputEvent);
      setTimeout(function () {
        _powerAssert.default.equal(labelComp.dataValue, 'Hello');

        _powerAssert.default.equal(valueComp.dataValue, 'hello');

        valueInput.value = 'hello123';
        valueInput.dispatchEvent(inputEvent);
        setTimeout(function () {
          _powerAssert.default.equal(valueComp.dataValue, 'hello123');

          labelInput.value = 'HeLLo World';
          labelInput.dispatchEvent(inputEvent);
          setTimeout(function () {
            _powerAssert.default.equal(labelComp.dataValue, 'HeLLo World');

            _powerAssert.default.equal(valueComp.dataValue, 'hello123');

            done();
          }, 500);
        }, 500);
      }, 500);
    }).catch(done);
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

        _powerAssert.default.equal(formWithPattern.element.querySelector('[ref="errorRef"]').textContent.trim(), 'Text Field is required');

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
  it('Should only scroll to alerts dialog when submitting an invalid form', function (done) {
    var formJson = {
      components: [{
        'label': 'Number',
        'inputFormat': 'plain',
        'validate': {
          'required': true,
          'max': 10
        },
        'key': 'number',
        'type': 'number',
        'input': true
      }, {
        label: 'Submit',
        showValidations: false,
        tableView: false,
        key: 'submit',
        type: 'button',
        input: true,
        saveOnEnter: false
      }]
    };
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);

    var scrollIntoView = _sinon.default.spy(form, 'scrollIntoView');

    form.setForm(formJson).then(function () {
      _harness.default.clickElement(form, form.element.querySelector('[name="data[submit]"]'));

      setTimeout(function () {
        _powerAssert.default.equal(form.errors[0].messages.length, 1);

        (0, _powerAssert.default)(scrollIntoView.calledOnceWith(form.root.alert)); //changes do not trigger scrolling

        var inputEvent = new Event('input');
        var input1 = form.components[0].refs.input[0]; //invalid input value

        input1.value = 55;
        input1.dispatchEvent(inputEvent);
        setTimeout(function () {
          _powerAssert.default.equal(form.errors[0].messages.length, 1);

          _powerAssert.default.equal(scrollIntoView.callCount, 1); //valid input value


          input1.value = 5;
          input1.dispatchEvent(inputEvent);
          setTimeout(function () {
            _powerAssert.default.equal(form.errors.length, 0);

            _powerAssert.default.equal(scrollIntoView.callCount, 1);

            done();
          }, 250);
        }, 250);
      }, 250);
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
            _powerAssert.default.equal(input2.value, '66');

            _powerAssert.default.equal(input1.value, 6678); //set a number as calculated value


            formWithCalculatedValue.components[1].calculatedValue = 6678; //change the value

            input1.value = +("".concat(input1.value) + '90');
            input1.dispatchEvent(inputEvent);
            setTimeout(function () {
              _powerAssert.default.equal(input2.value, '66');

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
  it('Should get the language passed via options', function () {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'es'
    });

    _powerAssert.default.equal(form.language, 'es');
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

      _powerAssert.default.equal(ref.textContent.trim(), 'Field Label es obligatorio');
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
  it('Should render Nested Modal Wizard Form correctly', function (done) {
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
        var filePromise = new _nativePromiseOnly.default(function (resolve) {
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
        template: 'bootstrap3',
        pdf: true
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
    it('Should calculate value by datasouce component when editing mode is on', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3',
        pdf: true
      });
      form.setForm(_formtest.calculateValueInEditingMode).then(function () {
        form.editing = true;
        form.setSubmission({
          data: {
            select: {
              label: 'Dummy #1',
              value: 'dummy1'
            },
            dataSourceDisplay: 'some value'
          },
          state: 'submitted'
        }).then(function () {
          var dataSource = form.getComponent('datasource');
          dataSource.dataValue = {
            value: 'some value'
          };
          form.checkData(null, {
            dataSourceInitialLoading: true
          });
          setTimeout(function () {
            var dataSourceDisplay = form.getComponent('dataSourceDisplay');

            _powerAssert.default.equal(dataSourceDisplay.dataValue, 'some value', 'Should set and keep the value');

            done();
          }, 1000);
        });
      }).catch(done);
    });
    it('Should calculate value properly in editing mode', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3',
        pdf: true
      });
      form.setForm(_calculatedValue.default).then(function () {
        form.editing = true;
        form.setSubmission({
          data: {
            a: 4,
            b: 5,
            total: 9
          },
          state: 'submitted'
        });
        setTimeout(function () {
          var total = form.getComponent(['total']);

          _powerAssert.default.equal(total.dataValue, 9, 'Should set and keep the value');

          var b = form.getComponent(['b']);

          _harness.default.dispatchEvent('input', b.element, 'input', function (i) {
            return i.value = '6';
          });

          setTimeout(function () {
            _powerAssert.default.equal(total.dataValue, 10, 'Should recalculate the value');
          }, 300);
          done();
        }, 1000);
      }).catch(done);
    });
    it('Should not override value which was set from submission', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement, {
        language: 'en',
        template: 'bootstrap3',
        pdf: true
      });
      form.setForm(_calculateValueWithManualOverrideLableValueDataGrid.default).then(function () {
        form.editing = true;
        form.setSubmission({
          state: 'submitted',
          data: {
            dataGrid: [{
              label: '1',
              value: '1a'
            }, {
              label: '2',
              value: '2a'
            }, {
              label: '3',
              value: '3a'
            }]
          }
        });
        setTimeout(function () {
          var value1 = form.getComponent(['dataGrid', 0, 'value']);

          _powerAssert.default.equal(value1.dataValue, '1a', 'Should have a value set from submission');

          var value2 = form.getComponent(['dataGrid', 1, 'value']);

          _powerAssert.default.equal(value2.dataValue, '2a', 'Should have a value set from submission');

          var value3 = form.getComponent(['dataGrid', 2, 'value']);

          _powerAssert.default.equal(value3.dataValue, '3a', 'Should have a value set from submission');

          done();
        }, 1000);
      }).catch(done);
    });
  });
  it('Should set different ids for components inside different Table rows', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3',
      pdf: true
    });
    form.setForm(_conditionalDataGridWithTableAndRadio.default).then(function () {
      var radioInspection0 = form.getComponent(['inspectionDataGrid', 0, 'initialExam']);

      _harness.default.dispatchEvent('click', radioInspection0.element, 'input[value="reject"]', function (i) {
        return i.checked = true;
      });

      setTimeout(function () {
        var repairDataGrid0 = form.getComponent(['inspectionDataGrid', 0, 'repairDataGrid']);

        _powerAssert.default.equal(radioInspection0.dataValue, 'reject', 'Should set value');

        _powerAssert.default.equal(repairDataGrid0.visible, true, 'Should become visible');

        var radioRepair0 = form.getComponent(['inspectionDataGrid', 0, 'repairDataGrid', 0, 'repairExam']);

        _harness.default.dispatchEvent('click', radioRepair0.element, 'input[value="accept"]', function (i) {
          return i.checked = true;
        });

        setTimeout(function () {
          _powerAssert.default.equal(radioRepair0.dataValue, 'accept', 'Should set value');

          var inspectionDataGrid = form.getComponent(['inspectionDataGrid']);
          inspectionDataGrid.addRow();
          setTimeout(function () {
            _powerAssert.default.equal(inspectionDataGrid.rows.length, 2, 'Should add a row');

            var radioInspection1 = form.getComponent(['inspectionDataGrid', 1, 'initialExam']);

            _harness.default.dispatchEvent('click', radioInspection1.element, 'input[value="reject"]', function (i) {
              return i.checked = true;
            });

            setTimeout(function () {
              var repairDataGrid1 = form.getComponent(['inspectionDataGrid', 1, 'repairDataGrid']);

              _powerAssert.default.equal(radioInspection1.dataValue, 'reject', 'Should set value');

              _powerAssert.default.equal(repairDataGrid1.visible, true, 'Should become visible');

              var radioRepair1 = form.getComponent(['inspectionDataGrid', 1, 'repairDataGrid', 0, 'repairExam']);

              _harness.default.dispatchEvent('click', form.element, form.element.querySelector("#".concat(radioRepair1.root.id, "-").concat(radioRepair1.id, "-").concat(radioRepair1.row, "-accept")), function (i) {
                return i.checked = true;
              });

              setTimeout(function () {
                _powerAssert.default.equal(radioRepair1.dataValue, 'accept', 'Should set value of the clicked radio');

                _powerAssert.default.equal(radioRepair0.dataValue, 'accept', 'Value of the radio inside another row should stay the same');

                done();
              }, 300);
            }, 350);
          }, 300);
        }, 250);
      }, 350);
    }).catch(done);
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
  it('Should restore value correctly if NestedForm is saved as reference', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm(_dataGridNestedForm.default).then(function () {
      var nestedForm = form.getComponent(['dataGrid', 0, 'form1']);
      var submissionWithIdOnly = {
        _id: '1232',
        data: {}
      };
      nestedForm.dataValue = _objectSpread({}, submissionWithIdOnly);
      nestedForm.restoreValue();
      setTimeout(function () {
        _powerAssert.default.deepEqual(nestedForm.dataValue, submissionWithIdOnly, 'Should not set to defaultValue after restore');

        done();
      }, 350);
    }).catch(done);
  });
  it('Should not set the default value if there is only Radio with False value', function (done) {
    var formElement = document.createElement('div');

    _Formio.default.createForm(formElement, _fixtures.nestedFormInWizard).then(function (form) {
      var nestedForm = form.getComponent(['form']);
      var submission = {
        data: {
          radio: false
        }
      };
      nestedForm.dataValue = _objectSpread({}, submission);
      setTimeout(function () {
        _powerAssert.default.deepEqual(nestedForm.dataValue, submission, 'Should set submission');

        nestedForm.valueChanged = true;
        form.setPage(1);
        setTimeout(function () {
          _powerAssert.default.deepEqual(nestedForm.dataValue.data, submission.data, 'Should not set to defaultValue after restore');

          done();
        }, 300);
      }, 300);
    }).catch(done);
  });
  it('Should add and clear input error classes correctly', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm(_updateErrorClassesWidgets.default).then(function () {
      var checkbox = form.getComponent('showDate');
      checkbox.setValue(true);
      setTimeout(function () {
        var dateTimeComponent = form.getComponent('condtionalDate');
        var dateComponentElement = dateTimeComponent.element;

        _powerAssert.default.equal(!dateComponentElement.className.includes('formio-hidden'), true, 'Should not be hidden');

        form.submit();
        setTimeout(function () {
          var dateVisibleInput = dateComponentElement.querySelector('.input');
          var flatpickerInput = dateComponentElement.querySelector('.flatpickr-input');
          (0, _powerAssert.default)(dateVisibleInput.className.includes('is-invalid'), 'Visible field should have invalid class');
          (0, _powerAssert.default)(flatpickerInput.className.includes('is-invalid'), 'Flatpickr field should have invalid class as well');
          dateTimeComponent.setValue('2020-12-09T00:00:00');
          setTimeout(function () {
            _powerAssert.default.equal(dateTimeComponent.dataValue, '2020-12-09T00:00:00', 'Should set value');

            (0, _powerAssert.default)(!dateVisibleInput.className.includes('is-invalid'), 'Invalid class should be removed');
            (0, _powerAssert.default)(!flatpickerInput.className.includes('is-invalid'), 'Invalid class should be removed from flatpickr field as well');
            checkbox.setValue(false);
            setTimeout(function () {
              var dateComponentElement = dateTimeComponent.element;

              _powerAssert.default.equal(dateComponentElement.className.includes('formio-hidden'), true, 'Should be hidden');

              checkbox.setValue(true);
              setTimeout(function () {
                var dateComponentElement = dateTimeComponent.element;

                _powerAssert.default.equal(!dateComponentElement.className.includes('formio-hidden'), true, 'Should be visible');

                var dateVisibleInput = dateComponentElement.querySelector('.input:not([type="hidden"])');
                var flatpickerInput = dateComponentElement.querySelector('.flatpickr-input');
                (0, _powerAssert.default)(dateVisibleInput.className.includes('is-invalid'), 'Visible field should has invalid class');
                (0, _powerAssert.default)(flatpickerInput.className.includes('is-invalid'), 'Flatpickr field should has invalid class as well');
                dateTimeComponent.setValue('2020-10-19T00:00:00');
                setTimeout(function () {
                  _powerAssert.default.equal(dateTimeComponent.dataValue, '2020-10-19T00:00:00', 'Should set value');

                  (0, _powerAssert.default)(!dateVisibleInput.className.includes('is-invalid'), 'Invalid class should be removed');
                  (0, _powerAssert.default)(!flatpickerInput.className.includes('is-invalid'), 'Invalid class should be removed from flatpickr field as well');
                  done();
                }, 300);
              }, 400);
            }, 300);
          }, 300);
        }, 300);
      }, 350);
    }).catch(done);
  }).timeout(3000);
  it('Should have number and currency fields in empty form submission', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    var formJson = {
      components: [{
        label: 'Number',
        key: 'number',
        type: 'number'
      }, {
        label: 'Currency',
        key: 'currency',
        type: 'currency'
      }, {
        type: 'button',
        label: 'Submit',
        key: 'submit'
      }]
    };
    var emptySubmissionData = {
      number: '',
      currency: '',
      submit: true
    };
    form.setForm(formJson).then(function () {
      var clickEvent = new Event('click');
      var submitBtn = form.element.querySelector('[name="data[submit]"]');
      submitBtn.dispatchEvent(clickEvent);
      setTimeout(function () {
        _powerAssert.default.deepEqual(form.data, emptySubmissionData);

        done();
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Test Truncate Multiple Spaces', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_truncateMultipleSpaces.default).then(function () {
      var textFieldRequired = form.getComponent(['textField1']);
      var textFieldMinMaxLength = form.getComponent(['textField']);
      var textAreaMinMaxLength = form.getComponent(['textArea']);

      _harness.default.dispatchEvent('input', textFieldRequired.element, 'input', function (i) {
        return i.value = '        ';
      });

      _harness.default.dispatchEvent('input', textFieldMinMaxLength.element, 'input', function (i) {
        return i.value = '     546       456     ';
      });

      _harness.default.dispatchEvent('input', textAreaMinMaxLength.element, 'textarea', function (i) {
        return i.value = '     546       456     ';
      });

      setTimeout(function () {
        _powerAssert.default.equal(textFieldRequired.dataValue, '        ', 'Should set value');

        _powerAssert.default.equal(textFieldMinMaxLength.dataValue, '     546       456     ', 'Should set value');

        _powerAssert.default.equal(textAreaMinMaxLength.dataValue, '     546       456     ', 'Should set value');

        _powerAssert.default.equal(textFieldRequired.errors.length, 1, 'Should be invalid since it does not have a value');

        _powerAssert.default.equal(textFieldMinMaxLength.errors.length, 0, 'Should be valid since it value does not exceed the max length after truncating spaces');

        _powerAssert.default.equal(textAreaMinMaxLength.errors.length, 0, 'Should be valid since it value does not exceed the max length after truncating spaces');

        form.submit(false, {}).finally(function () {
          _powerAssert.default.equal(textFieldRequired.dataValue, '', 'Should truncate the value before submit');

          _powerAssert.default.equal(textFieldMinMaxLength.dataValue, '546 456', 'Should truncate the value before submit');

          _powerAssert.default.equal(textAreaMinMaxLength.dataValue, '546 456', 'Should truncate the value before submit');

          done();
        });
      }, 400);
    }).catch(done);
  });
  it('HTML render mode for Webform', function (done) {
    var element = document.createElement('div');
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var values = [{
            _id: '5a53f8a044398b0001023eab',
            modified: '2019-02-01T16:12:06.618Z',
            data: {
              firstName: 'Bob',
              lastName: 'Thompson',
              status: 'inactive',
              email: 'bob@example.com',
              submit: true
            },
            form: '5a53f887c8930000010f8b22',
            _fvid: 0,
            _vid: 0,
            created: '2018-01-08T23:02:56.484Z',
            externalIds: [],
            access: [],
            roles: [],
            owner: '553dbfc08d22d5cb1a7024f2',
            state: 'submitted',
            project: '5692b91fd1028f01000407e3'
          }, {
            _id: '5a53f8ad0dc919000194ab6b',
            modified: '2019-02-01T16:12:01.781Z',
            data: {
              firstName: 'Sally',
              lastName: 'Tanner',
              status: 'active',
              email: 'sally@example.com',
              submit: true
            },
            form: '5a53f887c8930000010f8b22',
            _fvid: 0,
            _vid: 0,
            created: '2018-01-08T23:03:09.730Z',
            externalIds: [],
            access: [],
            roles: [],
            owner: '553dbfc08d22d5cb1a7024f2',
            state: 'submitted',
            project: '5692b91fd1028f01000407e3'
          }, {
            _id: '5a53f8b744398b0001023eaf',
            modified: '2019-02-01T16:11:57.139Z',
            data: {
              firstName: 'Jane',
              lastName: 'Doe',
              status: 'active',
              email: 'jane@example.com',
              submit: true
            },
            form: '5a53f887c8930000010f8b22',
            _fvid: 0,
            _vid: 0,
            created: '2018-01-08T23:03:19.473Z',
            externalIds: [],
            access: [],
            roles: [],
            owner: '553dbfc08d22d5cb1a7024f2',
            state: 'submitted',
            project: '5692b91fd1028f01000407e3'
          }];
          resolve(values);
        }, 50);
      });
    };

    _Formio.default.createForm(element, _htmlRenderMode.default, {
      readOnly: true,
      renderMode: 'html'
    }).then(function (form) {
      form.submission = {
        data: {
          textfieldonPage3: 'test',
          signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABTIAAACWCAYAAADt5XcLAAAgAElEQVR4Xu3dfWydV30H8NM1dLRdndIOKKJxGHSh0MalgBilpLAJyIsatQgJu4rT8peNiFOEhl0pyR8gxZHq/DGJJAhHCNbEEU5BHVWyJpWYuja0tOPdSctLQVBHWmAwkTi0lEFh+j3h3tqOG9vJvfa59/kcybKT3Ps85/mcE0f+5nfOOe/ZZ3/156QRIECAAAECBAgQIECAAAECBAgQIEAgY4HzBJkZj46uESBAgAABAgQIECBAgAABAgQIECBQCAgyTQQCBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIO1Fjhx4kQaGTlSXHbhwoXFx6WXthSfNQIECBAgQIAAAQIECBAgQIAAgTwFBJl5jotezUIggslnnjmaTpwY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sVhGHh8aAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIEL7bi68AAAGrSURBVCBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv8D/A4EQEWXi+YzZAAAAAElFTkSuQmCC',
          panelDataGrid: [{
            panelDataGridD: 'd',
            panelDataGridC: 'c',
            panelDataGridB: 'b',
            panelDataGridA: 'a'
          }, {
            panelDataGridD: 'h',
            panelDataGridC: 'g',
            panelDataGridB: 'f',
            panelDataGridA: 'e'
          }, {
            panelDataGridD: 'l',
            panelDataGridC: 'k',
            panelDataGridB: 'j',
            panelDataGridA: 'i'
          }],
          textfield: 'testing',
          page2Customer: 'bob@example.com',
          textfieldonPage2: 'test',
          numberField: 234,
          textfieldonpage1: ['a', 'b', 'c'],
          panelHtml5Select: 'banana',
          page3Iagreetothefollowtherules: true,
          panelText: 'hello'
        }
      };
      setTimeout(function () {
        var customerSelectEl = form.element.querySelector('.formio-component-page2Customer');
        var customerSelectValueEl = customerSelectEl.querySelector('[ref="value"]');
        var htmlSelectEl = form.element.querySelector('.formio-component-panelHtml5Select');
        var htmlSelectValueEl = htmlSelectEl.querySelector('[ref="value"]');
        var checkboxEl = form.element.querySelector('.formio-component-page3Iagreetothefollowtherules');
        var checkboxValueEl = checkboxEl.querySelector('[ref="value"]');

        _powerAssert.default.equal(customerSelectValueEl.textContent.trim(), 'Bob Thompson', 'Should render Select value properly');

        _powerAssert.default.equal(htmlSelectValueEl.textContent.trim(), 'Banana', 'Should render HTML5 Select value properly');

        _powerAssert.default.equal(checkboxValueEl.textContent.trim(), 'True', 'Should render Checkbox value properly');

        _Formio.default.makeRequest = originalMakeRequest;
        done();
      }, 400);
    }).catch(done);
  });
  it('HTML render mode for Wizard', function (done) {
    var element = document.createElement('div');
    _htmlRenderMode.default.display = 'wizard';
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var values = [{
            _id: '5a53f8a044398b0001023eab',
            modified: '2019-02-01T16:12:06.618Z',
            data: {
              firstName: 'Bob',
              lastName: 'Thompson',
              status: 'inactive',
              email: 'bob@example.com',
              submit: true
            },
            form: '5a53f887c8930000010f8b22',
            _fvid: 0,
            _vid: 0,
            created: '2018-01-08T23:02:56.484Z',
            externalIds: [],
            access: [],
            roles: [],
            owner: '553dbfc08d22d5cb1a7024f2',
            state: 'submitted',
            project: '5692b91fd1028f01000407e3'
          }, {
            _id: '5a53f8ad0dc919000194ab6b',
            modified: '2019-02-01T16:12:01.781Z',
            data: {
              firstName: 'Sally',
              lastName: 'Tanner',
              status: 'active',
              email: 'sally@example.com',
              submit: true
            },
            form: '5a53f887c8930000010f8b22',
            _fvid: 0,
            _vid: 0,
            created: '2018-01-08T23:03:09.730Z',
            externalIds: [],
            access: [],
            roles: [],
            owner: '553dbfc08d22d5cb1a7024f2',
            state: 'submitted',
            project: '5692b91fd1028f01000407e3'
          }, {
            _id: '5a53f8b744398b0001023eaf',
            modified: '2019-02-01T16:11:57.139Z',
            data: {
              firstName: 'Jane',
              lastName: 'Doe',
              status: 'active',
              email: 'jane@example.com',
              submit: true
            },
            form: '5a53f887c8930000010f8b22',
            _fvid: 0,
            _vid: 0,
            created: '2018-01-08T23:03:19.473Z',
            externalIds: [],
            access: [],
            roles: [],
            owner: '553dbfc08d22d5cb1a7024f2',
            state: 'submitted',
            project: '5692b91fd1028f01000407e3'
          }];
          resolve(values);
        }, 50);
      });
    };

    _Formio.default.createForm(element, _htmlRenderMode.default, {
      readOnly: true,
      renderMode: 'html'
    }).then(function (form) {
      form.submission = {
        data: {
          textfieldonPage3: 'test',
          signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABTIAAACWCAYAAADt5XcLAAAgAElEQVR4Xu3dfWydV30H8NM1dLRdndIOKKJxGHSh0MalgBilpLAJyIsatQgJu4rT8peNiFOEhl0pyR8gxZHq/DGJJAhHCNbEEU5BHVWyJpWYuja0tOPdSctLQVBHWmAwkTi0lEFh+j3h3tqOG9vJvfa59/kcybKT3Ps85/mcE0f+5nfOOe/ZZ3/156QRIECAAAECBAgQIECAAAECBAgQIEAgY4HzBJkZj46uESBAgAABAgQIECBAgAABAgQIECBQCAgyTQQCBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIMECBAgQIAAAQIECBAgQIAAAQIECAgyzQECBAgQIECAAAECBAgQIECAAAECBLIXEGRmP0Q6SIAAAQIECBAgQIAAAQIECBAgQICAINMcIECAAAECBAgQIECAAAECBAgQIEAgewFBZvZDpIO1Fjhx4kQaGTlSXHbhwoXFx6WXthSfNQIECBAgQIAAAQIECBAgQIAAgTwFBJl5jotezUIggslnnjmaTpwY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sVhGHh8aAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIEL7bi68AAAGrSURBVCBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv4AgM/8x0kMCBAgQIECAAAECBAgQIECAAAECpRcQZJZ+CgAgQIAAAQIECBAgQIAAAQIECBAgkL+AIDP/MdJDAgQIECBAgAABAgQIECBAgAABAqUXEGSWfgoAIECAAAECBAgQIECAAAECBAgQIJC/gCAz/zHSQwIECBAgQIAAAQIECBAgQIAAAQKlFxBkln4KACBAgAABAgQIECBAgAABAgQIECCQv8D/A4EQEWXi+YzZAAAAAElFTkSuQmCC',
          panelDataGrid: [{
            panelDataGridD: 'd',
            panelDataGridC: 'c',
            panelDataGridB: 'b',
            panelDataGridA: 'a'
          }, {
            panelDataGridD: 'h',
            panelDataGridC: 'g',
            panelDataGridB: 'f',
            panelDataGridA: 'e'
          }, {
            panelDataGridD: 'l',
            panelDataGridC: 'k',
            panelDataGridB: 'j',
            panelDataGridA: 'i'
          }],
          textfield: 'testing',
          page2Customer: 'bob@example.com',
          textfieldonPage2: 'test',
          numberField: 234,
          textfieldonpage1: ['a', 'b', 'c'],
          panelHtml5Select: 'banana',
          page3Iagreetothefollowtherules: true,
          panelText: 'hello'
        }
      };
      setTimeout(function () {
        form.setPage(1);
        setTimeout(function () {
          var customerSelectEl = form.element.querySelector('.formio-component-page2Customer');
          var customerSelectValueEl = customerSelectEl.querySelector('[ref="value"]');

          _powerAssert.default.equal(customerSelectValueEl.textContent.trim(), 'Bob Thompson', 'Should render Select value properly');

          form.setPage(2);
          setTimeout(function () {
            var htmlSelectEl = form.element.querySelector('.formio-component-panelHtml5Select');
            var htmlSelectValueEl = htmlSelectEl.querySelector('[ref="value"]');

            _powerAssert.default.equal(htmlSelectValueEl.textContent.trim(), 'Banana', 'Should render HTML5 Select value properly');

            _Formio.default.makeRequest = originalMakeRequest;
            done();
          }, 400);
        }, 400);
      }, 300);
    }).catch(done);
  });
  it('Test optional sanitize', function (done) {
    var element = document.createElement('div');

    _Formio.default.createForm(element, _optionalSanitize.default, {
      sanitize: false
    }).then(function (form) {
      var sanitize = _sinon.default.spy(FormioUtils, 'sanitize');

      form.redraw();
      setTimeout(function () {
        _powerAssert.default.equal(sanitize.callCount, 0, 'Should not sanitize templates when sanitize in not turned on');

        element.innerHTML = '';

        _Formio.default.createForm(element, _optionalSanitize.default, {
          sanitize: true
        }).then(function (form) {
          sanitize.resetHistory();
          form.redraw();
          setTimeout(function () {
            _powerAssert.default.equal(sanitize.callCount, 1, 'Should sanitize templates when sanitize in turned on');

            done();
          }, 250);
        }, 250);
      });
    }).catch(done);
  });
  it('Should execute clearOnHide if visibility of the component inside an EditGrid has changed', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement, {
      language: 'en',
      template: 'bootstrap3'
    });
    form.setForm(_clearOnHideInsideEditGrid.default).then(function () {
      form.submission = {
        state: 'submitted',
        data: {
          subsidiaryEditGrid: [{
            subsidiaryEntityContainer: {
              entityFullName: 'test',
              divisionNum: '',
              entityType: 'otherEntity',
              ifOtherEntityPleaseExplain: 'test'
            }
          }]
        }
      };
      setTimeout(function () {
        var clearOnHideField = form.getComponent(['subsidiaryEditGrid', 0, 'subsidiaryEntityContainer', 'ifOtherEntityPleaseExplain']);
        var radioTrigger = form.getComponent(['subsidiaryEditGrid', 0, 'subsidiaryEntityContainer', 'entityType']);

        _powerAssert.default.equal(form.rootPristine, true, 'Should not change this prop  after setting a submission');

        _powerAssert.default.equal(clearOnHideField.visible, true, 'Should become visible');

        _powerAssert.default.equal(clearOnHideField.dataValue, 'test', 'Should set a value from  the submission');

        radioTrigger.setValue('subsidiary', {
          modified: true
        });
        setTimeout(function () {
          _powerAssert.default.equal(clearOnHideField.visible, false, 'Should become invisible');

          radioTrigger.setValue('otherEntity', {
            modified: true
          });
          setTimeout(function () {
            _powerAssert.default.equal(clearOnHideField.visible, true, 'Should become visible');

            _powerAssert.default.equal(clearOnHideField.dataValue, '', 'Should clear a value due to the clearOnHide');

            done();
          }, 250);
        }, 250);
      }, 250);
    }).catch(done);
  });
  it('Should show values in editGrid rows with nested dataGrid when viewing submission with initEmpty option', function (done) {
    var formElement = document.createElement('div');
    var formWithNestedDataGridInitEmptyOption = new _Webform.default(formElement);
    formWithNestedDataGridInitEmptyOption.setForm(_nestedDataGridWithInitEmpty.default.form).then(function () {
      formWithNestedDataGridInitEmptyOption.setSubmission(_nestedDataGridWithInitEmpty.default.submission);
      setTimeout(function () {
        var nestedDataGridFirstRowComponentValue = formWithNestedDataGridInitEmptyOption.element.querySelector('[ref="editgrid-editGrid-row"]').querySelectorAll('.col-sm-2');

        _powerAssert.default.equal(nestedDataGridFirstRowComponentValue[1].textContent.trim(), 'email');

        _powerAssert.default.equal(nestedDataGridFirstRowComponentValue[2].textContent.trim(), 'hhh@gmail.com');

        done();
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should not refetch options for Select if there was an error', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    var formJson = {
      components: [{
        label: 'Select',
        widget: 'html5',
        tableView: true,
        dataSrc: 'url',
        data: {
          url: 'http://example.com',
          headers: [{
            key: '',
            value: ''
          }]
        },
        key: 'select',
        hidden: true,
        type: 'select',
        input: true,
        disableLimit: false
      }]
    };
    var counter = 0;
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function () {
      return new Promise(function (_, reject) {
        setTimeout(function () {
          counter++;
          var err = new Error('Failed to fetch');
          err.networkError = true;
          reject(err);
        }, 50);
      });
    };

    form.setForm(formJson).then(function () {
      var select = form.getComponent('select');
      select.visible = true;
      setTimeout(function () {
        setTimeout(function () {
          select.visible = false;
          setTimeout(function () {
            select.visible = true;
            setTimeout(function () {
              (0, _chai.expect)(select.networkError).to.be.true;
              (0, _chai.expect)(select.loadingError).to.be.true;
              (0, _chai.expect)(counter).to.equal(1);
              _Formio.default.makeRequest = originalMakeRequest;
              done();
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should show only one custom error when submitting empty required field with multiple validation', function (done) {
    var formJson = {
      components: [{
        label: 'This line',
        tableView: false,
        storage: 'base64',
        webcam: false,
        fileTypes: [{
          label: '',
          value: ''
        }],
        multiple: true,
        validate: {
          required: true,
          customMessage: 'will be showed once'
        },
        key: 'file',
        type: 'file',
        input: true
      }, {
        label: 'Submit',
        showValidations: false,
        tableView: false,
        key: 'submit',
        type: 'button',
        input: true,
        saveOnEnter: false
      }]
    };
    var element = document.createElement('div');
    var form = new _Webform.default(element);
    form.setForm(formJson).then(function () {
      _harness.default.clickElement(form, form.element.querySelector('[name="data[submit]"]'));

      setTimeout(function () {
        _powerAssert.default.equal(form.errors[0].messages.length, 1);

        _powerAssert.default.equal(form.errors[0].messages[0].message, 'will be showed once');

        _powerAssert.default.equal(form.element.querySelector('[ref="errorRef"]').textContent.trim().includes('will be showed once'), true);

        done();
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should show validation error when submitting number with just "-" sign and required validation', function (done) {
    var formJson = {
      components: [{
        label: 'Number',
        mask: false,
        tableView: false,
        delimiter: false,
        requireDecimal: false,
        inputFormat: 'plain',
        truncateMultipleSpaces: false,
        validate: {
          required: true
        },
        key: 'number',
        type: 'number',
        input: true
      }, {
        label: 'Submit',
        showValidations: false,
        tableView: false,
        key: 'submit',
        type: 'button',
        input: true,
        saveOnEnter: false
      }]
    };
    var element = document.createElement('div');
    var form = new _Webform.default(element);
    form.setForm(formJson).then(function () {
      _harness.default.setInputValue(form, 'data[number]', '-_');

      _harness.default.clickElement(form, form.element.querySelector('[name="data[submit]"]'));

      setTimeout(function () {
        _powerAssert.default.equal(form.errors[0].messages.length, 1);

        _powerAssert.default.equal(form.errors[0].messages[0].message, 'Number is required');

        _powerAssert.default.equal(form.element.querySelector('[ref="errorRef"]').textContent.trim().includes('Number is required'), true);

        done();
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  (0, _each.default)(_forms.default, function (formTest) {
    var useDoneInsteadOfPromise = formTest.useDone;

    if (useDoneInsteadOfPromise) {
      describe(formTest.title || '', function () {
        (0, _each.default)(formTest.tests, function (formTestTest, title) {
          if (title === 'Email Action Test') {
            console.log('Email Action Test');
          }

          it(title, function (done) {
            var self = this;
            var formElement = document.createElement('div');
            var form = new _Webform.default(formElement, _lodash.default.cloneDeep(formTest.formOptions || {}));
            form.setForm(formTest.form).then(function () {
              formTestTest(form, function (error) {
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
    } else {
      describe(formTest.title || '', function () {
        (0, _each.default)(formTest.tests, function (formTestTest, title) {
          it(title, function () {
            var formElement = document.createElement('div');
            var form = new _Webform.default(formElement, {
              template: 'bootstrap3',
              language: 'en'
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
    }
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
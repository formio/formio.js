"use strict";

require("core-js/modules/es.string.trim");

var _harness = _interopRequireDefault(require("../test/harness"));

var _Wizard = _interopRequireDefault(require("./Wizard"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _wizardValidationOnPageChanged = _interopRequireDefault(require("../test/forms/wizardValidationOnPageChanged"));

var _wizardValidationOnNextBtn = _interopRequireDefault(require("../test/forms/wizardValidationOnNextBtn"));

var _wizardWithEditGrid = _interopRequireDefault(require("../test/forms/wizardWithEditGrid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Wizard tests', function () {
  it('Should display editGrid submission data in readOnly mode', function (done) {
    var formElement = document.createElement('div');
    var wizardForm = new _Wizard.default(formElement, {
      readOnly: true
    });
    wizardForm.setForm(_wizardWithEditGrid.default).then(function () {
      wizardForm.setValue({
        data: {
          editGrid: [{
            textField: '111'
          }],
          number: 222
        }
      });
      setTimeout(function () {
        _powerAssert.default.equal(wizardForm.element.querySelector('[name="data[number]"]').value, '222');

        _harness.default.clickElement(wizardForm, wizardForm.refs["".concat(wizardForm.wizardKey, "-link")][1]);

        setTimeout(function () {
          _powerAssert.default.equal(wizardForm.page, 1);

          var ditGridRowValue = wizardForm.element.querySelector('[ref = "editgrid-editGrid-row"]').querySelector('.col-sm-2').textContent.trim();

          _powerAssert.default.equal(ditGridRowValue, '111');

          done();
        }, 300);
      }, 100);
    }).catch(function (err) {
      return done(err);
    });
  });
  var wizardForm = null;
  it('Should set components errors if they are after page was changed with navigation', function (done) {
    var formElement = document.createElement('div');
    wizardForm = new _Wizard.default(formElement);
    wizardForm.setForm(_wizardValidationOnPageChanged.default).then(function () {
      _harness.default.testErrors(wizardForm, {
        data: {
          a: '1',
          c: '',
          textField: ''
        }
      }, [{
        component: 'a',
        message: 'a must have at least 4 characters.'
      }], done);

      _harness.default.clickElement(wizardForm, wizardForm.refs["".concat(wizardForm.wizardKey, "-link")][2]);

      _powerAssert.default.equal(wizardForm.page, 2);

      setTimeout(function () {
        _harness.default.clickElement(wizardForm, wizardForm.refs["".concat(wizardForm.wizardKey, "-link")][0]);

        _powerAssert.default.equal(wizardForm.page, 0);

        setTimeout(function () {
          var aInput = wizardForm.currentPage.getComponent('a');

          _powerAssert.default.equal(aInput.errors.length, 1);

          _powerAssert.default.equal(aInput.errors[0].message, 'a must have at least 4 characters.');

          done();
        }, 100);
      }, 100);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should leave errors for invalid fields after validation on next button and entering valid data in one of the fields', function (done) {
    var formElement = document.createElement('div');
    wizardForm = new _Wizard.default(formElement);
    wizardForm.setForm(_wizardValidationOnNextBtn.default).then(function () {
      _harness.default.clickElement(wizardForm, wizardForm.refs["".concat(wizardForm.wizardKey, "-next")]);

      setTimeout(function () {
        _powerAssert.default.equal(wizardForm.errors.length, 2);

        var inputEvent = new Event('input', {
          bubbles: true,
          cancelable: true
        });
        var inputA = formElement.querySelector('input[name="data[a]"]');

        for (var i = 0; i < 5; i++) {
          inputA.value += i;
          inputA.dispatchEvent(inputEvent);
        }

        setTimeout(function () {
          _powerAssert.default.equal(wizardForm.errors.length, 1);

          done();
        }, 250);
      }, 250);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should not set components errors if in readOnly mode', function (done) {
    var formElement = document.createElement('div');
    wizardForm = new _Wizard.default(formElement, {
      readOnly: true
    });
    wizardForm.setForm(_wizardValidationOnPageChanged.default).then(function () {
      _harness.default.testSubmission(wizardForm, {
        data: {
          a: '1',
          textField: 'aaa',
          c: '0'
        }
      });

      _harness.default.clickElement(wizardForm, wizardForm.refs["".concat(wizardForm.wizardKey, "-link")][2]);

      _powerAssert.default.equal(wizardForm.page, 2);

      _harness.default.clickElement(wizardForm, wizardForm.refs["".concat(wizardForm.wizardKey, "-link")][0]);

      _powerAssert.default.equal(wizardForm.page, 0);

      var aInput = wizardForm.currentPage.getComponent('a');

      _powerAssert.default.equal(aInput.errors.length, 0);

      done();
    });
  });
});
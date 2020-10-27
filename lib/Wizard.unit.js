"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.trim");

require("regenerator-runtime/runtime");

var _harness = _interopRequireDefault(require("../test/harness"));

var _Wizard = _interopRequireDefault(require("./Wizard"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _wizardConditionalPages = _interopRequireDefault(require("../test/forms/wizardConditionalPages"));

var _wizardValidationOnPageChanged = _interopRequireDefault(require("../test/forms/wizardValidationOnPageChanged"));

var _wizardValidationOnNextBtn = _interopRequireDefault(require("../test/forms/wizardValidationOnNextBtn"));

var _wizardWithEditGrid = _interopRequireDefault(require("../test/forms/wizardWithEditGrid"));

var _conditionalWizardPages = _interopRequireDefault(require("../test/forms/conditionalWizardPages"));

var _wizardWithSimpleConditionalPage = _interopRequireDefault(require("../test/forms/wizardWithSimpleConditionalPage"));

var _wizardWithCustomConditionalPage = _interopRequireDefault(require("../test/forms/wizardWithCustomConditionalPage"));

var _wizardWithFirstConditionalPage = _interopRequireDefault(require("../test/forms/wizardWithFirstConditionalPage"));

var _wizardWithAllowPrevious = _interopRequireDefault(require("../test/forms/wizardWithAllowPrevious"));

var _formWithSignature = _interopRequireDefault(require("../test/forms/formWithSignature"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('Wizard tests', function () {
  it('Should show signature submission in HTML render mode', function (done) {
    var formElement = document.createElement('div');
    var formWithSignatureHTMLMode = new _Wizard.default(formElement, {
      readOnly: true,
      renderMode: 'html'
    });
    formWithSignatureHTMLMode.setForm(_formWithSignature.default.form).then(function () {
      formWithSignatureHTMLMode.setSubmission(_formWithSignature.default.submission);
      setTimeout(function () {
        var signatureImage = formWithSignatureHTMLMode.element.querySelector('[ref="signatureImage"]');

        _powerAssert.default.equal(signatureImage.src === _formWithSignature.default.submission.data.signature, true);

        done();
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should display conditional page after setting submission', function (done) {
    var formElement = document.createElement('div');
    var wizardWithSimpleConditionalPage = new _Wizard.default(formElement);
    wizardWithSimpleConditionalPage.setForm(_wizardWithSimpleConditionalPage.default).then(function () {
      setTimeout(function () {
        _powerAssert.default.equal(wizardWithSimpleConditionalPage.pages.length, 1);

        _powerAssert.default.equal(wizardWithSimpleConditionalPage.components.length, 1);

        var submissionData = {
          checkbox: true,
          number: 555
        };
        wizardWithSimpleConditionalPage.setSubmission({
          data: submissionData
        });
        setTimeout(function () {
          _powerAssert.default.equal(wizardWithSimpleConditionalPage.pages.length, 2);

          _powerAssert.default.equal(wizardWithSimpleConditionalPage.components.length, 2);

          _powerAssert.default.deepEqual(wizardWithSimpleConditionalPage.data, submissionData);

          done();
        }, 500);
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should display submission data on page with custom conditional logic in readOnly', function (done) {
    var formElement = document.createElement('div');
    var wizardWithCustomConditionalPage = new _Wizard.default(formElement);
    wizardWithCustomConditionalPage.setForm(_wizardWithCustomConditionalPage.default).then(function () {
      setTimeout(function () {
        wizardWithCustomConditionalPage.disabled = true;

        if (wizardWithCustomConditionalPage.options) {
          wizardWithCustomConditionalPage.options.readOnly = true;
        } else {
          wizardWithCustomConditionalPage.options = {
            readOnly: true
          };
        }

        setTimeout(function () {
          _powerAssert.default.equal(wizardWithCustomConditionalPage.pages.length, 1);

          _powerAssert.default.equal(wizardWithCustomConditionalPage.components.length, 1);

          var submissionData = {
            checkbox: true,
            number: 555
          };
          wizardWithCustomConditionalPage.setSubmission({
            data: submissionData
          });
          setTimeout(function () {
            _powerAssert.default.equal(wizardWithCustomConditionalPage.pages.length, 2);

            _powerAssert.default.equal(wizardWithCustomConditionalPage.components.length, 2);

            _powerAssert.default.deepEqual(wizardWithCustomConditionalPage.data, submissionData);

            var clickEvent = new Event('click');
            var secondPageBtn = wizardWithCustomConditionalPage.refs["".concat(wizardWithCustomConditionalPage.wizardKey, "-link")][1];
            secondPageBtn.dispatchEvent(clickEvent);
            setTimeout(function () {
              _powerAssert.default.equal(wizardWithCustomConditionalPage.page, 1);

              var numberComponent = wizardWithCustomConditionalPage.element.querySelector('[name="data[number]"]');

              _powerAssert.default.equal(numberComponent.value, 555);

              done();
            }, 400);
          }, 300);
        }, 200);
      }, 100);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should show conditional wizard page', function (done) {
    var formElement = document.createElement('div');
    var wizardWithConditionalPage = new _Wizard.default(formElement);
    wizardWithConditionalPage.setForm(_conditionalWizardPages.default).then(function () {
      setTimeout(function () {
        _powerAssert.default.equal(wizardWithConditionalPage.pages.length, 1);

        _powerAssert.default.equal(wizardWithConditionalPage.components.length, 1);

        var inputEvent = new Event('input');
        var numberComponent = wizardWithConditionalPage.element.querySelector('[name="data[number]"]');
        numberComponent.value = 5;
        numberComponent.dispatchEvent(inputEvent);
        setTimeout(function () {
          _powerAssert.default.equal(wizardWithConditionalPage.pages.length, 2);

          _powerAssert.default.equal(wizardWithConditionalPage.components.length, 2);

          done();
        }, 300);
      }, 200);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should show first conditional wizard page', function (done) {
    var formElement = document.createElement('div');
    var wizard = new _Wizard.default(formElement);
    wizard.setForm(_wizardWithFirstConditionalPage.default).then(function () {
      _powerAssert.default.equal(wizard.pages.length, 1);

      _powerAssert.default.equal(wizard.components.length, 1);

      _powerAssert.default.equal(wizard.page, 0);

      _powerAssert.default.equal(wizard.refs["wizard-".concat(wizard.id, "-previous")], null);

      _powerAssert.default.equal(wizard.refs["wizard-".concat(wizard.id, "-link")][0].parentElement.classList.contains('active'), true);

      wizard.setValue({
        data: {
          b: 'true'
        }
      });
      setTimeout(function () {
        _powerAssert.default.equal(wizard.pages.length, 2);

        _powerAssert.default.equal(wizard.components.length, 2);

        _powerAssert.default.equal(wizard.page, 1);

        _powerAssert.default.notEqual(wizard.refs["wizard-".concat(wizard.id, "-previous")], null);

        _powerAssert.default.equal(wizard.refs["wizard-".concat(wizard.id, "-link")][1].parentElement.classList.contains('active'), true);

        done();
      }, 300);
    }).catch(function (err) {
      return done(err);
    });
  });
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
  it('Should keep values during validation that are conditionally visible', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var submission, form, textField, valid;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            submission = {
              data: {
                a: true,
                b: 'b',
                c: 'c'
              }
            };
            _context.next = 3;
            return _Formio.default.createForm(_wizardConditionalPages.default, {});

          case 3:
            form = _context.sent;
            form.validator.config = {
              db: {},
              token: '',
              form: _wizardConditionalPages.default,
              submission: submission
            }; // Set the submission data

            form.data = submission.data;

            _powerAssert.default.deepEqual(form.data, submission.data, 'Should set data properly'); // Perform calculations and conditions.


            form.calculateValue();
            form.checkConditions();
            (0, _powerAssert.default)(form.components[2], 'Should contain the 3rd page');

            _powerAssert.default.equal(form.components[2].visible, true, 'Should be visible');

            textField = form.components[2].components[0];

            _powerAssert.default.equal(textField.visible, true, 'Inner components of the 3rd page should be visible');

            _powerAssert.default.equal(textField.parentVisible, true, 'parentVisible of the 3rd page\'s child components should be equal to true'); // Reset the data


            form.data = {};
            form.setValue(submission, {
              sanitize: true
            }); // Check the validity of the form.

            _context.next = 18;
            return form.checkAsyncValidity(null, true);

          case 18:
            valid = _context.sent;
            (0, _powerAssert.default)(valid, 'Should be valid');

            _powerAssert.default.equal(form.data.c, 'c', 'Should keep the value of a conditionally visible page.');

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('If allowPrevious is given, the breadcrumb bar should be clickable for visited tabs.', function (done) {
    var formElement = document.createElement('div');
    wizardForm = new _Wizard.default(formElement, {
      allowPrevious: true
    });
    wizardForm.setForm(_wizardWithAllowPrevious.default).then(function () {
      _harness.default.clickElement(wizardForm, wizardForm.refs["".concat(wizardForm.wizardKey, "-link")][1]);

      setTimeout(function () {
        _powerAssert.default.equal(wizardForm.page, 0, 'Should be disabled for unvisited tabs.');

        _harness.default.clickElement(wizardForm, wizardForm.refs["".concat(wizardForm.wizardKey, "-next")]);

        setTimeout(function () {
          _powerAssert.default.equal(wizardForm.enabledIndex, 1, 'Should be clickable for visited tabs.');

          done();
        }, 100);
      }, 100);
    }).catch(done);
  });
});
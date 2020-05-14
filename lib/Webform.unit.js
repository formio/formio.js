"use strict";

require("core-js/modules/es.string.trim");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _lodash = _interopRequireDefault(require("lodash"));

var _each = _interopRequireDefault(require("lodash/each"));

var _harness = _interopRequireDefault(require("../test/harness"));

var _forms = _interopRequireDefault(require("../test/forms"));

var _Webform = _interopRequireDefault(require("./Webform"));

var _formtest = require("../test/formtest");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Formio from './Formio';
// import { APIMock } from '../test/APIMock';
describe('Webform tests', function () {
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
  it('Should keep components valid if they are pristine', function (done) {
    var _this = this;

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

      _this.timeout(1000);

      setTimeout(function () {
        _powerAssert.default.equal(form.errors.length, 0);

        _harness.default.setInputValue(form, 'data[textField]', '');

        setTimeout(function () {
          _powerAssert.default.equal(form.errors.length, 1);

          done();
        }, 250);
      }, 250);
    });
  });
  it('Should delete value of hidden component if clearOnHide is turned on', function (done) {
    var _this2 = this;

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

      _this2.timeout(1000);

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
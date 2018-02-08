'use strict';

var _formio = require('./formio.form');

var _formio2 = _interopRequireDefault(_formio);

var _harness = require('../test/harness');

var _index = require('../test/forms/index');

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Formio Form Renderer tests', function () {
  var simpleForm = null;
  it('Should create a simple form', function (done) {
    var formElement = document.createElement('div');
    simpleForm = new _formio2.default(formElement);
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
      _harness.Harness.testElements(simpleForm, 'input[type="text"]', 2);
      _harness.Harness.testElements(simpleForm, 'input[name="data[firstName]"]', 1);
      _harness.Harness.testElements(simpleForm, 'input[name="data[lastName]"]', 1);
      done();
    });
  });

  it('Should set a submission to the form.', function () {
    _harness.Harness.testSubmission(simpleForm, { data: {
        firstName: 'Joe',
        lastName: 'Smith'
      } });
  });

  it('Should translate a form from options', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _formio2.default(formElement, {
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
      _powerAssert2.default.equal(label.innerHTML, 'Spanish Label');
      done();
    });
  });

  it('Should translate a form after instantiate', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _formio2.default(formElement, {
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
      _powerAssert2.default.equal(label.innerHTML, 'Spanish Label');
      done();
    });
  });

  it('Should add a translation after instantiate', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _formio2.default(formElement, {
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
      _powerAssert2.default.equal(label.innerHTML, 'French Label');
      done();
    });
  });

  it('Should switch a translation after instantiate', function (done) {
    var formElement = document.createElement('div');
    var translateForm = new _formio2.default(formElement);
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
      translateForm.addLanguage('es', { 'Default Label': 'Spanish Label' }, true);
      var label = formElement.querySelector('.control-label');
      _powerAssert2.default.equal(label.innerHTML, 'Spanish Label');
      done();
    });
  });

  (0, _each2.default)(_index.FormTests, function (formTest) {
    (0, _each2.default)(formTest.tests, function (formTestTest, title) {
      it(title, function (done) {
        var formElement = document.createElement('div');
        var form = new _formio2.default(formElement, { language: 'en' });
        form.setForm(formTest.form).then(function () {
          formTestTest(form, done);
        }).catch(function (error) {
          done(error);
        });
      });
    });
  });
});
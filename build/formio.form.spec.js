'use strict';

var _formio = require('./formio.form');

var _formio2 = _interopRequireDefault(_formio);

var _harness = require('../test/harness');

var _index = require('../test/forms/index');

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

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

  (0, _each2.default)(_index.FormTests, function (formTest) {
    (0, _each2.default)(formTest.tests, function (formTestTest, title) {
      it(title, function (done) {
        var formElement = document.createElement('div');
        var form = new _formio2.default(formElement);
        form.setForm(formTest.form).then(function () {
          formTestTest(form, done);
        }).catch(function (error) {
          done(error);
        });
      });
    });
  });
});
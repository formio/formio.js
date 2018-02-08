'use strict';

var _formio = require('./formio.wizard');

var _formio2 = _interopRequireDefault(_formio);

var _index = require('../test/wizards/index');

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form Wizard Renderer tests', function () {
  (0, _each2.default)(_index.WizardTests, function (wizardTest) {
    (0, _each2.default)(wizardTest.tests, function (wizardTestTest, title) {
      it(title, function (done) {
        var wizardElement = document.createElement('div');
        var wizard = new _formio2.default(wizardElement);
        wizard.setForm(wizardTest.form).then(function () {
          return wizardTestTest(wizard, done);
        }).catch(function (error) {
          done(error);
        });
      });
    });
  });
});
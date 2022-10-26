"use strict";

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _Formio = _interopRequireDefault(require("../../Formio"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Tabs Component', function () {
  it('Test setting error classes when set to modalEdit', function (done) {
    var formElement = document.createElement('div');

    _Formio.default.createForm(formElement, {
      display: 'form',
      type: 'form',
      components: [_fixtures.comp1]
    }).then(function (form) {
      var comp = form.components[0];
      var data = {
        textField: ''
      };
      form.checkValidity(data, true, data);
      setTimeout(function () {
        var openModalWrapper = form.element.querySelector('[ref="openModalWrapper"]');
        (0, _powerAssert.default)(openModalWrapper.className.includes('formio-error-wrapper'), 'Should have error class');
        (0, _powerAssert.default)(openModalWrapper.className.includes('has-message'), 'Should have class indicating that the component has a message');
        var openModalButton = comp.element.querySelector('[ref="openModal"]');
        (0, _powerAssert.default)(!openModalButton.className.includes('tab-error'), 'Open modal element should not have a tab-error class');
        var validData = {
          textField: 'Text'
        };
        form.setSubmission({
          data: validData
        });
        setTimeout(function () {
          var openModalWrapper = form.element.querySelector('[ref="openModalWrapper"]');
          (0, _powerAssert.default)(!openModalWrapper.className.includes('formio-error-wrapper'), 'Should not have error class');
          (0, _powerAssert.default)(!openModalWrapper.className.includes('has-message'), 'Should not have class indicating that the component has a message');
          done();
        }, 250);
      }, 200);
    }).catch(done);
  });
});
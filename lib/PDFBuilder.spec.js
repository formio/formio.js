"use strict";

require("core-js/modules/es.object.assign");

var _FormBuilder = _interopRequireDefault(require("./FormBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Formio PDF Form Builder tests', function () {
  it('Should emit change event when component position changed', function (done) {
    var form = {
      'type': 'form',
      'components': [{
        'input': true,
        'label': 'Text',
        'key': 'text',
        'type': 'textfield',
        'overlay': {
          'top': 135,
          'left': 211.516,
          'height': 20,
          'width': 100,
          'page': 1
        }
      }, {
        'input': true,
        'label': 'Submit',
        'key': 'submit',
        'action': 'submit',
        'type': 'button'
      }],
      'display': 'pdf',
      'name': 'testPdfForm'
    };
    var element = document.createElement('div');
    document.body.appendChild(element);
    var builder = new _FormBuilder.default(element, form, {});
    builder.ready.then(function (builder) {
      var isPfdFormInitilized = false;
      builder.on('change', function () {
        if (isPfdFormInitilized) {
          //ignore any change events fired before initialized event
          //remove builder elements from DOM
          builder.destroy();

          try {
            document.body.removeChild(element);
          } catch (err) {
            console.warn(err);
          }

          done();
        } else {
          done();
        }
      });
      builder.pdfForm.on('initialized', function () {
        isPfdFormInitilized = true;
        var component = Object.assign({}, builder.pdfForm.getComponent('text').component);
        component.overlay = {
          'top': 225,
          'left': 405.516,
          'height': 20,
          'width': 100,
          'page': 1
        };
        builder.pdfForm.emit('iframe-componentUpdate', component);
      });
    });
  });
});
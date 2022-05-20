"use strict";

require("core-js/modules/es.string.trim.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Content = _interopRequireDefault(require("./Content"));

var _Formio = _interopRequireDefault(require("../../Formio"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Content Component', function () {
  it('Should build a content component', function () {
    return _harness.default.testCreate(_Content.default, _fixtures.comp1).then(function (component) {
      var html = component.element.querySelector('[ref="html"]');

      _powerAssert.default.equal(html.innerHTML.trim(), _fixtures.comp1.html.trim());
    });
  });
  it('Should update after submission set', function (done) {
    var formJson = {
      components: [{
        html: '<p>{{submission.data.textField}}</p>',
        label: 'Content',
        refreshOnChange: false,
        key: 'content',
        type: 'content'
      }, {
        label: 'Text Field',
        tableView: true,
        key: 'textField',
        type: 'textfield',
        input: true
      }]
    };
    var element = document.createElement('div');

    _Formio.default.createForm(element, formJson).then(function (form) {
      form.submission = {
        data: {
          textField: 'textField'
        }
      };
      var content = form.getComponent('content');
      form.dataReady.then(function () {
        _powerAssert.default.equal(content.refs.html.innerHTML, '<p>textField</p>');

        done();
      });
    }).catch(done);
  });
});
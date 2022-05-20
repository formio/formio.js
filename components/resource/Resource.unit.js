"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Resource = _interopRequireDefault(require("./Resource"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Resource Component', function () {
  it('Should build a resource component', function (done) {
    _harness.default.testCreate(_Resource.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'select', 1);

      done();
    });
  });
  it('Should provide correct value', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var resource = form.getComponent('resource');
      var value = 'API key: textField';
      resource.setValue(value);
      setTimeout(function () {
        _powerAssert.default.equal(resource.getValue(), value);

        _powerAssert.default.equal(resource.dataValue, value);

        var submit = form.getComponent('submit');
        var clickEvent = new Event('click');
        var submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);
        setTimeout(function () {
          _powerAssert.default.equal(resource.dataValue, value);

          done();
        }, 200);
      }, 200);
    }).catch(done);
  });
});
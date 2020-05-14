"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.promise.finally");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../test/harness"));

var _WebformBuilder = _interopRequireDefault(require("./WebformBuilder"));

var _formtest = require("../test/formtest");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('WebformBuilder tests', function () {
  before(function (done) {
    return _harness.default.builderBefore(done);
  });
  after(function () {
    return _harness.default.builderAfter();
  });
  it('Should create a new form builder class', function (done) {
    var builder = _harness.default.buildComponent('textfield');

    (0, _powerAssert.default)(builder instanceof _WebformBuilder.default, 'Builder must be an instance of FormioFormBuilder');
    done();
  });
  it('Should not show unique API error when components with same keys are inside and outside of the Data component', function (done) {
    var builder = _harness.default.buildComponent('textfield');

    builder.webform.setForm(_formtest.uniqueApiKeys).then(function () {
      builder.highlightInvalidComponents();
      builder.webform.getComponent('textField', function (component) {
        _powerAssert.default.equal(component.errors.length, 0);

        done();
      });
    }).catch(done).finally(function () {
      builder.form = {
        components: []
      };
    });
  });
  it('Should show unique API error when components inside and outside of the Layout component have same keys', function (done) {
    var builder = _harness.default.buildComponent('textfield');

    builder.webform.setForm(_formtest.uniqueApiKeysLayout).then(function () {
      builder.highlightInvalidComponents();
      builder.webform.getComponent('textField', function (component) {
        _powerAssert.default.equal(component.errors.length, 1);

        done();
      });
    }).catch(done).finally(function () {
      builder.form = {
        components: []
      };
    });
  });
  it('Should show unique API error when components on the same level have same keys', function (done) {
    var builder = _harness.default.buildComponent('textfield');

    builder.webform.setForm(_formtest.uniqueApiKeysSameLevel).then(function () {
      builder.highlightInvalidComponents();
      builder.webform.getComponent('textField', function (component) {
        _powerAssert.default.equal(component.errors.length, 1);

        done();
      });
    }).catch(done).finally(function () {
      builder.form = {
        components: []
      };
    });
  });
});
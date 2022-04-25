"use strict";

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../test/harness"));

var _WebformBuilder = _interopRequireDefault(require("./WebformBuilder"));

var _formtest = require("../test/formtest");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('WebformBuilder tests', function () {
  this.retries(3);
  before(function (done) {
    return _harness.default.builderBefore(done);
  });
  afterEach(function () {
    return _harness.default.getBuilder().setForm({
      display: 'form',
      components: []
    });
  });
  after(function (done) {
    return _harness.default.builderAfter(done);
  });
  it('Should create a new form builder class', function (done) {
    var builder = _harness.default.getBuilder();

    (0, _powerAssert.default)(builder instanceof _WebformBuilder.default, 'Builder must be an instance of FormioFormBuilder');
    done();
  });
  it('Should not show unique API error when components with same keys are inside and outside of the Data component', function (done) {
    var builder = _harness.default.getBuilder();

    builder.webform.setForm(_formtest.uniqueApiKeys).then(function () {
      builder.highlightInvalidComponents();
      var component = builder.webform.getComponent(['textField']);

      _powerAssert.default.equal(component.errors.length, 0);

      done();
    }).catch(done);
  });
  it('Should show unique API error when components inside and outside of the Layout component have same keys', function (done) {
    var builder = _harness.default.getBuilder();

    builder.webform.setForm(_formtest.uniqueApiKeysLayout).then(function () {
      builder.highlightInvalidComponents();
      var component = builder.webform.getComponent(['textField']);

      _powerAssert.default.equal(component.errors.length, 1);

      done();
    }).catch(done);
  });
  it('Should allow add components', function (done) {
    var builder = _harness.default.getBuilder();

    builder.setForm(_formtest.columnsForm).then(function () {
      var column1 = builder.webform.element.querySelector('[ref="columns-container"]');

      _harness.default.buildComponent('textfield', column1);

      setTimeout(function () {
        _harness.default.saveComponent();

        setTimeout(function () {
          var columns = builder.webform.getComponent('columns');

          _powerAssert.default.equal(columns.columns[0].length, 1);

          done();
        }, 150);
      }, 150);
    }).catch(done);
  });
  it('Should show unique API error when components on the same level have same keys', function (done) {
    var builder = _harness.default.getBuilder();

    builder.webform.setForm(_formtest.uniqueApiKeysSameLevel).then(function () {
      builder.highlightInvalidComponents();
      var component = builder.webform.getComponent(['textField']);

      _powerAssert.default.equal(component.errors.length, 1);

      done();
    }).catch(done);
  });
});
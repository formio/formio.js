"use strict";

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _harness = _interopRequireDefault(require("../test/harness"));

var _WebformBuilder = _interopRequireDefault(require("./WebformBuilder"));

var _builders = _interopRequireDefault(require("../lib/builders"));

var _formtest = require("../test/formtest");

var _sameApiKeysLayoutComps = _interopRequireDefault(require("../test/forms/sameApiKeysLayoutComps"));

var _testApiKeysUniquifying = _interopRequireDefault(require("../test/forms/testApiKeysUniquifying"));

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
  it('Should show unique API error when layout components have same keys', function (done) {
    var builder = _harness.default.getBuilder();

    builder.webform.setForm(_sameApiKeysLayoutComps.default).then(function () {
      builder.highlightInvalidComponents();
      var component = builder.webform.getComponent(['tabs']);

      _powerAssert.default.equal(component.errors.length, 1, 'Should show Unique API Key error');

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
  it('Should uniquify API keys when add a component to the container which already has the same type component', function (done) {
    var builder = _harness.default.getBuilder();

    builder.webform.setForm(_testApiKeysUniquifying.default).then(function () {
      var ERROR_MSG = 'Should add a number to the api key of the second component of the same type';
      var containerTestsReady;
      var containerTestsPromise = new _nativePromiseOnly.default(function (resolve) {
        return containerTestsReady = resolve;
      });
      var container = builder.webform.element.querySelector(['[ref="container-container"]']);

      _harness.default.buildComponent('editgrid', container);

      setTimeout(function () {
        var newEditGridApiKey = builder.editForm.getComponent('key');

        _powerAssert.default.equal(newEditGridApiKey.dataValue, 'editGrid1', ERROR_MSG);

        _harness.default.saveComponent();

        setTimeout(function () {
          var editGridInsideContainer = container.querySelector('[ref="editGrid-container"]');

          _harness.default.buildComponent('columns', editGridInsideContainer);

          setTimeout(function () {
            var newColumnsApiKey = builder.editForm.getComponent('key');

            _powerAssert.default.equal(newColumnsApiKey.dataValue, 'columns1', ERROR_MSG);

            _harness.default.saveComponent();

            setTimeout(function () {
              var columnInsideEditGridInsideContainer = editGridInsideContainer.querySelector('[ref="columns-container"]');

              _harness.default.buildComponent('textfield', columnInsideEditGridInsideContainer);

              setTimeout(function () {
                var newTextFieldApiKey = builder.editForm.getComponent('key');

                _powerAssert.default.equal(newTextFieldApiKey.dataValue, 'textField1', ERROR_MSG);

                _harness.default.saveComponent();

                containerTestsReady();
              }, 150);
            }, 150);
          }, 150);
        }, 150);
      }, 150);
      containerTestsPromise.then(function () {
        var panel = builder.webform.element.querySelector(['[ref="panel-container"]']);

        _harness.default.buildComponent('datagrid', panel);

        setTimeout(function () {
          var newDataGridApiKey = builder.editForm.getComponent('key');

          _powerAssert.default.equal(newDataGridApiKey.dataValue, 'dataGrid1', ERROR_MSG);

          _harness.default.saveComponent();

          setTimeout(function () {
            var dataGridInsidePanel = panel.querySelector('[ref="dataGrid-container"]');

            _harness.default.buildComponent('number', dataGridInsidePanel);

            setTimeout(function () {
              var newNumberApiKey = builder.editForm.getComponent('key');

              _powerAssert.default.equal(newNumberApiKey.dataValue, 'number1', ERROR_MSG);

              _harness.default.saveComponent();

              setTimeout(function () {
                var columnInsidefieldSetInsideDataGridInsidePanel = dataGridInsidePanel.parentElement.querySelectorAll('[ref="columns-container"]')[1];

                _harness.default.buildComponent('checkbox', columnInsidefieldSetInsideDataGridInsidePanel);

                setTimeout(function () {
                  var newTextFieldApiKey = builder.editForm.getComponent('key');

                  _powerAssert.default.equal(newTextFieldApiKey.dataValue, 'checkbox1', ERROR_MSG);

                  done();
                }, 150);
              }, 150);
            }, 150);
          }, 150);
        }, 150);
      });
    }).catch(done);
  });
  it('Should override the way a key for new component is set', function (done) {
    var builder = _harness.default.getBuilder();

    builder.setForm(_formtest.columnsForm).then(function () {
      _builders.default.builders.webform.prototype.updateComponentKey = function () {
        return 'rewrittenNumberKey';
      };

      var column = builder.webform.element.querySelector('[ref="columns-container"]');

      _harness.default.buildComponent('number', column);

      setTimeout(function () {
        var numberLabel = builder.editForm.getComponent('label');
        numberLabel.setValue('Test Number');
        setTimeout(function () {
          var numberKey = builder.editForm.getComponent('key');

          _powerAssert.default.equal(numberKey.dataValue, 'rewrittenNumberKey');

          done();
        }, 150);
      }, 150);
    }).catch(done);
  });
});
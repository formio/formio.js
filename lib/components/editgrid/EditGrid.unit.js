"use strict";

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.promise.finally.js");

require("core-js/modules/web.dom-collections.for-each.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _EditGrid = _interopRequireDefault(require("./EditGrid"));

var _fixtures = require("./fixtures");

var _modalEditGrid = _interopRequireDefault(require("../../../test/forms/modalEditGrid"));

var _Webform = _interopRequireDefault(require("../../Webform"));

var _formtest = require("../../../test/formtest");

var _Formio = _interopRequireDefault(require("../../Formio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('EditGrid Component', function () {
  it('Should set correct values in dataMap inside editGrid and allow aditing them', function (done) {
    _harness.default.testCreate(_EditGrid.default, _fixtures.comp4).then(function (component) {
      component.setValue([{
        dataMap: {
          key111: '111'
        }
      }]);
      setTimeout(function () {
        var clickEvent = new Event('click');
        var editBtn = component.element.querySelector('.editRow');
        editBtn.dispatchEvent(clickEvent);
        setTimeout(function () {
          var keyValue = component.element.querySelectorAll('[ref="input"]')[0].value;
          var valueValue = component.element.querySelectorAll('[ref="input"]')[1].value;
          var saveBtnsQty = component.element.querySelectorAll('[ref="editgrid-editGrid-saveRow"]').length;

          _powerAssert.default.equal(saveBtnsQty, 1);

          _powerAssert.default.equal(keyValue, 'key111');

          _powerAssert.default.equal(valueValue, '111');

          done();
        }, 500);
      }, 200);
    });
  });
  it('Should set correct values after reset', function (done) {
    _harness.default.testCreate(_EditGrid.default, _fixtures.comp5).then(function (component) {
      _powerAssert.default.equal(component.components.length, 0);

      component.setValue([{
        textField: 'textField1'
      }, {
        textField: 'textField2'
      }], {
        resetValue: true
      });
      setTimeout(function () {
        _powerAssert.default.equal(component.components.length, 2);

        done();
      }, 300);
    });
  });
  it('Should display saved values if there are more then 1 nested components', function (done) {
    _harness.default.testCreate(_EditGrid.default, _fixtures.comp3).then(function (component) {
      component.setValue([{
        container: {
          number: 55555
        }
      }, {
        container: {
          number: 666666
        }
      }]);
      setTimeout(function () {
        var firstValue = component.element.querySelectorAll('[ref="editgrid-editGrid-row"]')[0].querySelector('.col-sm-2').textContent.trim();
        var secondValue = component.element.querySelectorAll('[ref="editgrid-editGrid-row"]')[1].querySelector('.col-sm-2').textContent.trim();

        _powerAssert.default.equal(firstValue, '55555');

        _powerAssert.default.equal(secondValue, '666666');

        done();
      }, 600);
    });
  });
  it('Should build an empty edit grid component', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(1)', 'Field 1');

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(2)', 'Field 2');

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '0');

      _harness.default.testElements(component, 'li.list-group-header', 1);

      _harness.default.testElements(component, 'li.list-group-item', 1);

      _harness.default.testElements(component, 'li.list-group-footer', 0);

      _harness.default.testElements(component, 'div.editRow', 0);

      _harness.default.testElements(component, 'div.removeRow', 0);

      _powerAssert.default.equal(component.refs["".concat(component.editgridKey, "-addRow")].length, 1);

      (0, _powerAssert.default)(component.checkValidity(component.getValue()), 'Item should be valid');
    });
  });
  it('Should build an edit grid component', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(1)', 'Field 1');

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(2)', 'Field 2');

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '0');

      _harness.default.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);

      _harness.default.testElements(component, 'li.list-group-header', 1);

      _harness.default.testElements(component, 'li.list-group-item', 3);

      _harness.default.testElements(component, 'li.list-group-footer', 0);

      _harness.default.testElements(component, 'div.editRow', 2);

      _harness.default.testElements(component, 'div.removeRow', 2);

      _powerAssert.default.equal(component.refs["".concat(component.editgridKey, "-addRow")].length, 1);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', 'good');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', 'foo');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', 'good');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', 'bar');

      (0, _powerAssert.default)(component.checkValidity(component.getValue()), 'Item should be valid');
    });
  });
  it('Should add a row when add another is clicked', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'li.list-group-item', 1);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '0');

      _harness.default.clickElement(component, component.refs["".concat(component.editgridKey, "-addRow")][0]);

      _harness.default.testElements(component, 'li.list-group-item', 2);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '0');

      _harness.default.clickElement(component, component.refs["".concat(component.editgridKey, "-addRow")][0]);

      _harness.default.testElements(component, 'li.list-group-item', 3);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '0');

      (0, _powerAssert.default)(!component.checkValidity(component.getValue(), true), 'Item should not be valid');
    });
  });
  it('Should save a new row when save is clicked', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      component.pristine = false;

      _harness.default.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);

      _harness.default.testElements(component, 'li.list-group-item', 3);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');

      _harness.default.clickElement(component, component.refs["".concat(component.editgridKey, "-addRow")][0]);

      _harness.default.testElements(component, 'li.list-group-item', 4);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');

      _harness.default.setInputValue(component, 'data[editgrid][2][field1]', 'good');

      _harness.default.setInputValue(component, 'data[editgrid][2][field2]', 'baz');

      _harness.default.clickElement(component, 'div.editgrid-actions button.btn-primary');

      _harness.default.testElements(component, 'li.list-group-item', 4);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '3');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.row div:nth-child(1)', 'good');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.row div:nth-child(2)', 'baz');

      (0, _powerAssert.default)(component.checkValidity(component.getValue()), 'Item should be valid');
    });
  });
  it('Should cancel add a row when cancel is clicked', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);

      _harness.default.testElements(component, 'li.list-group-item', 3);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');

      _harness.default.clickElement(component, component.refs["".concat(component.editgridKey, "-addRow")][0]);

      _harness.default.testElements(component, 'li.list-group-item', 4);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');

      _harness.default.setInputValue(component, 'data[editgrid][2][field1]', 'good');

      _harness.default.setInputValue(component, 'data[editgrid][2][field2]', 'baz');

      _harness.default.clickElement(component, 'div.editgrid-actions button.btn-danger');

      _harness.default.testElements(component, 'li.list-group-item', 3);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');

      _powerAssert.default.equal(component.editRows.length, 2);

      (0, _powerAssert.default)(component.checkValidity(component.getValue(), true), 'Item should be valid');
    });
  });
  it('Should delete a row when delete is clicked', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }, {
        field1: 'good',
        field2: 'baz'
      }]);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '3');

      _harness.default.clickElement(component, 'li.list-group-item:nth-child(3) div.removeRow');

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', 'good');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', 'foo');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', 'good');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', 'baz');

      (0, _powerAssert.default)(component.checkValidity(component.getValue(), true), 'Item should be valid');
    });
  });
  it('Should edit a row when edit is clicked', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);

      _harness.default.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');

      _harness.default.getInputValue(component, 'data[editgrid][1][field1]', 'good');

      _harness.default.getInputValue(component, 'data[editgrid][1][field2]', 'bar');

      _harness.default.testElements(component, 'div.editgrid-actions button.btn-primary', 1);

      _harness.default.testElements(component, 'div.editgrid-actions button.btn-danger', 1);

      (0, _powerAssert.default)(!component.checkValidity(component.getValue(), true), 'Item should not be valid');
    });
  });
  it('Should save a row when save is clicked', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);

      _harness.default.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');

      _harness.default.setInputValue(component, 'data[editgrid][1][field2]', 'baz');

      _harness.default.clickElement(component, 'div.editgrid-actions button.btn-primary');

      _harness.default.testElements(component, 'li.list-group-item', 3);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', 'good');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', 'baz');

      (0, _powerAssert.default)(component.checkValidity(component.getValue(), true), 'Item should be valid');
    });
  });
  it('Should cancel edit row when cancel is clicked', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);

      _harness.default.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');

      _harness.default.setInputValue(component, 'data[editgrid][1][field2]', 'baz');

      _harness.default.clickElement(component, 'div.editgrid-actions button.btn-danger');

      _harness.default.testElements(component, 'li.list-group-item', 3);

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', 'good');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', 'bar');

      (0, _powerAssert.default)(component.checkValidity(component.getValue(), true), 'Item should be valid');
    });
  });
  it('Should show error messages for existing data in rows', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, [{
        field1: 'bad',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }, {
        field1: 'also bad',
        field2: 'baz'
      }]);

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.has-error div.editgrid-row-error', 'Must be good');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.has-error div.editgrid-row-error', 'Must be good');

      (0, _powerAssert.default)(!component.checkValidity(component.getValue(), true), 'Item should not be valid');
    });
  });
  it('Should not allow saving when errors exist', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.clickElement(component, 'button.btn-primary');

      _harness.default.clickElement(component, 'div.editgrid-actions button.btn-primary');

      _harness.default.getInputValue(component, 'data[editgrid][0][field1]', '');

      _harness.default.getInputValue(component, 'data[editgrid][0][field2]', '');

      (0, _powerAssert.default)(!component.checkValidity(component.getValue(), true), 'Item should not be valid');

      _harness.default.setInputValue(component, 'data[editgrid][0][field2]', 'baz');

      _harness.default.clickElement(component, 'div.editgrid-actions button.btn-primary');

      _harness.default.getInputValue(component, 'data[editgrid][0][field1]', '');

      _harness.default.getInputValue(component, 'data[editgrid][0][field2]', 'baz');

      (0, _powerAssert.default)(!component.checkValidity(component.getValue(), true), 'Item should not be valid');

      _harness.default.setInputValue(component, 'data[editgrid][0][field1]', 'bad');

      _harness.default.clickElement(component, 'div.editgrid-actions button.btn-primary');

      _harness.default.getInputValue(component, 'data[editgrid][0][field1]', 'bad');

      _harness.default.getInputValue(component, 'data[editgrid][0][field2]', 'baz');

      (0, _powerAssert.default)(!component.checkValidity(component.getValue(), true), 'Item should not be valid');

      _harness.default.setInputValue(component, 'data[editgrid][0][field1]', 'good');

      _harness.default.clickElement(component, 'div.editgrid-actions button.btn-primary');

      (0, _powerAssert.default)(component.checkValidity(component.getValue(), true), 'Item should be valid');

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '1');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', 'good');

      _harness.default.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', 'baz');
    });
  });
  it('Should not allow saving when rows are open', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);

      _harness.default.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');

      (0, _powerAssert.default)(!component.checkValidity(component.getValue(), true), 'Item should not be valid');

      _harness.default.clickElement(component, 'div.editgrid-actions button.btn-primary');

      (0, _powerAssert.default)(component.checkValidity(component.getValue(), true), 'Item should be valid');

      _harness.default.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');

      (0, _powerAssert.default)(!component.checkValidity(component.getValue(), true), 'Item should not be valid');

      _harness.default.clickElement(component, 'div.editgrid-actions button.btn-danger');

      (0, _powerAssert.default)(component.checkValidity(component.getValue(), true), 'Item should be valid');
    });
  });
  it('Should disable components when in read only', function () {
    return _harness.default.testCreate(_EditGrid.default, _fixtures.comp1, {
      readOnly: true
    }).then(function (component) {
      _harness.default.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);

      _harness.default.clickElement(component, 'li.list-group-item:nth-child(3) div.removeRow');

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');

      _harness.default.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');

      _harness.default.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', '2');
    });
  });
  describe('Display As Modal', function () {
    it('Should show add error classes to invalid components', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_formtest.displayAsModalEditGrid).then(function () {
        var editGrid = form.components[0];
        var clickEvent = new Event('click');
        editGrid.addRow();
        setTimeout(function () {
          var dialog = document.querySelector('[ref="dialogContents"]');
          var saveButton = dialog.querySelector('.btn.btn-primary');
          saveButton.dispatchEvent(clickEvent);
          setTimeout(function () {
            _powerAssert.default.equal(editGrid.errors.length, 6);

            var components = Array.from(dialog.querySelectorAll('[ref="component"]'));
            var areRequiredComponentsHaveErrorWrapper = components.every(function (comp) {
              var className = comp.className;
              return className.includes('required') && className.includes('formio-error-wrapper') || true;
            });

            _powerAssert.default.equal(areRequiredComponentsHaveErrorWrapper, true);

            document.body.innerHTML = '';
            done();
          }, 100);
        }, 100);
      }).catch(done);
    });
    it('Should set alert with validation errors on save and update them', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_modalEditGrid.default).then(function () {
        var editGrid = form.components[0];
        form.checkValidity(form._data, true, form._data);

        _powerAssert.default.equal(form.errors.length, 1);

        editGrid.addRow();
        setTimeout(function () {
          var editRow = editGrid.editRows[0];
          var dialog = editRow.dialog;
          var saveButton = dialog.querySelector('.btn.btn-primary');
          var clickEvent = new Event('click');
          saveButton.dispatchEvent(clickEvent);
          setTimeout(function () {
            var alert = dialog.querySelector('.alert.alert-danger');

            _powerAssert.default.equal(form.errors.length, 3);

            var errorsLinks = alert.querySelectorAll('li');

            _powerAssert.default.equal(errorsLinks.length, 2);

            var textField = editRow.components[0].getComponent('textField');
            textField.setValue('new value');
            setTimeout(function () {
              var alertAfterFixingField = dialog.querySelector('.alert.alert-danger');

              _powerAssert.default.equal(form.errors.length, 2);

              var errorsLinksAfterFixingField = alertAfterFixingField.querySelectorAll('li');

              _powerAssert.default.equal(errorsLinksAfterFixingField.length, 1);

              document.body.innerHTML = '';
              done();
            }, 450);
          }, 100);
        }, 100);
      }).catch(done);
    });
    it('Confirmation dialog', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_fixtures.comp6).then(function () {
        var component = form.components[0];
        component.addRow();
        var dialog = document.querySelector('[ref="dialogContents"]');

        _harness.default.dispatchEvent('input', dialog, '[name="data[editGrid][0][textField]"]', function (el) {
          return el.value = '12';
        });

        _harness.default.dispatchEvent('click', dialog, '[ref="dialogClose"]');

        var confirmationDialog = document.querySelector('[ref="confirmationDialog"]');
        (0, _powerAssert.default)(confirmationDialog, 'Should open a confirmation dialog when trying to close');

        _harness.default.dispatchEvent('click', confirmationDialog, '[ref="dialogCancelButton"]');

        setTimeout(function () {
          _powerAssert.default.equal(component.editRows[0].data.textField, '12', 'Data should not be cleared');

          _harness.default.dispatchEvent('click', dialog, '[ref="dialogClose"]');

          setTimeout(function () {
            var confirmationDialog2 = document.querySelector('[ref="confirmationDialog"]');
            (0, _powerAssert.default)(confirmationDialog2, 'Should open again a conformation dialog');

            _harness.default.dispatchEvent('click', confirmationDialog2, '[ref="dialogYesButton"]');

            setTimeout(function () {
              _powerAssert.default.equal(component.editRows.length, 0, 'Data should be cleared');

              done();
            }, 250);
          }, 250);
        }, 250);
      }).catch(done);
    });
    it('Confirmation dialog shouldn\'t occure if no values within the row are changed', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_fixtures.comp6).then(function () {
        var component = form.components[0];
        component.setValue([{
          textField: 'v1'
        }]);
        setTimeout(function () {
          component.editRow(0);
          var dialog = document.querySelector('[ref="dialogContents"]');

          _harness.default.dispatchEvent('click', dialog, '[ref="dialogClose"]');

          var confirmationDialog = document.querySelector('[ref="confirmationDialog"]');
          (0, _powerAssert.default)(!confirmationDialog, 'Shouldn\'t open a confirmation dialog when no values were changed');

          _powerAssert.default.equal(component.editRows[0].data.textField, 'v1', 'Data shouldn\'t be changed');

          done();
        }, 150);
      }).catch(done);
    });
    it('Should close row when Display as Modal checked', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_fixtures.comp14).then(function () {
        var editGrid = form.components[0];
        editGrid.addRow();
        setTimeout(function () {
          var dialog = document.querySelector('[ref="dialogContents"]');

          _harness.default.dispatchEvent('input', dialog, '[name="data[editGrid][0][firstName]"]', function (el) {
            return el.value = 'Michael';
          });

          _harness.default.dispatchEvent('click', dialog, '[ref="dialogClose"]');

          var confirmationDialog = document.querySelector('[ref="confirmationDialog"]');

          _harness.default.dispatchEvent('click', confirmationDialog, '[ref="dialogYesButton"]');

          setTimeout(function () {
            _powerAssert.default.equal(!!document.querySelector('[ref="dialogContents"]'), false);

            done();
          }, 100);
        }, 100);
      }).catch(done);
    });
  });
  describe('Draft Rows', function () {
    it('Check saving rows as draft', function (done) {
      _harness.default.testCreate(_EditGrid.default, _fixtures.comp5).then(function (component) {
        component.addRow();

        _harness.default.clickElement(component, '[ref="editgrid-editGrid1-saveRow"]');

        _powerAssert.default.deepEqual(component.dataValue, [{
          textField: ''
        }]);

        var isInvalid = !component.checkValidity(component.dataValue, true);
        (0, _powerAssert.default)(isInvalid, 'Item should not be valid');
        (0, _powerAssert.default)(component.editRows[0].state === 'draft', 'Row should be saved as draft if it has errors');
        done();
      }).catch(done);
    });
    it('Should not show row errors alerts if drafts enabled in modal-edit EditGrid', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      _modalEditGrid.default.components[0].rowDrafts = true;
      form.setForm(_modalEditGrid.default).then(function () {
        var editGrid = form.components[0];
        editGrid.addRow();
        setTimeout(function () {
          editGrid.saveRow(0);
          setTimeout(function () {
            editGrid.editRow(0).then(function () {
              var textField = form.getComponent(['editGrid', 0, 'form', 'textField']);
              textField.setValue('someValue');
              setTimeout(function () {
                _harness.default.dispatchEvent('click', editGrid.editRows[0].dialog, ".editgrid-row-modal-".concat(editGrid.id, " [ref=\"dialogClose\"]"));

                setTimeout(function () {
                  var dialog = editGrid.editRows[0].confirmationDialog;

                  _harness.default.dispatchEvent('click', dialog, '[ref="dialogYesButton"]');

                  setTimeout(function () {
                    editGrid.editRow(0).then(function () {
                      textField.setValue('someValue');
                      setTimeout(function () {
                        var errorAlert = editGrid.editRows[0].dialog.querySelector("#error-list-".concat(editGrid.id));
                        var hasError = textField.className.includes('has-error');
                        (0, _powerAssert.default)(!hasError, 'Should stay valid until form is submitted');

                        _powerAssert.default.equal(errorAlert, null, 'Should be valid');

                        done();
                      }, 100);
                    });
                  }, 100);
                }, 100);
              }, 100);
            });
          }, 100);
        }, 100);
      }).catch(done).finally(function () {
        _modalEditGrid.default.components[0].rowDrafts = false;
      });
    });
    it('Should keep fields valid inside NestedForms if drafts are enabled', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      _modalEditGrid.default.components[0].rowDrafts = true;
      form.setForm(_modalEditGrid.default).then(function () {
        var editGrid = form.components[0];
        form.checkValidity(form._data, true, form._data);

        _powerAssert.default.equal(form.errors.length, 1, 'Should have an error saying that EditGrid is required'); // 1. Add a row


        editGrid.addRow();
        setTimeout(function () {
          var editRow = editGrid.editRows[0];
          var dialog = editRow.dialog; // 2. Save the row

          _harness.default.dispatchEvent('click', dialog, '.btn.btn-primary');

          setTimeout(function () {
            var alert = dialog.querySelector('.alert.alert-danger');

            _powerAssert.default.equal(form.errors.length, 0, 'Should not add new errors when drafts are enabled');

            (0, _powerAssert.default)(!alert, 'Should not show an error alert when drafts are enabled and form is not submitted');
            var textField = editRow.components[0].getComponent('textField'); // 3. Edit the row

            editGrid.editRow(0);
            setTimeout(function () {
              // 4. Change the value of the text field
              textField.setValue('new value', {
                modified: true
              });
              setTimeout(function () {
                _powerAssert.default.equal(textField.dataValue, 'new value'); // 5. Clear the value of the text field


                textField.setValue('', {
                  modified: true
                });
                setTimeout(function () {
                  _powerAssert.default.equal(textField.dataValue, '');

                  _powerAssert.default.equal(editGrid.editRows[0].errors.length, 0, 'Should not add error to components inside draft row');

                  var textFieldComponent = textField.element;
                  (0, _powerAssert.default)(textFieldComponent.className.includes('has-error'), 'Should add error class to component even when drafts enabled if the component is not pristine');
                  document.innerHTML = '';
                  done();
                }, 300);
              }, 300);
            }, 150);
          }, 100);
        }, 100);
      }).catch(done).finally(function () {
        delete _modalEditGrid.default.components[0].rowDrafts;
      });
    });
    it('Should keep fields valid inside NestedForms if drafts are enabled', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      _modalEditGrid.default.components[0].rowDrafts = true;
      form.setForm(_modalEditGrid.default).then(function () {
        var editGrid = form.components[0]; // 1. Add a row

        editGrid.addRow();
        setTimeout(function () {
          var editRow = editGrid.editRows[0];
          var dialog = editRow.dialog; // 2. Save the row

          _harness.default.dispatchEvent('click', dialog, '.btn.btn-primary');

          setTimeout(function () {
            // 3. Submit the form
            _harness.default.dispatchEvent('click', form.element, '[name="data[submit]"]');

            setTimeout(function () {
              _powerAssert.default.equal(editGrid.errors.length, 3, 'Should be validated after an attempt to submit');

              _powerAssert.default.equal(editGrid.editRows[0].errors.length, 2, 'Should dd errors to the row after an attempt to submit');

              var rows = editGrid.element.querySelectorAll('[ref="editgrid-editGrid-row"]');
              var firstRow = rows[0];

              _harness.default.dispatchEvent('click', firstRow, '.editRow');

              setTimeout(function () {
                (0, _powerAssert.default)(form.submitted, 'Form should be submitted');
                var editRow = editGrid.editRows[0];
                (0, _powerAssert.default)(editRow.alerts, 'Should add an error alert to the modal');

                _powerAssert.default.equal(editRow.errors.length, 2, 'Should add errors to components inside draft row aftre it was submitted');

                var textField = editRow.components[0].getComponent('textField');
                var alert = editGrid.alert;
                (0, _powerAssert.default)(alert, 'Should show an error alert when drafts are enabled and form is submitted');
                (0, _powerAssert.default)(textField.element.className.includes('has-error'), 'Should add error class to component even when drafts enabled if the form was submitted'); // 4. Change the value of the text field

                textField.setValue('new value', {
                  modified: true
                });
                setTimeout(function () {
                  var textFieldEl = textField.element;

                  _powerAssert.default.equal(textField.dataValue, 'new value');

                  (0, _powerAssert.default)(!textFieldEl.className.includes('has-error'), 'Should remove an error class from component when it was fixed');
                  var editRow = editGrid.editRows[0];
                  var textField2 = editRow.components[0].getComponent('textField2');
                  textField2.setValue('test val', {
                    modified: true
                  });
                  setTimeout(function () {
                    _powerAssert.default.equal(textField2.dataValue, 'test val');

                    (0, _powerAssert.default)(!textField2.element.className.includes('has-error'), 'Should remove an error class from component when it was fixed');
                    editGrid.saveRow(0);
                    setTimeout(function () {
                      (0, _powerAssert.default)(!form.alert, 'Should remove an error alert after all the rows were fixed');
                      var rows = editGrid.element.querySelectorAll('[ref="editgrid-editGrid-row"]');
                      var firstRow = rows[0];

                      _harness.default.dispatchEvent('click', firstRow, '.editRow');

                      setTimeout(function () {
                        var editRow = editGrid.editRows[0];
                        var textField2 = editRow.components[0].getComponent('textField2');

                        _harness.default.dispatchEvent('input', editRow.dialog, '[name="data[textField2]"', function (i) {
                          return i.value = '';
                        });

                        setTimeout(function () {
                          _powerAssert.default.equal(textField2.dataValue, '');

                          _harness.default.dispatchEvent('click', editGrid.editRows[0].dialog, ".editgrid-row-modal-".concat(editGrid.id, " [ref=\"dialogClose\"]"));

                          setTimeout(function () {
                            var dialog = editGrid.editRows[0].confirmationDialog;

                            _harness.default.dispatchEvent('click', dialog, '[ref="dialogYesButton"]');

                            setTimeout(function () {
                              (0, _powerAssert.default)(!document.querySelector("#error-list-".concat(form.id)), 'Should not add an error alert when the changes that made the row invalid, were discarded by Cancel');
                              document.innerHTML = '';
                              done();
                            }, 100);
                          }, 100);
                        }, 200);
                      }, 300);
                    }, 300);
                  }, 300);
                }, 300);
              }, 450);
            }, 250);
          }, 100);
        }, 100);
      }).catch(done).finally(function () {
        delete _modalEditGrid.default.components[0].rowDrafts;
      });
    }); // it('', (done) => {
    //   const formElement = document.createElement('div');
    //   const form = new Webform(formElement);
    //   form.setForm(ModalEditGrid).then(() => {
    //
    //   }).catch(done);
    // });
  });
  it('Test simple conditions based on the EditGrid\'s child\'s value and default values when adding rows', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm({
      display: 'form',
      components: [_fixtures.comp7],
      type: 'form'
    }).then(function () {
      var component = form.getComponent(['editGrid']);
      component.addRow();
      setTimeout(function () {
        _harness.default.getInputValue(component, 'data[editGrid][0][checkbox]', true, 'checked');

        _harness.default.testComponentVisibility(component, '.formio-component-editGridChild', true);

        _harness.default.testComponentVisibility(component, '.formio-component-panelChild', true);

        done();
      }, 250);
    }).catch(done);
  });
  it('Test clearOnHide inside EditGrid', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm({
      display: 'form',
      components: [_fixtures.comp7],
      type: 'form'
    }).then(function () {
      form.submission = {
        data: {
          editGrid: [{
            checkbox: true,
            editGridChild: 'Has Value',
            panelChild: 'Has Value Too'
          }]
        }
      };
      setTimeout(function () {
        var editGrid = form.getComponent(['editGrid']);
        editGrid.editRow(0).then(function () {
          _harness.default.dispatchEvent('click', editGrid.element, '[name="data[editGrid][0][checkbox]"]', function (el) {
            return el.checked = false;
          });

          setTimeout(function () {
            _harness.default.testComponentVisibility(editGrid, '.formio-component-editGridChild', false);

            _harness.default.testComponentVisibility(editGrid, '.formio-component-panelChild', false);

            editGrid.saveRow(0, true);
            setTimeout(function () {
              (0, _powerAssert.default)(!form.data.editGrid[0].editGridChild, 'Should be cleared');
              (0, _powerAssert.default)(!form.data.editGrid[0].panelChild, 'Should be cleared');
              done();
            }, 150);
          }, 150);
        }, 150);
      });
    }).catch(done);
  });
  it('Test refreshing inside EditGrid', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm({
      display: 'form',
      components: [_fixtures.comp8],
      type: 'form'
    }).then(function () {
      var editGrid = form.getComponent(['editGrid1']);
      editGrid.addRow();
      var makeSelect = form.getComponent(['editGrid1', 0, 'make']);
      var modelSelect = form.getComponent(['editGrid1', 0, 'model']);
      makeSelect.setValue('ford');
      setTimeout(function () {
        modelSelect.setValue('Focus');
        setTimeout(function () {
          editGrid.saveRow(0, true);
          setTimeout(function () {
            _powerAssert.default.equal(form.data.editGrid1[0].model, 'Focus', 'Should be saved properly');

            done();
          }, 150);
        }, 100);
      }, 150);
    }).catch(done);
  });
  it('Should display summary with values only for components that are visible at least in one row', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_fixtures.comp9).then(function () {
      var editGrid = form.getComponent('editGrid');

      var checkRows = function checkRows(columnsNumber, rowsNumber) {
        var rowWithColumns = editGrid.element.querySelector('.row');
        var rowsWithValues = editGrid.element.querySelectorAll('[ref="editgrid-editGrid-row"]');

        _powerAssert.default.equal(rowWithColumns.children.length, columnsNumber, 'Row should contain values only for visible components');

        _powerAssert.default.equal(rowsWithValues.length, rowsNumber, 'Should have corrent number of rows');
      };

      checkRows(2, 0);
      form.setValue({
        data: {
          editGrid: [{
            textField: 'test1',
            checkbox: false
          }, {
            textField: 'test2',
            checkbox: false
          }]
        }
      });
      setTimeout(function () {
        checkRows(2, 2);
        form.setValue({
          data: {
            editGrid: [{
              textField: 'test1',
              checkbox: false
            }, {
              textField: 'test2',
              checkbox: true
            }]
          }
        });
        setTimeout(function () {
          checkRows(3, 2);
          form.setValue({
            data: {
              editGrid: [{
                textField: 'test1',
                checkbox: false
              }, {
                textField: 'test2',
                checkbox: true,
                textArea: 'test22'
              }, {
                textField: 'show',
                checkbox: true,
                container: {
                  number1: 1111
                },
                textArea: 'test3'
              }]
            }
          });
          setTimeout(function () {
            checkRows(4, 3);
            form.setValue({
              data: {
                editGrid: [{
                  textField: 'test1',
                  checkbox: false
                }, {
                  textField: 'test2',
                  checkbox: false
                }, {
                  textField: 'show',
                  checkbox: false,
                  container: {
                    number1: 1111
                  }
                }]
              }
            });
            setTimeout(function () {
              checkRows(3, 3);
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });
  it('Should add component to the header only if it is visible in saved row', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_fixtures.comp9).then(function () {
      var editGrid = form.getComponent('editGrid');

      var checkHeader = function checkHeader(componentsNumber) {
        var header = editGrid.element.querySelector('.list-group-header').querySelector('.row');

        _powerAssert.default.equal(editGrid.visibleInHeader.length, componentsNumber);

        _powerAssert.default.equal(header.children.length, componentsNumber);
      };

      var clickElem = function clickElem(elem) {
        var clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      var clickAddRow = function clickAddRow() {
        var addAnotherBtn = editGrid.refs['editgrid-editGrid-addRow'][0];
        clickElem(addAnotherBtn);
      };

      checkHeader(2);
      clickAddRow();
      setTimeout(function () {
        _powerAssert.default.equal(editGrid.editRows.length, 1);

        checkHeader(2);
        var checkbox = editGrid.getComponent('checkbox')[0];
        checkbox.setValue(true);
        setTimeout(function () {
          checkHeader(2);

          _powerAssert.default.equal(editGrid.getComponent('textArea')[0].visible, true);

          clickAddRow();
          setTimeout(function () {
            _powerAssert.default.equal(editGrid.editRows.length, 2);

            checkHeader(2);
            var saveFirstRowBtn = editGrid.refs['editgrid-editGrid-saveRow'][0];
            clickElem(saveFirstRowBtn);
            setTimeout(function () {
              _powerAssert.default.equal(editGrid.editRows[0].state, 'saved');

              checkHeader(3);
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  }).timeout(3000);
  it('Should add/save/cancel/delete/edit rows', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp10);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var editGrid = form.getComponent('editGrid');

      var click = function click(btn, index, selector) {
        var elem;

        if (selector) {
          elem = editGrid.element.querySelectorAll(".".concat(btn))[index];
        } else {
          elem = editGrid.refs["editgrid-editGrid-".concat(btn)][index];
        }

        var clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-row'].length, 0, 'Should not have rows');

      _powerAssert.default.equal(editGrid.editRows.length, 0, 'Should not have rows');

      click('addRow', 0);
      setTimeout(function () {
        _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');

        _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should have 1 row');

        _powerAssert.default.equal(editGrid.editRows[0].state, 'new', 'Should have state "new"');

        editGrid.editRows[0].components.forEach(function (comp) {
          comp.setValue(11111);
        });
        setTimeout(function () {
          _powerAssert.default.deepEqual(editGrid.editRows[0].data, {
            number: 11111,
            textField: '11111'
          }, 'Should set row data');

          click('saveRow', 0);
          setTimeout(function () {
            _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');

            _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should have 1 row');

            _powerAssert.default.equal(editGrid.editRows[0].state, 'saved', 'Should have state "saved"');

            _powerAssert.default.deepEqual(editGrid.editRows[0].data, {
              number: 11111,
              textField: '11111'
            }, 'Should set row data');

            click('editRow', 0, true);
            setTimeout(function () {
              _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');

              _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should have 1 row');

              _powerAssert.default.equal(editGrid.editRows[0].state, 'editing', 'Should have state "editing"');

              editGrid.editRows[0].components.forEach(function (comp) {
                comp.setValue(22222);
              });
              setTimeout(function () {
                _powerAssert.default.deepEqual(editGrid.editRows[0].data, {
                  number: 22222,
                  textField: '22222'
                }, 'Should set row data');

                click('cancelRow', 0);
                setTimeout(function () {
                  _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');

                  _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should have 1 row');

                  _powerAssert.default.equal(editGrid.editRows[0].state, 'saved', 'Should have state "saved"');

                  _powerAssert.default.deepEqual(editGrid.editRows[0].data, {
                    number: 11111,
                    textField: '11111'
                  }, 'Should cancel changed data');

                  click('removeRow', 0, true);
                  setTimeout(function () {
                    _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-row'].length, 0, 'Should not have rows');

                    _powerAssert.default.equal(editGrid.editRows.length, 0, 'Should have 0 rows');

                    document.innerHTML = '';
                    done();
                  }, 200);
                }, 200);
              }, 200);
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  }).timeout(3000);
  it('Should open first row when empty and allow saving openned row', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp10);

    var element = document.createElement('div');
    form.components[0].openWhenEmpty = true;

    _Formio.default.createForm(element, form).then(function (form) {
      var editGrid = form.getComponent('editGrid');

      var click = function click(btn, index, selector) {
        var elem;

        if (selector) {
          elem = editGrid.element.querySelectorAll(".".concat(btn))[index];
        } else {
          elem = editGrid.refs["editgrid-editGrid-".concat(btn)][index];
        }

        var clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');

      _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should have 1 row');

      _powerAssert.default.equal(editGrid.editRows[0].state, 'new', 'Should have state "new"');

      click('saveRow', 0);
      setTimeout(function () {
        _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-row'].length, 1, 'Should have 1 row');

        _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should have 1 row');

        _powerAssert.default.equal(editGrid.editRows[0].state, 'saved', 'Should have state "saved"');

        document.innerHTML = '';
        done();
      }, 200);
    }).catch(done);
  }).timeout(3000);
  it('Should disable adding/removing rows', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp10);

    var element = document.createElement('div');
    form.components[0].disableAddingRemovingRows = true;
    var value = [{
      number: 1,
      textField: 'test'
    }, {
      number: 2,
      textField: 'test2'
    }];

    _Formio.default.createForm(element, form).then(function (form) {
      var editGrid = form.getComponent('editGrid');
      editGrid.setValue(value);
      setTimeout(function () {
        _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-row'].length, 2, 'Should have 2 rows');

        _powerAssert.default.equal(editGrid.editRows.length, 2, 'Should have 2 rows');

        _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-addRow'].length, 0, 'Should not have add row btn');

        _powerAssert.default.equal(editGrid.element.querySelectorAll('.removeRow').length, 0, 'Should not have remove row btn');

        document.innerHTML = '';
        done();
      }, 200);
    }).catch(done);
  });
  it('Should show conditional eddRow btn if condition is met', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp10);

    var element = document.createElement('div');
    form.components[0].conditionalAddButton = 'show = data.number11 === 5';
    form.components.unshift({
      label: 'Number',
      mask: false,
      spellcheck: true,
      tableView: false,
      delimiter: false,
      requireDecimal: false,
      inputFormat: 'plain',
      key: 'number11',
      type: 'number',
      input: true
    });

    _Formio.default.createForm(element, form).then(function (form) {
      var editGrid = form.getComponent('editGrid');

      _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-addRow'].length, 0, 'Should not have add row btn');

      var numberComp = form.getComponent('number11');
      var inputEvent = new Event('input');
      var numberInput = numberComp.refs.input[0];
      numberInput.value = 5;
      numberInput.dispatchEvent(inputEvent);
      setTimeout(function () {
        _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-addRow'].length, 1, 'Should have add row btn');

        document.innerHTML = '';
        done();
      }, 400);
    }).catch(done);
  });
  it('Should use custom text for save/cancel/add btns', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp10);

    var element = document.createElement('div');
    form.components[0].addAnother = 'add custom';
    form.components[0].saveRow = 'save custom';
    form.components[0].removeRow = 'cancel custom';

    _Formio.default.createForm(element, form).then(function (form) {
      var editGrid = form.getComponent('editGrid');

      _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-addRow'][0].textContent.trim(), 'add custom');

      var clickEvent = new Event('click');
      editGrid.refs['editgrid-editGrid-addRow'][0].dispatchEvent(clickEvent);
      setTimeout(function () {
        _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-saveRow'][0].textContent.trim(), 'save custom');

        _powerAssert.default.equal(editGrid.refs['editgrid-editGrid-cancelRow'][0].textContent.trim(), 'cancel custom');

        document.innerHTML = '';
        done();
      }, 400);
    }).catch(done);
  });
  it('Should render headers when openWhenEmpry is enabled', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp11);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var editGrid = form.getComponent('editGrid');
      var rowComponents = editGrid.component.components;
      var headerEls = editGrid.element.querySelector('.list-group-header').firstElementChild.children;

      _powerAssert.default.equal(headerEls.length, rowComponents.length);

      for (var index = 0; index < headerEls.length; index++) {
        var el = headerEls[index];

        _powerAssert.default.equal(el.textContent.trim(), rowComponents[index].label, "Should render ".concat(rowComponents[index].key, " component label in header"));
      }

      done();
    }).catch(done);
  });
  it('Should show validation when saving a row with required conditional filed inside container', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp12);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var editGrid = form.getComponent('editGrid');
      var clickEvent = new Event('click');
      editGrid.refs['editgrid-editGrid-addRow'][0].dispatchEvent(clickEvent);
      setTimeout(function () {
        var firstRowContainer = editGrid.components[0];
        var firstRowNumber = firstRowContainer.components[0];
        var firstRowTextField = firstRowContainer.components[1];

        _powerAssert.default.equal(firstRowTextField.visible, false);

        var inputEvent = new Event('input');
        var numberInput = firstRowNumber.refs.input[0];
        numberInput.value = 5;
        numberInput.dispatchEvent(inputEvent);
        setTimeout(function () {
          _powerAssert.default.equal(firstRowTextField.visible, true);

          editGrid.refs['editgrid-editGrid-saveRow'][0].dispatchEvent(clickEvent);
          setTimeout(function () {
            _powerAssert.default.equal(!!firstRowTextField.error, true);

            _powerAssert.default.equal(editGrid.editRows[0].errors.length, 1);

            _powerAssert.default.equal(editGrid.editRows[0].state, 'new');

            document.innerHTML = '';
            done();
          }, 200);
        }, 250);
      }, 300);
    }).catch(done);
  });
  it('Should render form with a submission in a draft-state without validation errors', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp13);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      form.submission = {
        data: {
          'container': {
            'textField': ''
          },
          'editGrid': []
        }
      };
      setTimeout(function () {
        var editGrid = form.getComponent(['editGrid']);

        _powerAssert.default.equal(editGrid.errors.length, 0);

        done();
      }, 100);
    }).catch(done);
  });
});
describe('EditGrid Open when Empty', function () {
  it('Should be opened when shown conditionally', function (done) {
    var formElement = document.createElement('div');

    _Formio.default.createForm(formElement, _fixtures.withOpenWhenEmptyAndConditions).then(function (form) {
      var radio = form.getComponent(['radio']);
      radio.setValue('show');
      setTimeout(function () {
        var editGrid = form.getComponent(['editGrid']);

        _powerAssert.default.equal(editGrid.visible, true, 'Should be visible');

        _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should have 1 row');

        var textField = editGrid.editRows[0].components[0];

        _harness.default.dispatchEvent('input', textField.element, '[name="data[editGrid][0][textField]"]', function (input) {
          return input.value = 'Value';
        });

        setTimeout(function () {
          var row = editGrid.editRows[0];

          _powerAssert.default.equal(row.data.textField, 'Value', 'Value should be set properly');

          editGrid.saveRow(0);
          setTimeout(function () {
            _powerAssert.default.deepEqual(form.data.editGrid, [{
              textField: 'Value',
              select1: ''
            }], 'Value should be saved correctly');

            radio.setValue('hide');
            setTimeout(function () {
              _powerAssert.default.equal(editGrid.visible, false, 'Should be hidden');

              radio.setValue('show');
              setTimeout(function () {
                _powerAssert.default.equal(editGrid.visible, true, 'Should be visible');

                _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should have 1 row');

                _powerAssert.default.equal(editGrid.editRows[0].state, 'new', 'Row should be a new one');

                done();
              }, 300);
            }, 300);
          }, 250);
        }, 350);
      }, 300);
    }).catch(done);
  });
  it('Should create new row with empty data and no defaults', function (done) {
    var formElement = document.createElement('div');

    _Formio.default.createForm(formElement, _fixtures.compOpenWhenEmpty, {
      noDefaults: true
    }).then(function (form) {
      form.data = {};
      setTimeout(function () {
        var editGrid = form.getComponent(['editGrid']);

        _powerAssert.default.equal(editGrid.editRows.length, 1);

        _powerAssert.default.equal(editGrid.editRows[0].state, 'new');

        done();
      }, 300);
    }).catch(done);
  });
  it('Should always add a first row', function (done) {
    var formElement = document.createElement('div');

    _Formio.default.createForm(formElement, _fixtures.compOpenWhenEmpty).then(function (form) {
      var editGrid = form.getComponent(['editGrid']);

      _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should have 1 row on create');

      var textField = editGrid.editRows[0].components[0];

      _harness.default.dispatchEvent('input', textField.element, '[name="data[editGrid][0][textField]"]', function (input) {
        return input.value = 'Value';
      });

      setTimeout(function () {
        var row = editGrid.editRows[0];

        _powerAssert.default.equal(row.data.textField, 'Value', 'Value should be set properly');

        setTimeout(function () {
          editGrid.cancelRow(0);
          setTimeout(function () {
            _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should still have 1 row');

            var textField = editGrid.editRows[0].components[0];

            _powerAssert.default.equal(textField.dataValue, '', 'Value should be cleared after cancelling the row');

            editGrid.saveRow(0);
            setTimeout(function () {
              _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should have 1 row');

              _powerAssert.default.equal(editGrid.editRows[0].state === 'saved', 1, 'Row should be saved');

              editGrid.removeRow(0);
              setTimeout(function () {
                _powerAssert.default.equal(editGrid.editRows.length, 1, 'Should add the first row when delete the last one');

                _powerAssert.default.equal(editGrid.editRows[0].state === 'new', 1, 'Should add the new row when the last one was deleted');

                done();
              }, 250);
            }, 250);
          }, 250);
        }, 250);
      }, 250);
    }).catch(done);
  });
});
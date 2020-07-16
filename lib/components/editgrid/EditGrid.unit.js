"use strict";

require("core-js/modules/es.array.every");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.trim");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _EditGrid = _interopRequireDefault(require("./EditGrid"));

var _fixtures = require("./fixtures");

var _modalEditGrid = _interopRequireDefault(require("../../../test/forms/modalEditGrid"));

var _Webform = _interopRequireDefault(require("../../Webform"));

var _formtest = require("../../../test/formtest");

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

        _powerAssert.default.equal(firstValue, '[Complex Data]');

        _powerAssert.default.equal(secondValue, '[Complex Data]');

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
    it('Should set alert with validation errors on save', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_modalEditGrid.default).then(function () {
        var editGrid = form.components[0];
        form.checkValidity(form._data, true, form._data);

        _powerAssert.default.equal(form.errors.length, 1);

        editGrid.addRow();
        setTimeout(function () {
          var dialog = document.querySelector('[ref="dialogContents"]');
          var saveButton = dialog.querySelector('.btn.btn-primary');
          var clickEvent = new Event('click');
          saveButton.dispatchEvent(clickEvent);
          setTimeout(function () {
            var alert = dialog.querySelector('.alert.alert-danger');

            _powerAssert.default.equal(form.errors.length, 3);

            var errorsLinks = alert.querySelectorAll('li');

            _powerAssert.default.equal(errorsLinks.length, 2);

            document.body.innerHTML = '';
            done();
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
            (0, _powerAssert.default)(confirmationDialog2, 'Should open again a conformation dialog'); // eslint-disable-next-line no-debugger

            debugger;

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
    }); // it('', (done) => {
    //   const formElement = document.createElement('div');
    //   const form = new Webform(formElement);
    //   form.setForm(ModalEditGrid).then(() => {
    //
    //   }).catch(done);
    // });
  }); // TODO: Need to fix editing rows and conditionals.
  // it('Should calculate conditional logic and default values when adding row', () => {
  //   return Harness.testCreate(EditGridComponent, comp2).then(component => {
  //     Harness.clickElement(component, component.refs[`${component.editgridKey}-addRow`][0]);
  //     Harness.testVisibility(component, '.formio-component-field2', false);
  //     Harness.getInputValue(component, 'data[editgrid][0][field1]', 'bar');
  //   });
  // });
});
'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _EditGrid = require('./EditGrid');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('EditGrid Component', function () {
  it('Should build an empty edit grid component', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(1)', "Field 1");
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(2)', "Field 2");
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "0");
      _harness.Harness.testElements(component, 'li.list-group-header', 1);
      _harness.Harness.testElements(component, 'li.list-group-item', 1);
      _harness.Harness.testElements(component, 'li.list-group-footer', 0);
      _harness.Harness.testElements(component, 'div.editRow', 0);
      _harness.Harness.testElements(component, 'div.removeRow', 0);
      _harness.Harness.testElements(component, 'div.editgrid-add button', 1);
      (0, _powerAssert2.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should build an edit grid component', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(1)', "Field 1");
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(2)', "Field 2");
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "0");
      _harness.Harness.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);
      _harness.Harness.testElements(component, 'li.list-group-header', 1);
      _harness.Harness.testElements(component, 'li.list-group-item', 3);
      _harness.Harness.testElements(component, 'li.list-group-footer', 0);
      _harness.Harness.testElements(component, 'div.editRow', 2);
      _harness.Harness.testElements(component, 'div.removeRow', 2);
      _harness.Harness.testElements(component, 'div.editgrid-add button', 1);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', "good");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', "foo");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', "good");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', "bar");
      (0, _powerAssert2.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should add a row when add another is clicked', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'li.list-group-item', 1);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "0");
      _harness.Harness.clickElement(component, 'div.editgrid-add button');
      _harness.Harness.testElements(component, 'li.list-group-item', 2);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "0");
      _harness.Harness.clickElement(component, 'div.editgrid-add button');
      _harness.Harness.testElements(component, 'li.list-group-item', 3);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "0");
      (0, _powerAssert2.default)(!component.checkValidity(component.getValue()), 'Item should not be valid');
      done();
    });
  });

  it('Should save a new row when save is clicked', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);
      _harness.Harness.testElements(component, 'li.list-group-item', 3);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _harness.Harness.clickElement(component, 'div.editgrid-add button');
      _harness.Harness.testElements(component, 'li.list-group-item', 4);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _harness.Harness.setInputValue(component, 'data[editgrid][2][field1]', 'good');
      _harness.Harness.setInputValue(component, 'data[editgrid][2][field2]', 'baz');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      _harness.Harness.testElements(component, 'li.list-group-item', 4);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "3");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.row div:nth-child(1)', "good");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.row div:nth-child(2)', "baz");
      (0, _powerAssert2.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should cancel add a row when cancel is clicked', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);
      _harness.Harness.testElements(component, 'li.list-group-item', 3);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _harness.Harness.clickElement(component, 'div.editgrid-add button');
      _harness.Harness.testElements(component, 'li.list-group-item', 4);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _harness.Harness.setInputValue(component, 'data[editgrid][2][field1]', 'good');
      _harness.Harness.setInputValue(component, 'data[editgrid][2][field2]', 'baz');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-danger');
      _harness.Harness.testElements(component, 'li.list-group-item', 3);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _powerAssert2.default.equal(component.editRows.length, 2);
      (0, _powerAssert2.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should delete a row when delete is clicked', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }, {
        field1: 'good',
        field2: 'baz'
      }]);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "3");
      _harness.Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.removeRow');
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', "good");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', "foo");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', "good");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', "baz");
      (0, _powerAssert2.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should edit a row when edit is clicked', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);
      _harness.Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      _harness.Harness.getInputValue(component, 'data[editgrid][1][field1]', 'good');
      _harness.Harness.getInputValue(component, 'data[editgrid][1][field2]', 'bar');
      _harness.Harness.testElements(component, 'div.editgrid-actions div.btn-primary', 1);
      _harness.Harness.testElements(component, 'div.editgrid-actions div.btn-danger', 1);
      (0, _powerAssert2.default)(!component.checkValidity(component.getValue()), 'Item should not be valid');
      done();
    });
  });

  it('Should save a row when save is clicked', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);
      _harness.Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      _harness.Harness.setInputValue(component, 'data[editgrid][1][field2]', 'baz');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      _harness.Harness.testElements(component, 'li.list-group-item', 3);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', "good");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', "baz");
      (0, _powerAssert2.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should cancel edit row when cancel is clicked', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);
      _harness.Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      _harness.Harness.setInputValue(component, 'data[editgrid][1][field2]', 'baz');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-danger');
      _harness.Harness.testElements(component, 'li.list-group-item', 3);
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', "good");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', "bar");
      (0, _powerAssert2.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should show error messages for existing data in rows', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, [{
        field1: 'bad',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }, {
        field1: 'also bad',
        field2: 'baz'
      }]);
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.has-error div.editgrid-row-error', 'Must be good');
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.has-error div.editgrid-row-error', 'Must be good');
      (0, _powerAssert2.default)(!component.checkValidity(component.getValue()), 'Item should not be valid');
      done();
    });
  });

  it('Should not allow saving when errors exist', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.clickElement(component, 'div.editgrid-add button');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      _harness.Harness.getInputValue(component, 'data[editgrid][0][field1]', '');
      _harness.Harness.getInputValue(component, 'data[editgrid][0][field2]', '');
      (0, _powerAssert2.default)(!component.checkValidity(component.getValue()), 'Item should not be valid');
      _harness.Harness.setInputValue(component, 'data[editgrid][0][field2]', 'baz');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      _harness.Harness.getInputValue(component, 'data[editgrid][0][field1]', '');
      _harness.Harness.getInputValue(component, 'data[editgrid][0][field2]', 'baz');
      (0, _powerAssert2.default)(!component.checkValidity(component.getValue()), 'Item should not be valid');
      _harness.Harness.setInputValue(component, 'data[editgrid][0][field1]', 'bad');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      _harness.Harness.getInputValue(component, 'data[editgrid][0][field1]', 'bad');
      _harness.Harness.getInputValue(component, 'data[editgrid][0][field2]', 'baz');
      (0, _powerAssert2.default)(!component.checkValidity(component.getValue()), 'Item should not be valid');
      _harness.Harness.setInputValue(component, 'data[editgrid][0][field1]', 'good');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      (0, _powerAssert2.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "1");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', "good");
      _harness.Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', "baz");
      done();
    });
  });

  it('Should not allow saving when rows are open', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);
      _harness.Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      (0, _powerAssert2.default)(!component.checkValidity(component.getValue()), 'Item should not be valid');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      (0, _powerAssert2.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      _harness.Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      (0, _powerAssert2.default)(!component.checkValidity(component.getValue()), 'Item should not be valid');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-danger');
      (0, _powerAssert2.default)(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should disable components when in read only', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp1, { readOnly: true }).then(function (component) {
      _harness.Harness.testSetGet(component, [{
        field1: 'good',
        field2: 'foo'
      }, {
        field1: 'good',
        field2: 'bar'
      }]);
      _harness.Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.removeRow');
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _harness.Harness.clickElement(component, 'div.editgrid-add button');
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _harness.Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-danger');
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      _harness.Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      _harness.Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      _harness.Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      done();
    });
  });

  it('Should calculate conditional logic and default values when adding row', function (done) {
    _harness.Harness.testCreate(_EditGrid.EditGridComponent, _index.components.comp2).then(function (component) {
      _harness.Harness.clickElement(component, 'div.editgrid-add button');
      _harness.Harness.testVisibility(component, '.formio-component-field2', false);
      _harness.Harness.getInputValue(component, 'data[editgrid][0][field1]', 'bar');
      done();
    });
  });
});
'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

var _NestedComponent = _interopRequireDefault(require("./NestedComponent"));

var _harness = _interopRequireDefault(require("../../../../test/harness"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _each = _interopRequireDefault(require("lodash/each"));

var _chai = require("chai");

var _fixtures = require("./fixtures");

var _fixtures2 = require("../../../../test/fixtures");

var _map2 = _interopRequireDefault(require("lodash/map"));

var _Webform = _interopRequireDefault(require("../../../Webform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var component = null;
describe('NestedComponent class', function () {
  it('Should create a new NestedComponent class', function () {
    return _harness.default.testCreate(_NestedComponent.default, {
      // key: 'nested',
      components: [{
        type: 'textfield',
        key: 'firstName',
        input: true
      }, {
        type: 'textfield',
        key: 'lastName',
        input: true
      }]
    }).then(function (_component) {
      component = _component;

      _harness.default.testElements(component, 'input[name="data[firstName]"]', 1);

      _harness.default.testElements(component, 'input[name="data[lastName]"]', 1);
    });
  });
  it('Should be able to add new components', function (done) {
    component.addComponent({
      type: 'email',
      key: 'email',
      input: true
    });
    component.redraw();

    _harness.default.testElements(component, 'input[name="data[email]"]', 1);

    done();
  });
  it('Should be able to set data within the components.', function (done) {
    var value = {
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'joe@example.com'
    };
    component.setValue(value);

    _powerAssert.default.deepEqual(component.getValue(), value);

    (0, _each.default)(component.components, function (component) {
      _powerAssert.default.equal(component.getValue(), value[component.key]);
    });
    done();
  });
  it('Should create nested visibility elements.', function () {
    return _harness.default.testCreate(_NestedComponent.default, {
      components: [{
        type: 'checkbox',
        key: 'showPanel',
        label: 'Show Panel',
        input: true
      }, {
        type: 'panel',
        key: 'parent',
        title: 'Parent Panel',
        conditional: {
          json: {
            var: 'data.showPanel'
          }
        },
        components: [{
          type: 'checkbox',
          key: 'showChild',
          label: 'Child 1',
          input: true,
          conditional: {
            json: {
              var: 'data.showChild'
            }
          }
        }, {
          type: 'checkbox',
          key: 'forceParent',
          label: 'Child 2',
          input: true,
          conditional: {
            json: {
              var: 'data.forceParent'
            }
          }
        }]
      }]
    }).then(function (comp) {
      // Make sure we built the components tree.
      _powerAssert.default.equal(comp.components.length, 2);

      _powerAssert.default.equal(comp.components[1].components.length, 2, 'two');

      var data = {
        showPanel: true,
        showChild: false,
        forceParent: false
      };
      comp.setValue(data);
      comp.checkConditions(data);

      _powerAssert.default.equal(comp.components[1]._visible, true);

      _powerAssert.default.equal(comp.components[1].components[0]._visible, false);

      _powerAssert.default.equal(comp.components[1].components[1]._visible, false);

      data.showChild = true;
      comp.setValue(data);
      comp.checkConditions(data);

      _powerAssert.default.equal(comp.components[1]._visible, true);

      _powerAssert.default.equal(comp.components[1].components[0]._visible, true);

      _powerAssert.default.equal(comp.components[1].components[1]._visible, false);

      data.showPanel = false;
      comp.setValue(data);
      comp.checkConditions(data);

      _powerAssert.default.equal(comp.components[1]._visible, false);

      _powerAssert.default.equal(comp.components[1].components[0]._visible, true);

      _powerAssert.default.equal(comp.components[1].components[1]._visible, false); // overrideParent is depricated.


      data.forceParent = true;
      comp.setValue(data);
      comp.checkConditions(data);

      _powerAssert.default.equal(comp.components[1]._visible, false);

      _powerAssert.default.equal(comp.components[1].components[0]._visible, true);

      _powerAssert.default.equal(comp.components[1].components[1]._visible, true);
    });
  });
  describe('set/get visible', function () {
    it('should set/get visible flag on instance and child components', function (done) {
      _harness.default.testCreate(_NestedComponent.default, _fixtures.comp1).then(function (nested) {
        (0, _chai.expect)(nested.visible).to.be.true;
        nested.components.forEach(function (cmp) {
          (0, _chai.expect)(cmp.parentVisible).to.be.true;
        });
        nested.visible = false;
        (0, _chai.expect)(nested.visible).to.be.false;
        nested.components.forEach(function (cmp) {
          (0, _chai.expect)(cmp.parentVisible).to.be.false;
        });
        nested.visible = true;
        nested.components.forEach(function (cmp) {
          (0, _chai.expect)(cmp.parentVisible).to.be.true;
        });
        done();
      }, done).catch(done);
    });
  });
  describe('set/get parentVisible', function () {
    it('should set/get parentVisible flag on instance and child components', function (done) {
      _harness.default.testCreate(_NestedComponent.default, _fixtures.comp1).then(function (nested) {
        (0, _chai.expect)(nested.parentVisible).to.be.true;
        nested.components.forEach(function (cmp) {
          (0, _chai.expect)(cmp.parentVisible).to.be.true;
        });
        nested.parentVisible = false;
        (0, _chai.expect)(nested.parentVisible).to.be.false;
        nested.components.forEach(function (cmp) {
          (0, _chai.expect)(cmp.parentVisible).to.be.false;
        });
        nested.parentVisible = true;
        (0, _chai.expect)(nested.parentVisible).to.be.true;
        nested.components.forEach(function (cmp) {
          (0, _chai.expect)(cmp.parentVisible).to.be.true;
        });
        done();
      }, done).catch(done);
    });
  });
  describe('get schema', function () {
    it('components array shouldn\'t have duplicates', function (done) {
      _harness.default.testCreate(_NestedComponent.default, _fixtures.comp1).then(function (nested) {
        var child = nested.components[0];
        nested.components = [].concat(_toConsumableArray(nested.components), [child, child, child]);
        (0, _chai.expect)(nested.components).to.have.lengthOf(5);
        (0, _chai.expect)(nested.schema.components).to.be.lengthOf(2);
        (0, _chai.expect)((0, _map2.default)(nested.schema.components, 'key')).to.deep.equal(['firstName', 'lastName']);
        done();
      }, done).catch(done);
    });
  });
  describe('calculateComponentPath', function () {
    it('the first layer components', function (done) {
      _harness.default.testCreate(_NestedComponent.default, _fixtures.comp1).then(function (nested) {
        (0, _powerAssert.default)(nested.components[0].path === 'firstName');
        (0, _powerAssert.default)(nested.components[1].path === 'lastName');
        done();
      }).catch(done);
    });
    it('inside data components', function (done) {
      _harness.default.testCreate(_NestedComponent.default, _fixtures.comp2).then(function (nested) {
        (0, _powerAssert.default)(nested.components[0].path === 'dataGrid');
        var dataGrid = nested.components[0];
        dataGrid.setValue([{
          textField: ''
        }, {
          textField: ''
        }]);
        setTimeout(function () {
          (0, _powerAssert.default)(dataGrid.components[0].path === 'dataGrid[0].textField');
          (0, _powerAssert.default)(dataGrid.components[1].path === 'dataGrid[1].textField');
          done();
        }, 250);
      }).catch(done);
    });
    it('inside nested forms', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_fixtures2.nestedForm).then(function () {
        (0, _powerAssert.default)(form.components[0].path === 'form');
        var childForm = form.components[0].subForm;
        var textField = childForm.components[0];
        var dataGrid = childForm.components[1];
        var tabs = childForm.components[2];
        (0, _powerAssert.default)(textField.path === 'form.data.textField');
        (0, _powerAssert.default)(dataGrid.path === 'form.data.dataGrid');
        (0, _powerAssert.default)(dataGrid.components[0].path === 'form.data.dataGrid[0].textField');
        (0, _powerAssert.default)(tabs.path === 'form.data.tabs');
        (0, _powerAssert.default)(tabs.tabs[0][0].path === 'form.data.tabsTextfield');
        done();
      }).catch(done);
    });
  });
  describe('getComponent', function () {
    it('the first layer components', function (done) {
      _harness.default.testCreate(_NestedComponent.default, _fixtures.comp1).then(function (nested) {
        var firstNameTextFieldByStringPath = nested.getComponent('firstName');
        var firstNameTextFieldByArrayPath = nested.getComponent(['firstName']);
        (0, _powerAssert.default)(firstNameTextFieldByStringPath.path === 'firstName');
        (0, _powerAssert.default)(firstNameTextFieldByArrayPath.path === 'firstName');
        done();
      }).catch(done);
    });
    it('inside data components', function (done) {
      _harness.default.testCreate(_NestedComponent.default, _fixtures.comp2).then(function (nested) {
        (0, _powerAssert.default)(nested.components[0].path === 'dataGrid');
        var dataGrid = nested.components[0];
        dataGrid.setValue([{
          textField: ''
        }, {
          textField: ''
        }]);
        setTimeout(function () {
          var dataGridFirstRowTextField = nested.getComponent('dataGrid[0].textField');
          var dataGridSecondRowTextField = nested.getComponent('dataGrid[1].textField');
          (0, _powerAssert.default)(dataGrid.components[0] === dataGridFirstRowTextField);
          (0, _powerAssert.default)(dataGrid.components[1] === dataGridSecondRowTextField);
          done();
        }, 250);
      }).catch(done);
    });
    it('inside nested forms', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_fixtures2.nestedForm).then(function () {
        var childForm = form.components[0].subForm;
        var textField = form.getComponent('form.data.textField');
        var dataGrid = form.getComponent('form.data.dataGrid');
        var dataGridTextField = form.getComponent('form.data.dataGrid[0].textField');
        (0, _powerAssert.default)(textField === childForm.components[0]);
        (0, _powerAssert.default)(dataGrid === childForm.components[1]);
        (0, _powerAssert.default)(dataGridTextField === childForm.components[1].components[0]);
        done();
      }).catch(done);
    });
  });
  describe('render value as String', function () {
    it('Should render a Select\'s value template', function (done) {
      _harness.default.testCreate(_NestedComponent.default, _fixtures.comp3).then(function (nested) {
        var editGrid = nested.components[0];
        editGrid.addRow();
        editGrid.editRows[0].components[0].setValue(2);
        setTimeout(function () {
          editGrid.saveRow(0);
          setTimeout(function () {
            _powerAssert.default.equal(editGrid.dataValue[0].select, 2);

            var rowContent = editGrid.element.querySelector('[ref="editgrid-editGrid-row"] .row .col-sm-2 span');
            (0, _powerAssert.default)(rowContent);

            _powerAssert.default.equal(rowContent.textContent, 'Banana');

            done();
          }, 250);
        }, 250);
      }).catch(done);
    });
  });
});
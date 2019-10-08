'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

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

var _map2 = _interopRequireDefault(require("lodash/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
});
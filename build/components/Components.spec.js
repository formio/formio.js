'use strict';

var _Components = require('./Components');

var _harness = require('../../test/harness');

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FormioComponents class', function () {
  var component = null;
  it('Should create a new FormioComponents class', function (done) {
    _harness.Harness.testCreate(_Components.FormioComponents, {
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
      _harness.Harness.testElements(component, 'input[name="data[firstName]"]', 1);
      _harness.Harness.testElements(component, 'input[name="data[lastName]"]', 1);
      done();
    });
  });

  it('Should be able to add new components', function () {
    component.addComponent({
      type: 'email',
      key: 'email',
      input: true
    });
    _harness.Harness.testElements(component, 'input[name="data[firstName]"]', 1);
  });

  it('Should be able to set data within the components.', function () {
    var value = {
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'joe@example.com'
    };
    component.setValue(value);
    _powerAssert2.default.deepEqual(component.getValue(), value);
    (0, _each2.default)(component.components, function (component) {
      _powerAssert2.default.equal(component.getValue(), value[component.component.key]);
    });
  });

  it('Should create nested visibility elements.', function (done) {
    _harness.Harness.testCreate(_Components.FormioComponents, {
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
          json: { var: 'data.showPanel' }
        },
        components: [{
          type: 'checkbox',
          key: 'showChild',
          label: 'Child 1',
          input: true,
          conditional: {
            json: { var: 'data.showChild' }
          }
        }, {
          type: 'checkbox',
          key: 'forceParent',
          label: 'Child 2',
          input: true,
          conditional: {
            json: { var: 'data.forceParent' },
            overrideParent: true
          }
        }]
      }]
    }).then(function (comp) {
      // Make sure we built the components tree.
      _powerAssert2.default.equal(comp.components.length, 2);
      _powerAssert2.default.equal(comp.components[1].components.length, 2);
      var data = {
        showPanel: true,
        showChild: false,
        forceParent: false
      };

      comp.setValue(data);
      comp.checkConditions(data);
      _powerAssert2.default.equal(comp.components[1]._visible, true);
      _powerAssert2.default.equal(comp.components[1].components[0]._visible, false);
      _powerAssert2.default.equal(comp.components[1].components[1]._visible, false);

      data.showChild = true;
      comp.setValue(data);
      comp.checkConditions(data);
      _powerAssert2.default.equal(comp.components[1]._visible, true);
      _powerAssert2.default.equal(comp.components[1].components[0]._visible, true);
      _powerAssert2.default.equal(comp.components[1].components[1]._visible, false);

      data.showPanel = false;
      comp.setValue(data);
      comp.checkConditions(data);
      _powerAssert2.default.equal(comp.components[1]._visible, false);
      _powerAssert2.default.equal(comp.components[1].components[0]._visible, true);
      _powerAssert2.default.equal(comp.components[1].components[1]._visible, false);

      data.forceParent = true;
      comp.setValue(data);
      comp.checkConditions(data);
      _powerAssert2.default.equal(comp.components[1]._visible, true);
      _powerAssert2.default.equal(comp.components[1].components[0]._visible, true);
      _powerAssert2.default.equal(comp.components[1].components[1]._visible, true);
      done();
    });
  });
});
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
});
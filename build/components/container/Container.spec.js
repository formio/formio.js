'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _Container = require('./Container');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Container Component', function () {
  it('Should build a container component', function (done) {
    _harness.Harness.testCreate(_Container.ContainerComponent, _index.components.comp1).then(function (component) {
      var inputs = _harness.Harness.testElements(component, 'input[type="text"]', 2);
      for (var i = 0; i < inputs.length; i++) {
        _powerAssert2.default.equal(inputs[i].name, 'data[' + _index.components.comp1.key + '][' + _index.components.comp1.components[i].key + ']');
      }
      done();
    });
  });

  it('Should be able to set and get data', function (done) {
    _harness.Harness.testCreate(_Container.ContainerComponent, _index.components.comp1).then(function (component) {
      var inputs = _harness.Harness.testElements(component, 'input[type="text"]', 2);
      _harness.Harness.testSetGet(component, {
        firstName: 'Joe',
        lastName: 'Smith'
      });
      _powerAssert2.default.equal(inputs[0].value, 'Joe');
      _powerAssert2.default.equal(inputs[1].value, 'Smith');
      done();
    });
  });
});
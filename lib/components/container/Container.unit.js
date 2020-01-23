"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.function.name");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Container = _interopRequireDefault(require("./Container"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Container Component', function () {
  it('Should build a container component', function () {
    return _harness.default.testCreate(_Container.default, _fixtures.comp1).then(function (component) {
      var inputs = _harness.default.testElements(component, 'input[type="text"]', 2);

      for (var i = 0; i < inputs.length; i++) {
        _powerAssert.default.equal(inputs[i].name, "data[".concat(_fixtures.comp1.key, "][").concat(_fixtures.comp1.components[i].key, "]"));
      }
    });
  });
  it('Should be able to set and get data', function () {
    return _harness.default.testCreate(_Container.default, _fixtures.comp1).then(function (component) {
      var inputs = _harness.default.testElements(component, 'input[type="text"]', 2);

      _harness.default.testSetGet(component, {
        firstName: 'Joe',
        lastName: 'Smith'
      });

      _powerAssert.default.equal(inputs[0].value, 'Joe');

      _powerAssert.default.equal(inputs[1].value, 'Smith');
    });
  });
});
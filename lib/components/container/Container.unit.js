"use strict";

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.concat.js");

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
  it('Should set the dataValue, but after it sets the value of its nested components', function () {
    return _harness.default.testCreate(_Container.default, _fixtures.comp2).then(function (component) {
      var editGrid = component.getComponent('children');
      var setValue = editGrid.setValue;

      editGrid.setValue = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var changed = setValue.call.apply(setValue, [editGrid].concat(args));
        (0, _powerAssert.default)(changed, 'The edit grid must have changed');
        return changed;
      };

      component.setValue({
        children: [{
          name: 'Joe'
        }, {
          name: 'Sally'
        }]
      });
    });
  });
});
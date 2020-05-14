'use strict';

var _NestedDataComponent = _interopRequireDefault(require("./NestedDataComponent"));

var _harness = _interopRequireDefault(require("../../../../test/harness"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var component = null;
describe('NestedDataComponent class', function () {
  it('Should create a new NestedDataComponent class', function () {
    return _harness.default.testCreate(_NestedDataComponent.default, {
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
});
"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Fieldset = _interopRequireDefault(require("./Fieldset"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Fieldset Component', function () {
  it('Should build a fieldset component', function () {
    return _harness.default.testCreate(_Fieldset.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 2);
    });
  });
});
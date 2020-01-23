"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _PhoneNumber = _interopRequireDefault(require("./PhoneNumber"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PhoneNumber Component', function () {
  it('Should build a phone number component', function () {
    return _harness.default.testCreate(_PhoneNumber.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 1);
    });
  });
});
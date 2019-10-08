"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Signature = _interopRequireDefault(require("./Signature"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Signature Component', function () {
  it('Should build a Signature component', function () {
    return _harness.default.testCreate(_Signature.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="hidden"]', 1);
    });
  });
});
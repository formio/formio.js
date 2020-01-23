"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Well = _interopRequireDefault(require("./Well"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Well Component', function () {
  it('Should build a Well component', function () {
    return _harness.default.testCreate(_Well.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 2);
    });
  });
});
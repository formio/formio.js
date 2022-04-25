"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Password = _interopRequireDefault(require("./Password"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Password Component', function () {
  it('Should build a password component', function () {
    return _harness.default.testCreate(_Password.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="password"]', 1);
    });
  });
});
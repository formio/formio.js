"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Time = _interopRequireDefault(require("./Time"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Time Component', function () {
  it('Should build a time component', function () {
    return _harness.default.testCreate(_Time.default, _fixtures.comp1);
  });
});
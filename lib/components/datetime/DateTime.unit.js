"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _DateTime = _interopRequireDefault(require("./DateTime"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DateTime Component', function () {
  it('Should build a date time component', function () {
    return _harness.default.testCreate(_DateTime.default, _fixtures.comp1);
  });
});
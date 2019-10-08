"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Tags = _interopRequireDefault(require("./Tags"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Tags Component', function () {
  it('Should build a tags component', function () {
    return _harness.default.testCreate(_Tags.default, _fixtures.comp1);
  });
});
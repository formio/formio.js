"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Location = _interopRequireDefault(require("./Location"));

var _index = require("./fixtures/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Location Component', function () {
  it('Should build a location component', function () {
    return _harness.default.testCreate(_Location.default, _index.comp1);
  });
});
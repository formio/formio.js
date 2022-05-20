"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Hidden = _interopRequireDefault(require("./Hidden"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Hidden Component', function () {
  it('Should build a hidden component', function () {
    return _harness.default.testCreate(_Hidden.default, _fixtures.comp1);
  });
});
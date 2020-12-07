"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Address = _interopRequireDefault(require("./Address"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Address Component', function () {
  it('Should build an address component', function () {
    return _harness.default.testCreate(_Address.default, _fixtures.comp1);
  });
});
"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Email = _interopRequireDefault(require("./Email"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Email Component', function () {
  it('Should build a email component', function () {
    return _harness.default.testCreate(_Email.default, _fixtures.comp1);
  });
});
"use strict";

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../test/harness"));

var _WebformBuilder = _interopRequireDefault(require("./WebformBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('WebformBuilder tests', function () {
  before(function (done) {
    return _harness.default.builderBefore(done);
  });
  after(function () {
    return _harness.default.builderAfter();
  });
  it('Should create a new form builder class', function (done) {
    var builder = _harness.default.buildComponent('textfield');

    (0, _powerAssert.default)(builder instanceof _WebformBuilder.default, 'Builder must be an instance of FormioFormBuilder');
    done();
  });
});
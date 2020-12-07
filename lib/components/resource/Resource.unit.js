"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Resource = _interopRequireDefault(require("./Resource"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Resource Component', function () {
  it('Should build a resource component', function (done) {
    _harness.default.testCreate(_Resource.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'select', 1);

      done();
    });
  });
});
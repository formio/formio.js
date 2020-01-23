"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Columns = _interopRequireDefault(require("./Columns"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Columns Component', function () {
  it('Should build a columns component', function () {
    return _harness.default.testCreate(_Columns.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 2);
    });
  });
});
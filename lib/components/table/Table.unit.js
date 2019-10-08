"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Table = _interopRequireDefault(require("./Table"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Table Component', function () {
  it('Should build a Table component', function () {
    return _harness.default.testCreate(_Table.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 6);
    });
  });
});
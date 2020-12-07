"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _SelectBoxes = _interopRequireDefault(require("./SelectBoxes"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SelectBoxes Component', function () {
  it('Should build a SelectBoxes component', function () {
    return _harness.default.testCreate(_SelectBoxes.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="checkbox"]', 8);
    });
  });
});
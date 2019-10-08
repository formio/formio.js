"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _TextArea = _interopRequireDefault(require("./TextArea"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TextArea Component', function () {
  it('Should build a TextArea component', function () {
    return _harness.default.testCreate(_TextArea.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'textarea', 1);
    });
  });
});
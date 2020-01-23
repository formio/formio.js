"use strict";

require("core-js/modules/es.string.trim");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Content = _interopRequireDefault(require("./Content"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Content Component', function () {
  it('Should build a content component', function () {
    return _harness.default.testCreate(_Content.default, _fixtures.comp1).then(function (component) {
      var html = component.element.querySelector('[ref="html"]');

      _powerAssert.default.equal(html.innerHTML.trim(), _fixtures.comp1.html.trim());
    });
  });
});
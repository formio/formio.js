"use strict";

require("core-js/modules/es.array.every");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.string.includes");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _formUtils = require("../../utils/formUtils");

var _Panel = _interopRequireDefault(require("./Panel"));

var _Panel2 = _interopRequireDefault(require("./Panel.form"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Panel Component', function () {
  it('Should build a panel component', function () {
    return _harness.default.testCreate(_Panel.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 2);
    });
  });
  describe('Edit Form', function () {
    it('should include components for important settings', function () {
      var components = (0, _formUtils.flattenComponents)((0, _Panel2.default)().components);
      var keys = Object.keys(components).map(function (path) {
        return components[path].key;
      });
      var settings = ['breadcrumb', 'breadcrumbClickable'];
      (0, _powerAssert.default)(settings.every(function (s) {
        return keys.includes(s);
      }));
    });
  });
});
"use strict";

require("core-js/modules/es.array.concat.js");
var _CDN = _interopRequireDefault(require("./CDN"));
var _powerAssert = _interopRequireDefault(require("power-assert"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
describe('Formio.js CDN class Tests', function () {
  var cdn;
  before(function () {
    cdn = new _CDN["default"]('https://cdn.form.io');
  });
  it('Should give correct CDN URLs', function () {
    for (var lib in cdn.libs) {
      var expectedUrl = "".concat(cdn.baseUrl, "/").concat(lib, "/").concat(cdn.libs[lib]);
      if (cdn.libs[lib] === '' || cdn.libs[lib] === 'latest') {
        expectedUrl = "".concat(cdn.baseUrl, "/").concat(lib);
      }
      _powerAssert["default"].equal(cdn[lib], expectedUrl);
    }
  });
  it('Should update lib versions', function () {
    cdn.setVersion('grid', '1.1.1');
    _powerAssert["default"].equal(cdn.grid, 'https://cdn.form.io/grid/1.1.1');
  });
  it('Shoudl override CDN urls', function () {
    cdn.setOverrideUrl('grid', 'http://cdn.test-form.io');
    cdn.setVersion('grid', 'latest');
    _powerAssert["default"].equal(cdn.grid, 'http://cdn.test-form.io/grid');
    cdn.setOverrideUrl('ace', 'http://cdn.test-form.io');
  });
  it('Should remove overrides', function () {
    cdn.removeOverrides();
    for (var lib in cdn.libs) {
      var expectedUrl = "".concat(cdn.baseUrl, "/").concat(lib, "/").concat(cdn.libs[lib]);
      if (cdn.libs[lib] === '' || cdn.libs[lib] === 'latest') {
        expectedUrl = "".concat(cdn.baseUrl, "/").concat(lib);
      }
      _powerAssert["default"].equal(cdn[lib], expectedUrl);
    }
  });
});
"use strict";

require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.number.constructor.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// All external libs URLs should be injected through this class.
// CDN libs URLs are accessible throuh CDN object properties
// like Formio.cdn.ace === 'http://cdn.form.io/ace/1.4.12'.
// For latest version use empty string
var CDN = /*#__PURE__*/function () {
  function CDN(baseUrl) {
    _classCallCheck(this, CDN);
    this.baseUrl = baseUrl || 'https://cdn.form.io';
    this.overrides = {};
    this.libs = {
      'ace': '1.4.12',
      'bootstrap': '4.6.2',
      'ckeditor': '19.0.0',
      'flatpickr': '4.6.8',
      'flatpickr-formio': '4.6.13-formio.1',
      'font-awesome': '4.7.0',
      'grid': 'latest',
      'moment-timezone': 'latest',
      'quill': '1.3.7',
      'shortcut-buttons-flatpickr': '0.4.0',
      'uswds': '2.4.8',
      'core': ''
    };
    this.updateUrls();
  }
  _createClass(CDN, [{
    key: "getVersion",
    value: function getVersion(lib) {
      return this.libs[lib];
    }

    // Sets a specific library version
  }, {
    key: "setVersion",
    value: function setVersion(lib, version) {
      this.libs[lib] = version;
      this.updateUrls();
    }

    // Sets base CDN url for all libraries
  }, {
    key: "setBaseUrl",
    value: function setBaseUrl(url) {
      this.baseUrl = url;
      this.updateUrls();
    }

    // Allows to override CDN url for a specific library
  }, {
    key: "setOverrideUrl",
    value: function setOverrideUrl(lib, url) {
      this.overrides[lib] = url;
      this.updateUrls();
    }

    // Removes override for a specific library
  }, {
    key: "removeOverride",
    value: function removeOverride(lib) {
      delete this.overrides[lib];
      this.updateUrls();
    }

    // Removes all overrides
  }, {
    key: "removeOverrides",
    value: function removeOverrides() {
      this.overrides = {};
      this.updateUrls();
    }
  }, {
    key: "buildUrl",
    value: function buildUrl(cdnUrl, lib, version) {
      var url;
      if (version === 'latest' || version === '') {
        url = "".concat(cdnUrl, "/").concat(lib);
      } else {
        url = "".concat(cdnUrl, "/").concat(lib, "/").concat(version);
      }
      return url;
    }
  }, {
    key: "updateUrls",
    value: function updateUrls() {
      for (var lib in this.libs) {
        if (lib in this.overrides) {
          this[lib] = this.buildUrl(this.overrides[lib], lib, this.libs[lib]);
        } else {
          this[lib] = this.buildUrl(this.baseUrl, lib, this.libs[lib]);
        }
      }
    }
  }]);
  return CDN;
}();
var _default = CDN;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _PDF = _interopRequireDefault(require("../PDF"));

var _Webform = _interopRequireDefault(require("../Webform"));

var _Wizard = _interopRequireDefault(require("../Wizard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Displays = /*#__PURE__*/function () {
  function Displays() {
    _classCallCheck(this, Displays);
  }

  _createClass(Displays, null, [{
    key: "addDisplay",
    value: function addDisplay(name, display) {
      Displays.displays[name] = display;
    }
  }, {
    key: "addDisplays",
    value: function addDisplays(displays) {
      Displays.displays = _lodash.default.merge(Displays.displays, displays);
    }
  }, {
    key: "getDisplay",
    value: function getDisplay(name) {
      return Displays.displays[name];
    }
  }, {
    key: "getDisplays",
    value: function getDisplays() {
      return Displays.displays;
    }
  }]);

  return Displays;
}();

exports.default = Displays;

_defineProperty(Displays, "displays", {
  pdf: _PDF.default,
  webform: _Webform.default,
  wizard: _Wizard.default
});
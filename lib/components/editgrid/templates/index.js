"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _row = _interopRequireDefault(require("./row.ejs"));

var _header = _interopRequireDefault(require("./header.ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  row: _row["default"],
  header: _header["default"]
};
exports["default"] = _default;
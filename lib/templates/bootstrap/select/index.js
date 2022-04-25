"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _form = _interopRequireDefault(require("./form.ejs"));

var _html = _interopRequireDefault(require("./html.ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  form: _form.default,
  html: _html.default
};
exports.default = _default;
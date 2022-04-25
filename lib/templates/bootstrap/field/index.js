"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _form = _interopRequireDefault(require("./form.ejs"));

var _align = _interopRequireDefault(require("./align.ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  form: _form.default,
  align: _align.default
};
exports.default = _default;
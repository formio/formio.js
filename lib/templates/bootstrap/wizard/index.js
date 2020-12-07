"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _form = _interopRequireDefault(require("./form.ejs"));

var _builder = _interopRequireDefault(require("./builder.ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  form: _form.default,
  builder: _builder.default
};
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flat = _interopRequireDefault(require("./flat.ejs"));

var _form = _interopRequireDefault(require("./form.ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  flat: _flat.default,
  form: _form.default
};
exports.default = _default;
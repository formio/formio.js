"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bootstrap = _interopRequireDefault(require("./bootstrap"));

var _bootstrap2 = _interopRequireDefault(require("@formio/bootstrap3"));

var _semantic = _interopRequireDefault(require("@formio/semantic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Deprecated. Semantic and bootstrap3 will be removed in 5.x.
// Use external modules instead.
var _default = {
  bootstrap: _bootstrap.default,
  bootstrap3: _bootstrap2.default.templates.bootstrap3,
  semantic: _semantic.default.templates.semantic
};
exports.default = _default;
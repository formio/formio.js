"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bootstrap = _interopRequireDefault(require("./bootstrap"));

var _bootstrap2 = _interopRequireDefault(require("./bootstrap3"));

var _semantic = _interopRequireDefault(require("./semantic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  bootstrap: _bootstrap.default,
  bootstrap3: _bootstrap2.default,
  semantic: _semantic.default
};
exports.default = _default;
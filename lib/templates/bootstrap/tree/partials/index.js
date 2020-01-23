"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _edit = _interopRequireDefault(require("./edit.ejs"));

var _view = _interopRequireDefault(require("./view.ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  treeView: {
    form: _view.default
  },
  treeEdit: {
    form: _edit.default
  }
};
exports.default = _default;
"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.concat.js");
var _default = function _default(iconset, name, spinning) {
  switch (name) {
    case 'question-sign':
      name = 'question-circle';
      break;
    case 'remove-circle':
      name = 'x-circle';
      break;
    case 'new-window':
      name = 'window-plus';
      break;
    case 'move':
      name = 'arrows-move';
      break;
    case 'time':
      name = 'clock';
      break;
  }
  return spinning ? 'spinner-border spinner-border-sm' : "".concat(iconset, " ").concat(iconset, "-").concat(name);
};
exports["default"] = _default;
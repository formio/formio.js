"use strict";

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(iconset, name, spinning) {
  var icons = {
    'plus-squre-o': 'plus square outline',
    'minus-squre-o': 'minus square outline',
    'question-sign': 'question circle',
    'remove-circle': 'trash alternate outline',
    'new-window': 'external alternate',
    'files-o': 'file outline',
    'move': 'arrows alternate',
    'link': 'linkify'
  };

  if (icons.hasOwnProperty(name)) {
    name = icons[name];
  }

  name = name || '';
  name = name.replace(/-/g, ' ');
  name = name.replace(/ o$/, ' outline');
  return spinning ? "icon ".concat(name, " loading") : "icon ".concat(name);
};

exports.default = _default;
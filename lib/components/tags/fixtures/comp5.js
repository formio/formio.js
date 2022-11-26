"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  'type': 'form',
  'display': 'form',
  'components': [{
    'label': 'Tags',
    'tableView': true,
    'delimeter': ';',
    'storeas': 'array',
    'key': 'tags',
    'type': 'tags',
    'input': true
  }, {
    'type': 'button',
    'label': 'Submit',
    'key': 'submit',
    'disableOnInvalid': true,
    'input': true,
    'tableView': false
  }]
};
exports["default"] = _default;
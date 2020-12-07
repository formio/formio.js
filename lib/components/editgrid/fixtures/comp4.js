"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'label': 'Edit Grid',
  'tableView': false,
  'key': 'editGrid',
  'type': 'editgrid',
  'input': true,
  'components': [{
    'label': 'Data Map',
    'tableView': false,
    'key': 'dataMap',
    'type': 'datamap',
    'input': true,
    'valueComponent': {
      'type': 'textfield',
      'key': 'key',
      'label': 'Value',
      'input': true,
      'hideLabel': true,
      'tableView': true
    }
  }]
};
exports.default = _default;
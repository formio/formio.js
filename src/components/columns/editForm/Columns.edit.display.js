"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  weight: 150,
  type: 'datagrid',
  input: true,
  key: 'columns',
  label: 'Column Properties',
  addAnother: 'Add Column',
  tooltip: 'The width, offset, push, and pull settings for each column.',
  reorder: true,
  components: [{
    type: 'number',
    key: 'width',
    defaultValue: 6,
    label: 'Width'
  }, {
    type: 'number',
    key: 'offset',
    defaultValue: 0,
    label: 'Offset'
  }, {
    type: 'number',
    key: 'push',
    defaultValue: 0,
    label: 'Push'
  }, {
    type: 'number',
    key: 'pull',
    defaultValue: 0,
    label: 'Pull'
  }]
}, {
  weight: 160,
  type: 'checkbox',
  label: 'Auto adjust columns',
  tooltip: 'Will automatically adjust columns based on if nested components are hidden.',
  key: 'autoAdjust',
  input: true
}, {
  weight: 161,
  type: 'checkbox',
  label: 'Hide Column when Children Hidden',
  key: 'hideOnChildrenHidden',
  tooltip: 'Check this if you would like to hide any column when the children within that column are also hidden',
  input: true
}];
exports.default = _default;
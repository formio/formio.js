"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  type: 'select',
  label: 'Input Format',
  key: 'inputFormat',
  weight: 105,
  placeholder: 'Input Format',
  tooltip: '',
  template: '<span>{{ item.label }}</span>',
  data: {
    values: [{
      value: 'plain',
      label: 'Plain'
    }, {
      value: 'html',
      label: 'HTML'
    }, {
      value: 'raw',
      label: 'Raw (Insecure)'
    }]
  },
  defaultValue: 'plain',
  input: true
}];
exports.default = _default;
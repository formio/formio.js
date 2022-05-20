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
  tooltip: 'Force the output of this field to be sanitized in a specific format.',
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
}, {
  weight: 200,
  type: 'radio',
  label: 'Text Case',
  key: 'case',
  tooltip: 'When data is entered, you can change the case of the value.',
  input: true,
  values: [{
    value: 'mixed',
    label: 'Mixed (Allow upper and lower case)'
  }, {
    value: 'uppercase',
    label: 'Uppercase'
  }, {
    value: 'lowercase',
    label: 'Lowercase'
  }]
}, {
  weight: 205,
  type: 'checkbox',
  input: true,
  key: 'truncateMultipleSpaces',
  label: 'Truncate Multiple Spaces'
}];
exports.default = _default;
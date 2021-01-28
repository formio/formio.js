"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  weight: 0,
  type: 'textfield',
  input: true,
  key: 'key',
  label: 'Property Name',
  tooltip: 'The name of this field in the API endpoint.',
  validate: {
    pattern: '(\\w|\\w[\\w-.]*\\w)',
    patternMessage: 'The property name must only contain alphanumeric characters, underscores, dots and dashes and should not be ended by dash or dot.',
    required: true
  }
}, {
  weight: 100,
  type: 'tags',
  input: true,
  label: 'Field Tags',
  storeas: 'array',
  tooltip: 'Tag the field for use in custom logic.',
  key: 'tags'
}, {
  weight: 200,
  type: 'datamap',
  label: 'Custom Properties',
  tooltip: 'This allows you to configure any custom properties for this component.',
  key: 'properties',
  valueComponent: {
    type: 'textfield',
    key: 'value',
    label: 'Value',
    placeholder: 'Value',
    input: true
  }
}];
exports.default = _default;
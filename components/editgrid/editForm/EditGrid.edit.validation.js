"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  ignore: true,
  key: 'unique'
}, {
  weight: 110,
  key: 'validate.minLength',
  label: 'Minimum Length',
  placeholder: 'Minimum Length',
  type: 'number',
  tooltip: 'The minimum length requirement this field must meet.',
  input: true
}, {
  weight: 120,
  key: 'validate.maxLength',
  label: 'Maximum Length',
  placeholder: 'Maximum Length',
  type: 'number',
  tooltip: 'The maximum length requirement this field must meet.',
  input: true
}, {
  type: 'checkbox',
  input: true,
  weight: 105,
  key: 'rowDrafts',
  label: 'Enable Row Drafts',
  tooltip: 'Allow save rows even if their data is invalid. Errors will occur when try to submit with invalid rows.'
}];
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  type: 'textfield',
  input: true,
  key: 'className',
  weight: 60,
  label: 'CSS Class',
  placeholder: 'CSS Class',
  tooltip: 'The CSS class for this HTML element.'
}, {
  weight: 700,
  type: 'checkbox',
  label: 'Refresh On Change',
  tooltip: 'Rerender the field whenever a value on the form changes.',
  key: 'refreshOnChange',
  input: true
}];
exports.default = _default;
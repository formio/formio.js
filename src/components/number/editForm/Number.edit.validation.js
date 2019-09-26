"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'validate.unique',
  ignore: true
}, {
  type: 'number',
  label: 'Minimum Value',
  key: 'validate.min',
  input: true,
  placeholder: 'Minimum Value',
  tooltip: 'The minimum value this field must have before the form can be submitted.',
  weight: 150
}, {
  type: 'number',
  label: 'Maximum Value',
  key: 'validate.max',
  input: true,
  placeholder: 'Maximum Value',
  tooltip: 'The maximum value this field can have before the form can be submitted.',
  weight: 160
}];
exports.default = _default;
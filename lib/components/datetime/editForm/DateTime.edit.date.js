"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  type: 'checkbox',
  input: true,
  key: 'enableDate',
  label: 'Enable Date Input',
  weight: 0,
  tooltip: 'Enables date input for this field.'
}, {
  type: 'textfield',
  input: true,
  key: 'datePicker.minDate',
  label: 'Minimum Date',
  placeholder: 'yyyy-MM-dd',
  tooltip: 'The minimum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().subtract(10, \'days\')',
  weight: 10
}, {
  type: 'textfield',
  input: true,
  key: 'datePicker.maxDate',
  label: 'Maximum Date',
  placeholder: 'yyyy-MM-dd',
  tooltip: 'The maximum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().add(10, \'days\')',
  weight: 20
}];
exports.default = _default;
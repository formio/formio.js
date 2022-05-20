"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'validate.required',
  ignore: true
}, {
  key: 'validate.unique',
  ignore: true
}, {
  weight: 0,
  type: 'checkbox',
  label: 'Require Day',
  tooltip: 'A required field must be filled in before the form can be submitted.',
  key: 'fields.day.required',
  input: true
}, {
  weight: 10,
  type: 'checkbox',
  label: 'Require Month',
  tooltip: 'A required field must be filled in before the form can be submitted.',
  key: 'fields.month.required',
  input: true
}, {
  weight: 20,
  type: 'checkbox',
  label: 'Require Year',
  tooltip: 'A required field must be filled in before the form can be submitted.',
  key: 'fields.year.required',
  input: true
}, {
  weight: 40,
  type: 'textfield',
  label: 'Minimum Day',
  placeholder: 'yyyy-MM-dd',
  tooltip: 'A minimum date that can be set. You can also use Moment.js functions. For example: \n \n moment().subtract(10, \'days\')',
  key: 'minDate',
  input: true
}, {
  weight: 30,
  type: 'textfield',
  label: 'Maximum Day',
  placeholder: 'yyyy-MM-dd',
  tooltip: 'A maximum day that can be set. You can also use Moment.js functions. For example: \n \n moment().add(10, \'days\')',
  key: 'maxDate',
  input: true
}];
exports.default = _default;
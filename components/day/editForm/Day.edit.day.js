"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  wieght: 200,
  type: 'select',
  datasrc: 'values',
  key: 'fields.day.type',
  label: 'Type',
  data: {
    values: [{
      label: 'Number',
      value: 'number'
    }, {
      label: 'Select',
      value: 'select'
    }]
  }
}, {
  weight: 210,
  type: 'textfield',
  input: true,
  key: 'fields.day.placeholder',
  label: 'Placeholder',
  placeholder: 'Day Placeholder',
  tooltip: 'The placeholder text that will appear when Day field is empty.'
}, {
  weight: 215,
  type: 'checkbox',
  label: 'Hidden',
  tooltip: 'Hide the Day part of the component.',
  key: 'fields.day.hide',
  input: true
}, {
  weight: 214,
  type: 'checkbox',
  label: 'Day First',
  tooltip: 'Display the Day field before the Month field.',
  key: 'dayFirst',
  input: true
}];
exports.default = _default;
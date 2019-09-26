"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  weight: 15,
  type: 'checkbox',
  label: 'Hide Input Labels',
  tooltip: 'Hide the labels of component inputs. This allows you to show the labels in the form builder, but not when it is rendered.',
  key: 'hideInputLabels',
  input: true
}, {
  type: 'select',
  input: true,
  key: 'inputsLabelPosition',
  label: 'Inputs Label Position',
  tooltip: 'Position for the labels for inputs for this field.',
  weight: 40,
  defaultValue: 'top',
  dataSrc: 'values',
  data: {
    values: [{
      label: 'Top',
      value: 'top'
    }, {
      label: 'Left',
      value: 'left'
    }, {
      label: 'Right',
      value: 'right'
    }, {
      label: 'Bottom',
      value: 'bottom'
    }]
  }
}, {
  key: 'placeholder',
  ignore: true
}, {
  weight: 210,
  type: 'textfield',
  input: true,
  key: 'fields.day.placeholder',
  label: 'Day Placeholder',
  placeholder: 'Day Placeholder',
  tooltip: 'The placeholder text that will appear when Day field is empty.'
}, {
  weight: 211,
  type: 'textfield',
  input: true,
  key: 'fields.month.placeholder',
  label: 'Month Placeholder',
  placeholder: 'Month Placeholder',
  tooltip: 'The placeholder text that will appear when Month field is empty.'
}, {
  weight: 212,
  type: 'textfield',
  input: true,
  key: 'fields.year.placeholder',
  label: 'Year Placeholder',
  placeholder: 'Year Placeholder',
  tooltip: 'The placeholder text that will appear when Year field is empty.'
}, {
  weight: 213,
  type: 'checkbox',
  label: 'Use Locale Settings',
  tooltip: 'Use locale settings to display day.',
  key: 'useLocaleSettings',
  input: true
}, {
  weight: 214,
  type: 'checkbox',
  label: 'Day First',
  tooltip: 'Display the Day field before the Month field.',
  key: 'dayFirst',
  input: true
}, {
  weight: 215,
  type: 'checkbox',
  label: 'Hide Day',
  tooltip: 'Hide the Day part of the component.',
  key: 'fields.day.hide',
  input: true
}, {
  weight: 216,
  type: 'checkbox',
  label: 'Hide Month',
  tooltip: 'Hide the Month part of the component.',
  key: 'fields.month.hide',
  input: true
}, {
  weight: 217,
  type: 'checkbox',
  label: 'Hide Year',
  tooltip: 'Hide the Year part of the component.',
  key: 'fields.year.hide',
  input: true
}];
exports.default = _default;
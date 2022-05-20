"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  type: 'select',
  input: true,
  weight: 40,
  tooltip: 'Select the type of widget you\'d like to use.',
  key: 'inputType',
  defaultValue: 'time',
  label: 'Input Type',
  dataSrc: 'values',
  data: {
    values: [{
      label: 'HTML5 Time Input',
      value: 'time'
    }, {
      label: 'Text Input with Mask',
      value: 'text'
    }]
  }
}, {
  type: 'textfield',
  input: true,
  key: 'format',
  label: 'Format',
  placeholder: 'Format',
  tooltip: 'The moment.js format for showing the value of this field.',
  weight: 50,
  defaultValue: 'HH:mm',
  conditional: {
    json: {
      '===': [{
        var: 'data.inputType'
      }, 'text']
    }
  }
}, {
  key: 'placeholder',
  ignore: true
}];
exports.default = _default;
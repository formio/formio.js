"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  type: 'select',
  input: true,
  weight: 20,
  tooltip: 'Select the type of widget you\'d like to use.',
  key: 'widget',
  defaultValue: 'choicesjs',
  label: 'Widget Type',
  dataSrc: 'values',
  data: {
    values: [{
      label: 'ChoicesJS',
      value: 'choicesjs'
    }, {
      label: 'HTML 5',
      value: 'html5'
    }]
  }
}, {
  weight: 1230,
  type: 'checkbox',
  label: 'Unique Options',
  tooltip: 'Display only unique dropdown options.',
  key: 'uniqueOptions',
  input: true
}];
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'placeholder',
  ignore: true
}, {
  type: 'checkbox',
  label: 'Open First Row when Empty',
  key: 'openWhenEmpty',
  tooltip: 'Check this if you would like to open up the first row when the EditGrid is empty',
  weight: 1000,
  input: true,
  conditional: {
    json: {
      '!==': [{
        var: 'data.modal'
      }, true]
    }
  }
}, {
  type: 'checkbox',
  label: 'Disable Adding / Removing Rows',
  key: 'disableAddingRemovingRows',
  tooltip: 'Check if you want to hide Add Another button and Remove Row button',
  weight: 1001,
  input: true,
  clearOnHide: false,
  calculateValue: 'value = data.disableAddingRemovingRows;'
}];
exports.default = _default;
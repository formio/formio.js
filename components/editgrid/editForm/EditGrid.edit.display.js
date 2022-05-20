"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Evaluator = _interopRequireDefault(require("../../../utils/Evaluator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}, {
  type: 'checkbox',
  label: 'Display EditGrid as Table',
  key: 'displayAsTable',
  tooltip: 'use Table Template',
  weight: 1002,
  input: false,
  customConditional: function customConditional() {
    return !_Evaluator.default.noeval;
  }
}, {
  weight: 1010,
  type: 'textarea',
  input: true,
  key: 'conditionalAddButton',
  label: 'Conditional Add Button',
  placeholder: 'show = ...',
  tooltip: 'Specify condition when Add Button should be displayed.',
  editor: 'ace',
  as: 'javascript',
  wysiwyg: {
    minLines: 3
  }
}];
exports.default = _default;
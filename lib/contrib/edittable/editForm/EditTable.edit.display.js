"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'columns',
  type: 'datagrid',
  input: true,
  label: 'Columns',
  weight: 100,
  reorder: true,
  components: [{
    key: 'label',
    label: 'Column Label',
    type: 'textfield',
    input: true
  }, {
    key: 'key',
    label: 'Column Key',
    type: 'textfield',
    allowCalculateOverride: true,
    input: true,
    calculateValue: {
      _camelCase: [{
        var: 'row.label'
      }]
    }
  }]
}];
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'components',
  type: 'datagrid',
  input: true,
  label: 'Tabs',
  weight: 50,
  reorder: true,
  components: [{
    type: 'textfield',
    input: true,
    key: 'label',
    label: 'Label'
  }, {
    type: 'textfield',
    input: true,
    key: 'key',
    label: 'Key',
    allowCalculateOverride: true,
    calculateValue: {
      _camelCase: [{
        var: 'row.label'
      }]
    }
  }]
}];
exports.default = _default;
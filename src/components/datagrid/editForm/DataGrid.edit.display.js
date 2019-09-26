"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  type: 'checkbox',
  label: 'Disable Adding / Removing Rows',
  key: 'disableAddingRemovingRows',
  tooltip: 'Check if you want to hide Add Another button and Remove Row button',
  weight: 405,
  input: true,
  clearOnHide: false,
  customConditional: 'show = !data.enableRowGroups',
  calculateValue: 'value = data.enableRowGroups ? true : data.disableAddingRemovingRows;'
}, {
  type: 'textfield',
  label: 'Add Another Text',
  key: 'addAnother',
  tooltip: 'Set the text of the Add Another button.',
  placeholder: 'Add Another',
  weight: 410,
  input: true,
  customConditional: 'show = !data.disableAddingRemovingRows'
}, {
  type: 'select',
  label: 'Add Another Position',
  key: 'addAnotherPosition',
  dataSrc: 'values',
  tooltip: 'Position for Add Another button with respect to Data Grid Array.',
  defaultValue: 'bottom',
  input: true,
  data: {
    values: [{
      label: 'Top',
      value: 'top'
    }, {
      label: 'Bottom',
      value: 'bottom'
    }, {
      label: 'Both',
      value: 'both'
    }]
  },
  weight: 411,
  customConditional: 'show = !data.disableAddingRemovingRows'
}, {
  type: 'select',
  label: 'Remove Button Placement',
  key: 'removePlacement',
  defaultValue: 'col',
  dataSrc: 'values',
  data: {
    values: [{
      label: 'Right Most Column',
      value: 'col'
    }, {
      label: 'Row Top-Right corner',
      value: 'corner'
    }]
  },
  weight: 412,
  input: true,
  customConditional: 'show = !data.disableAddingRemovingRows'
}, {
  type: 'checkbox',
  label: 'Default Open Rows',
  key: 'defaultOpen',
  tooltip: 'Check this if you would like for the rows of the edit grid to be defaulted to opened if values exist.',
  weight: 420,
  input: true
}, {
  type: 'checkbox',
  label: 'Equal column width',
  key: 'layoutFixed',
  weight: 430,
  input: true
}, {
  key: 'enableRowGroups',
  type: 'checkbox',
  label: 'Enable Row Groups',
  weight: 440,
  input: true
}, {
  label: 'Groups',
  disableAddingRemovingRows: false,
  defaultOpen: false,
  addAnother: '',
  addAnotherPosition: 'bottom',
  mask: false,
  tableView: true,
  alwaysEnabled: false,
  type: 'datagrid',
  input: true,
  key: 'rowGroups',
  components: [{
    label: 'Label',
    allowMultipleMasks: false,
    showWordCount: false,
    showCharCount: false,
    tableView: true,
    alwaysEnabled: false,
    type: 'textfield',
    input: true,
    key: 'label',
    widget: {
      type: ''
    },
    row: '0-0'
  }, {
    label: 'Number of Rows',
    mask: false,
    tableView: true,
    alwaysEnabled: false,
    type: 'number',
    input: true,
    key: 'numberOfRows',
    row: '0-1'
  }],
  weight: 441,
  conditional: {
    json: {
      var: 'data.enableRowGroups'
    }
  }
}, {
  label: 'Hide Group on Header Click',
  type: 'checkbox',
  input: true,
  key: 'groupToggle',
  weight: 442,
  conditional: {
    json: {
      var: 'data.enableRowGroups'
    }
  }
}];
exports.default = _default;
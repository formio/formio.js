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
  label: 'Disable Adding / Removing Rows',
  key: 'disableAddingRemovingRows',
  tooltip: 'Check if you want to hide Add Another button and Remove Row button',
  weight: 405,
  input: true,
  clearOnHide: false,
  customConditional: function customConditional(context) {
    return !context.data.enableRowGroups;
  },
  calculateValue: function calculateValue(context) {
    return context.data.enableRowGroups ? true : context.data.disableAddingRemovingRows;
  }
}, {
  weight: 406,
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
}, {
  type: 'checkbox',
  label: 'Allow Reorder',
  key: 'reorder',
  weight: 407,
  input: true
}, {
  type: 'textfield',
  label: 'Add Another Text',
  key: 'addAnother',
  tooltip: 'Set the text of the Add Another button.',
  placeholder: 'Add Another',
  weight: 410,
  input: true,
  customConditional: function customConditional(context) {
    return !context.data.disableAddingRemovingRows;
  }
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
  customConditional: function customConditional(context) {
    return !context.data.disableAddingRemovingRows;
  }
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
  reorder: true,
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
}, {
  label: 'Initialize Empty',
  type: 'checkbox',
  input: true,
  key: 'initEmpty',
  tooltip: 'The DataGrid will have no visible rows when initialized.',
  weight: 450
}];
exports.default = _default;
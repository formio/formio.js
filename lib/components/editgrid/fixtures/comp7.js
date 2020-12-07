"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  label: 'Edit Grid',
  tableView: false,
  validate: {
    custom: "valid = true;\ndata.editGrid.forEach((r) => {\n  if (r.textField === data.name) {\n    valid = 'Invalid Name';\n  }\n});",
    required: false,
    customPrivate: false,
    strictDateValidation: false,
    multiple: false,
    unique: false
  },
  rowDrafts: false,
  key: 'editGrid',
  type: 'editgrid',
  input: true,
  components: [{
    label: 'Checkbox',
    tableView: false,
    defaultValue: true,
    key: 'checkbox',
    type: 'checkbox',
    input: true
  }, {
    label: 'Text Field',
    tableView: true,
    key: 'editGridChild',
    conditional: {
      show: true,
      when: 'editGrid.checkbox',
      eq: 'true'
    },
    type: 'textfield',
    input: true
  }, {
    title: 'Child',
    collapsible: false,
    key: 'child',
    type: 'panel',
    label: 'Panel',
    input: false,
    tableView: false,
    components: [{
      label: 'Panel Child',
      tableView: true,
      key: 'panelChild',
      conditional: {
        show: true,
        when: 'editGrid.checkbox',
        eq: 'true'
      },
      type: 'textfield',
      input: true
    }]
  }],
  placeholder: '',
  prefix: '',
  customClass: '',
  suffix: '',
  multiple: false,
  defaultValue: null,
  protected: false,
  unique: false,
  persistent: true,
  hidden: false,
  clearOnHide: true,
  refreshOn: '',
  redrawOn: '',
  modalEdit: false,
  labelPosition: 'top',
  description: '',
  errorLabel: '',
  tooltip: '',
  hideLabel: false,
  tabindex: '',
  disabled: false,
  autofocus: false,
  dbIndex: false,
  customDefaultValue: '',
  calculateValue: '',
  calculateServer: false,
  widget: null,
  attributes: {},
  validateOn: 'change',
  conditional: {
    show: null,
    when: null,
    eq: ''
  },
  overlay: {
    style: '',
    left: '',
    top: '',
    width: '',
    height: ''
  },
  allowCalculateOverride: false,
  encrypted: false,
  showCharCount: false,
  showWordCount: false,
  properties: {},
  allowMultipleMasks: false,
  tree: true,
  disableAddingRemovingRows: false,
  removeRow: 'Cancel',
  defaultOpen: false,
  openWhenEmpty: false,
  modal: false,
  inlineEdit: false,
  templates: {
    header: "<div class=\"row\">\n      {% util.eachComponent(components, function(component) { %}\n        {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n          <div class=\"col-sm-2\">{{ component.label }}</div>\n        {% } %}\n      {% }) %}\n    </div>",
    row: "<div class=\"row\">\n      {% util.eachComponent(components, function(component) { %}\n        {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n          <div class=\"col-sm-2\">\n            {{ getView(component, row[component.key]) }}\n          </div>\n        {% } %}\n      {% }) %}\n      {% if (!instance.disabled) { %}\n        <div class=\"col-sm-2\">\n          <div class=\"btn-group pull-right\">\n            <button class=\"btn btn-default btn-light btn-sm editRow\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n            {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n              <button class=\"btn btn-danger btn-sm removeRow\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n            {% } %}\n          </div>\n        </div>\n      {% } %}\n    </div>",
    footer: ''
  },
  id: 'e10uov'
};
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  label: 'HTML5',
  tableView: false,
  rowDrafts: false,
  key: 'editGrid1',
  type: 'editgrid',
  input: true,
  components: [{
    label: 'Make',
    widget: 'choicesjs',
    placeholder: 'Select your make',
    tableView: true,
    data: {
      values: [{
        label: 'Chevy',
        value: 'chevy'
      }, {
        value: 'honda',
        label: 'Honda'
      }, {
        label: 'Ford',
        value: 'ford'
      }, {
        label: 'Toyota',
        value: 'toyota'
      }]
    },
    selectThreshold: 0.3,
    validate: {
      required: true
    },
    key: 'make',
    type: 'select',
    indexeddb: {
      filter: {}
    },
    input: true
  }, {
    label: 'Model',
    widget: 'choicesjs',
    placeholder: 'Select your model',
    tableView: true,
    dataSrc: 'url',
    data: {
      values: [{
        label: '',
        value: ''
      }],
      url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/{{ row.make }}?format=json',
      headers: [{
        key: '',
        value: ''
      }]
    },
    valueProperty: 'Model_Name',
    template: '<span>{{ item.Model_Name }}</span>',
    refreshOn: 'data',
    clearOnRefresh: true,
    selectThreshold: 0.3,
    clearOnHide: false,
    validate: {
      required: true
    },
    key: 'model',
    type: 'select',
    indexeddb: {
      filter: {}
    },
    selectValues: 'Results',
    input: true,
    disableLimit: false,
    lazyLoad: false
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
  validate: {
    required: false,
    custom: '',
    customPrivate: false,
    strictDateValidation: false,
    multiple: false,
    unique: false
  },
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
  id: 'e7p0y9a'
};
exports.default = _default;
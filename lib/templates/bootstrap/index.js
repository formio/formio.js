"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _address = _interopRequireDefault(require("./address"));

var _builder = _interopRequireDefault(require("./builder"));

var _builderComponent = _interopRequireDefault(require("./builderComponent"));

var _builderComponents = _interopRequireDefault(require("./builderComponents"));

var _builderEditForm = _interopRequireDefault(require("./builderEditForm"));

var _builderPlaceholder = _interopRequireDefault(require("./builderPlaceholder"));

var _builderSidebar = _interopRequireDefault(require("./builderSidebar"));

var _builderSidebarGroup = _interopRequireDefault(require("./builderSidebarGroup"));

var _builderWizard = _interopRequireDefault(require("./builderWizard"));

var _button = _interopRequireDefault(require("./button"));

var _checkbox = _interopRequireDefault(require("./checkbox"));

var _columns = _interopRequireDefault(require("./columns"));

var _component = _interopRequireDefault(require("./component"));

var _componentModal = _interopRequireDefault(require("./componentModal"));

var _components = _interopRequireDefault(require("./components"));

var _container = _interopRequireDefault(require("./container"));

var _datagrid = _interopRequireDefault(require("./datagrid"));

var _day = _interopRequireDefault(require("./day"));

var _dialog = _interopRequireDefault(require("./dialog"));

var _editgrid = _interopRequireDefault(require("./editgrid"));

var _field = _interopRequireDefault(require("./field"));

var _fieldset = _interopRequireDefault(require("./fieldset"));

var _file = _interopRequireDefault(require("./file"));

var _html = _interopRequireDefault(require("./html"));

var _icon = _interopRequireDefault(require("./icon"));

var _iconClass = _interopRequireDefault(require("./iconClass"));

var _input = _interopRequireDefault(require("./input"));

var _label = _interopRequireDefault(require("./label"));

var _loader = _interopRequireDefault(require("./loader"));

var _loading = _interopRequireDefault(require("./loading"));

var _map = _interopRequireDefault(require("./map"));

var _message = _interopRequireDefault(require("./message"));

var _modaldialog = _interopRequireDefault(require("./modaldialog"));

var _modaledit = _interopRequireDefault(require("./modaledit"));

var _modalPreview = _interopRequireDefault(require("./modalPreview"));

var _multipleMasksInput = _interopRequireDefault(require("./multipleMasksInput"));

var _multiValueRow = _interopRequireDefault(require("./multiValueRow"));

var _multiValueTable = _interopRequireDefault(require("./multiValueTable"));

var _panel = _interopRequireDefault(require("./panel"));

var _pdf = _interopRequireDefault(require("./pdf"));

var _pdfBuilder = _interopRequireDefault(require("./pdfBuilder"));

var _pdfBuilderUpload = _interopRequireDefault(require("./pdfBuilderUpload"));

var _radio = _interopRequireDefault(require("./radio"));

var _resourceAdd = _interopRequireDefault(require("./resourceAdd"));

var _select = _interopRequireDefault(require("./select"));

var _selectOption = _interopRequireDefault(require("./selectOption"));

var _signature = _interopRequireDefault(require("./signature"));

var _survey = _interopRequireDefault(require("./survey"));

var _tab = _interopRequireDefault(require("./tab"));

var _table = _interopRequireDefault(require("./table"));

var _tree = _interopRequireDefault(require("./tree"));

var _partials = _interopRequireDefault(require("./tree/partials"));

var _webform = _interopRequireDefault(require("./webform"));

var _well = _interopRequireDefault(require("./well"));

var _wizard = _interopRequireDefault(require("./wizard"));

var _wizardHeader = _interopRequireDefault(require("./wizardHeader"));

var _wizardNav = _interopRequireDefault(require("./wizardNav"));

var _cssClasses = _interopRequireDefault(require("./cssClasses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _objectSpread(_objectSpread({
  transform: function transform(type, text) {
    if (!text) {
      return text;
    }

    switch (type) {
      case 'class':
        return this.cssClasses.hasOwnProperty(text.toString()) ? this.cssClasses[text.toString()] : text;
    }

    return text;
  },
  defaultIconset: 'fa',
  iconClass: _iconClass.default,
  cssClasses: _cssClasses.default,
  address: _address.default,
  builder: _builder.default,
  builderComponent: _builderComponent.default,
  builderComponents: _builderComponents.default,
  builderEditForm: _builderEditForm.default,
  builderPlaceholder: _builderPlaceholder.default,
  builderSidebar: _builderSidebar.default,
  builderSidebarGroup: _builderSidebarGroup.default,
  builderWizard: _builderWizard.default,
  button: _button.default,
  checkbox: _checkbox.default,
  columns: _columns.default,
  component: _component.default,
  componentModal: _componentModal.default,
  components: _components.default,
  container: _container.default,
  datagrid: _datagrid.default,
  day: _day.default,
  dialog: _dialog.default,
  editgrid: _editgrid.default,
  field: _field.default,
  fieldset: _fieldset.default,
  file: _file.default,
  html: _html.default,
  icon: _icon.default,
  input: _input.default,
  label: _label.default,
  loader: _loader.default,
  loading: _loading.default,
  map: _map.default,
  message: _message.default,
  modaledit: _modaledit.default,
  modaldialog: _modaldialog.default,
  modalPreview: _modalPreview.default,
  multipleMasksInput: _multipleMasksInput.default,
  multiValueRow: _multiValueRow.default,
  multiValueTable: _multiValueTable.default,
  panel: _panel.default,
  pdf: _pdf.default,
  pdfBuilder: _pdfBuilder.default,
  pdfBuilderUpload: _pdfBuilderUpload.default,
  radio: _radio.default,
  resourceAdd: _resourceAdd.default,
  select: _select.default,
  selectOption: _selectOption.default,
  signature: _signature.default,
  survey: _survey.default,
  tab: _tab.default,
  table: _table.default,
  tree: _tree.default
}, _partials.default), {}, {
  webform: _webform.default,
  well: _well.default,
  wizard: _wizard.default,
  wizardHeader: _wizardHeader.default,
  wizardNav: _wizardNav.default
});

exports.default = _default;
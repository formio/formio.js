"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _builder = _interopRequireDefault(require("./builder"));

var _builderComponent = _interopRequireDefault(require("./builderComponent"));

var _builderComponents = _interopRequireDefault(require("./builderComponents"));

var _builderEditForm = _interopRequireDefault(require("./builderEditForm"));

var _builderPlaceholder = _interopRequireDefault(require("./builderPlaceholder"));

var _builderSidebar = _interopRequireDefault(require("./builderSidebar"));

var _builderSidebarGroup = _interopRequireDefault(require("./builderSidebarGroup"));

var _columns = _interopRequireDefault(require("./columns"));

var _datagrid = _interopRequireDefault(require("./datagrid"));

var _day = _interopRequireDefault(require("./day"));

var _dialog = _interopRequireDefault(require("./dialog"));

var _editgrid = _interopRequireDefault(require("./editgrid"));

var _field = _interopRequireDefault(require("./field"));

var _file = _interopRequireDefault(require("./file"));

var _icon = _interopRequireDefault(require("./icon"));

var _iconClass = _interopRequireDefault(require("./iconClass"));

var _input = _interopRequireDefault(require("./input"));

var _label = _interopRequireDefault(require("./label"));

var _message = _interopRequireDefault(require("./message"));

var _modaldialog = _interopRequireDefault(require("./modaldialog"));

var _modaledit = _interopRequireDefault(require("./modaledit"));

var _multiValueRow = _interopRequireDefault(require("./multiValueRow"));

var _multiValueTable = _interopRequireDefault(require("./multiValueTable"));

var _panel = _interopRequireDefault(require("./panel"));

var _radio = _interopRequireDefault(require("./radio"));

var _resourceAdd = _interopRequireDefault(require("./resourceAdd"));

var _signature = _interopRequireDefault(require("./signature"));

var _survey = _interopRequireDefault(require("./survey"));

var _tab = _interopRequireDefault(require("./tab"));

var _table = _interopRequireDefault(require("./table"));

var _well = _interopRequireDefault(require("./well"));

var _wizard = _interopRequireDefault(require("./wizard"));

var _cssClasses = _interopRequireDefault(require("./cssClasses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
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
  handleBuilderSidebarScroll: function handleBuilderSidebarScroll(builder) {
    if (builder.scrollResizeObserver) {
      builder.scrollResizeObserver.disconnect();
    }

    builder.scrollResizeObserver = new _resizeObserverPolyfill.default(function () {
      setTimeout(function () {
        var _builder$refs = builder.refs,
            formHeight = _builder$refs.form.parentNode.clientHeight,
            _builder$refs$sidebar = _builder$refs.sidebar,
            sidebarHeight = _builder$refs$sidebar.clientHeight,
            style = _builder$refs$sidebar.parentNode.style;
        style.height = "".concat(Math.max(sidebarHeight + 20, formHeight), "px");
      });
    });
    builder.scrollResizeObserver.observe(builder.refs.form);
    builder.scrollResizeObserver.observe(builder.refs.sidebar);
  },
  clearBuilderSidebarScroll: function clearBuilderSidebarScroll(builder) {
    if (builder.scrollResizeObserver) {
      builder.scrollResizeObserver.disconnect();
      builder.scrollResizeObserver = null;
    }
  },
  defaultIconset: 'glyphicon',
  iconClass: _iconClass.default,
  cssClasses: _cssClasses.default,
  builder: _builder.default,
  builderComponent: _builderComponent.default,
  builderComponents: _builderComponents.default,
  builderEditForm: _builderEditForm.default,
  builderPlaceholder: _builderPlaceholder.default,
  builderSidebar: _builderSidebar.default,
  builderSidebarGroup: _builderSidebarGroup.default,
  columns: _columns.default,
  datagrid: _datagrid.default,
  day: _day.default,
  dialog: _dialog.default,
  editgrid: _editgrid.default,
  field: _field.default,
  file: _file.default,
  icon: _icon.default,
  input: _input.default,
  label: _label.default,
  message: _message.default,
  modaldialog: _modaldialog.default,
  modaledit: _modaledit.default,
  multiValueRow: _multiValueRow.default,
  multiValueTable: _multiValueTable.default,
  panel: _panel.default,
  radio: _radio.default,
  resourceAdd: _resourceAdd.default,
  signature: _signature.default,
  survey: _survey.default,
  tab: _tab.default,
  table: _table.default,
  well: _well.default,
  wizard: _wizard.default
};
exports.default = _default;
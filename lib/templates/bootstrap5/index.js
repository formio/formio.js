"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var _builderEditForm = _interopRequireDefault(require("./builderEditForm"));
var _builderSidebar = _interopRequireDefault(require("./builderSidebar"));
var _builderSidebarGroup = _interopRequireDefault(require("./builderSidebarGroup"));
var _builderWizard = _interopRequireDefault(require("./builderWizard"));
var _componentModal = _interopRequireDefault(require("./componentModal"));
var _datagrid = _interopRequireDefault(require("./datagrid"));
var _dialog = _interopRequireDefault(require("./dialog"));
var _file = _interopRequireDefault(require("./file"));
var _input = _interopRequireDefault(require("./input"));
var _label = _interopRequireDefault(require("./label"));
var _modalPreview = _interopRequireDefault(require("./modalPreview"));
var _radio = _interopRequireDefault(require("./radio"));
var _table = _interopRequireDefault(require("./table"));
var _cssClasses = _interopRequireDefault(require("./cssClasses"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
  builderEditForm: _builderEditForm["default"],
  builderSidebar: _builderSidebar["default"],
  builderSidebarGroup: _builderSidebarGroup["default"],
  builderWizard: _builderWizard["default"],
  componentModal: _componentModal["default"],
  datagrid: _datagrid["default"],
  dialog: _dialog["default"],
  file: _file["default"],
  input: _input["default"],
  label: _label["default"],
  modalPreview: _modalPreview["default"],
  radio: _radio["default"],
  table: _table["default"],
  cssClasses: _cssClasses["default"]
};
exports["default"] = _default;
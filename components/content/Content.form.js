"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _ContentEdit = _interopRequireDefault(require("./editForm/Content.edit.display"));

var _ContentEdit2 = _interopRequireDefault(require("./editForm/Content.edit.logic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  var editForm = _Components.default.baseEditForm.apply(_Components.default, [[{
    key: 'display',
    components: _ContentEdit.default
  }, {
    key: 'data',
    ignore: true
  }, {
    key: 'validation',
    ignore: true
  }, {
    key: 'logic',
    components: _ContentEdit2.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend)); // Add content as full width above the settings.


  editForm.components = [{
    weight: 0,
    type: 'textarea',
    editor: 'ckeditor',
    label: 'Content',
    hideLabel: true,
    input: true,
    key: 'html',
    as: 'html',
    rows: 3,
    tooltip: 'The HTML template for the result data items.'
  }].concat(editForm.components);
  return editForm;
}
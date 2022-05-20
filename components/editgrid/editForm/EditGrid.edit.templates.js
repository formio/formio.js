"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Evaluator = _interopRequireDefault(require("../../../utils/Evaluator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [{
  type: 'textarea',
  label: 'Header Template',
  key: 'templates.header',
  rows: 5,
  editor: 'ace',
  as: 'handlebars',
  clearOnHide: false,
  input: true,
  placeholder: '/*** Lodash Template Code ***/',
  description: 'Two available variables. "value" is the array of row data and "components" is the array of components in the grid.',
  tooltip: 'This is the <a href=\'https://lodash.com/docs/4.17.5#template\'>Lodash Template</a> used to render the header of the Edit grid.',
  customConditional: function customConditional(_ref) {
    var data = _ref.data;
    return (!_Evaluator.default.noeval || _Evaluator.default.protectedEval) && !data.displayAsTable;
  }
}, {
  type: 'textarea',
  label: 'Table Header Template',
  key: 'templates.tableHeader',
  rows: 6,
  editor: 'ace',
  as: 'handlebars',
  clearOnHide: false,
  input: true,
  placeholder: '/*** Lodash Template Code ***/',
  description: 'Two available variables. "value" is the array of row data and "components" is the array of components in the grid.',
  tooltip: 'This is the <a href=\'https://lodash.com/docs/4.17.5#template\'>Lodash Template</a> used to render the header of the Edit grid.',
  customConditional: function customConditional(_ref2) {
    var data = _ref2.data;
    return (!_Evaluator.default.noeval || _Evaluator.default.protectedEval) && data.displayAsTable;
  }
}, {
  type: 'textarea',
  label: 'Row Template',
  key: 'templates.row',
  rows: 5,
  editor: 'ace',
  as: 'handlebars',
  clearOnHide: false,
  input: true,
  placeholder: '/*** Lodash Template Code ***/',
  description: 'Three available variables. "row" is an object of one row\'s data, "components"' + ' is the array of components in the grid and "state" is current row\'s state (can be "draft" or "saved").' + ' To add click events, add the classes "editRow" and "removeRow" to elements.',
  tooltip: 'This is the <a href=\'https://lodash.com/docs/4.17.5#template\'>Lodash Template</a> used to render each row of the Edit grid.',
  customConditional: function customConditional(_ref3) {
    var data = _ref3.data;
    return (!_Evaluator.default.noeval || _Evaluator.default.protectedEval) && !data.displayAsTable;
  }
}, {
  type: 'textarea',
  label: 'Table Row Template',
  key: 'templates.tableRow',
  rows: 5,
  editor: 'ace',
  as: 'handlebars',
  clearOnHide: false,
  input: true,
  placeholder: '/*** Lodash Template Code ***/',
  description: 'Three available variables. "row" is an object of one row\'s data, "components"' + ' is the array of components in the grid and "state" is current row\'s state (can be "draft" or "saved").' + ' To add click events, add the classes "editRow" and "removeRow" to elements.',
  tooltip: 'This is the <a href=\'https://lodash.com/docs/4.17.5#template\'>Lodash Template</a> used to render each row of the Edit grid.',
  customConditional: function customConditional(_ref4) {
    var data = _ref4.data;
    return (!_Evaluator.default.noeval || _Evaluator.default.protectedEval) && data.displayAsTable;
  }
}, {
  type: 'textarea',
  label: 'Footer Template',
  key: 'templates.footer',
  rows: 5,
  editor: 'ace',
  as: 'handlebars',
  input: true,
  placeholder: '/*** Lodash Template Code ***/',
  description: 'Two available variables. "value" is the array of row data and "components" is the array of components in the grid.',
  tooltip: 'This is the <a href=\'https://lodash.com/docs/4.17.5#template\'>Lodash Template</a> used to render the footer of the Edit grid.',
  customConditional: function customConditional() {
    return !_Evaluator.default.noeval || _Evaluator.default.protectedEval;
  }
}, {
  type: 'textfield',
  input: true,
  key: 'rowClass',
  label: 'Row CSS Class',
  placeholder: 'Row CSS Class',
  tooltip: 'CSS class to add to the edit row wrapper.'
}, {
  type: 'textfield',
  input: true,
  key: 'addAnother',
  label: 'Add Another Text',
  placeholder: 'Add Another',
  tooltip: 'Set the text of the Add Another button.'
}, {
  weight: 70,
  type: 'checkbox',
  label: 'Display as Modal',
  tooltip: 'Display a modal to add or edit entries in the table',
  key: 'modal',
  input: true
}, {
  type: 'textfield',
  input: true,
  key: 'saveRow',
  label: 'Save Row Text',
  placeholder: 'Save',
  tooltip: 'Set the text of the Save Row button.'
}, {
  type: 'textfield',
  input: true,
  key: 'removeRow',
  label: 'Remove Row Text',
  placeholder: 'Remove',
  tooltip: 'Set the text of the remove Row button.'
}];
exports.default = _default;
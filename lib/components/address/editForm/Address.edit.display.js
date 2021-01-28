"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  weight: 20,
  type: 'checkbox',
  input: true,
  key: 'enableManualMode',
  label: 'Enable Manual Mode',
  tooltip: 'Should Manual Mode be enabled for that component or not.',
  customConditional: function customConditional(_ref) {
    var data = _ref.data;
    return !data.multiple;
  }
}, {
  weight: 30,
  type: 'textfield',
  input: true,
  key: 'switchToManualModeLabel',
  label: 'Switch To Manual Mode Label',
  placeholder: 'Switch To Manual Mode Label',
  tooltip: 'The label for the checkbox used to switch to manual mode.',
  validate: {
    required: true
  },
  customConditional: function customConditional(_ref2) {
    var data = _ref2.data;
    return Boolean(data.enableManualMode);
  }
}, {
  weight: 40,
  type: 'checkbox',
  input: true,
  key: 'disableClearIcon',
  label: 'Disable Clear Icon',
  tooltip: 'Clear Icon allows easily clear component\'s value.'
}, {
  type: 'textfield',
  label: 'Add Another Text',
  key: 'addAnother',
  tooltip: 'Set the text of the Add Another button.',
  placeholder: 'Add Another',
  weight: 410,
  input: true,
  customConditional: function customConditional(_ref3) {
    var data = _ref3.data;
    return data.multiple;
  }
}];
exports.default = _default;
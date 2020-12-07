"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'multiple',
  customConditional: function customConditional(_ref) {
    var data = _ref.data;
    return !data.enableManualMode;
  }
}, {
  type: 'address',
  label: 'Default Value',
  key: 'defaultValue',
  weight: 5,
  placeholder: 'Default Value',
  tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
  input: true,
  customDefaultValue: function customDefaultValue(_ref2) {
    var instance = _ref2.instance;
    return instance.manualModeEnabled ? {
      mode: 'autocomplete',
      address: {}
    } : {};
  }
}];
exports.default = _default;
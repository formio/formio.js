"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'multiple',
  ignore: true
}, {
  type: 'address',
  label: 'Default Value',
  key: 'defaultValue',
  weight: 5,
  placeholder: 'Default Value',
  tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
  input: true,
  customDefaultValue: function customDefaultValue(_ref) {
    var instance = _ref.instance;
    return instance.manualModeEnabled ? {
      mode: 'autocomplete',
      address: {}
    } : {};
  }
}];
exports.default = _default;
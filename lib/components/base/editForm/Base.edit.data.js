'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseEditData = undefined;

var _utils = require('./utils');

var BaseEditData = exports.BaseEditData = [{
  type: 'textfield',
  label: 'Default Value',
  key: 'defaultValue',
  placeholder: 'Default Value',
  tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
  input: true
}, _utils.EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue'), _utils.EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue')];
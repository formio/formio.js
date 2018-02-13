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
  weight: 100,
  placeholder: 'Default Value',
  tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
  input: true
}, _utils.EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue'), _utils.EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue'), {
  weight: 400,
  type: 'checkbox',
  label: 'Encrypt',
  tooltip: 'Encrypt this field on the server. This is two way encryption which is not be suitable for passwords.',
  key: 'autofocus',
  input: true
}, {
  type: 'checkbox',
  input: true,
  weight: 500,
  key: 'dbIndex',
  label: 'Database Index',
  tooltip: 'Set this field as an index within the database. Increases performance for submission queries.'
}];
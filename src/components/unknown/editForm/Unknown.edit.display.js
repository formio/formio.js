"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'customComponentDescription',
  label: 'Custom component description',
  input: false,
  tag: 'p',
  content: 'Custom components can be used to render special fields or widgets inside your app. ' + 'For information on how to display in an app, see ' + '<a href="http://help.form.io/userguide/#custom" target="_blank">' + 'custom component documentation' + '</a>.',
  type: 'htmlelement',
  weight: 5
}, {
  type: 'textarea',
  as: 'json',
  editor: 'ace',
  weight: 10,
  input: true,
  key: 'componentJson',
  label: 'Custom Element JSON',
  tooltip: 'Enter the JSON for this custom element.'
}, {
  key: 'label',
  ignore: true
}, {
  key: 'hideLabel',
  ignore: true
}, {
  key: 'labelPosition',
  ignore: true
}, {
  key: 'labelWidth',
  ignore: true
}, {
  key: 'labelMargin',
  ignore: true
}, {
  key: 'placeholder',
  ignore: true
}, {
  key: 'description',
  ignore: true
}, {
  key: 'tooltip',
  ignore: true
}, {
  key: 'errorLabel',
  ignore: true
}, {
  key: 'customClass',
  ignore: true
}, {
  key: 'tabindex',
  ignore: true
}, {
  key: 'persistent',
  ignore: true
}, {
  key: 'multiple',
  ignore: true
}, {
  key: 'clearOnHide',
  ignore: true
}, {
  key: 'protected',
  ignore: true
}, {
  key: 'hidden',
  ignore: true
}, {
  key: 'mask',
  ignore: true
}, {
  key: 'dataGridLabel',
  ignore: true
}, {
  key: 'disabled',
  ignore: true
}, {
  key: 'autofocus',
  ignore: true
}, {
  key: 'tableView',
  ignore: true
}, {
  key: 'alwaysEnabled',
  ignore: true
}];
exports.default = _default;
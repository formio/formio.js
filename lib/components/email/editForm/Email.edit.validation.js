"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'validate.minWords',
  ignore: true
}, {
  key: 'validate.maxWords',
  ignore: true
}, {
  type: 'panel',
  label: 'Kickbox',
  title: 'Kickbox',
  weight: 102,
  key: 'kickbox',
  components: [{
    type: 'checkbox',
    label: 'Enable',
    tooltip: 'Enable Kickbox validation for this email field.',
    description: 'Validate this email using the Kickbox email validation service.',
    key: 'kickbox.enabled'
  }]
}];
exports.default = _default;
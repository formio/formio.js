"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  type: 'checkbox',
  label: 'Disable Adding / Removing Rows',
  key: 'disableAddingRemovingRows',
  tooltip: 'Check if you want to hide Add Another button and Remove Row button',
  weight: 405,
  input: true
}, {
  type: 'checkbox',
  label: 'Show key column before value',
  key: 'keyBeforeValue',
  tooltip: 'Check if you would like to show the Key before the Value column.',
  weight: 406,
  input: true
}, {
  type: 'textfield',
  label: 'Add Another Text',
  key: 'addAnother',
  tooltip: 'Set the text of the Add Another button.',
  placeholder: 'Add Another',
  weight: 410,
  input: true,
  customConditional: 'show = !data.disableAddingRemovingRows'
}];
exports.default = _default;
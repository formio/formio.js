"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable max-len */
var _default = [
  {
  weight: 0,
  type: 'textfield',
  input: true,
  key: 'label',
  label: 'Label',
  placeholder: 'Field Label',
  tooltip: 'The label for this field that will appear next to it.',
  validate: {
    required: true
  }
},  
{
  weight: 200,
  type: 'textfield',
  input: true,
  key: 'description',
  label: 'Description',
  placeholder: 'Description for this field.',
  tooltip: 'The description is text that will appear below the input field.'
}, 
{
  weight: 300,
  type: 'textarea',
  input: true,
  key: 'tooltip',
  label: 'Tooltip',
  placeholder: 'To add a tooltip to this field, enter text here.',
  tooltip: 'Adds a tooltip to the side of this field.'
},];
/* eslint-enable max-len */

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable quotes, max-len */
var _default = [
  {
    weight: 59,
    type: 'checkbox',
    label: 'Hidden',
    tooltip: 'This field is hidden.',
    key: 'hidden',
    input: true
  }, 
  {
    weight: 100,
    type: 'checkbox',
    label: 'Required',
    tooltip: 'A required field must be filled in before the form can be submitted.',
    key: 'validate.required',
    input: true
  }, 
  {
    weight: 110,
    type: 'checkbox',
    label: 'Unique',
    tooltip: 'Makes sure the data submitted for this field is unique, and has not been submitted before.',
    key: 'unique',
    input: true
  },
  {
    weight: 130,
    type: 'checkbox',
    label: 'Read Only',
    tooltip: 'User cannot edit this field.',
    key: 'readOnly',
    input: true
  }, 
];

exports.default = _default;
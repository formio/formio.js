"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'label',
  ignore: true
}, {
  type: 'number',
  label: 'Number of Rows',
  key: 'numRows',
  input: true,
  weight: 1,
  placeholder: 'Number of Rows',
  tooltip: 'Enter the number or rows that should be displayed by this table.'
}, {
  type: 'number',
  label: 'Number of Columns',
  key: 'numCols',
  input: true,
  weight: 2,
  placeholder: 'Number of Columns',
  tooltip: 'Enter the number or columns that should be displayed by this table.'
}, {
  type: 'checkbox',
  label: 'Striped',
  key: 'striped',
  tooltip: 'This will stripe the table if checked.',
  input: true,
  weight: 701
}, {
  type: 'checkbox',
  label: 'Bordered',
  key: 'bordered',
  input: true,
  tooltip: 'This will border the table if checked.',
  weight: 702
}, {
  type: 'checkbox',
  label: 'Hover',
  key: 'hover',
  input: true,
  tooltip: 'Highlight a row on hover.',
  weight: 703
}, {
  type: 'checkbox',
  label: 'Condensed',
  key: 'condensed',
  input: true,
  tooltip: 'Condense the size of the table.',
  weight: 704
}];
exports.default = _default;
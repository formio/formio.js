"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  type: 'radio',
  key: 'modalLayout',
  input: true,
  label: 'Layout Type',
  inline: true,
  values: [{
    label: 'Fixed',
    value: 'fixed'
  }, {
    label: 'Fluid',
    value: 'fluid'
  }],
  defaultValue: 'fluid',
  tooltip: 'Fixed - modal with fixed width.\nFluid - Width of modal will be equal to preview width or minmal width.'
}, {
  type: 'number',
  key: 'width',
  label: 'Fixed Width',
  input: true,
  defaultValue: 300,
  conditional: {
    json: {
      '===': [{
        var: 'data.modalLayout'
      }, 'fixed']
    }
  }
}, {
  type: 'number',
  key: 'minWidth',
  label: 'Minimum Width',
  input: true,
  defaultValue: 300,
  conditional: {
    json: {
      '===': [{
        var: 'data.modalLayout'
      }, 'fluid']
    }
  }
}];
exports.default = _default;
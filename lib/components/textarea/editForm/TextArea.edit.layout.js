"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'overlay',
  components: [{
    type: 'checkbox',
    input: true,
    key: 'fixedSize',
    label: 'Fixed size',
    defaultValue: true,
    tooltip: 'This will fixed the set sizes of the component in PDF form.',
    weight: 415,
    conditional: {
      json: {
        '==': [{
          var: 'data.editor'
        }, '']
      }
    }
  }]
}];
exports.default = _default;
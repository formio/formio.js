"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("../../_classes/component/editForm/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var _default = [_utils.default.javaScriptValue('Custom Default Value', 'customDefaultValue', 'customDefaultValue', 120, '<p><h4>Example:</h4><pre>value = data.firstName + " " + data.lastName;</pre></p>', '<p><h4>Example:</h4><pre>{"cat": [{"var": "data.firstName"}, " ", {"var": "data.lastName"}]}</pre>'), _utils.default.javaScriptValue('Calculated Value', 'calculateValue', 'calculateValue', 130, '<p><h4>Example:</h4><pre>value = data.a + data.b + data.c;</pre></p>', '<p><h4>Example:</h4><pre>{"+": [{"var": "data.a"}, {"var": "data.b"}, {"var": "data.c"}]}</pre><p><a target="_blank" href="http://formio.github.io/formio.js/app/examples/calculated.html">Click here for an example</a></p>'), {
  weight: 140,
  type: 'checkbox',
  label: 'Clear Value When Hidden',
  key: 'clearOnHide',
  defaultValue: true,
  tooltip: 'When a field is hidden, clear the value.',
  input: true,
  clearOnHide: false,
  calculateValue: 'value = data.hidden ? false : value',
  conditional: {
    json: {
      '!': [{
        var: 'data.hidden'
      }]
    }
  }
}];
/* eslint-enable max-len */

exports.default = _default;
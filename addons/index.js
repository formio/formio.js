"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editForms = exports.default = void 0;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.function.name.js");

var _PasswordStrengthAddon = _interopRequireDefault(require("./PasswordStrength/PasswordStrengthAddon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editForms = [_PasswordStrengthAddon.default.info].map(function (_ref) {
  var components = _ref.components,
      name = _ref.name,
      defaultSettings = _ref.defaultSettings;
  return {
    type: 'form',
    key: 'settings',
    display: 'form',
    input: true,
    components: components,
    defaultValue: {
      data: defaultSettings
    },
    customConditional: function customConditional(_ref2) {
      var row = _ref2.row;
      return row.name.value === name;
    }
  };
});
exports.editForms = editForms;
var _default = {
  passwordStrength: _PasswordStrengthAddon.default
};
exports.default = _default;
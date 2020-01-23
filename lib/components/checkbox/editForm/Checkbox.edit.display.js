"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _builder = _interopRequireDefault(require("../../../utils/builder"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [{
  key: 'labelPosition',
  ignore: true
}, {
  key: 'placeholder',
  ignore: true
}, {
  type: 'select',
  input: true,
  weight: 350,
  label: 'Shortcut',
  key: 'shortcut',
  tooltip: 'Shortcut for this component.',
  dataSrc: 'custom',
  valueProperty: 'value',
  customDefaultValue: function customDefaultValue() {
    return '';
  },
  template: '{{ item.label }}',
  data: {
    custom: function custom(context) {
      return _builder.default.getAvailableShortcuts(_lodash.default.get(context, 'instance.options.editForm', {}), _lodash.default.get(context, 'instance.options.editComponent', {}));
    }
  }
}, {
  type: 'select',
  input: true,
  key: 'inputType',
  label: 'Input Type',
  tooltip: 'This is the input type used for this checkbox.',
  dataSrc: 'values',
  weight: 410,
  data: {
    values: [{
      label: 'Checkbox',
      value: 'checkbox'
    }, {
      label: 'Radio',
      value: 'radio'
    }]
  }
}, {
  type: 'textfield',
  input: true,
  key: 'name',
  label: 'Radio Key',
  tooltip: 'The key used to trigger the radio button toggle.',
  weight: 420,
  conditional: {
    json: {
      '===': [{
        var: 'data.inputType'
      }, 'radio']
    }
  }
}, {
  type: 'textfield',
  input: true,
  label: 'Radio Value',
  key: 'value',
  tooltip: 'The value used with this radio button.',
  weight: 430,
  conditional: {
    json: {
      '===': [{
        var: 'data.inputType'
      }, 'radio']
    }
  }
}];
exports.default = _default;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base2.default.apply(undefined, [[{
    label: 'Display',
    key: 'display',
    weight: 0,
    components: [{
      type: 'select',
      input: true,
      label: 'Options Label Position',
      key: 'optionsLabelPosition',
      tooltip: 'Position for the label for options for this field.',
      dataSrc: 'values',
      weight: 32,
      defaultValue: 'right',
      data: {
        values: [{ label: 'Top', value: 'top' }, { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }, { label: 'Bottom', value: 'bottom' }]
      }
    }, {
      type: 'datagrid',
      input: true,
      label: 'Values',
      key: 'values',
      tooltip: 'The radio button values that can be picked for this field. Values are text submitted with the form data. Labels are text that appears next to the radio buttons on the form.',
      weight: 33,
      defaultValue: [{ label: '', value: '' }],
      components: [{
        label: 'Label',
        key: 'label',
        input: true,
        type: 'textfield'
      }, {
        label: 'Value',
        key: 'value',
        input: true,
        type: 'textfield',
        calculateValue: { _camelCase: [{ var: 'row.label' }] }
      }, {
        type: 'select',
        input: true,
        weight: 180,
        label: 'Shortcut',
        key: 'shortcut',
        tooltip: 'The shortcut key for this option.',
        dataSrc: 'custom',
        data: {
          custom: function custom(values, component, data, row, utils, instance, form) {
            return BuilderUtils.getAvailableShortcuts(form, component);
          }
        }
      }]
    }, {
      type: 'checkbox',
      input: true,
      key: 'inline',
      label: 'Inline Layout',
      tooltip: 'Displays the checkboxes/radios horizontally.',
      weight: 650
    }]
  }]].concat(extend));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
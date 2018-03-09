'use strict';

var _builder = require('../../utils/builder');

var BaseEditForm = require('../base/Base.form');
module.exports = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return BaseEditForm.apply(undefined, [{
    components: [{
      weight: 0,
      type: 'tabs',
      key: 'tabs',
      components: [{
        label: 'Display',
        key: 'display',
        components: [{
          type: 'number',
          label: 'Label Width',
          input: true,
          key: 'labelWidth',
          tooltip: 'The width of label on line in percentages.',
          suffix: '%',
          placeholder: 30,
          weight: 31,
          conditional: {
            json: {
              and: [{ '!==': [{ var: 'data.labelPosition' }, 'top'] }, { '!==': [{ var: 'data.labelPosition' }, 'bottom'] }]
            }
          },
          validate: {
            min: 0,
            max: 100
          }
        }, {
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
              custom: function custom(component, data) {
                return _builder.BuilderUtils.getAvailableShortcuts(data.__form, component.component);
              }
            }
          }]
        }]
      }]
    }]
  }].concat(extend));
};
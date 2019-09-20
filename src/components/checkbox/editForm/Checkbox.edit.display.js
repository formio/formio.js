import BuilderUtils from '../../../utils/builder';
import _ from 'lodash';

export default [
  {
    key: 'labelPosition',
    ignore: true,
  },
  {
    key: 'placeholder',
    ignore: true,
  },
  {
    type: 'select',
    input: true,
    weight: 350,
    label: 'Shortcut',
    key: 'shortcut',
    tooltip: 'Shortcut for this component.',
    dataSrc: 'custom',
    valueProperty: 'value',
    customDefaultValue: () => '',
    template: '{{ item.label }}',
    data: {
      custom(context) {
        return BuilderUtils.getAvailableShortcuts(
          _.get(context, 'instance.options.editForm', {}),
          _.get(context, 'instance.options.editComponent', {})
        );
      },
    },
  },
  {
    type: 'select',
    input: true,
    key: 'inputType',
    label: 'Input Type',
    tooltip: 'This is the input type used for this checkbox.',
    dataSrc: 'values',
    weight: 410,
    data: {
      values: [
        { label: 'Checkbox', value: 'checkbox' },
        { label: 'Radio', value: 'radio' },
      ],
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'name',
    label: 'Radio Key',
    tooltip: 'The key used to trigger the radio button toggle.',
    weight: 420,
    conditional: {
      json: { '===': [{ var: 'data.inputType' }, 'radio'] },
    },
  },
  {
    type: 'textfield',
    input: true,
    label: 'Radio Value',
    key: 'value',
    tooltip: 'The value used with this radio button.',
    weight: 430,
    conditional: {
      json: { '===': [{ var: 'data.inputType' }, 'radio'] },
    },
  },
];

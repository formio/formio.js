import _ from 'lodash';
export default [
  {
    weight: 400,
    type: 'select',
    input: true,
    key: 'widget.type',
    label: 'Widget',
    placeholder: 'Select a widget',
    tooltip: 'The widget is the display UI used to input the value of the field.',
    defaultValue: 'input',
    onChange: (context) => {
      context.data.widget = _.pick(context.data.widget, 'type');
    },
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Input Field', value: 'input' },
        { label: 'Calendar Picker', value: 'calendar' },
      ]
    },
    conditional: {
      json: { '===': [{ var: 'data.type' }, 'textfield'] }
    }
  },
];

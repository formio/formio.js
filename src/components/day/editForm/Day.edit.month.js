export default [
  {
    wieght: 200,
    type: 'select',
    datasrc: 'values',
    key: 'fields.month.type',
    label: 'Type of input',
    data: {
      values: [
        {
          label: 'Number',
          value: 'number'
        },
        {
          label: 'Select',
          value: 'select'
        },
      ]
    }
  },
  {
    weight: 210,
    type: 'textfield',
    input: true,
    key: 'fields.month.placeholder',
    label: 'Placeholder',
    placeholder: 'Month Placeholder',
    tooltip: 'The placeholder text that will appear when Month field is empty.'
  },
  {
    weight: 215,
    type: 'checkbox',
    label: 'Hidden',
    tooltip: 'Hide the Month part of the component.',
    key: 'fields.month.hide',
    input: true
  },
];

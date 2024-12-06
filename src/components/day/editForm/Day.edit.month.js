import _ from 'lodash';

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
          value: 'number',
        },
        {
          label: 'Select',
          value: 'select',
        },
      ],
    },
  },
  {
    weight: 210,
    type: 'textfield',
    input: true,
    key: 'fields.month.placeholder',
    label: 'Placeholder',
    placeholder: 'Month Placeholder',
    tooltip: 'The placeholder text that will appear when Month field is empty.',
  },
  {
    weight: 215,
    type: 'checkbox',
    label: 'Hidden',
    tooltip: 'Hide the Month part of the component.',
    key: 'fields.month.hide',
    onChange: ({ data }) => {
      if (data.defaultValue) {
        const defaultValueParts = data.defaultValue.split('/');
        if (!data.fields.month.hide && defaultValueParts.length !== 3) {
          const newDefaultValue = ['00'];
          if (!data.fields.day.hide) {
            data.dayFirst
              ? newDefaultValue.unshift(defaultValueParts[0])
              : newDefaultValue.push(defaultValueParts[0]);
          }
          if (!data.fields.year.hide) {
            newDefaultValue.push(defaultValueParts[1]);
          }
          _.set(data, 'defaultValue', newDefaultValue.join('/'));
        }
      }
    },
    input: true,
  },
];

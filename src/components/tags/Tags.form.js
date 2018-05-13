import baseEditForm from '../base/Base.form';
export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      weight: 0,
      components: [
        {
          weight: 410,
          type: 'textfield',
          input: true,
          key: 'delimeter',
          label: 'Delimiter',
          tooltip: 'What is used to separate the tags.</a>'
        },
        {
          weight: 420,
          type: 'number',
          input: true,
          key: 'maxTags',
          label: 'Max Tags',
          defaultValue: 0,
          tooltip: 'The maximum amount of tags that can be added. 0 for infinity.'
        },
        {
          weight: 430,
          type: 'select',
          input: true,
          key: 'storeas',
          label: 'Store As',
          dataSrc: 'values',
          data: {
            values: [
              {label: 'String (CSV)', value: 'string'},
              {label: 'Array of Tags', value: 'array'}
            ]
          }
        }
      ]
    }
  ]);
}

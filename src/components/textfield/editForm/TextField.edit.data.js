export default [
  {
    type: 'select',
    label: 'Input Format',
    key: 'inputFormat',
    weight: 105,
    placeholder: 'Input Format',
    tooltip: 'Force the output of this field to be sanitized in a specific format.',
    template: '<span>{{ item.label }}</span>',
    data: {
      values: [
        {
          value: 'plain',
          label: 'Plain'
        },
        {
          value: 'html',
          label: 'HTML'
        },{
          value: 'raw',
          label: 'Raw (Insecure)'
        }
      ]
    },
    defaultValue: 'plain',
    input: true
  }
];

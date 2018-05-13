import baseEditForm from '../base/Base.form';
export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      weight: 0,
      components: [
        {
          type: 'datagrid',
          input: true,
          label: 'Questions',
          key: 'questions',
          tooltip: 'The questions you would like to as in this survey question.',
          weight: 50,
          defaultValue: [{label: '', value: ''}],
          components: [
            {
              label: 'Label',
              key: 'label',
              input: true,
              type: 'textfield'
            },
            {
              label: 'Value',
              key: 'value',
              input: true,
              type: 'textfield',
              calculateValue: {_camelCase: [{var: 'row.label'}]}
            }
          ]
        },
        {
          type: 'datagrid',
          input: true,
          label: 'Values',
          key: 'values',
          tooltip: 'The values that can be selected per question. Example: \'Satisfied\', \'Very Satisfied\', etc.',
          weight: 50,
          defaultValue: [{label: '', value: ''}],
          components: [
            {
              label: 'Label',
              key: 'label',
              input: true,
              type: 'textfield'
            },
            {
              label: 'Value',
              key: 'value',
              input: true,
              type: 'textfield',
              calculateValue: {_camelCase: [{var: 'row.label'}]}
            }
          ]
        }
      ]
    }
  ]);
}

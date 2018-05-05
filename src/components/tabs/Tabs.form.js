import ComponentsEditForm from '../Components.form';
export default function(...extend) {
  return ComponentsEditForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      weight: 0,
      components: [
        {
          key: 'components',
          type: 'datagrid',
          input: true,
          label: 'Tabs',
          weight: 50,
          components: [
            {
              type: 'textfield',
              input: true,
              key: 'label',
              label: 'Label'
            },
            {
              type: 'textfield',
              input: true,
              key: 'key',
              label: 'Key',
              calculateValue: {_camelCase: [{var: 'row.label'}]}
            }
          ]
        }
      ]
    }
  ]);
};

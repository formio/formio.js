import ComponentsEditForm from '../Components.form';
export default function(...extend) {
  return ComponentsEditForm([
    {
      label: 'Display',
      key: 'display',
      components: [
        {
          key: 'components',
          type: 'datagrid',
          input: true,
          label: 'Tabs',
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
  ], ...extend);
};

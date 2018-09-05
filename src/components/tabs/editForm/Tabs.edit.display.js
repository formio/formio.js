export default [
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
        calculateValue: { _camelCase: [{ var: 'row.label' }] }
      }
    ]
  },
  {
    type: 'checkbox',
    input: true,
    label: 'Render all tabs content',
    key: 'renderAllTabsContent',
    tooltip: 'When set, each tab\'s content will be rendered on the first load. By default, only the first tab has its content rendered',
    weight: 11
  }
];

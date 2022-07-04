export default {
  type: 'datagrid',
  input: true,
  label: 'Data Source Values',
  key: 'data.values',
  tooltip: 'Values to use as the data source. Labels are shown in the select field. Values are the corresponding values saved with the submission.',
  weight: 10,
  reorder: true,
  defaultValue: [{label: '', value: ''}],
  components: [
    {
      label: 'Label',
      key: 'label',
      input: true,
      type: 'textfield',
    },
    {
      label: 'Value',
      key: 'value',
      input: true,
      type: 'textfield',
      allowCalculateOverride: true,
      calculateValue: {_camelCase: [{var: 'row.label'}]},
    },
  ]
}

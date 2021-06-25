export default {
  type: 'form',
  components: [
    {
      label: 'Data Grid',
      reorder: false,
      addAnotherPosition: 'bottom',
      layoutFixed: false,
      enableRowGroups: false,
      initEmpty: false,
      tableView: false,
      defaultValue: [
        {
          label: '',
          value: ''
        }
      ],
      allowCalculateOverride: true,
      key: 'dataGrid',
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'Label',
          tableView: true,
          key: 'label',
          type: 'textfield',
          input: true
        },
        {
          label: 'Value',
          tableView: true,
          calculateValue: "value = (row.label || '').toLowerCase();",
          key: 'value',
          type: 'textfield',
          input: true
        }
      ]
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false
    }
  ],
  title: 'FIO-3254',
  display: 'form',
};

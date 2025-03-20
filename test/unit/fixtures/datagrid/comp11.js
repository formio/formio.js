export default {
  title: 'Select in Data Grid',
  name: 'selectInDataGrid',
  path: 'selectInDataGrid',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Data Grid',
      reorder: false,
      addAnotherPosition: 'bottom',
      layoutFixed: false,
      enableRowGroups: false,
      initEmpty: false,
      tableView: false,
      key: 'dataGrid',
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'Select',
          widget: 'choicesjs',
          tableView: true,
          data: {
            values: [
              {
                label: 'Individual',
                value: 'individual'
              },
              {
                label: 'Entity',
                value: 'entity'
              }
            ]
          },
          validateWhenHidden: false,
          key: 'select',
          type: 'select',
          input: true,
          defaultValue: 'entity'
        },
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
  ]
};
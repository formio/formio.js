export default {
  title: 'Conditional Data Grid',
  name: 'conditionalDataGrid',
  path: 'conditionalDataGrid',
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
      defaultValue: [
        {}
      ],
      validateWhenHidden: false,
      key: 'dataGrid',
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'Container',
          tableView: false,
          validateWhenHidden: false,
          key: 'container',
          type: 'container',
          input: true,
          components: [
            {
              label: "Checkbox",
              tableView: false,
              validateWhenHidden: false,
              key: "checkbox",
              type: "checkbox",
              input: true
            },
            {
              label: 'Text Field',
              applyMaskOn: 'change',
              tableView: true,
              validateWhenHidden: false,
              key: 'textField',
              conditional: {
                show: true,
                conjunction: 'all',
                conditions: [
                  {
                    component: 'dataGrid.container.checkbox',
                    operator: 'isEqual',
                    value: true
                  }
                ]
              },
              type: 'textfield',
              input: true
            }
          ]
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
  ]
};

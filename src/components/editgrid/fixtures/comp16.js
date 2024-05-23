export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Edit Grid',
      tableView: false,
      rowDrafts: false,
      key: 'editGrid',
      type: 'editgrid',
      displayAsTable: false,
      input: true,
      components: [
        {
          label: 'Text Field',
          applyMaskOn: 'change',
          tableView: true,
          key: 'textField1',
          type: 'textfield',
          input: true
        },
        {
          label: 'Text Field',
          applyMaskOn: 'change',
          tableView: true,
          key: 'textField2',
          conditional: {
            show: true,
            conjunction: 'all',
            conditions: [
              {
                component: 'editGrid.textField1',
                operator: 'isEmpty'
              }
            ]
          },
          type: 'textfield',
          input: true
        },
        {
          label: 'Checkbox',
          tableView: false,
          defaultValue: false,
          key: 'checkbox1',
          type: 'checkbox',
          input: true
        },
        {
          label: 'Checkbox',
          tableView: false,
          defaultValue: false,
          key: 'checkbox2',
          conditional: {
            show: true,
            conjunction: 'all',
            conditions: [
              {
                component: 'editGrid.checkbox1',
                operator: 'isEqual',
                value: false
              }
            ]
          },
          type: 'checkbox',
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
};

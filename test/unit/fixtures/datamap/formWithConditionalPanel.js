export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Checkbox',
      tableView: false,
      key: 'checkbox',
      type: 'checkbox',
      input: true
    },
    {
      label: 'Data Map',
      tableView: false,
      key: 'dataMap1',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'checkbox',
            operator: 'isEqual',
            value: 'true'
          }
        ]
      },
      type: 'datamap',
      input: true,
      valueComponent: {
        type: 'textfield',
        key: 'value',
        label: 'Value',
        input: true,
        hideLabel: true,
        tableView: true
      }
    },
    {
      collapsible: false,
      key: 'panel',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'checkbox',
            operator: 'isEqual',
            value: 'true'
          }
        ]
      },
      type: 'panel',
      label: 'Panel',
      input: false,
      tableView: false,
      components: [
        {
          label: 'Data Map',
          tableView: false,
          key: 'dataMap',
          type: 'datamap',
          input: true,
          valueComponent: {
            type: 'textfield',
            key: 'value',
            label: 'Value',
            input: true,
            hideLabel: true,
            tableView: true
          }
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

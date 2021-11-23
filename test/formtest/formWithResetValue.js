export default {
  type: 'form',
  components: [
    {
      label: 'Show Panel',
      widget: 'choicesjs',
      tableView: true,
      data: {
        values: [
          {
            label: 'Yes',
            value: 'yes'
          },
          {
            label: 'No',
            value: 'no'
          }
        ]
      },
      selectThreshold: 0.3,
      key: 'showPanel',
      type: 'select',
      indexeddb: {
        filter: {

        }
      },
      input: true
    },
    {
      collapsible: false,
      key: 'panel',
      conditional: {
        show: true,
        when: 'showPanel',
        eq: 'yes'
      },
      type: 'panel',
      label: 'Panel',
      input: false,
      tableView: false,
      components: [
        {
          label: 'Text Field',
          tableView: true,
          key: 'textField',
          type: 'textfield',
          input: true
        },
        {
          label: 'Text Area',
          autoExpand: false,
          tableView: true,
          key: 'textArea',
          type: 'textarea',
          input: true
        }
      ]
    },
    {
      label: 'Reset',
      action: 'reset',
      showValidations: false,
      theme: 'danger',
      tableView: false,
      key: 'reset',
      type: 'button',
      input: true
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
  title: 'FJS-1369',
  display: 'form',
};

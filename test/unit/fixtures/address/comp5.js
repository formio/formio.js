export default {
  type: 'form',
  display: 'form',
  title: 'FIO-9527',
  name: 'fio9527',
  path: 'fio9527',
  components: [
    {
      label: 'Address',
      tableView: false,
      multiple: true,
      provider: 'nominatim',
      validateWhenHidden: false,
      key: 'address',
      providerOptions: {
        params: {
          autocompleteOptions: {}
        }
      },
      type: 'address',
      input: true,
      components: [
        {
          label: 'Address 1',
          tableView: false,
          key: 'address1',
          type: 'textfield',
          input: true,
          customConditional: "show = _.get(instance, 'parent.manualMode', false);"
        },
        {
          label: 'Address 2',
          tableView: false,
          key: 'address2',
          type: 'textfield',
          input: true,
          customConditional: "show = _.get(instance, 'parent.manualMode', false);"
        },
        {
          label: 'City',
          tableView: false,
          key: 'city',
          type: 'textfield',
          input: true,
          customConditional: "show = _.get(instance, 'parent.manualMode', false);"
        },
        {
          label: 'State',
          tableView: false,
          key: 'state',
          type: 'textfield',
          input: true,
          customConditional: "show = _.get(instance, 'parent.manualMode', false);"
        },
        {
          label: 'Country',
          tableView: false,
          key: 'country',
          type: 'textfield',
          input: true,
          customConditional: "show = _.get(instance, 'parent.manualMode', false);"
        },
        {
          label: 'Zip Code',
          tableView: false,
          key: 'zip',
          type: 'textfield',
          input: true,
          customConditional: "show = _.get(instance, 'parent.manualMode', false);"
        }
      ],
      defaultValue: [
        {}
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
}

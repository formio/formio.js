export default {
  type: 'form',
  components: [
    {
      label: 'Address',
      tableView: false,
      provider: 'nominatim',
      key: 'address',
      type: 'address',
      providerOptions: {
        params: {
          autocompleteOptions: {},
        },
      },
      input: true,
      components: [
        {
          label: 'Address 1',
          tableView: false,
          key: 'address1',
          type: 'textfield',
          input: true,
          customConditional:
            "show = _.get(instance, 'parent.manualMode', false);",
        },
        {
          label: 'Address 2',
          tableView: false,
          key: 'address2',
          type: 'textfield',
          input: true,
          customConditional:
            "show = _.get(instance, 'parent.manualMode', false);",
        },
        {
          label: 'City',
          tableView: false,
          key: 'city',
          type: 'textfield',
          input: true,
          customConditional:
            "show = _.get(instance, 'parent.manualMode', false);",
        },
        {
          label: 'State',
          tableView: false,
          key: 'state',
          type: 'textfield',
          input: true,
          customConditional:
            "show = _.get(instance, 'parent.manualMode', false);",
        },
        {
          label: 'Country',
          tableView: false,
          key: 'country',
          type: 'textfield',
          input: true,
          customConditional:
            "show = _.get(instance, 'parent.manualMode', false);",
        },
        {
          label: 'Zip Code',
          tableView: false,
          key: 'zip',
          type: 'textfield',
          input: true,
          customConditional:
            "show = _.get(instance, 'parent.manualMode', false);",
        },
      ],
    },
    {
      label: 'Text Field',
      tableView: true,
      key: 'textField',
      conditional: {
        show: false,
        when: 'address',
      },
      type: 'textfield',
      input: true,
    },
    {
      label: 'Submit',
      showValidations: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true,
    },
  ],
  title: 'testconditional',
  display: 'form',
  name: 'testconditional',
  path: 'testconditional',
};

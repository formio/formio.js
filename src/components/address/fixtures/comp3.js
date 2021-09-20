export default {
  _id: '610cd91f1c0d42a708a148de',
  type: 'form',
  components: [
    {
      label: 'Address',
      tableView: false,
      modalEdit: true,
      provider: 'google',
      key: 'address',
      type: 'address',
      providerOptions: {
        params: {
          autocompleteOptions: {},
          key: 'AIzaSyBNL2e4MnmyPj9zN7SVAe428nCSLP1X144',
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
            'show = _.get(instance, "parent.manualMode", false);',
        },
        {
          label: 'Address 2',
          tableView: false,
          key: 'address2',
          type: 'textfield',
          input: true,
          customConditional:
            'show = _.get(instance, "parent.manualMode", false);',
        },
        {
          label: 'City',
          tableView: false,
          key: 'city',
          type: 'textfield',
          input: true,
          customConditional:
            'show = _.get(instance, "parent.manualMode", false);',
        },
        {
          label: 'State',
          tableView: false,
          key: 'state',
          type: 'textfield',
          input: true,
          customConditional:
            'show = _.get(instance, "parent.manualMode", false);',
        },
        {
          label: 'Country',
          tableView: false,
          key: 'country',
          type: 'textfield',
          input: true,
          customConditional:
            'show = _.get(instance, "parent.manualMode", false);',
        },
        {
          label: 'Zip Code',
          tableView: false,
          key: 'zip',
          type: 'textfield',
          input: true,
          customConditional:
            'show = _.get(instance, "parent.manualMode", false);',
        },
      ],
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false,
    },
  ],
  title: 'FIO-3280',
  display: 'form',
  name: 'fio3280',
  path: 'fio3280',
};

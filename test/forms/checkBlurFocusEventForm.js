export default {
  _id: '637b36e983a235f7b1c13af9',
  title: 'yyyy',
  name: 'yyyy',
  path: 'yyyy',
  type: 'form',
  display: 'form',
  owner: '637b2e6b48c1227e60b1f910',
  components: [
    {
      label: 'Select Choices',
      widget: 'choicesjs',
      tableView: true,
      data: {
        values: [
          {
            label: 'a',
            value: 'a',
          },
          {
            label: 'b',
            value: 'b',
          },
          {
            label: 'c',
            value: 'c',
          },
        ],
      },
      key: 'selectChoices',
      type: 'select',
      input: true,
    },
    {
      label: 'Select HTML',
      widget: 'html5',
      tableView: true,
      data: {
        values: [
          {
            label: 'a',
            value: 'a',
          },
          {
            label: 'b',
            value: 'b',
          },
          {
            label: 'c',
            value: 'c',
          },
        ],
      },
      key: 'selectHtml',
      type: 'select',
      input: true,
    },
    {
      label: 'Address',
      enableManualMode: true,
      tableView: false,
      provider: 'nominatim',
      key: 'address',
      type: 'address',
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
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false,
    },
  ],
  created: '2022-11-21T08:29:29.060Z',
  modified: '2022-11-21T09:36:12.397Z',
  machineName: 'vzpuetvqeldqjon:yyyy',
};

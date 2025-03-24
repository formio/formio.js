export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      key: 'textField',
      type: 'textfield',
      input: true,
    },
    {
      label: 'Day',
      hideInputLabels: false,
      inputsLabelPosition: 'top',
      useLocaleSettings: false,
      tableView: false,
      fields: {
        day: {
          hide: true,
        },
        month: {
          hide: false,
        },
        year: {
          hide: false,
        },
      },
      defaultValue: '00/00/0000',
      key: 'day',
      logic: [
        {
          name: 'Disable when Test is empty',
          trigger: {
            type: 'simple',
            simple: {
              show: true,
              conjunction: 'all',
              conditions: [
                {
                  component: 'textField',
                  operator: 'isEmpty',
                },
              ],
            },
          },
          actions: [
            {
              name: 'Disable',
              type: 'property',
              property: {
                label: 'Disabled',
                value: 'disabled',
                type: 'boolean',
              },
              state: true,
            },
          ],
        },
      ],
      type: 'day',
      input: true,
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
};

export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Checkbox',
      tableView: false,
      key: 'checkbox',
      type: 'checkbox',
      input: true,
    },
    {
      label: 'Container',
      tableView: false,
      key: 'container',
      conditional: {
        show: true,
        when: 'checkbox',
        eq: 'true',
      },
      type: 'container',
      input: true,
      components: [
        {
          label: 'Text Field',
          applyMaskOn: 'change',
          tableView: true,
          key: 'textField',
          type: 'textfield',
          input: true,
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
};

export default {
  type: 'form',
  display: 'form',
  title: 'Nested form with conditional',
  components: [
    {
      label: 'Hide child form field',
      tableView: false,
      key: 'hideChildFormField',
      type: 'checkbox',
      input: true,
      defaultValue: false,
    },
    {
      input: true,
      key: 'form',
      label: 'Form',
      type: 'form',
      components: [
        {
          label: 'Text Field',
          tableView: true,
          key: 'textField',
          customConditional: 'show = !rootData.hideChildFormField',
          type: 'textfield',
          input: true,
        },
      ],
    },
  ],
};

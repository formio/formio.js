export default {
  type: 'form',
  components: [
    {
      label: 'Text Field',
      tableView: true,
      truncateMultipleSpaces: true,
      validate: {
        required: true
      },
      key: 'textField1',
      type: 'textfield',
      input: true
    },
    {
      label: 'Text Field',
      tableView: true,
      validate: {
        minLength: 5,
        maxLength: 10
      },
      key: 'textField',
      type: 'textfield',
      input: true,
      truncateMultipleSpaces: true
    },
    {
      label: 'Text Area',
      autoExpand: false,
      tableView: true,
      validate: {
        minLength: 5,
        maxLength: 10
      },
      key: 'textArea',
      type: 'textarea',
      input: true,
      truncateMultipleSpaces: true
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
  title: 'FIO-2503',
  display: 'form',
};

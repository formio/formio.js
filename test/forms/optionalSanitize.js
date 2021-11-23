export default {
  type: 'form',
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
    },
    {
      label: 'Checkbox',
      tableView: false,
      key: 'checkbox',
      type: 'checkbox',
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
  title: 'Optional Sanitize Test',
  display: 'form',
};

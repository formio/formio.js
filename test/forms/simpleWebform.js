export default {
  components: [
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      validateWhenHidden: false,
      key: 'textField',
      type: 'textfield',
      input: true
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'testSubmit',
      disableOnInvalid: true,
      input: true,
      tableView: false
    }
  ],
  display: 'form',
  type: 'form',
};
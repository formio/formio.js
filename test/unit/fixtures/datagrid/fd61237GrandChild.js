export default {
  title: 'Grand Child Form',
  name: 'grandChildForm',
  path: 'grandchildform',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      validate: { required: true },
      validateWhenHidden: false,
      key: 'textField',
      type: 'textfield',
      input: true,
    }, {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false,
    },
  ],
};

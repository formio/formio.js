export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      key: 'test',
      type: 'textfield',
      input: true,
    },
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      key: '1234',
      type: 'textfield',
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

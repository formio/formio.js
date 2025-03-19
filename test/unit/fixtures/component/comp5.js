export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Text Field',
      description: "<img <img src='https://somesite' onerror='var _ee = 2' >",
      tooltip: "<img src='https://somesite' onerror='var _ee = 1 >",
      applyMaskOn: 'change',
      tableView: true,
      key: 'textField',
      type: 'textfield',
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
};

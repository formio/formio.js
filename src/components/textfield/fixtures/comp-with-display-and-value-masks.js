export default {
  type: 'form',
  components: [
    {
      label: 'Text Field with Input Mask',
      tableView: true,
      key: 'textField',
      type: 'textfield',
      inputMask: '999-999',
      input: true
    },
    {
      label: 'Text Field with Display Mask',
      tableView: true,
      key: 'textFieldDisplayMask',
      type: 'textfield',
      displayMask: '999-999',
      input: true
    },
    {
      label: 'Text Field with Display and Input Masks',
      tableView: true,
      key: 'textFieldDisplayAndInputMasks',
      type: 'textfield',
      displayMask: '+9(99)-999',
      inputMask: '999-999',
      input: true
    },
    {
      label: 'Text Field with Display and Input Masks',
      tableView: true,
      key: 'textFieldDisplayAndInputMasksReverse',
      type: 'textfield',
      displayMask: '999-999',
      inputMask: '+9(99)-999',
      input: true
    },
    { type: 'button', label: 'Submit', key: 'submit', disableOnInvalid: true, input: true, tableView: false }
  ],
  revisions: '',
  _vid: 0,
  title: 'Value And Display Masks',
  display: 'form',
  name: 'valueAndDisplayMasks',
  path: 'valueanddisplaymasks',
};

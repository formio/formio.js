export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Upload',
      tableView: false,
      storage: 'base64',
      webcam: false,
      fileTypes: [
        {
          label: '',
          value: ''
        }
      ],
      key: 'file',
      type: 'file',
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

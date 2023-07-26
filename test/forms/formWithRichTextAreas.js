export default {
  type: 'form',
  components: [
    {
      label: 'Text Area',
      tableView: true,
      key: 'textArea',
      type: 'textarea',
      input: true,
      isUploadEnabled: false
    },
    {
      label: 'Text Area Ace',
      editor: 'ace',
      tableView: true,
      key: 'textAreaAce',
      type: 'textarea',
      input: true,
      isUploadEnabled: false
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
  display: 'form',
};

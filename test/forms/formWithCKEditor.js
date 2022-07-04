export default {
  type: 'form',
  components: [
    {
      label: 'Text Area',
      editor: 'ckeditor',
      tableView: true,
      key: 'textArea',
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
  title: 'FIO-560',
  display: 'form',
};

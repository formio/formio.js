export default {
  type: 'form',
  components: [
    {
      label: '<span class="lead">Text Field <abbr title="(required)">*<abbr></span>',
      tableView: true,
      validate: {
        required: true,
        customMessage: 'Text Field'
      },
      key: 'spanClassLeadTextFieldAbbrTitleRequiredAbbrSpan',
      type: 'textfield',
      input: true
    },
    {
      label: 'Submit',
      showValidations: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true
    }
  ],
  title: 'FIO-2784',
  display: 'form',
};

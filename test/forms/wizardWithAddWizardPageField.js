export default {
  label: 'Add Wizard Page',
  tableView: false,
  rowDrafts: false,
  key: 'addWizardPage',
  type: 'addWizardPage',
  input: true,
  multiple: true,
  components: [
    {
      label: 'Text Field',
      tableView: true,
      key: 'textField1',
      type: 'textfield',
      input: true,
    },
  ]
};

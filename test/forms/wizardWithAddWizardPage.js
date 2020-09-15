export default {
  title: 'addWizardPageInsideWizardTest',
  components: [
    {
      title: 'Page 1',
      label: 'Page 1',
      type: 'panel',
      key: 'page1',
      components: [
        {
          label: 'Text Field',
          tableView: true,
          key: 'textField',
          type: 'textfield',
          input: true,
        },
        {
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
          ],
        },
      ],
      input: false,
      tableView: false,
    },
  ],
  display: 'wizard',
};

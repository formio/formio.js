export default {
  title: 'dynamicWizardInsideWizardTest',
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
          label: 'Dynamic Wizard',
          tableView: false,
          rowDrafts: false,
          key: 'dynamicWizard',
          type: 'dynamicWizard',
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
    {
      title: 'Page 2',
      label: 'Page 2',
      type: 'panel',
      key: 'page2',
      components: [
        {
          label: 'Text Field',
          tableView: true,
          key: 'textField',
          type: 'textfield',
          input: true,
        },
      ],
      input: false,
      tableView: false,
    },
  ],
  display: 'wizard',
};

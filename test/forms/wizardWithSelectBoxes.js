export default {
  type: 'form',
  components: [
    {
      title: 'Page 1',
      label: 'Page 1',
      type: 'panel',
      key: 'page1',
      components: [
        {
          label: 'Select Boxes',
          optionsLabelPosition: 'right',
          tableView: true,
          values: [
            {
              label: 'One',
              value: 'one',
              shortcut: ''
            },
            {
              label: 'Two',
              value: 'two',
              shortcut: ''
            },
            {
              label: 'Three',
              value: 'three',
              shortcut: ''
            },
            {
              label: 'Four',
              value: 'four',
              shortcut: ''
            },
            {
              label: 'Five',
              value: 'five',
              shortcut: ''
            }
          ],
          validate: {
            onlyAvailableItems: false,
            minSelectedCount: 2,
            maxSelectedCount: 4
          },
          key: 'selectBoxes',
          type: 'selectboxes',
          input: true,
          inputType: 'checkbox',
          defaultValue: {
            one: false,
            two: false,
            three: false,
            four: false,
            five: false
          }
        }
      ],
      input: false,
      tableView: false
    },
    {
      title: 'Page 2',
      label: 'Page 2',
      type: 'panel',
      key: 'page2',
      components: [
        {
          label: 'Text Area',
          autoExpand: false,
          tableView: true,
          key: 'textArea',
          type: 'textarea',
          input: true
        }
      ],
      input: false,
      tableView: false
    }
  ],
  display: 'wizard',
};

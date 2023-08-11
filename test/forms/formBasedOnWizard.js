export default {
  display: 'form',
  components: [
    {
      title: 'Page 1',
      label: 'Page 1',
      type: 'panel',
      key: 'page1',
      components: [
        {
          label: 'Text Field',
          applyMaskOn: 'change',
          tableView: true,
          key: 'textField',
          type: 'textfield',
          input: true
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
          applyMaskOn: 'change',
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
  ]
}

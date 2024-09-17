export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Edit Grid',
      tableView: false,
      rowDrafts: false,
      key: 'editGrid',
      type: 'editgrid',
      input: true,
      components: [
        {
          collapsible: false,
          key: 'panel',
          type: 'panel',
          label: 'Panel',
          input: false,
          tableView: false,
          components: [
            {
              label: 'Columns',
              columns: [
                {
                  components: [
                    {
                      label: 'Radio',
                      optionsLabelPosition: 'right',
                      inline: false,
                      tableView: true,
                      values: [
                        {
                          label: 'yes',
                          value: 'yes',
                          shortcut: ''
                        },
                        {
                          label: 'no',
                          value: 'no',
                          shortcut: ''
                        }
                      ],
                      key: 'radio',
                      type: 'radio',
                      input: true
                    }
                  ],
                  width: 6,
                  offset: 0,
                  push: 0,
                  pull: 0,
                  size: 'md',
                  currentWidth: 6
                },
                {
                  components: [
                    {
                      label: 'Text Area',
                      applyMaskOn: 'change',
                      autoExpand: false,
                      tableView: true,
                      key: 'textArea',
                      conditional: {
                        show: true,
                        conjunction: 'all'
                      },
                      type: 'textarea',
                      input: true
                    }
                  ],
                  width: 6,
                  offset: 0,
                  push: 0,
                  pull: 0,
                  size: 'md',
                  currentWidth: 6
                }
              ],
              key: 'columns',
              type: 'columns',
              input: false,
              tableView: false
            }
          ]
        }
      ]
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false
    }
  ]
}

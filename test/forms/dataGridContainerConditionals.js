export default {
  type: 'form',
  components: [
    {
      label: 'Data Grid',
      reorder: false,
      addAnotherPosition: 'bottom',
      defaultOpen: false,
      layoutFixed: false,
      enableRowGroups: false,
      initEmpty: false,
      tableView: false,
      key: 'dataGrid',
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'Container',
          tableView: false,
          key: 'container',
          type: 'container',
          input: true,
          components: [
            {
              label: 'Radio',
              optionsLabelPosition: 'right',
              inline: false,
              tableView: false,
              values: [
                {
                  label: 'Yes',
                  value: 'yes',
                  shortcut: ''
                },
                {
                  label: 'No',
                  value: 'no',
                  shortcut: ''
                }
              ],
              validate: {
                required: true
              },
              key: 'radio1',
              type: 'radio',
              input: true
            },
            {
              label: 'Radio',
              optionsLabelPosition: 'right',
              inline: false,
              tableView: false,
              values: [
                {
                  label: 'one',
                  value: 'one',
                  shortcut: ''
                },
                {
                  label: 'two',
                  value: 'two',
                  shortcut: ''
                },
                {
                  label: 'three',
                  value: 'three',
                  shortcut: ''
                },
                {
                  label: 'four',
                  value: 'four',
                  shortcut: ''
                }
              ],
              validate: {
                required: true
              },
              key: 'radio2',
              conditional: {
                show: true,
                when: 'dataGrid.container.radio1',
                eq: 'yes'
              },
              type: 'radio',
              input: true
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
  ],
  title: 'FJs',
  display: 'form',
  name: 'fJs',
  path: 'fjs',
};

export default {
  type: 'form',
  components: [
    {
      label: 'Container',
      tableView: false,
      key: 'container',
      type: 'container',
      input: true,
      components: [
        {
          label: 'Edit Grid',
          tableView: false,
          rowDrafts: false,
          key: 'editGrid',
          type: 'editgrid',
          displayAsTable: false,
          input: true,
          components: [
            {
              label: 'Columns',
              columns: [
                {
                  components: [
                    {
                      label: 'Text Field',
                      tableView: true,
                      key: 'textField',
                      type: 'textfield',
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
                  components: [],
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
      collapsible: false,
      key: 'panel',
      type: 'panel',
      label: 'Panel',
      input: false,
      tableView: false,
      components: [
        {
          label: 'Data Grid',
          reorder: false,
          addAnotherPosition: 'bottom',
          layoutFixed: false,
          enableRowGroups: false,
          initEmpty: false,
          tableView: false,
          defaultValue: [
            {}
          ],
          key: 'dataGrid',
          type: 'datagrid',
          input: true,
          components: [
            {
              key: 'fieldSet',
              type: 'fieldset',
              label: 'Field Set',
              input: false,
              tableView: false,
              components: [
                {
                  label: 'Columns',
                  columns: [
                    {
                      components: [
                        {
                          label: 'Checkbox',
                          tableView: false,
                          key: 'checkbox',
                          type: 'checkbox',
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
                      components: [],
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
            },
            {
              label: 'Number',
              mask: false,
              tableView: false,
              delimiter: false,
              requireDecimal: false,
              inputFormat: 'plain',
              truncateMultipleSpaces: false,
              key: 'number',
              type: 'number',
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
  title: 'FIO-3476',
  display: 'form',
};

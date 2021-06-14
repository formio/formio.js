export default {
  type: 'form',
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
          label: 'Data Grid',
          reorder: false,
          addAnotherPosition: 'bottom',
          layoutFixed: false,
          enableRowGroups: false,
          initEmpty: false,
          tableView: false,
          defaultValue: [
            {

            }
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
                      components: [

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
        }
      ]
    },
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
              label: 'Text Field',
              tableView: true,
              key: 'textField',
              type: 'textfield',
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
  title: 'FIO-3114',
  display: 'form',
};

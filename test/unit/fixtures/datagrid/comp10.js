export default {
  title: 'randomName',
  name: 'randomName',
  path: 'randomName',
  type: 'form',
  display: 'form',
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
      validate: {
        required: true
      },
      key: 'dataGrid',
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'Columns',
          columns: [
            {
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
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false
    }
  ],
  pdfComponents: [],
  settings: {
    logs: 'true'
  }
};
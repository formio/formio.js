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
          label: 'HTML',
          attrs: [
            {
              attr: '',
              value: ''
            }
          ],
          content: "<b>Various Tests on Calculations, Conditionals, and Custom Validations:</b>\n<br><i>(the following rules apply to both the DataGrid and EditGrid)</i>\n<br><b>Root Text:</b>\n<br>- 1st Textfield in DG and EG should match the 'Root Text' field data\n<br>- 2nd Textfield in DG and EG ('Row') should match the data from the 1st Textfield in the DG and EG\n<br><b>Root Radio:</b>\n<br>- When show is clicked, Radio should display in DG and EG\n<br><b>Grid Radio:</b>\n<br>- When show is clicked for the Grid Radio, the 'Row Show' textfield should display in the DG and EG\n<br><b>Root Calculated Text:</b>\n<br>- Data entered in this textfield should display and populate grid calculated field\n<br>- Textfield next to above should calculate based on grid calculated field",
          refreshOnChange: false,
          key: 'html',
          type: 'htmlelement',
          tableView: false,
          input: false,
          alwaysEnabled: false
        },
        {
          label: 'Root Text',
          alwaysEnabled: false,
          tableView: true,
          key: 'text',
          type: 'textfield',
          input: true
        },
        {
          label: 'Root - Radio',
          optionsLabelPosition: 'right',
          inline: false,
          alwaysEnabled: false,
          tableView: false,
          values: [
            {
              label: 'Show',
              value: 'show',
              shortcut: ''
            },
            {
              label: 'Hide',
              value: 'hide',
              shortcut: ''
            }
          ],
          validate: {
            required: true
          },
          key: 'radio',
          type: 'radio',
          input: true
        },
        {
          label: 'Root - Text Calculate',
          alwaysEnabled: false,
          tableView: true,
          key: 'textCal',
          type: 'textfield',
          input: true
        },
        {
          label: 'Data Grid',
          reorder: false,
          addAnotherPosition: 'bottom',
          defaultOpen: false,
          layoutFixed: false,
          enableRowGroups: false,
          alwaysEnabled: false,
          tableView: false,
          key: 'dataGrid',
          type: 'datagrid',
          input: true,
          components: [
            {
              label: 'Textfield - DG',
              tableView: true,
              validate: {
                custom: 'valid = (input === data.text) ? true : `data must match root textfield: ${input}, ${data.text}`;'
              },
              key: 'rootTest',
              type: 'textfield',
              alwaysEnabled: false,
              input: true
            },
            {
              label: 'Row Test - DG',
              tableView: true,
              validate: {
                custom: 'valid = (input == row.rootTest) ? true : `must equal textfield in dg: ${input}, ${row.rootTest}`;'
              },
              key: 'rowTest',
              type: 'textfield',
              alwaysEnabled: false,
              input: true
            },
            {
              label: 'Radio',
              optionsLabelPosition: 'right',
              inline: false,
              tableView: false,
              values: [
                {
                  label: 'DG Show',
                  value: 'dgShow',
                  shortcut: ''
                },
                {
                  label: 'DG Hide',
                  value: 'dgHide',
                  shortcut: ''
                }
              ],
              validate: {
                required: true
              },
              key: 'radio1',
              customConditional: "show = (data.radio === 'show');",
              type: 'radio',
              alwaysEnabled: false,
              input: true
            },
            {
              label: "Row Show - Show textfield when data grid radio has 'show' value",
              alwaysEnabled: false,
              tableView: true,
              key: 'rowShowShowTextfieldWhenDataGridRadioHasShowValue',
              customConditional: "show = (row.radio1 === 'dgShow');",
              type: 'textfield',
              input: true,
              radio1: null
            },
            {
              label: "DG Calculated - Value should populate from 'root calculated text' field",
              tableView: true,
              calculateValue: 'value = data.textCal;',
              allowCalculateOverride: true,
              key: 'calculateTextDg',
              customConditional: 'show = (data.textCal);',
              type: 'textfield',
              alwaysEnabled: false,
              input: true
            },
            {
              label: 'Textfield - Data should populate from Datagrid calculate field',
              alwaysEnabled: false,
              tableView: true,
              calculateValue: 'value = row.calculateTextDg;',
              key: 'textfieldDataShouldPopulateFromDatagridCalculateField',
              customConditional: 'show = (data.textCal);',
              type: 'textfield',
              input: true
            }
          ],
          path: 'dataGrid'
        }
      ],
      input: false,
      tableView: false
    },
    {
      label: 'Submit',
      showValidations: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true
    }
  ],
  display: 'form'
};

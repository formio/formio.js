import baseEditForm from '../base/Base.form';
/* eslint-disable quotes, max-len */
export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'Templates',
      key: 'templates',
      weight: 5,
      components: [
        {
          type: 'textarea',
          label: 'Header Template',
          key: 'templates.header',
          rows: 5,
          editor: 'ace',
          input: true,
          placeholder: `/*** Lodash Template Code ***/`,
          description: 'Two available variables. "value" is the array of row data and "components" is the array of components in the grid.',
          tooltip: 'This is the <a href="https://lodash.com/docs/4.17.5#template">Lodash Template</a> used to render the header of the Edit grid.'
        },
        {
          type: 'textarea',
          label: 'Row Template',
          key: 'templates.row',
          rows: 5,
          editor: 'ace',
          input: true,
          placeholder: `/*** Lodash Template Code ***/`,
          description: 'Two available variables. "row" is an object of one row\'s data and "components" is the array of components in the grid. To add click events, add the classes "editRow" and "removeRow" to elements.',
          tooltip: 'This is the <a href="https://lodash.com/docs/4.17.5#template">Lodash Template</a> used to render each row of the Edit grid.'
        },
        {
          type: 'textarea',
          label: 'Footer Template',
          key: 'templates.footer',
          rows: 5,
          editor: 'ace',
          input: true,
          placeholder: `/*** Lodash Template Code ***/`,
          description: 'Two available variables. "value" is the array of row data and "components" is the array of components in the grid.',
          tooltip: 'This is the <a href="https://lodash.com/docs/4.17.5#template">Lodash Template</a> used to render the footer of the Edit grid.'
        },
        {
          type: 'textfield',
          input: true,
          key: 'rowClass',
          label: 'Row CSS Class',
          placeholder: 'Row CSS Class',
          tooltip: 'CSS class to add to the edit row wrapper.'
        },
        {
          type: 'textfield',
          input: true,
          key: 'addAnother',
          label: 'Add Another Text',
          placeholder: 'Add Another',
          tooltip: 'Set the text of the Add Another button.'
        },
        {
          type: 'textfield',
          input: true,
          key: 'saveRow',
          label: 'Save Row Text',
          placeholder: 'Save',
          tooltip: 'Set the text of the Save Row button.'
        },
        {
          type: 'textfield',
          input: true,
          key: 'removeRow',
          label: 'Remove Row Text',
          placeholder: 'Remove',
          tooltip: 'Set the text of the remove Row button.'
        }
      ]
    }
  ]);
}
/* eslint-enable quotes, max-len */

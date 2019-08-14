import baseEditForm from '../../components/_classes/component/Component.form';
import EditTableEditDisplay from './editForm/EditTable.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: EditTableEditDisplay,
    },
    {
      key: 'data',
      components: [{
        key: 'defaultValue',
        ignore: true
      }, {
        label: '',
        mask: false,
        tableView: true,
        alwaysEnabled: false,
        type: 'hidden',
        input: true,
        key: 'disableAddingRemovingRows',
        calculateValue(context) {
          return context.instance.data.enableRowGroups;
        },
        encrypted: false
      }, {
        key: 'enableRowGroups',
        type: 'checkbox',
        label: 'Enable Row Groups',
        weight: 50,
      }, {
        label: 'Groups',
        disableAddingRemovingRows: false,
        defaultOpen: false,
        addAnother: '',
        addAnotherPosition: 'bottom',
        mask: false,
        tableView: true,
        alwaysEnabled: false,
        type: 'datagrid',
        input: true,
        key: 'rowGroups',
        reorder: true,
        components: [
          {
            label: 'Label',
            allowMultipleMasks: false,
            showWordCount: false,
            showCharCount: false,
            tableView: true,
            alwaysEnabled: false,
            type: 'textfield',
            input: true,
            key: 'label',
            widget: {
              type: ''
            },
            row: '0-0'
          },
          {
            label: 'Number of Rows',
            mask: false,
            tableView: true,
            alwaysEnabled: false,
            type: 'number',
            input: true,
            key: 'numberOfRows',
            row: '0-1'
          }
        ],
        weight: 51,
        conditional: { json: { var: 'data.enableRowGroups' } }
      }],
    }
  ], ...extend);
}

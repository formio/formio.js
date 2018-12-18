import baseEditForm from '../base/Base.form';

import DataGridEditDisplay from './editForm/DataGrid.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: DataGridEditDisplay
    },
    {
      key: 'data',
      components: [{
        key: 'defaultValue',
        ignore: true
      }]
    }
  ], ...extend);
}

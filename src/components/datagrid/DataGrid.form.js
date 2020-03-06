import baseEditForm from '../_classes/component/Component.form';

import DataGridEditData from './editForm/DataGrid.edit.data';
import DataGridEditDisplay from './editForm/DataGrid.edit.display';
import DataGridEditValidation from './editForm/DataGrid.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: DataGridEditDisplay
    },
    {
      key: 'data',
      components: DataGridEditData
    },
    {
      key: 'validation',
      components: DataGridEditValidation
    }
  ], ...extend);
}

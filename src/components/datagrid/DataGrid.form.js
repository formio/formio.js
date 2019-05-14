import baseEditForm from '../base/Base.form';
import DataGridEditDisplay from './editForm/DataGrid.edit.display';
import DataGridEditValidation from './editForm/DataGrid.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: DataGridEditDisplay
    },
    {
      key: 'validation',
      components: DataGridEditValidation
    }
  ], ...extend);
}

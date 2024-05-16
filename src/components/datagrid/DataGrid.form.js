import Components from '../Components';
import DataGridEditData from './editForm/DataGrid.edit.data';
import DataGridEditDisplay from './editForm/DataGrid.edit.display';
import DataGridEditValidation from './editForm/DataGrid.edit.validation';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return Components.baseEditForm([
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
    },
  ], ...extend);
}

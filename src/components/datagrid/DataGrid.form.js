import Components from '../Components';
import DataGridEditData from './editForm/DataGrid.edit.data';
import DataGridEditDisplay from './editForm/DataGrid.edit.display';

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
      components: [],
      ignore: true,
    }
  ], ...extend);
}

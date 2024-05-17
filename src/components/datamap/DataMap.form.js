import Components from '../Components';
import DataMapEditData from './editForm/DataMap.edit.data';
import DataMapEditDisplay from './editForm/DataMap.edit.display';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: DataMapEditDisplay
    },
    {
      key: 'data',
      components: DataMapEditData
    },
  ], ...extend);
}

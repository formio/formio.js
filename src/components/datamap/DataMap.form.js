import componentEditForm from '../_classes/component/Component.form';
import DataMapEditData from './editForm/DataMap.edit.data';
import DataMapEditDisplay from './editForm/DataMap.edit.display';

export default function(...extend) {
  return componentEditForm([
    {
      key: 'display',
      components: DataMapEditDisplay
    },
    {
      key: 'data',
      components: DataMapEditData
    }
  ], ...extend);
}

import componentEditForm from '../_classes/component/Component.form';
import DataMapEditDisplay from './editForm/DataMap.edit.display';

export default function(...extend) {
  return componentEditForm([
    {
      key: 'display',
      components: DataMapEditDisplay
    }
  ], ...extend);
}

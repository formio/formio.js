import componentEditForm from '../_classes/component/Component.form';
import tagpadEditDisplay from './editForm/Tagpad.edit.display';

export default function(...extend) {
  return componentEditForm([
    {
      key: 'display',
      components: tagpadEditDisplay
    }
  ], ...extend);
}

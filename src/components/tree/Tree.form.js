import componentEditForm from '../_classes/component/Component.form';
import TreeEditData from './editForm/Tree.edit.data';
export default function(...extend) {
  return componentEditForm([
    {
      key: 'data',
      components: TreeEditData,
    },
  ], ...extend);
}

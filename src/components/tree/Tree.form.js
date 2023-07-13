import componentEditForm from '../_classes/component/Component.form';
import TreeEditData from './editForm/Tree.edit.data';
import TreeDisplayData from './editForm/Tree.edit.display';
export default function(...extend) {
  return componentEditForm([
    {
      key: 'display',
      components: TreeDisplayData,
    },
    {
      key: 'data',
      components: TreeEditData,
    },
  ], ...extend);
}

import componentEditForm from '../_classes/component/Component.form';
import UnknownEditDisplay from './editForm/Unknown.edit.display';
export default function(...extend) {
  return componentEditForm([
    {
      key: 'display',
      components: UnknownEditDisplay
    },
    {
      key: 'data',
      ignore: true
    },
    {
      key: 'validation',
      ignore: true
    },
    {
      key: 'api',
      ignore: true
    },
    {
      key: 'conditional',
      ignore: true
    },
    {
      key: 'logic',
      ignore: true
    }
  ], ...extend);
}

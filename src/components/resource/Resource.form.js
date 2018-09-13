import baseEditForm from '../_classes/component/Component.form';

import ResourceEditDisplay from './editForm/Resource.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: ResourceEditDisplay
    }
  ], ...extend);
}

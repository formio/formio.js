import baseEditForm from '../_classes/base/Base.form';

import ResourceEditDisplay from './editForm/Resource.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: ResourceEditDisplay
    }
  ]);
}

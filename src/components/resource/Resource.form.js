import baseEditForm from '../base/Base.form';

import ResourceEditDisplay from './editForm/Resource.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: ResourceEditDisplay
    }
  ], ...extend);
}

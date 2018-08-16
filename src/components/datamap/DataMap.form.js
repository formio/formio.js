import baseEditForm from '../base/Base.form';

import DataMapEditDisplay from './editForm/DataMap.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: DataMapEditDisplay
    }
  ], ...extend);
}

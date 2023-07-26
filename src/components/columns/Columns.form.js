import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import ColumnsEditDisplay from './editForm/Columns.edit.display';

export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: ColumnsEditDisplay
    },
  ], ...extend);
}

import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import TableEditDisplay from './editForm/Table.edit.display';

export default function(...extend) {
  return nestedComponentForm(...extend, [
    {
      key: 'display',
      components: TableEditDisplay
    }
  ]);
}

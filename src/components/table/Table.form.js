import nestedComponentForm from '../nested/NestedComponent.form';

import TableEditDisplay from './editForm/Table.edit.display';

export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: TableEditDisplay
    }
  ], ...extend);
}

import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import TableEditDisplay from './editForm/Table.edit.display';

export default (...extend) => nestedComponentForm([
  {
    key: 'display',
    components: TableEditDisplay,
  },
], ...extend);

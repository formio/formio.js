import baseEditForm from '../_classes/component/Component.form';

import DataGridEditDisplay from './editForm/DataGrid.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: DataGridEditDisplay
    }
  ]);
}

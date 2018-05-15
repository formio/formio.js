import baseEditForm from '../base/Base.form';

import DataGridEditDisplay from './editForm/DataGrid.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: DataGridEditDisplay
    }
  ]);
}

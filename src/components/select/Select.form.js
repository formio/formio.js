import baseEditForm from '../base/Base.form';

import SelectEditData from './editForm/Select.edit.data';
import SelectEditDisplay from './editForm/Select.edit.display';
import SelectEditValidation from './editForm/Select.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      label: 'Display',
      key: 'display',
      weight: 0,
      components: SelectEditDisplay
    },
    {
      key: 'data',
      weight: 10,
      components: SelectEditData
    },
    {
      key: 'validation',
      weight: 20,
      components: SelectEditValidation
    }
  ], ...extend);
}

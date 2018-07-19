import baseEditForm from '../_classes/component/Component.form';

import SelectEditData from './editForm/Select.edit.data';
import SelectEditValidation from './editForm/Select.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'data',
      components: SelectEditData
    },
    {
      key: 'validation',
      components: SelectEditValidation
    }
  ], ...extend);
}

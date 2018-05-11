import baseEditForm from '../base/Base.form';

import SelectEditData from './editForm/Select.edit.data';
import SelectEditValidation from './editForm/Select.edit.validation';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'data',
      components: SelectEditData
    },
    {
      key: 'validation',
      components: SelectEditValidation
    }
  ]);
}

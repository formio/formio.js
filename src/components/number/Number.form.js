import baseEditForm from '../_classes/base/Base.form';

import NumberEditValidation from './editForm/Number.edit.validation';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'validation',
      components: NumberEditValidation
    }
  ]);
}

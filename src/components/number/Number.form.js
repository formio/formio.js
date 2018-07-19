import baseEditForm from '../_classes/component/Component.form';

import NumberEditValidation from './editForm/Number.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'validation',
      components: NumberEditValidation
    }
  ], ...extend);
}

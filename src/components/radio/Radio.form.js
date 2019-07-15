import baseEditForm from '../_classes/component/Component.form';

import RadioEditData from './editForm/Radio.edit.data';
import RadioEditDisplay from './editForm/Radio.edit.display';
import RadioEditValidation from './editForm/Radio.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: RadioEditDisplay
    },
    {
      key: 'data',
      components: RadioEditData
    },
    {
      key: 'validation',
      components: RadioEditValidation
    },
  ], ...extend);
}

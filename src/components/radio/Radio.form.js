import baseEditForm from '../_classes/base/Base.form';

import RadioEditDisplay from './editForm/Radio.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: RadioEditDisplay
    }
  ]);
}

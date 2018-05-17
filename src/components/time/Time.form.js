import baseEditForm from '../_classes/base/Base.form';

import TimeEditDisplay from './editForm/Time.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: TimeEditDisplay
    }
  ]);
}

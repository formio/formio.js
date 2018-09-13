import baseEditForm from '../_classes/component/Component.form';

import TimeEditDisplay from './editForm/Time.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: TimeEditDisplay
    }
  ], ...extend);
}

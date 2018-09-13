import baseEditForm from '../_classes/component/Component.form';

import RadioEditDisplay from './editForm/Radio.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: RadioEditDisplay
    }
  ], ...extend);
}

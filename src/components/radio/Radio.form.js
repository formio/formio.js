import baseEditForm from '../base/Base.form';

import RadioEditDisplay from './editForm/Radio.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: RadioEditDisplay
    }
  ], ...extend);
}

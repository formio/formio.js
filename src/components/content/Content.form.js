import baseEditForm from '../base/Base.form';

import ContentEditDisplay from './editForm/Content.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: ContentEditDisplay
    }
  ], ...extend);
}

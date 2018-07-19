import baseEditForm from '../_classes/component/Component.form';

import ContentEditDisplay from './editForm/Content.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: ContentEditDisplay
    }
  ], ...extend);
}

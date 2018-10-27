import baseEditForm from '../base/Base.form';

import ContentEditDisplay from './editForm/Content.edit.display';
import ContentEditLogic from './editForm/Content.edit.logic';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: ContentEditDisplay,
    },
    {
      key: 'logic',
      components: ContentEditLogic,
    },
  ], ...extend);
}

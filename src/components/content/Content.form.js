import baseEditForm from '../_classes/component/Component.form';

import ContentEditDisplay from './editForm/Content.edit.display';
import ContentEditLogic from './editForm/Content.edit.logic';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: ContentEditDisplay,
    },
    {
      key: 'data',
      ignore: true
    },
    {
      key: 'validation',
      ignore: true
    },
    {
      key: 'logic',
      components: ContentEditLogic,
    },
  ], ...extend);
}

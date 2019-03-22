import baseEditForm from '../_classes/component/Component.form';

import TagsEditData from './editForm/Tags.edit.data';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'data',
      components: TagsEditData
    }
  ], ...extend);
}

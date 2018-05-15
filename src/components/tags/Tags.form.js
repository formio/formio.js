import baseEditForm from '../base/Base.form';

import TagsEditDisplay from './editForm/Tags.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: TagsEditDisplay
    }
  ]);
}

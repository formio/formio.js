import Components from '../Components';

import TagsEditData from './editForm/Tags.edit.data';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      components: TagsEditData
    },
  ], ...extend);
}

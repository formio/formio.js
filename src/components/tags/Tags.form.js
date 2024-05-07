import Components from '../Components';

import TagsEditData from './editForm/Tags.edit.data';

/**
 *
 * @param {...any} extend
 */
export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      components: TagsEditData
    },
  ], ...extend);
}

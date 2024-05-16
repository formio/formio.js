import Components from '../Components';

import TagsEditData from './editForm/Tags.edit.data';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      components: TagsEditData
    },
  ], ...extend);
}

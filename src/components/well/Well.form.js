import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import WellEditDisplay from './editForm/Well.edit.display';

/**
 * Well Component edit form definition.
 * @param {...any} extend - The extended definition.
 * @returns {object} - The Well Component edit form definition.
 */
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: WellEditDisplay
    },
  ], ...extend);
}

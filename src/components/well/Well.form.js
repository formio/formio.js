import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import WellEditDisplay from './editForm/Well.edit.display';

/**
 * Well Component schema.
 * @param {...any} extend - The extended schema.
 * @returns {object} - The Well Component schema.
 */
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: WellEditDisplay
    },
  ], ...extend);
}

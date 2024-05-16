import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import ColumnsEditDisplay from './editForm/Columns.edit.display';

/**
 * Columns nested component form definition.
 * @param {...any} extend - The extended definition.
 * @returns {object} - The Columns nested component form.
 */
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: ColumnsEditDisplay
    },
  ], ...extend);
}

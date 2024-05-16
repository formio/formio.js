import baseEditForm from '../_classes/component/Component.form';

import TimeEditData from './editForm/Time.edit.data';
import TimeEditDisplay from './editForm/Time.edit.display';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return baseEditForm([
    {
      key: 'data',
      components: TimeEditData,
    },
    {
      key: 'display',
      components: TimeEditDisplay,
    },
  ], ...extend);
}

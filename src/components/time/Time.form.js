import baseEditForm from '../_classes/component/Component.form';

import TimeEditData from './editForm/Time.edit.data';
import TimeEditDisplay from './editForm/Time.edit.display';

/**
 * Time Component edit form definition.
 * @param {...any} extend - The extended edit form definition.
 * @returns {object} - The Well Component edit form definition.
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

import textEditForm from '../textfield/TextField.form';

import NumberEditDisplay from './editForm/Number.edit.display';
import NumberEditData from './editForm/Number.edit.data';
import NumberEditValidation from './editForm/Number.edit.validation';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return textEditForm([
    {
      key: 'display',
      components: NumberEditDisplay
    },
    {
      key: 'data',
      components: NumberEditData
    },
    {
      key: 'validation',
      components: NumberEditValidation
    },
  ], ...extend);
}

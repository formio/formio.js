import textEditForm from '../textfield/TextField.form';

import UrlEditDisplay from './editForm/Url.edit.display';
import UrlEditData from './editForm/Url.edit.data';
import UrlEditValidation from './editForm/Url.edit.validation';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return textEditForm([
    {
      key: 'display',
      components: UrlEditDisplay
    },
    {
      key: 'data',
      components: UrlEditData
    },
    {
      key: 'validation',
      components: UrlEditValidation
    },
  ], ...extend);
}

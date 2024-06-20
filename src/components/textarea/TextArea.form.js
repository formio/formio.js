import textEditForm from '../textfield/TextField.form';
import TextAreaEditDisplay from './editForm/TextArea.edit.display';
import TextAreaEditValidation from './editForm/TextArea.edit.validation';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return textEditForm([
    {
      key: 'display',
      components: TextAreaEditDisplay
    },
    {
      key: 'validation',
      components: TextAreaEditValidation
    },
  ], ...extend);
}

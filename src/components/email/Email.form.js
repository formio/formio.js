import baseEditForm from '../textfield/TextField.form';
import EmailEditFormDisplay from './editForm/Email.edit.display';
import EmailEditFormValidation from './editForm/Email.edit.validation';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function (...extend) {
  return baseEditForm(
    [
      {
        key: 'display',
        components: EmailEditFormDisplay,
      },
      {
        key: 'validation',
        components: EmailEditFormValidation,
      },
    ],
    ...extend,
  );
}

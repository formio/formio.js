import textEditForm from '../textfield/TextField.form';

import PhoneNumberEditValidation from './editForm/PhoneNumber.edit.validation';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return textEditForm([
    {
      key: 'display',
      components: [
        {
          key: 'showWordCount',
          ignore: true
        },
        {
          key: 'showCharCount',
          ignore: true
        },
        {
          key: 'widget.type',
          ignore: true
        },
        {
          key: 'widget',
          ignore: true
        },
      ]
    },
    {
      key: 'data',
      components: [
        {
          key: 'case',
          ignore: true
        }
      ]
    },
    {
      key: 'validation',
      components: PhoneNumberEditValidation
    },
  ], ...extend);
}

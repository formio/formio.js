import textEditForm from '../textfield/TextField.form';

import PhoneNumberEditValidation from './editForm/PhoneNumber.edit.validation';

/**
 *
 * @param {...any} extend
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
        }
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

import textEditForm from '../textfield/TextField.form';

import PhoneNumberEditValidation from './editForm/PhoneNumber.edit.validation';

export default function(...extend) {
  return textEditForm([
    {
      key: 'validation',
      components: PhoneNumberEditValidation
    }
  ], ...extend);
}

import baseEditForm from '../textfield/TextField.form';
import EmailEditFormDisplay from './editForm/Email.edit.display';
import EmailEditFormValidation from './editForm/Email.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: EmailEditFormDisplay,
    },
    {
      key: 'validation',
      components: EmailEditFormValidation,
    },
  ], ...extend);
}

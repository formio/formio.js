import baseEditForm from '../textfield/TextField.form';
import EmailEditFormDisplay from './editForm/Email.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: EmailEditFormDisplay,
    },
    {
      key: 'validation',
      components: [
        {
          key: 'validate.minWords',
          ignore: true
        },
        {
          key: 'validate.maxWords',
          ignore: true
        }
      ]
    }
  ], ...extend);
}

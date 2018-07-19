import textEditForm from '../textfield/TextField.form';

import PasswordEditDisplay from './editForm/Password.edit.display';

export default function(...extend) {
  return textEditForm([
    {
      key: 'display',
      components: PasswordEditDisplay
    }
  ], ...extend);
}

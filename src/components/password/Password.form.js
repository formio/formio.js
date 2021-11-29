import ComponentEditAddons from '../_classes/component/editForm/Component.edit.addons';
import textEditForm from '../textfield/TextField.form';

import PasswordEditDisplay from './editForm/Password.edit.display';
import PasswordEditData from './editForm/Password.edit.data';
import PasswordEditValidation from './editForm/Password.edit.validation';

export default function(...extend) {
  return textEditForm([
    {
      key: 'data',
      components: PasswordEditData
    },
    {
      key: 'display',
      components: PasswordEditDisplay
    },
    {
      key: 'validation',
      components: PasswordEditValidation
    },
    {
      label: 'Addons',
      key: 'addons',
      weight: 70,
      components: ComponentEditAddons
    },
  ], ...extend);
}

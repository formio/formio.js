import baseEditForm from '../_classes/component/Component.form';

import TextFieldEditData from './editForm/TextField.edit.data';
import TextFieldEditDisplay from './editForm/TextField.edit.display';
import TextFieldEditValidation from './editForm/TextField.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: TextFieldEditDisplay
    },
    {
      key: 'data',
      components: TextFieldEditData
    },
    {
      key: 'validation',
      components: TextFieldEditValidation
    }
  ], ...extend);
}

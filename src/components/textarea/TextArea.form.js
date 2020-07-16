import textEditForm from '../textfield/TextField.form';

import TextAreaEditDisplay from './editForm/TextArea.edit.display';
import TextAreaEditLayout from './editForm/TextArea.edit.layout';
import TextAreaEditValidation from './editForm/TextArea.edit.validation';

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
    {
      key: 'layout',
      components: TextAreaEditLayout
    },
  ], ...extend);
}

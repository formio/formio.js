import textEditForm from '../textfield/TextField.form';

import TextAreaEditDisplay from './editForm/TextArea.edit.display';

export default function(...extend) {
  return textEditForm(...extend, [
    {
      key: 'display',
      components: TextAreaEditDisplay
    }
  ]);
}

import textEditForm from '../textfield/TextField.form';

import NumberEditDisplay from './editForm/Number.edit.display';
import NumberEditData from './editForm/Number.edit.data';
import NumberEditValidation from './editForm/Number.edit.validation';

export default function(...extend) {
  return textEditForm([
    {
      key: 'display',
      components: NumberEditDisplay
    },
    {
      key: 'data',
      components: NumberEditData
    },
    {
      key: 'validation',
      components: NumberEditValidation
    }
  ], ...extend);
}

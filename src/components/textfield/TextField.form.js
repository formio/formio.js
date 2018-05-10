import baseEditForm from '../base/Base.form';
import TextFieldEditDisplay from './editForm/TextField.edit.display';
import TextFieldEditValidation from './editForm/TextField.edit.validation';
export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      weight: 0,
      components: TextFieldEditDisplay
    },
    {
      label: 'Validation',
      key: 'validation',
      weight: 20,
      components: TextFieldEditValidation
    }
  ]);
}

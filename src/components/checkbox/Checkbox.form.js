import Components from '../Components';
import CheckboxEditData from './editForm/Checkbox.edit.data';
import CheckboxEditDisplay from './editForm/Checkbox.edit.display';
import CheckboxEditValidation from './editForm/Checkbox.edit.validation';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      components: CheckboxEditData
    },
    {
      key: 'display',
      components: CheckboxEditDisplay
    },
    {
      key: 'validation',
      components: CheckboxEditValidation
    },
  ], ...extend);
}

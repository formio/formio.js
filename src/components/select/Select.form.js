import Components from '../Components';
import SelectEditData from './editForm/Select.edit.data';
import SelectEditDisplay from './editForm/Select.edit.display';
import SelectEditValidation from './editForm/Select.edit.validation';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: SelectEditDisplay
    },
    {
      key: 'data',
      components: SelectEditData
    },
    {
      key: 'validation',
      components: SelectEditValidation
    }
  ], ...extend);
}

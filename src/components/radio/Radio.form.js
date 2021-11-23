import Components from '../Components';
import RadioEditData from './editForm/Radio.edit.data';
import RadioEditDisplay from './editForm/Radio.edit.display';
import RadioEditValidation from './editForm/Radio.edit.validation';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: RadioEditDisplay
    },
    {
      key: 'data',
      components: RadioEditData
    },
    {
      key: 'validation',
      components: RadioEditValidation
    },
  ], ...extend);
}

import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import FormEditForm from './editForm/Form.edit.form';
import FormEditData from './editForm/Form.edit.data';

export default function(...extend) {
  return nestedComponentForm([
    {
      label: 'Form',
      key: 'form',
      weight: 10,
      components: FormEditForm
    },
    {
      label: 'Data',
      key: 'data',
      weight: 10,
      components: FormEditData
    }
  ], ...extend);
}

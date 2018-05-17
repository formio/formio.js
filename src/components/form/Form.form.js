import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import FormEditForm from './editForm/Form.edit.form';

export default function(...extend) {
  return nestedComponentForm([
    {
      label: 'Form',
      key: 'form',
      weight: 10,
      components: FormEditForm
    }
  ], ...extend);
}

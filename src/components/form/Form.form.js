import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import FormEditDisplay from './editForm/Form.edit.display';
import FormEditForm from './editForm/Form.edit.form';
import FormEditData from './editForm/Form.edit.data';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: FormEditDisplay
    },
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
    },
  ], ...extend);
}

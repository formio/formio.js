import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import FieldSetEditDisplay from './editForm/Fieldset.edit.display';
/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function (...extend) {
  return nestedComponentForm(
    [
      {
        key: 'display',
        components: FieldSetEditDisplay,
      },
    ],
    ...extend,
  );
}

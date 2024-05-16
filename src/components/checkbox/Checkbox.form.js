import Components from '../Components';
import CheckboxEditData from './editForm/Checkbox.edit.data';
import CheckboxEditDisplay from './editForm/Checkbox.edit.display';
import CheckboxEditValidation from './editForm/Checkbox.edit.validation';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
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

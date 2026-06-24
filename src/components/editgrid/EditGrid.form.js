import Components from '../Components';
import EditGridEditData from './editForm/EditGrid.edit.data';
import EditGridEditDisplay from './editForm/EditGrid.edit.display';
import EditGridEditTemplates from './editForm/EditGrid.edit.templates';
import EditGridEditValidation from './editForm/EditGrid.edit.validation';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function (...extend) {
  return Components.baseEditForm(
    [
      {
        label: 'Templates',
        key: 'templates',
        weight: 5,
        components: EditGridEditTemplates,
      },
      {
        key: 'display',
        components: EditGridEditDisplay,
      },
      {
        key: 'data',
        components: EditGridEditData,
      },
      {
        key: 'validation',
        components: EditGridEditValidation,
      },
    ],
    ...extend,
  );
}

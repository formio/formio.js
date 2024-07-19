import radioEditForm from '../radio/Radio.form';
import SelectBoxesEditValidation from './editForm/SelectBoxes.edit.validation';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return radioEditForm([
    {
      key: 'data',
      components: [
        {
          key: 'dataType',
          ignore: true,
        }
      ]
    },
    {
      key: 'validation',
      components: SelectBoxesEditValidation
    },
  ], ...extend);
}

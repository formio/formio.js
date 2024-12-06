import Components from '../Components';
import DataMapEditData from './editForm/DataMap.edit.data';
import DataMapEditDisplay from './editForm/DataMap.edit.display';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function (...extend) {
  return Components.baseEditForm(
    [
      {
        key: 'display',
        components: DataMapEditDisplay,
      },
      {
        key: 'data',
        components: DataMapEditData,
      },
    ],
    ...extend,
  );
}

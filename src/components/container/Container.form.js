import Components from '../Components';
import ContainerEditDisplay from './editForm/Container.edit.display';
import ContainerEditData from './editForm/Container.edit.data';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: ContainerEditDisplay
    },
    {
      key: 'data',
      components: ContainerEditData
    },
  ], ...extend);
}

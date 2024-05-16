import Components from '../Components';
import ContainerEditDisplay from './editForm/Container.edit.display';
import ContainerEditData from './editForm/Container.edit.data';

/**
 * Container edit form definition.
 * @param {...any} extend - The extended definition.
 * @returns {object} - The Container edit form.
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

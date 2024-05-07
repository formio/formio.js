import Components from '../Components';
import ContainerEditDisplay from './editForm/Container.edit.display';
import ContainerEditData from './editForm/Container.edit.data';

/**
 *
 * @param {...any} extend
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

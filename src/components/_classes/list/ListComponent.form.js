import Components from '../../Components';
import ListEditData from './editForm/ListComponent.edit.data';

/**
 *
 * @param {...any} extend
 */
export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      components: ListEditData
    },
  ], ...extend);
}

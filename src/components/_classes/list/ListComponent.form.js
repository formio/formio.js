import Components from '../../Components';
import ListEditData from './editForm/ListComponent.edit.data';

/**
 * List Component edit form definition.
 * @param {...any} extend - The extended definition.
 * @returns {object} - The List Component edit form.
 */
export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      components: ListEditData
    },
  ], ...extend);
}

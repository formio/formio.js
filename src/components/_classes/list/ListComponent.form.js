import Components from '../../Components';
import ListEditData from './editForm/ListComponent.edit.data';

/**
 * List Component edit form.
 * @param {...any} extend - The extended schema.
 * @returns {Object} - The List Component edit form.
 */
export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      components: ListEditData
    },
  ], ...extend);
}

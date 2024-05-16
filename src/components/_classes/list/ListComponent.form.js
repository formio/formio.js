import Components from '../../Components';
import ListEditData from './editForm/ListComponent.edit.data';

/**
 * List Component schema.
 * @param {...any} extend - The extended schema.
 * @returns {object} - The List Component schema.
 */
export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      components: ListEditData
    },
  ], ...extend);
}

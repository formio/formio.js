import Components from '../Components';
import ButtonEditDisplay from './editForm/Button.edit.display';

/**
 * Button edit form definition.
 * @param {...any} extend - The extended definition.
 * @returns {object} - The Button edit form.
 */
export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: ButtonEditDisplay
    },
    {
      key: 'data',
      ignore: true,
    },
    {
      key: 'validation',
      ignore: true,
    },
  ], ...extend);
}

import Components from '../../Components';

/**
 *
 * @param {...any} extend
 */
export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      ignore: true
    },
    {
      key: 'validation',
      ignore: true
    }
  ], ...extend);
}

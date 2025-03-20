import Components from '../../Components';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: [
        {
          key: 'labelWidth',
          ignore: true
        },
        {
          key: 'labelMargin',
          ignore: true
        }
      ]
    }, 
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

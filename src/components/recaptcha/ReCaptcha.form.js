import Components from '../Components';
import ReCaptchaEditDisplay from './editForm/ReCaptcha.edit.display';

/**
 * The Edit Form function.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function() {
  return Components.baseEditForm([
    {
      key: 'display',
      components: ReCaptchaEditDisplay
    },
    {
      key: 'data',
      ignore: true
    },
    {
      key: 'validation',
      ignore: true
    },
    {
      key: 'conditional',
      ignore: true
    },
    {
      key: 'logic',
      ignore: true
    },
  ]);
}

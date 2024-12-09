import Components from '../Components';
import SignatureEditData from './editForm/Signature.edit.data';
import SignatureEditDisplay from './editForm/Signature.edit.display';
import SignatureEditValidation from './editForm/Signature.edit.validation';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function (...extend) {
  return Components.baseEditForm(
    [
      {
        key: 'display',
        components: SignatureEditDisplay,
      },
      {
        key: 'data',
        components: SignatureEditData,
      },
      {
        key: 'validation',
        components: SignatureEditValidation,
      },
    ],
    ...extend,
  );
}

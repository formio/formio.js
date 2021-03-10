import Components from '../Components';
import SignatureEditData from './editForm/Signature.edit.data';
import SignatureEditDisplay from './editForm/Signature.edit.display';
import SignatureEditValidation from './editForm/Signature.edit.validation';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: SignatureEditDisplay
    },
    {
      key: 'data',
      components: SignatureEditData
    },
    {
      key: 'validation',
      components: SignatureEditValidation
    },
  ], ...extend);
}

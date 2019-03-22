import baseEditForm from '../_classes/component/Component.form';

import SignatureEditData from './editForm/Signature.edit.data';
import SignatureEditDisplay from './editForm/Signature.edit.display';
import SignatureEditValidation from './editForm/Signature.edit.validation';

export default function(...extend) {
  return baseEditForm([
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

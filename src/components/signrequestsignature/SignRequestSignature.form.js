import baseEditForm from '../_classes/component/Component.form';

import SignRequestSignatureEditData from './editForm/SignRequestSignature.edit.data';
import SignRequestSignatureEditDisplay from './editForm/SignRequestSignature.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: SignRequestSignatureEditDisplay
    },
    {
      key: 'data',
      components: SignRequestSignatureEditData
    },
    {
      key: 'validation',
      ignore: true,
    },
  ], ...extend);
}

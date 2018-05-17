import baseEditForm from '../_classes/base/Base.form';

import SignatureEditDisplay from './editForm/Signature.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: SignatureEditDisplay
    }
  ]);
}

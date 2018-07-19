import baseEditForm from '../base/Base.form';

import SignatureEditDisplay from './editForm/Signature.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: SignatureEditDisplay
    }
  ], ...extend);
}

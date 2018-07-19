import baseEditForm from '../_classes/component/Component.form';

import SignatureEditDisplay from './editForm/Signature.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: SignatureEditDisplay
    }
  ], ...extend);
}

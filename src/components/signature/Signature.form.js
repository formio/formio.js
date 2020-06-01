import baseEditForm from '../_classes/component/Component.form';

import SignatureEditData from './editForm/Signature.edit.data';
import SignatureEditDisplay from './editForm/Signature.edit.display';

export default (...extend) => baseEditForm([
  {
    key: 'display',
    components: SignatureEditDisplay,
  },
  {
    key: 'data',
    components: SignatureEditData,
  },
], ...extend);

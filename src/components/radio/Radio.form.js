import baseEditForm from '../_classes/component/Component.form';

import RadioEditData from './editForm/Radio.edit.data';
import RadioEditDisplay from './editForm/Radio.edit.display';

export default (...extend) => baseEditForm([
  {
    key: 'display',
    components: RadioEditDisplay,
  },
  {
    key: 'data',
    components: RadioEditData,
  },
], ...extend);

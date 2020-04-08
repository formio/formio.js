import baseEditForm from '../_classes/component/Component.form';

import HiddenEditData from './editForm/Hidden.edit.data';
import HiddenEditDisplay from './editForm/Hidden.edit.display';

export default (...extend) => baseEditForm([
  {
    key: 'display',
    components: HiddenEditDisplay,
  },
  {
    key: 'data',
    components: HiddenEditData,
  },
  {
    key: 'conditional',
    ignore: true,
  },
], ...extend);

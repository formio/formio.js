import baseEditForm from '../_classes/component/Component.form';

import ResourceEditDisplay from './editForm/Resource.edit.display';

export default (...extend) => baseEditForm([
  {
    key: 'display',
    components: ResourceEditDisplay,
  },
], ...extend);

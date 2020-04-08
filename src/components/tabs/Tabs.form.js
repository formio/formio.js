import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import TabsEditDisplay from './editForm/Tabs.edit.display';

export default (...extend) => nestedComponentForm([
  {
    key: 'display',
    components: TabsEditDisplay,
  },
], ...extend);

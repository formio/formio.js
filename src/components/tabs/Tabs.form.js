import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import TabsEditDisplay from './editForm/Tabs.edit.display';

export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: TabsEditDisplay
    },
  ], ...extend);
}

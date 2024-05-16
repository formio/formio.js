import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import WellEditDisplay from './editForm/Well.edit.display';

export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: WellEditDisplay
    },
  ], ...extend);
}

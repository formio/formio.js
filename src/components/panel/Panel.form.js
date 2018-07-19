import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import PanelEditDisplay from './editForm/Panel.edit.display';

export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: PanelEditDisplay
    }
  ], ...extend);
}

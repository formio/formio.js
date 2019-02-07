import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import PanelEditDisplay from './editForm/Panel.edit.display';
import PanelEditConditional from './editForm/Panel.edit.conditional';

export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: PanelEditDisplay
    },
    {
      key: 'conditional',
      components: PanelEditConditional,
    }
  ], ...extend);
}

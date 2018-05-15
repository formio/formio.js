import nestedComponentForm from '../nested/NestedComponent.form';

import PanelEditDisplay from './editForm/Panel.edit.display';

export default function(...extend) {
  return nestedComponentForm(...extend, [
    {
      key: 'display',
      components: PanelEditDisplay
    }
  ]);
}

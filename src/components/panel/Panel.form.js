import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import PanelEditDisplay from './editForm/Panel.edit.display';

export default (...extend) => nestedComponentForm([
  {
    key: 'display',
    components: PanelEditDisplay,
  },
], ...extend);

import nestedComponentForm from '../_classes/nested/NestedComponent.form';

import PanelEditData from './editForm/Panel.edit.data';
import PanelEditDisplay from './editForm/Panel.edit.display';

export default (...extend) => nestedComponentForm([
  {
    key: 'display',
    components: PanelEditDisplay,
  },
  {
    key: 'data',
    components: PanelEditData,
  },
], ...extend);

import Components from '../Components';

import TimeEditData from './editForm/Time.edit.data';
import TimeEditDisplay from './editForm/Time.edit.display';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      components: TimeEditData,
    },
    {
      key: 'display',
      components: TimeEditDisplay,
    },
  ], ...extend);
}

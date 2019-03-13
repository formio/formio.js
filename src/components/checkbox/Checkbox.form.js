import baseEditForm from '../_classes/component/Component.form';

import CheckboxEditData from './editForm/Checkbox.edit.data';
import CheckboxEditDisplay from './editForm/Checkbox.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'data',
      components: CheckboxEditData
    },
    {
      key: 'display',
      components: CheckboxEditDisplay
    }
  ], ...extend);
}

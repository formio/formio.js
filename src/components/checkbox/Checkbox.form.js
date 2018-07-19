import baseEditForm from '../base/Base.form';

import CheckboxEditDisplay from './editForm/Checkbox.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: CheckboxEditDisplay
    }
  ], ...extend);
}

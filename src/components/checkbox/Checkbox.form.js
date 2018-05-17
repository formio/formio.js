import baseEditForm from '../_classes/component/Component.form';

import CheckboxEditDisplay from './editForm/Checkbox.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: CheckboxEditDisplay
    }
  ]);
}

import baseEditForm from '../_classes/component/Component.form';

import ButtonEditDisplay from './editForm/Button.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: ButtonEditDisplay
    }
  ]);
}

import baseEditForm from '../_classes/component/Component.form';

import AddressEditDisplay from './editForm/Address.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: AddressEditDisplay
    }
  ]);
}

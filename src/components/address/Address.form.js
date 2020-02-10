import baseEditForm from '../_classes/component/Component.form';

import AddressEditData from './editForm/Address.edit.data';
import AddressEditDisplay from './editForm/Address.edit.display';
import AddressEditProvider from './editForm/Address.edit.provider';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'data',
      components: AddressEditData,
    },
    {
      key: 'display',
      components: AddressEditDisplay,
    },
    {
      label: 'Provider',
      key: 'provider',
      weight: 15,
      components: AddressEditProvider,
    },
  ], ...extend);
}

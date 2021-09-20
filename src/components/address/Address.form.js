import Components from '../Components';
import AddressEditData from './editForm/Address.edit.data';
import AddressEditDisplay from './editForm/Address.edit.display';
import AddressEditProvider from './editForm/Address.edit.provider';

export default function(...extend) {
  return Components.baseEditForm([
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

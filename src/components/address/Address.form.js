import Components from '../Components';
import AddressEditData from './editForm/Address.edit.data';
import AddressEditDisplay from './editForm/Address.edit.display';
import AddressEditProvider from './editForm/Address.edit.provider';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function (...extend) {
  return Components.baseEditForm(
    [
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
    ],
    ...extend,
  );
}

import baseEditForm from '../base/Base.form';

import AddressEditDisplay from './editForm/Address.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: AddressEditDisplay
    }
  ], ...extend);
}

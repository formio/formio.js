import baseEditForm from '../_classes/base/Base.form';

import LocationEditMap from './editForm/Location.edit.map';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'Map',
      key: 'map',
      weight: 1,
      components: LocationEditMap
    }
  ]);
}

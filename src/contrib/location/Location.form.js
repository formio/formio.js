import baseEditForm from '../../components/_classes/component/Component.form';

import LocationEditMap from './editForm/Location.edit.map';

export default function(...extend) {
  return baseEditForm([
    {
      label: 'Map',
      key: 'map',
      weight: 1,
      components: LocationEditMap
    }
  ], ...extend);
}

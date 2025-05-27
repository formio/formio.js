import { unionWith } from 'lodash';
import UnknownEditDisplay from './editForm/Unknown.edit.display';
import EditFormUtils from '../../components/_classes/component/editForm/utils';

/**
 * Unknown Component schema.
 * @param {...any} extend
 * @returns {object} - The Unknown Component edit form.
 */
export default function(...extend) {
  const components = [
    {
      label: 'Custom',
      key: 'display',
      weight: 0,
      components: UnknownEditDisplay
    }
   
  ].concat(...extend);

  return {
    components: [
      {
        type: 'tabs',
        key: 'tabs',
        components: unionWith(components, EditFormUtils.unifyComponents)
      }
    ]
  };
}

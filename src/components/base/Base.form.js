import _ from 'lodash';
import EditFormUtils from './editForm/utils';
import BaseEditDisplay from './editForm/Base.edit.display';
import BaseEditData from './editForm/Base.edit.data';
import BaseEditValidation from './editForm/Base.edit.validation';
import BaseEditAPI from './editForm/Base.edit.api';
import BaseEditConditional from './editForm/Base.edit.conditional';
import BaseEditLogic from './editForm/Base.edit.logic';
export default function(...extend) {
  return {
    components: _.unionWith(_.map(extend, items => {
      return {
        type: 'tabs',
        key: 'tabs',
        components: items
      };
    }), [
      {
        type: 'tabs',
        key: 'tabs',
        components: [
          {
            label: 'Display',
            key: 'display',
            weight: 0,
            components: BaseEditDisplay
          },
          {
            label: 'Data',
            key: 'data',
            weight: 10,
            components: BaseEditData
          },
          {
            label: 'Validation',
            key: 'validation',
            weight: 20,
            components: BaseEditValidation
          },
          {
            label: 'API',
            key: 'api',
            weight: 30,
            components: BaseEditAPI
          },
          {
            label: 'Conditional',
            key: 'conditional',
            weight: 40,
            components: BaseEditConditional
          },
          {
            label: 'Logic',
            key: 'logic',
            weight: 50,
            components: BaseEditLogic
          }
        ]
      },
      {
        type: 'hidden',
        key: 'type'
      }
    ], EditFormUtils.unifyComponents)
  };
}

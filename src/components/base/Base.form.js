import _ from 'lodash';
import BaseEditConditional from './editForm/Base.edit.conditional';
import BaseEditData from './editForm/Base.edit.data';
import BaseEditAPI from './editForm/Base.edit.api';
import BaseEditDisplay from './editForm/Base.edit.display';
import BaseEditLogic from './editForm/Base.edit.logic';
import BaseEditValidation from './editForm/Base.edit.validation';
import BaseEditLayout from './editForm/Base.edit.layout';
import EditFormUtils from './editForm/utils';

export default function(...extend) {
  const components = _.cloneDeep([
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
        },
        {
          label: 'Layout',
          key: 'layout',
          weight: 60,
          components: BaseEditLayout
        }
      ]
    }
  ]).concat(extend.map((items) => ({
    type: 'tabs',
    key: 'tabs',
    components: items
  })));
  return {
    components: _.unionWith(components, EditFormUtils.unifyComponents).concat({
      type: 'hidden',
      key: 'type'
    })
  };
}

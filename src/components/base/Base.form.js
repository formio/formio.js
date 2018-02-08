import _mergeWith from 'lodash/mergeWith';
import { EditFormUtils } from './editForm/utils';
import { BaseEditDisplay } from './editForm/Base.edit.display';
import { BaseEditData } from './editForm/Base.edit.data';
import { BaseEditValidation } from './editForm/Base.edit.validation';
import { BaseEditAPI } from './editForm/Base.edit.api';
import { BaseEditLayout } from './editForm/Base.edit.layout';
import { BaseEditConditional } from './editForm/Base.edit.conditional';

module.exports = function(...extend) {
  return _mergeWith({
    components: [
      {
        weight: 0,
        type: 'tabs',
        key: 'tabs',
        components: [
          {
            label: 'Display',
            key: 'display',
            components: BaseEditDisplay
          },
          {
            label: 'Data',
            key: 'data',
            components: BaseEditData
          },
          {
            label: 'Validation',
            key: 'validation',
            components: BaseEditValidation
          },
          {
            label: 'API',
            key: 'api',
            components: BaseEditAPI
          },
          {
            label: 'Conditional',
            key: 'conditional',
            components: BaseEditConditional
          }
        ]
      }
    ]
  }, ...extend, EditFormUtils.mergeComponents);
};

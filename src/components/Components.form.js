import _mergeWith from 'lodash/mergeWith';
import { EditFormUtils } from './base/editForm/utils';
import { BaseEditAPI } from './base/editForm/Base.edit.api';
import { BaseEditConditional } from './base/editForm/Base.edit.conditional';
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
            components: [
              {
                weight: 100,
                type: 'textfield',
                input: true,
                key: 'customClass',
                label: 'Custom CSS Class',
                placeholder: 'Custom CSS Class',
                tooltip: 'Custom CSS class to add to this component.'
              },
              {
                weight: 200,
                type: 'checkbox',
                label: 'Clear Value When Hidden',
                key: 'clearOnHide',
                tooltip: 'When a field is hidden, clear the value.',
                input: true
              },
              {
                weight: 300,
                type: 'checkbox',
                label: 'Hidden',
                tooltip: 'A hidden field is still a part of the form, but is hidden from view.',
                key: 'hidden',
                input: true
              },
              {
                weight: 400,
                type: 'checkbox',
                label: 'Table View',
                tooltip: 'Shows this value within the table view of the submissions.',
                key: 'tableView',
                input: true
              }
            ]
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

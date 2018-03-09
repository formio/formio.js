const BaseEditForm = require('../base/Base.form');
import { TextFieldEditDisplay } from './editForm/TextField.edit.display';
import { TextFieldEditValidation } from './editForm/TextField.edit.validation';

module.exports = function(...extend) {
  return BaseEditForm({
    components: [
      {
        weight: 0,
        type: 'tabs',
        key: 'tabs',
        components: [
          {
            label: 'Display',
            key: 'display',
            components: TextFieldEditDisplay
          },
          // Need to keep empty to align tabs to merge.
          {},
          {
            label: 'Validation',
            key: 'validation',
            components: TextFieldEditValidation
          }
        ]
      }
    ]
  }, ...extend);
};

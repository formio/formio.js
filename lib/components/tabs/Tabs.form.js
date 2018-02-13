'use strict';

var ComponentsEditForm = require('../Components.form');
module.exports = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return ComponentsEditForm.apply(undefined, [{
    components: [{
      weight: 0,
      type: 'tabs',
      key: 'tabs',
      components: [{
        label: 'Display',
        key: 'display',
        components: [{
          key: 'components',
          type: 'datagrid',
          input: true,
          label: 'Tabs',
          components: [{
            type: 'textfield',
            input: true,
            key: 'label',
            label: 'Label'
          }, {
            type: 'textfield',
            input: true,
            key: 'key',
            label: 'Key',
            calculateValue: { _camelCase: [{ var: 'row.label' }] }
          }]
        }]
      }]
    }]
  }].concat(extend));
};
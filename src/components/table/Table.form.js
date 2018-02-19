import {TableEditOptions} from "./TableEditOptions";
const ComponentsEditForm = require('../Components.form');

module.exports = function(...extend) {
  return ComponentsEditForm({
    components: [
      {
        weight: 0,
        type: 'tabs',
        key: 'tabs',
        components: [
          {
            label: 'Display',
            key: 'display',
            components: TableEditOptions
          }
        ]
      }
    ]
  }, ...extend);
};

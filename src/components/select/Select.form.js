const BaseEditForm = require('../base/Base.form');
module.exports = function(...extend) {
  return BaseEditForm({
    components: [
      {
        weight: 0,
        type: 'tabs',
        key: 'tabs',
        components: [

        ]
      }
    ]
  }, ...extend);
};

'use strict';

var _TableEditOptions = require('./TableEditOptions');

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
        components: _TableEditOptions.TableEditOptions
      }]
    }]
  }].concat(extend));
};
"use strict";

var _BaseEdit = require("../base/editForm/Base.edit.validation");

var _BaseEdit2 = require("../base/editForm/Base.edit.conditional");

var _BaseEdit3 = require("../base/editForm/Base.edit.display");

var _BaseEdit4 = require("../base/editForm/Base.edit.data");

var _BaseEdit5 = require("../base/editForm/Base.edit.api");

var BaseEditForm = require('../base/Base.form');
module.exports = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return BaseEditForm.apply(undefined, [{
    components: [{
      weight: 0,
      type: 'tabs',
      key: 'tabs',
      components: [{
        label: 'Display',
        key: 'display',
        components: [{
          type: 'textfield',
          label: 'Add Another Text',
          key: 'addAnother',
          tooltip: 'Set the text of the Add Another button.',
          placeholder: 'Add Another',
          weight: 410,
          input: true
        }, {
          type: 'select',
          label: 'Add Another Position',
          key: 'addAnotherPosition',
          dataSrc: 'values',
          tooltip: 'Position for Add Another button with respect to Data Grid Array.',
          defaultValue: 'bottom',
          input: true,
          data: {
            values: [{ label: 'Top', value: 'top' }, { label: 'Bottom', value: 'bottom' }, { label: 'Both', value: 'both' }]
          },
          weight: 420
        }]
      }, {
        label: 'Data',
        key: 'data',
        components: []
      }, {
        label: 'Validation',
        key: 'validation',
        components: []
      }, {
        label: 'API',
        key: 'api',
        components: []
      }, {
        label: 'Conditional',
        key: 'conditional',
        components: []
      }]
    }]
  }].concat(extend));
};
'use strict';

var _TextFieldEdit = require('./editForm/TextField.edit.display');

var _TextFieldEdit2 = require('./editForm/TextField.edit.validation');

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
        components: _TextFieldEdit.TextFieldEditDisplay
      },
      // Need to keep empty to align tabs to merge.
      {}, {
        label: 'Validation',
        key: 'validation',
        components: _TextFieldEdit2.TextFieldEditValidation
      }]
    }]
  }].concat(extend));
};
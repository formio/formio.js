'use strict';

var TextEditForm = require('../textfield/TextField.form');
module.exports = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return TextEditForm.apply(undefined, [{}].concat(extend));
};
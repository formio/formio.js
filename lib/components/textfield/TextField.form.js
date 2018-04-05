'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base2.default.apply(undefined, [[{
    type: 'tabs',
    key: 'tabs',
    components: [{
      label: 'Display',
      key: 'display',
      weight: 0,
      components: _TextFieldEdit.TextFieldEditDisplay
    }, {
      label: 'Validation',
      key: 'validation',
      weight: 20,
      components: _TextFieldEdit2.TextFieldEditValidation
    }]
  }]].concat(extend));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

var _TextFieldEdit = require('./editForm/TextField.edit.display');

var _TextFieldEdit2 = require('./editForm/TextField.edit.validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
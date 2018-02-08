'use strict';

var _mergeWith2 = require('lodash/mergeWith');

var _mergeWith3 = _interopRequireDefault(_mergeWith2);

var _utils = require('./editForm/utils');

var _BaseEdit = require('./editForm/Base.edit.display');

var _BaseEdit2 = require('./editForm/Base.edit.data');

var _BaseEdit3 = require('./editForm/Base.edit.validation');

var _BaseEdit4 = require('./editForm/Base.edit.api');

var _BaseEdit5 = require('./editForm/Base.edit.layout');

var _BaseEdit6 = require('./editForm/Base.edit.conditional');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _mergeWith3.default.apply(undefined, [{
    components: [{
      weight: 0,
      type: 'tabs',
      key: 'tabs',
      components: [{
        label: 'Display',
        key: 'display',
        components: _BaseEdit.BaseEditDisplay
      }, {
        label: 'Data',
        key: 'data',
        components: _BaseEdit2.BaseEditData
      }, {
        label: 'Validation',
        key: 'validation',
        components: _BaseEdit3.BaseEditValidation
      }, {
        label: 'API',
        key: 'api',
        components: _BaseEdit4.BaseEditAPI
      }, {
        label: 'Conditional',
        key: 'conditional',
        components: _BaseEdit6.BaseEditConditional
      }]
    }]
  }].concat(extend, [_utils.EditFormUtils.mergeComponents]));
};
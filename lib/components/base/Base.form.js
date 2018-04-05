'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return {
    components: _lodash2.default.unionWith.apply(_lodash2.default, [[{
      type: 'tabs',
      key: 'tabs',
      components: [{
        label: 'Display',
        key: 'display',
        weight: 0,
        components: _BaseEdit.BaseEditDisplay
      }, {
        label: 'Data',
        key: 'data',
        weight: 10,
        components: _BaseEdit2.BaseEditData
      }, {
        label: 'Validation',
        key: 'validation',
        weight: 20,
        components: _BaseEdit3.BaseEditValidation
      }, {
        label: 'API',
        key: 'api',
        weight: 30,
        components: _BaseEdit4.BaseEditAPI
      }, {
        label: 'Conditional',
        key: 'conditional',
        weight: 40,
        components: _BaseEdit5.BaseEditConditional
      }]
    }, {
      type: 'hidden',
      key: 'type'
    }]].concat(extend, [_utils.EditFormUtils.unifyComponents]))
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./editForm/utils');

var _BaseEdit = require('./editForm/Base.edit.display');

var _BaseEdit2 = require('./editForm/Base.edit.data');

var _BaseEdit3 = require('./editForm/Base.edit.validation');

var _BaseEdit4 = require('./editForm/Base.edit.api');

var _BaseEdit5 = require('./editForm/Base.edit.conditional');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
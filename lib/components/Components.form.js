'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
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
        components: [{
          weight: 100,
          type: 'textfield',
          input: true,
          key: 'customClass',
          label: 'Custom CSS Class',
          placeholder: 'Custom CSS Class',
          tooltip: 'Custom CSS class to add to this component.'
        }, {
          weight: 200,
          type: 'checkbox',
          label: 'Clear Value When Hidden',
          key: 'clearOnHide',
          tooltip: 'When a field is hidden, clear the value.',
          input: true
        }, {
          weight: 300,
          type: 'checkbox',
          label: 'Hidden',
          tooltip: 'A hidden field is still a part of the form, but is hidden from view.',
          key: 'hidden',
          input: true
        }, {
          weight: 400,
          type: 'checkbox',
          label: 'Table View',
          tooltip: 'Shows this value within the table view of the submissions.',
          key: 'tableView',
          input: true
        }]
      }, {
        label: 'API',
        key: 'api',
        components: _BaseEdit.BaseEditAPI
      }, {
        label: 'Conditional',
        key: 'conditional',
        components: _BaseEdit2.BaseEditConditional
      }]
    }]
  }].concat(extend, [_utils.EditFormUtils.mergeComponents]));
};

var _mergeWith2 = require('lodash/mergeWith');

var _mergeWith3 = _interopRequireDefault(_mergeWith2);

var _utils = require('./base/editForm/utils');

var _BaseEdit = require('./base/editForm/Base.edit.api');

var _BaseEdit2 = require('./base/editForm/Base.edit.conditional');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
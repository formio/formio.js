'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components2.default.apply(undefined, [[{
    label: 'Display',
    key: 'display',
    weight: 0,
    components: [{
      key: 'components',
      type: 'datagrid',
      input: true,
      label: 'Tabs',
      weight: 50,
      components: [{
        type: 'textfield',
        input: true,
        key: 'label',
        label: 'Label'
      }, {
        type: 'textfield',
        input: true,
        key: 'key',
        label: 'Key',
        calculateValue: { _camelCase: [{ var: 'row.label' }] }
      }]
    }]
  }]].concat(extend));
};

var _Components = require('../Components.form');

var _Components2 = _interopRequireDefault(_Components);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
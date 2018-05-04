'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base2.default.apply(undefined, extend.concat([[{
    label: 'Display',
    key: 'display',
    weight: 0,
    components: [{
      type: 'datagrid',
      input: true,
      label: 'Questions',
      key: 'questions',
      tooltip: 'The questions you would like to as in this survey question.',
      weight: 50,
      defaultValue: [{ label: '', value: '' }],
      components: [{
        label: 'Label',
        key: 'label',
        input: true,
        type: 'textfield'
      }, {
        label: 'Value',
        key: 'value',
        input: true,
        type: 'textfield',
        calculateValue: { _camelCase: [{ var: 'row.label' }] }
      }]
    }, {
      type: 'datagrid',
      input: true,
      label: 'Values',
      key: 'values',
      tooltip: 'The values that can be selected per question. Example: \'Satisfied\', \'Very Satisfied\', etc.',
      weight: 50,
      defaultValue: [{ label: '', value: '' }],
      components: [{
        label: 'Label',
        key: 'label',
        input: true,
        type: 'textfield'
      }, {
        label: 'Value',
        key: 'value',
        input: true,
        type: 'textfield',
        calculateValue: { _camelCase: [{ var: 'row.label' }] }
      }]
    }]
  }]]));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
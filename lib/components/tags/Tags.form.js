'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base2.default.apply(undefined, [[{
    label: 'Display',
    key: 'display',
    weight: 0,
    components: [{
      weight: 410,
      type: 'textfield',
      input: true,
      key: 'delimeter',
      label: 'Delimiter',
      tooltip: 'What is used to separate the tags.</a>'
    }, {
      weight: 420,
      type: 'number',
      input: true,
      key: 'maxTags',
      label: 'Max Tags',
      defaultValue: 0,
      tooltip: 'The maximum amount of tags that can be added. 0 for infinity.'
    }, {
      weight: 430,
      type: 'select',
      input: true,
      key: 'storeas',
      label: 'Store As',
      dataSrc: 'values',
      data: {
        values: [{ label: 'String (CSV)', value: 'string' }, { label: 'Array of Tags', value: 'array' }]
      }
    }]
  }]].concat(extend));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
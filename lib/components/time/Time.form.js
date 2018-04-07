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
      type: 'textfield',
      input: true,
      key: 'format',
      label: 'Format',
      placeholder: 'Format',
      tooltip: 'The moment.js format for saving the value of this field.',
      weight: 50
    }]
  }]].concat(extend));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
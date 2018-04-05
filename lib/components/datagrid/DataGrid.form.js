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
      components: [{
        type: 'textfield',
        label: 'Add Another Text',
        key: 'addAnother',
        tooltip: 'Set the text of the Add Another button.',
        placeholder: 'Add Another',
        weight: 410,
        input: true
      }, {
        type: 'select',
        label: 'Add Another Position',
        key: 'addAnotherPosition',
        dataSrc: 'values',
        tooltip: 'Position for Add Another button with respect to Data Grid Array.',
        defaultValue: 'bottom',
        input: true,
        data: {
          values: [{ label: 'Top', value: 'top' }, { label: 'Bottom', value: 'bottom' }, { label: 'Both', value: 'both' }]
        },
        weight: 420
      }]
    }]
  }]].concat(extend));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
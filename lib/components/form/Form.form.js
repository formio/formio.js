'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components2.default.apply(undefined, [[{
    type: 'tabs',
    key: 'tabs',
    components: [{
      label: 'Form',
      key: 'form',
      weight: 10,
      components: [{
        type: 'select',
        input: true,
        dataSrc: 'url',
        data: {
          url: '/form?limit=4294967295&select=_id,title'
        },
        template: '<span>{{ item.title }}</span>',
        valueProperty: '_id',
        label: 'Form',
        key: 'form',
        weight: 10,
        tooltip: 'The form to load within this form component.'
      }, {
        type: 'checkbox',
        input: true,
        weight: 20,
        key: 'reference',
        label: 'Save as reference',
        tooltip: 'Using this option will save this field as a reference and link its value to the value of the origin record.'
      }]
    }]
  }]].concat(extend));
};

var _Components = require('../Components.form');

var _Components2 = _interopRequireDefault(_Components);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
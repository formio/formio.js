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
      key: 'footer',
      label: 'Footer Label',
      tooltip: 'The footer text that appears below the signature area.',
      placeholder: 'Footer Label',
      weight: 10
    }, {
      type: 'textfield',
      input: true,
      key: 'width',
      label: 'Width',
      tooltip: 'The width of the signature area.',
      placeholder: 'Width',
      weight: 50
    }, {
      type: 'textfield',
      input: true,
      key: 'height',
      label: 'Height',
      tooltip: 'The height of the signature area.',
      placeholder: 'Height',
      weight: 51
    }, {
      type: 'textfield',
      input: true,
      key: 'backgroundColor',
      label: 'Background Color',
      tooltip: 'The background color of the signature area.',
      placeholder: 'Background Color',
      weight: 52
    }, {
      type: 'textfield',
      input: true,
      key: 'penColor',
      label: 'Pen Color',
      tooltip: 'The ink color for the signature area.',
      placeholder: 'Pen Color',
      weight: 53
    }]
  }]].concat(extend));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
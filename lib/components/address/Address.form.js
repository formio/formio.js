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
      type: 'container',
      key: 'map',
      input: true,
      weight: 610,
      components: [{
        type: 'textfield',
        input: true,
        label: 'Region Bias',
        key: 'region',
        tooltip: 'The region bias to use for this search. See <a href=\'https://developers.google.com/maps/documentation/geocoding/intro#RegionCodes\' target=\'_blank\'>Region Biasing</a> for more information.',
        placeholder: 'Dallas'
      }, {
        type: 'textfield',
        input: true,
        label: 'Google Maps API Key',
        key: 'key',
        tooltip: 'The API key for Google Maps. See <a href=\'https://developers.google.com/maps/documentation/geocoding/get-api-key\' target=\'_blank\'>Get an API Key</a> for more information.',
        placeholder: 'xxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxx'
      }]
    }]
  }]]));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
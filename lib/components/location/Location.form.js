'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base2.default.apply(undefined, [[{
    label: 'Map',
    key: 'map',
    weight: 1,
    components: [{
      type: 'textfield',
      input: true,
      key: 'map.key',
      label: 'API Key',
      tooltip: 'The API key for Google Maps. See <a href=\'https://developers.google.com/maps/documentation/geocoding/get-api-key\' target=\'_blank\'>Get an API Key</a> for more information.',
      placeholder: 'xxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxx',
      weight: 0
    }, {
      type: 'textfield',
      input: true,
      label: 'Region Bias',
      key: 'map.region',
      tooltip: 'The region bias to use for this search. See <a href=\'https://developers.google.com/maps/documentation/geocoding/intro#RegionCodes\' target=\'_blank\'>Region Biasing</a> for more information.',
      placeholder: 'Dallas',
      weight: 10
    }, {
      type: 'textfield',
      input: true,
      label: 'Google Map ID',
      key: 'map.gmapId',
      tooltip: 'This is the Google Maps ID you wish to use when showing the location map.',
      weight: 20
    }]
  }]].concat(extend));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
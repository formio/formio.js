"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  type: 'container',
  key: 'map',
  input: true,
  weight: 200,
  components: [{
    type: 'textfield',
    input: true,
    label: 'Region Bias',
    key: 'region',
    tooltip: "The region bias to use for this search. See <a href='https://developers.google.com/maps/documentation/geocoding/intro#RegionCodes' target='_blank'>Region Biasing</a> for more information.",
    placeholder: 'USA'
  }, {
    type: 'textfield',
    input: true,
    label: 'Google Maps API Key',
    key: 'key',
    tooltip: "The API key for Google Maps. See <a href='https://developers.google.com/maps/documentation/geocoding/get-api-key' target='_blank'>Get an API Key</a> for more information.",
    placeholder: 'xxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxx'
  }]
}];
exports.default = _default;
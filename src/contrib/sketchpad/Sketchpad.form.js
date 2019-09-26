"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Base = _interopRequireDefault(require("../../components/base/Base.form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base.default.apply(void 0, [[{
    key: 'display',
    components: [{
      type: 'textfield',
      label: 'Image Url',
      input: true,
      key: 'imageUrl',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Width',
      input: true,
      key: 'width',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Height',
      input: true,
      key: 'height',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Default Zoom',
      input: true,
      key: 'defaultZoom',
      placeholder: '100',
      weight: 20
    }]
  }]].concat(extend));
}
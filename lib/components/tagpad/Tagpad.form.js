"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Component = _interopRequireDefault(require("../_classes/component/Component.form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Component.default.apply(void 0, [[{
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
      key: 'canvasWidth',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Height',
      input: true,
      key: 'canvasHeight',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Dot Size',
      input: true,
      key: 'dotSize',
      placeholder: '10',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Dot Stroke Size',
      input: true,
      key: 'dotStrokeSize',
      placeholder: '2',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Dot Stroke Color',
      input: true,
      key: 'dotStrokeColor',
      placeholder: '#333',
      weight: 20
    }, {
      type: 'textfield',
      label: 'Dot Fill Color',
      input: true,
      key: 'dotFillColor',
      placeholder: '#ccc',
      weight: 20
    }, {
      key: 'placeholder',
      ignore: true
    }, {
      key: 'tabindex',
      ignore: true
    }, {
      key: 'autofocus',
      ignore: true
    }]
  }, {
    key: 'data',
    components: [{
      key: 'multiple',
      ignore: true
    }, {
      key: 'encrypted',
      ignore: true
    }, {
      key: 'dbIndex',
      ignore: true
    }, {
      key: 'defaultValue',
      ignore: true
    }]
  }, {
    key: 'validation',
    components: [{
      key: 'unique',
      ignore: true
    }, {
      key: 'validateOn',
      ignore: true
    }]
  }]].concat(extend));
}
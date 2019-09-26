"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _BaseEdit = _interopRequireDefault(require("./editForm/Base.edit.conditional"));

var _BaseEdit2 = _interopRequireDefault(require("./editForm/Base.edit.data"));

var _BaseEdit3 = _interopRequireDefault(require("./editForm/Base.edit.api"));

var _BaseEdit4 = _interopRequireDefault(require("./editForm/Base.edit.display"));

var _BaseEdit5 = _interopRequireDefault(require("./editForm/Base.edit.logic"));

var _BaseEdit6 = _interopRequireDefault(require("./editForm/Base.edit.validation"));

var _utils = _interopRequireDefault(require("./editForm/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  var components = _lodash.default.cloneDeep([{
    type: 'tabs',
    key: 'tabs',
    components: [{
      label: 'Display',
      key: 'display',
      weight: 0,
      components: _BaseEdit4.default
    }, {
      label: 'Validation',
      key: 'validation',
      weight: 20,
      components: _BaseEdit6.default
    },]
  }]).concat(extend.map(function (items) {
    return {
      type: 'tabs',
      key: 'tabs',
      components: items
    };
  }));

  return {
    components: _lodash.default.unionWith(components, _utils.default.unifyComponents).concat({
      type: 'hidden',
      key: 'type'
    })
  };
}
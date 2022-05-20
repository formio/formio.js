"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.map.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _ComponentEdit = _interopRequireDefault(require("./editForm/Component.edit.addons"));

var _ComponentEdit2 = _interopRequireDefault(require("./editForm/Component.edit.conditional"));

var _ComponentEdit3 = _interopRequireDefault(require("./editForm/Component.edit.data"));

var _ComponentEdit4 = _interopRequireDefault(require("./editForm/Component.edit.api"));

var _ComponentEdit5 = _interopRequireDefault(require("./editForm/Component.edit.display"));

var _ComponentEdit6 = _interopRequireDefault(require("./editForm/Component.edit.logic"));

var _ComponentEdit7 = _interopRequireDefault(require("./editForm/Component.edit.validation"));

var _ComponentEdit8 = _interopRequireDefault(require("./editForm/Component.edit.layout"));

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
      components: _ComponentEdit5.default
    }, {
      label: 'Data',
      key: 'data',
      weight: 10,
      components: _ComponentEdit3.default
    }, {
      label: 'Validation',
      key: 'validation',
      weight: 20,
      components: _ComponentEdit7.default
    }, {
      label: 'API',
      key: 'api',
      weight: 30,
      components: _ComponentEdit4.default
    }, {
      label: 'Conditional',
      key: 'conditional',
      weight: 40,
      components: _ComponentEdit2.default
    }, {
      label: 'Logic',
      key: 'logic',
      weight: 50,
      components: _ComponentEdit6.default
    }, {
      label: 'Layout',
      key: 'layout',
      weight: 60,
      components: _ComponentEdit8.default
    }, {
      label: 'Addons',
      key: 'addons',
      weight: 70,
      components: _ComponentEdit.default
    }]
  }]).concat(extend.map(function (items) {
    return {
      type: 'tabs',
      key: 'tabs',
      components: _lodash.default.cloneDeep(items)
    };
  }));

  return {
    components: _lodash.default.unionWith(components, _utils.default.unifyComponents).concat({
      type: 'hidden',
      key: 'type'
    })
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Components", {
  enumerable: true,
  get: function get() {
    return _Components.default;
  }
});
Object.defineProperty(exports, "Formio", {
  enumerable: true,
  get: function get() {
    return _Formio.default;
  }
});
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _Form2.default;
  }
});
Object.defineProperty(exports, "Utils", {
  enumerable: true,
  get: function get() {
    return _utils.default;
  }
});

var _components = _interopRequireDefault(require("./components"));

var _Components = _interopRequireDefault(require("./components/Components"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _Form2 = _interopRequireDefault(require("./Form"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Components.default.setComponents(_components.default);

_Formio.default.Components = _Components.default;
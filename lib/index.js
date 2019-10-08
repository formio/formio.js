"use strict";

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  FormBuilder: true
};
Object.defineProperty(exports, "FormBuilder", {
  enumerable: true,
  get: function get() {
    return _FormBuilder2.default;
  }
});

var _formio = require("./formio.form");

Object.keys(_formio).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _formio[key];
    }
  });
});

var _FormBuilder2 = _interopRequireDefault(require("./FormBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _address = _interopRequireDefault(require("./address"));

var _auth = _interopRequireDefault(require("./auth"));

var _storage = _interopRequireDefault(require("./storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Providers = /*#__PURE__*/function () {
  function Providers() {
    _classCallCheck(this, Providers);
  }

  _createClass(Providers, null, [{
    key: "addProvider",
    value: function addProvider(type, name, provider) {
      Providers.providers[type] = Providers.providers[type] || {};
      Providers.providers[type][name] = provider;
    }
  }, {
    key: "addProviders",
    value: function addProviders(type, providers) {
      Providers.providers[type] = _lodash.default.merge(Providers.providers[type], providers);
    }
  }, {
    key: "getProvider",
    value: function getProvider(type, name) {
      if (Providers.providers[type] && Providers.providers[type][name]) {
        return Providers.providers[type][name];
      }
    }
  }, {
    key: "getProviders",
    value: function getProviders(type) {
      if (Providers.providers[type]) {
        return Providers.providers[type];
      }
    }
  }]);

  return Providers;
}();

exports.default = Providers;

_defineProperty(Providers, "providers", {
  address: _address.default,
  auth: _auth.default,
  storage: _storage.default
});
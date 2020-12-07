"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleAddressProvider = void 0;

var _AddressProvider2 = require("./AddressProvider");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var GoogleAddressProvider = /*#__PURE__*/function (_AddressProvider) {
  _inherits(GoogleAddressProvider, _AddressProvider);

  var _super = _createSuper(GoogleAddressProvider);

  function GoogleAddressProvider() {
    _classCallCheck(this, GoogleAddressProvider);

    return _super.apply(this, arguments);
  }

  _createClass(GoogleAddressProvider, [{
    key: "makeRequest",
    value: function makeRequest() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _nativePromiseOnly.default(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', _this.getRequestUrl(options), true);

        xhr.onload = function () {
          return resolve(JSON.parse(xhr.response));
        };

        xhr.onerror = reject;
        xhr.send();
      });
    }
  }, {
    key: "getRequestUrl",
    value: function getRequestUrl() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var params = options.params;
      return "https://maps.googleapis.com/maps/api/geocode/json?".concat(this.serialize(params));
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        params: {
          sensor: 'false'
        }
      };
    }
  }, {
    key: "queryProperty",
    get: function get() {
      return 'address';
    }
  }, {
    key: "responseProperty",
    get: function get() {
      return 'results';
    }
  }, {
    key: "displayValueProperty",
    get: function get() {
      return 'formatted_address';
    }
  }], [{
    key: "name",
    get: function get() {
      return 'google';
    }
  }, {
    key: "displayName",
    get: function get() {
      return 'Google Maps';
    }
  }]);

  return GoogleAddressProvider;
}(_AddressProvider2.AddressProvider);

exports.GoogleAddressProvider = GoogleAddressProvider;
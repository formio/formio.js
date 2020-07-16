"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _utils = require("../../utils/utils");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _fetchPonyfill2 = _interopRequireDefault(require("fetch-ponyfill"));

var _lodash = _interopRequireDefault(require("lodash"));

var _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _fetchPonyfill = (0, _fetchPonyfill2.default)({
  Promise: _nativePromiseOnly.default
}),
    fetch = _fetchPonyfill.fetch,
    Headers = _fetchPonyfill.Headers,
    Request = _fetchPonyfill.Request;

var Rule = require('./Rule');

module.exports = (_temp = /*#__PURE__*/function (_Rule) {
  _inherits(Select, _Rule);

  var _super = _createSuper(Select);

  function Select() {
    var _this;

    _classCallCheck(this, Select);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "defaultMessage", '{{field}} contains an invalid selection');

    return _this;
  }

  _createClass(Select, [{
    key: "check",
    value: function check(value, data, row, async) {
      // Skip if value is empty
      if (!value || _lodash.default.isEmpty(value)) {
        return true;
      } // Skip if we're not async-capable


      if (!async) {
        return true;
      }

      var schema = this.component.component; // Initialize the request options

      var requestOptions = {
        url: this.settings.url,
        method: 'GET',
        qs: {},
        json: true,
        headers: {}
      }; // If the url is a boolean value

      if (_lodash.default.isBoolean(requestOptions.url)) {
        requestOptions.url = !!requestOptions.url;

        if (!requestOptions.url || schema.dataSrc !== 'url' || !schema.data.url || !schema.searchField) {
          return true;
        } // Get the validation url


        requestOptions.url = schema.data.url; // Add the search field

        requestOptions.qs[schema.searchField] = value; // Add the filters

        if (schema.filter) {
          requestOptions.url += (!requestOptions.url.includes('?') ? '?' : '&') + schema.filter;
        } // If they only wish to return certain fields.


        if (schema.selectFields) {
          requestOptions.qs.select = schema.selectFields;
        }
      }

      if (!requestOptions.url) {
        return true;
      } // Make sure to interpolate.


      requestOptions.url = (0, _utils.interpolate)(requestOptions.url, {
        data: this.component.data
      }); // Add query string to URL

      requestOptions.url += (requestOptions.url.includes('?') ? '&' : '?') + _lodash.default.chain(requestOptions.qs).map(function (val, key) {
        return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(val));
      }).join('&').value(); // Set custom headers.

      if (schema.data && schema.data.headers) {
        _lodash.default.each(schema.data.headers, function (header) {
          if (header.key) {
            requestOptions.headers[header.key] = header.value;
          }
        });
      } // Set form.io authentication.


      if (schema.authenticate && this.config.token) {
        requestOptions.headers['x-jwt-token'] = this.config.token;
      }

      return fetch(new Request(requestOptions.url, {
        headers: new Headers(requestOptions.headers)
      })).then(function (response) {
        if (!response.ok) {
          return false;
        }

        return response.json();
      }).then(function (results) {
        return results && results.length;
      }).catch(function () {
        return false;
      });
    }
  }]);

  return Select;
}(Rule), _temp);
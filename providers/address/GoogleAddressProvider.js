"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleAddressProvider = void 0;

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _Formio = require("../../Formio");

var _lodash = _interopRequireDefault(require("lodash"));

var _AddressProvider2 = require("./AddressProvider");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var GoogleAddressProvider = /*#__PURE__*/function (_AddressProvider) {
  _inherits(GoogleAddressProvider, _AddressProvider);

  var _super = _createSuper(GoogleAddressProvider);

  function GoogleAddressProvider() {
    var _options$params;

    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GoogleAddressProvider);

    _this = _super.call(this, options);

    _this.setAutocompleteOptions();

    var src = 'https://maps.googleapis.com/maps/api/js?v=quarterly&libraries=places&callback=googleMapsCallback';

    if ((_options$params = options.params) !== null && _options$params !== void 0 && _options$params.key) {
      src += "&key=".concat(options.params.key);
    }

    _Formio.GlobalFormio.requireLibrary(_this.getLibraryName(), 'google.maps.places', src);

    return _this;
  }

  _createClass(GoogleAddressProvider, [{
    key: "displayValueProperty",
    get: function get() {
      return 'formattedPlace';
    }
  }, {
    key: "alternativeDisplayValueProperty",
    get: function get() {
      return 'formatted_address';
    }
  }, {
    key: "autocompleteOptions",
    get: function get() {
      return this._autocompleteOptions;
    },
    set: function set(options) {
      this._autocompleteOptions = options;
    }
  }, {
    key: "setAutocompleteOptions",
    value: function setAutocompleteOptions() {
      var options = _lodash.default.get(this.options, 'params.autocompleteOptions', {});

      if (!_lodash.default.isObject(options)) {
        options = {};
      }

      this.addRequiredProviderOptions(options);
      this.autocompleteOptions = options;
    }
  }, {
    key: "beforeMergeOptions",
    value: function beforeMergeOptions(options) {
      // providing support of old Google Provider option
      this.convertRegionToAutocompleteOption(options);
    }
  }, {
    key: "getLibraryName",
    value: function getLibraryName() {
      return 'googleMaps';
    }
  }, {
    key: "convertRegionToAutocompleteOption",
    value: function convertRegionToAutocompleteOption(options) {
      var providerOptions = options;

      var region = _lodash.default.get(providerOptions, 'params.region', '');

      if (region && !_lodash.default.has(options, 'params.autocompleteOptions')) {
        region = region.toUpperCase().trim(); // providing compatibility with ISO 3166-1 Alpha-2 county codes (for checking compatibility https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)

        var countryCodes = {
          'UK': 'GB'
        };

        if (countryCodes[region]) {
          region = countryCodes[region];
        }

        _lodash.default.set(providerOptions, 'params.autocompleteOptions.componentRestrictions.country', [region]);
      }
    }
  }, {
    key: "getRequiredAddressProperties",
    value: function getRequiredAddressProperties() {
      return ['address_components', 'formatted_address', 'geometry', 'place_id', 'plus_code', 'types'];
    }
  }, {
    key: "addRequiredProviderOptions",
    value: function addRequiredProviderOptions(options) {
      var addressProperties = this.getRequiredAddressProperties();

      if (_lodash.default.isArray(options.fields) && options.fields.length > 0) {
        options.fields.forEach(function (optionalField) {
          if (!addressProperties.some(function (addressProp) {
            return optionalField === addressProp;
          })) {
            addressProperties.push(optionalField);
          }
        });
      }

      options.fields = addressProperties;
    }
  }, {
    key: "filterPlace",
    value: function filterPlace(place) {
      place = place || {};
      var filteredPlace = {};

      if (this.autocompleteOptions) {
        this.autocompleteOptions.fields.forEach(function (field) {
          if (place[field]) {
            filteredPlace[field] = place[field];
          }
        });
      }

      return filteredPlace;
    }
  }, {
    key: "attachAutocomplete",
    value: function attachAutocomplete(elem, index, onSelectAddress) {
      var _this2 = this;

      _Formio.GlobalFormio.libraryReady(this.getLibraryName()).then(function () {
        var autocomplete = new google.maps.places.Autocomplete(elem, _this2.autocompleteOptions);
        autocomplete.addListener('place_changed', function () {
          var place = _this2.filterPlace(autocomplete.getPlace());

          place.formattedPlace = _lodash.default.get(autocomplete, 'gm_accessors_.place.se.formattedPrediction', place[_this2.alternativeDisplayValueProperty]);
          onSelectAddress(place, elem, index);
        });
      });
    }
  }, {
    key: "search",
    value: function search() {
      return _nativePromiseOnly.default.resolve();
    }
  }, {
    key: "makeRequest",
    value: function makeRequest() {
      return _nativePromiseOnly.default.resolve();
    }
  }, {
    key: "getDisplayValue",
    value: function getDisplayValue(address) {
      var displayedProperty = _lodash.default.has(address, this.displayValueProperty) ? this.displayValueProperty : this.alternativeDisplayValueProperty;
      return _lodash.default.get(address, displayedProperty, '');
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
"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TextField = _interopRequireDefault(require("../../components/textfield/TextField"));

var _Formio = _interopRequireDefault(require("../../Formio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var LocationComponent = /*#__PURE__*/function (_TextFieldComponent) {
  _inherits(LocationComponent, _TextFieldComponent);

  var _super = _createSuper(LocationComponent);

  function LocationComponent() {
    _classCallCheck(this, LocationComponent);

    return _super.apply(this, arguments);
  }

  _createClass(LocationComponent, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(LocationComponent.prototype), "init", this).call(this); // Get the source for Google Maps API


      var src = 'https://maps.googleapis.com/maps/api/js?v=3&libraries=places&callback=googleMapsCallback';

      if (this.component.map && this.component.map.key) {
        src += "&key=".concat(this.component.map.key);
      }

      if (this.component.map && this.component.map.region) {
        src += "&region=".concat(this.component.map.region);
      }

      _Formio.default.requireLibrary('googleMaps', 'google.maps.places', src);
    }
  }, {
    key: "renderElement",
    value: function renderElement(value, index) {
      return _get(_getPrototypeOf(LocationComponent.prototype), "renderElement", this).call(this, value, index) + this.renderTemplate('map', {
        mapId: this.component.map.gmapId
      });
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var ret = _get(_getPrototypeOf(LocationComponent.prototype), "attach", this).call(this, element);

      this.loadRefs(element, {
        gmapElement: 'multiple'
      });
      return ret;
    }
  }, {
    key: "attachElement",
    value: function attachElement(element, index) {
      var _this = this;

      _get(_getPrototypeOf(LocationComponent.prototype), "attachElement", this).call(this, element, index);

      _Formio.default.libraryReady('googleMaps').then(function () {
        var defaultLatlng = new google.maps.LatLng(45.5041482, -73.5574125);
        var options = {
          zoom: 19,
          center: defaultLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [{
            'featureType': 'poi',
            'stylers': [{
              'visibility': 'off'
            }]
          }, {
            'featureType': 'transit',
            'stylers': [{
              'visibility': 'off'
            }]
          }]
        };

        if (!_this.refs.gmapElement[index]) {
          return;
        }

        element.map = new google.maps.Map(_this.refs.gmapElement[index], options);

        _this.addMarker(defaultLatlng, 'Default Marker', element);

        var autocompleteOptions = {};

        if (_this.component.map) {
          autocompleteOptions = _this.component.map.autocompleteOptions || {};
        }

        var autocomplete = new google.maps.places.Autocomplete(element, autocompleteOptions);
        autocomplete.addListener('place_changed', function () {
          var place = autocomplete.getPlace();

          if (!place.geometry) {
            console.log('Autocomplete\'s returned place contains no geometry');
            return;
          } // If the place has a geometry, then present it on a map.


          if (place.geometry.viewport) {
            element.map.fitBounds(place.geometry.viewport);
          } else {
            element.map.setCenter(place.geometry.location);
            element.map.setZoom(17); // Why 17? Because it looks good.
          }

          element.marker.setIcon(
          /** @type {google.maps.Icon} */
          {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          });
          element.marker.setPosition(place.geometry.location);

          _this.setValue(place.name);
        });
      });
    }
  }, {
    key: "addMarker",
    value: function addMarker(latlng, title, element) {
      var _this2 = this;

      element.marker = new google.maps.Marker({
        position: latlng,
        map: element.map,
        title: title,
        draggable: true
      });
      element.marker.addListener('dragend', function (event) {
        var geocoder = new google.maps.Geocoder();
        var latlng = {
          lat: parseFloat(event.latLng.lat()),
          lng: parseFloat(event.latLng.lng())
        };
        geocoder.geocode({
          'location': latlng
        }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              _this2.setValue(results[0].formatted_address);
            } else {
              console.log('No results found');
            }
          } else {
            console.log("Geocoder failed due to: ".concat(status));
          }
        });
      });
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return LocationComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return '';
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(LocationComponent.prototype), "inputInfo", this);

      info.attr.class += ' Gmap-search';
      return info;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _TextField.default.schema.apply(_TextField.default, [{
        type: 'location',
        label: 'Location',
        key: 'location',
        map: {
          key: '',
          region: '',
          gmapId: '',
          autocompleteOptions: {}
        }
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Location',
        group: 'advanced',
        icon: 'map',
        weight: 36,
        schema: LocationComponent.schema()
      };
    }
  }]);

  return LocationComponent;
}(_TextField.default);

exports.default = LocationComponent;
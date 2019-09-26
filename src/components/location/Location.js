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

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Base = _interopRequireDefault(require("../base/Base"));

var _Formio = _interopRequireDefault(require("../../Formio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LocationComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(LocationComponent, _BaseComponent);

  _createClass(LocationComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
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
        icon: 'fa fa-map',
        weight: 500,
        schema: LocationComponent.schema()
      };
    }
  }]);

  function LocationComponent(component, options, data) {
    var _this;

    _classCallCheck(this, LocationComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LocationComponent).call(this, component, options, data)); // Get the source for Google Maps API

    var src = 'https://maps.googleapis.com/maps/api/js?v=3&libraries=places&callback=googleMapsCallback';

    if (component.map && component.map.key) {
      src += "&key=".concat(component.map.key);
    }

    if (component.map && component.map.region) {
      src += "&region=".concat(component.map.region);
    }

    _Formio.default.requireLibrary('googleMaps', 'google.maps.places', src);

    return _this;
  }

  _createClass(LocationComponent, [{
    key: "build",
    value: function build() {
      this.element = this.ce('div', {
        id: this.id,
        class: 'map-container'
      });
      this.element.component = this;
      this.initGoogleMap();
      this.input = this.createInput(this.element);
      this.addInput(this.input, this.element);
      var gmapElement = this.ce('div', {
        id: this.component.map.gmapId,
        style: 'min-height: 300px; height: calc(100vh - 600px);'
      });
      this.element.appendChild(gmapElement);
      this.attachLogic();
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      flags.noValidate = true;

      _get(_getPrototypeOf(LocationComponent.prototype), "setValue", this).call(this, value, flags);
    }
  }, {
    key: "addInput",
    value: function addInput(input, container) {
      var _this2 = this;

      _get(_getPrototypeOf(LocationComponent.prototype), "addInput", this).call(this, input, container);

      var that = this;

      _Formio.default.libraryReady('googleMaps').then(function () {
        var autocompleteOptions = {};

        if (_this2.component.map) {
          autocompleteOptions = _this2.component.map.autocompleteOptions || {};
        }

        var autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);
        autocomplete.addListener('place_changed', function () {
          that.marker.setVisible(false);
          var place = autocomplete.getPlace();

          if (!place.geometry) {
            console.log("Autocomplete's returned place contains no geometry");
            return;
          } // If the place has a geometry, then present it on a map.


          if (place.geometry.viewport) {
            that.map.fitBounds(place.geometry.viewport);
          } else {
            that.map.setCenter(place.geometry.location);
            that.map.setZoom(17); // Why 17? Because it looks good.
          }

          that.marker.setIcon(
          /** @type {google.maps.Icon} */
          {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          });
          that.marker.setPosition(place.geometry.location);
          that.marker.setVisible(true);
          that.setValue(place.name);
        });
      });
    }
  }, {
    key: "elementInfo",
    value: function elementInfo() {
      var info = _get(_getPrototypeOf(LocationComponent.prototype), "elementInfo", this).call(this);

      info.attr.class += ' Gmap-search';
      return info;
    }
  }, {
    key: "initGoogleMap",
    value: function initGoogleMap() {
      var _this3 = this;

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
        var mapElement = document.getElementById(_this3.component.map.gmapId);

        if (!mapElement) {
          return;
        }

        _this3.map = new google.maps.Map(mapElement, options);

        _this3.addMarker(defaultLatlng, 'Default Marker', _this3.map);
      });
    }
  }, {
    key: "addMarker",
    value: function addMarker(latlng, title, map) {
      var that = this;
      this.marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: title,
        draggable: true
      });
      this.marker.addListener('dragend', function (event) {
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
              that.setValue(results[0].formatted_address);
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
  }]);

  return LocationComponent;
}(_Base.default);

exports.default = LocationComponent;
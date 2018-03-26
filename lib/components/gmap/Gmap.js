'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GmapComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Base = require('../base/Base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals google */


var GmapComponent = exports.GmapComponent = function (_BaseComponent) {
  _inherits(GmapComponent, _BaseComponent);

  function GmapComponent(component, options, data) {
    _classCallCheck(this, GmapComponent);

    // Get the source for Google Maps API
    var _this = _possibleConstructorReturn(this, (GmapComponent.__proto__ || Object.getPrototypeOf(GmapComponent)).call(this, component, options, data));

    var src = 'https://maps.googleapis.com/maps/api/js?v=3&libraries=places&callback=googleMapsCallback';
    if (component.map && component.map.key) {
      src += '&key=' + component.map.key;
    }
    if (component.map && component.map.region) {
      src += '&region=' + component.map.region;
    }
    _Base.BaseComponent.requireLibrary('googleMaps', 'google.maps.places', src);
    return _this;
  }

  _createClass(GmapComponent, [{
    key: 'build',
    value: function build() {
      this.element = this.ce('div', {
        class: 'map-container'
      });
      this.initGoogleMap();
      this.input = this.createInput(this.element);
      this.addInput(this.input, this.element);
      var gmapElement = this.ce('div', {
        id: this.component.map.gmapId,
        style: 'min-height: 300px; height: calc(100vh - 600px);'
      });
      this.element.appendChild(gmapElement);
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      flags.noValidate = true;
      _get(GmapComponent.prototype.__proto__ || Object.getPrototypeOf(GmapComponent.prototype), 'setValue', this).call(this, value, flags);
    }
  }, {
    key: 'addInput',
    value: function addInput(input, container) {
      var _this2 = this;

      _get(GmapComponent.prototype.__proto__ || Object.getPrototypeOf(GmapComponent.prototype), 'addInput', this).call(this, input, container);
      var that = this;
      _Base.BaseComponent.libraryReady('googleMaps').then(function () {
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
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            that.map.fitBounds(place.geometry.viewport);
          } else {
            that.map.setCenter(place.geometry.location);
            that.map.setZoom(17); // Why 17? Because it looks good.
          }
          that.marker.setIcon( /** @type {google.maps.Icon} */{
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
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(GmapComponent.prototype.__proto__ || Object.getPrototypeOf(GmapComponent.prototype), 'elementInfo', this).call(this);
      info.attr.class += ' Gmap-search';
      return info;
    }
  }, {
    key: 'initGoogleMap',
    value: function initGoogleMap() {
      var _this3 = this;

      _Base.BaseComponent.libraryReady('googleMaps').then(function () {
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
    key: 'addMarker',
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
        var latlng = { lat: parseFloat(event.latLng.lat()), lng: parseFloat(event.latLng.lng()) };
        geocoder.geocode({ 'location': latlng }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              that.setValue(results[0].formatted_address);
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        });
      });
    }
  }, {
    key: 'emptyValue',
    get: function get() {
      return '';
    }
  }]);

  return GmapComponent;
}(_Base.BaseComponent);
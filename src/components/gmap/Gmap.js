import { BaseComponent } from '../base/Base';
export class GmapComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);

    // Get the source for Google Maps API
    let src = 'https://maps.googleapis.com/maps/api/js?v=3&libraries=places&callback=googleMapsCallback';
    if (component.map && component.map.key) {
      src += '&key=' + component.map.key;
    }
    if (component.map && component.map.region) {
      src += '&region=' + component.map.region;
    }
    BaseComponent.requireLibrary('googleMaps', 'google.maps.places', src);
  }

  build() {
    this.element = this.ce('element', 'div', {
      class: 'map-container'
    });
    this.initGoogleMap();
    this.input = this.createInput(this.element);
    this.addInput(this.input, this.element);
    let gmapElement = this.ce('gmapElement', 'div', {
      id: this.component.map.gmapId,
      style: "min-height: 300px; height: calc(100vh - 600px);"
    });
    this.element.appendChild(gmapElement);
  }

  setValue(value) {
    super.setValue(value, true);
  }

  addInput(input, container) {
    super.addInput(input, container);
    let that = this;
    BaseComponent.libraryReady('googleMaps').then(() => {
      let autocompleteOptions = {};
      if (this.component.map) {
        autocompleteOptions = this.component.map.autocompleteOptions || {};
      }
      let autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);
      autocomplete.addListener('place_changed', function() {
        that.marker.setVisible(false);
        let place = autocomplete.getPlace();
        if (!place.geometry) {
          console.log("Autocomplete's returned place contains no geometry");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          that.map.fitBounds(place.geometry.viewport);
        } else {
          that.map.setCenter(place.geometry.location);
          that.map.setZoom(17);  // Why 17? Because it looks good.
        }
        that.marker.setIcon(/** @type {google.maps.Icon} */({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        }));
        that.marker.setPosition(place.geometry.location);
        that.marker.setVisible(true);
        let address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }
        that.setValue(place.name);
      });
    });
  }

  elementInfo() {
    let info = super.elementInfo();
    info.attr.class += ' Gmap-search';
    return info;
  }

  initGoogleMap() {
    BaseComponent.libraryReady('googleMaps').then((result) => {
      let defaultLatlng = new google.maps.LatLng(45.5041482, -73.5574125);
      let options = {
        zoom: 19,
        center: defaultLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            "featureType": "poi",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        ]
      };
      this.map = new google.maps.Map(document.getElementById(this.component.map.gmapId), options);
      this.addMarker(defaultLatlng, 'Default Marker', this.map);
    });
  }

  addMarker(latlng, title, map) {
    let that = this;
    this.marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: title,
      draggable:true
    });
    this.marker.addListener('dragend', function(event) {
      let geocoder = new google.maps.Geocoder;
      let latlng = {lat: parseFloat(event.latLng.lat()), lng: parseFloat(event.latLng.lng())};
      geocoder.geocode({'location': latlng}, function(results, status) {
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
}

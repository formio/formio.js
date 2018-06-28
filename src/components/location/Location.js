/* global google */
import TextFieldComponent from '../textfield/TextField';
import Formio from '../../Formio';

export default class LocationComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'location',
      label: 'Location',
      key: 'location',
      map: {
        key: '',
        region: '',
        gmapId: '',
        autocompleteOptions: {}
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Location',
      group: 'advanced',
      icon: 'fa fa-map',
      weight: 500,
      schema: LocationComponent.schema()
    };
  }

  init() {
    super.init();
    // Get the source for Google Maps API
    let src = 'https://maps.googleapis.com/maps/api/js?v=3&libraries=places&callback=googleMapsCallback';
    if (this.component.map && this.component.map.key) {
      src += `&key=${this.component.map.key}`;
    }
    if (this.component.map && this.component.map.region) {
      src += `&region=${this.component.map.region}`;
    }
    Formio.requireLibrary('googleMaps', 'google.maps.places', src);
  }

  get defaultSchema() {
    return LocationComponent.schema();
  }

  get emptyValue() {
    return '';
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.attr.class += ' Gmap-search';
    return info;
  }

  renderElement(value, index) {
    return super.renderElement(value, index) + this.renderTemplate('map', {
      mapId: this.component.map.gmapId,
    });
  }

  hydrateElement(element, index) {
    this.loadRefs(this.element, { gmapElement: 'single' });
    super.hydrateElement(element, index);

    const input = this.refs.input[0];
    const that = this;
    Formio.libraryReady('googleMaps').then(() => {
      const defaultLatlng = new google.maps.LatLng(45.5041482, -73.5574125);
      const options = {
        zoom: 19,
        center: defaultLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            'featureType': 'poi',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'transit',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          }
        ]
      };

      if (!this.refs.gmapElement) {
        return;
      }
      this.map = new google.maps.Map(this.refs.gmapElement, options);
      this.addMarker(defaultLatlng, 'Default Marker', this.map);

      let autocompleteOptions = {};
      if (this.component.map) {
        autocompleteOptions = this.component.map.autocompleteOptions || {};
      }
      const autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.log('Autocomplete\'s returned place contains no geometry');
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          that.map.fitBounds(place.geometry.viewport);
        }
        else {
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
        that.setValue(place.name);
      });
    });
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    flags.noValidate = true;
    super.setValue(value, flags);
  }

  addMarker(latlng, title, map) {
    const that = this;
    this.marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: title,
      draggable:true
    });
    this.marker.addListener('dragend', (event) => {
      const geocoder = new google.maps.Geocoder;
      const latlng = { lat: parseFloat(event.latLng.lat()), lng: parseFloat(event.latLng.lng()) };
      geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            that.setValue(results[0].formatted_address);
          }
          else {
            console.log('No results found');
          }
        }
        else {
          console.log(`Geocoder failed due to: ${status}`);
        }
      });
    });
  }
}

/* global google */
import TextFieldComponent from '../../components/textfield/TextField';
import { GlobalFormio as Formio } from '../../Formio';

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
      icon: 'map',
      weight: 36,
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

  attach(element) {
    const ret = super.attach(element);
    this.loadRefs(element, { gmapElement: 'multiple' });
    return ret;
  }

  attachElement(element, index) {
    super.attachElement(element, index);
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

      if (!this.refs.gmapElement[index]) {
        return;
      }
      element.map = new google.maps.Map(this.refs.gmapElement[index], options);
      this.addMarker(defaultLatlng, 'Default Marker', element);

      let autocompleteOptions = {};
      if (this.component.map) {
        autocompleteOptions = this.component.map.autocompleteOptions || {};
      }
      const autocomplete = new google.maps.places.Autocomplete(element, autocompleteOptions);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.log('Autocomplete\'s returned place contains no geometry');
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          element.map.fitBounds(place.geometry.viewport);
        }
        else {
          element.map.setCenter(place.geometry.location);
          element.map.setZoom(17);  // Why 17? Because it looks good.
        }
        element.marker.setIcon(/** @type {google.maps.Icon} */({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        }));
        element.marker.setPosition(place.geometry.location);
        this.setValue(place.name);
      });
    });
  }

  addMarker(latlng, title, element) {
    element.marker = new google.maps.Marker({
      position: latlng,
      map: element.map,
      title: title,
      draggable:true
    });
    element.marker.addListener('dragend', (event) => {
      const geocoder = new google.maps.Geocoder;
      const latlng = { lat: parseFloat(event.latLng.lat()), lng: parseFloat(event.latLng.lng()) };
      geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            this.setValue(results[0].formatted_address);
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

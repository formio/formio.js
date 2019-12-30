/* global google */

import Formio from '../../Formio';

import { AddressProvider } from './AddressProvider';

export class GoogleAddressProvider extends AddressProvider {
  static get name() {
    return 'google';
  }

  static get displayName() {
    return 'Google Maps';
  }

  constructor(options = {}) {
    super(options);

    let src = 'https://maps.googleapis.com/maps/api/js?v=3&libraries=places&callback=googleMapsCallback';

    if (options.apiKey) {
      src += `&key=${options.apiKey}`;
    }
    if (options.region) {
      src += `&region=${options.region}`;
    }

    Formio.requireLibrary('googleMaps', 'google.maps.places', src);
  }

  get displayValueProperty() {
    return 'formatted_address';
  }

  search(query, options = {}) {
    const requestOptions = this.getRequestOptions(options);
    const params = requestOptions.params = requestOptions.params || {};
    params[this.queryProperty] = query;

    return Formio.libraryReady('googleMaps').then(() => {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      return new Promise((resolve, reject) => {
        service.textSearch(params, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
          }
          else {
            reject();
          }
        });
      });
    });
  }
}

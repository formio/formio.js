import { AddressProvider } from './AddressProvider';
import NativePromise from 'native-promise-only';

export class GoogleAddressProvider extends AddressProvider {
  static get name() {
    return 'google';
  }

  static get displayName() {
    return 'Google Maps';
  }

  get defaultOptions() {
    return {
      params: {
        sensor: 'false',
      },
    };
  }

  get queryProperty() {
    return 'address';
  }

  get responseProperty() {
    return 'results';
  }

  get displayValueProperty() {
    return 'formatted_address';
  }

  makeRequest(options = {}) {
    return new NativePromise((resolve, reject) => {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', this.getRequestUrl(options), true);

      xhr.onload = () => resolve(JSON.parse(xhr.response));

      xhr.onerror = reject;

      xhr.send();
    });
  }

  getRequestUrl(options = {}) {
    const { params } = options;

    return `https://maps.googleapis.com/maps/api/geocode/json?${this.serialize(params)}`;
  }
}

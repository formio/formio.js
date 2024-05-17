import { AddressProvider } from './AddressProvider';

export class NominatimAddressProvider extends AddressProvider {
  static get name() {
    return 'nominatim';
  }

  static get displayName() {
    return 'OpenStreetMap Nominatim';
  }

  get defaultOptions() {
    return {
      params: {
        addressdetails: '1',
        format: 'json',
      },
    };
  }

  get queryProperty() {
    return 'q';
  }

  get displayValueProperty() {
    return 'display_name';
  }

  getRequestUrl(options = {}) {
    const { params } = options;

    return `https://nominatim.openstreetmap.org/search?${this.serialize(params)}`;
  }
}

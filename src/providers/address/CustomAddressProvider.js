import { AddressProvider } from './AddressProvider';

export class CustomAddressProvider extends AddressProvider {
  static get name() {
    return 'custom';
  }

  static get displayName() {
    return 'Custom';
  }

  get queryProperty() {
    return this.options.queryProperty || super.queryProperty;
  }

  get responseProperty() {
    return this.options.responseProperty || super.responseProperty;
  }

  get displayValueProperty() {
    return this.options.displayValueProperty || super.displayValueProperty;
  }

  getRequestUrl(options = {}) {
    const { params, url } = options;

    return `${url}?${this.serialize(params)}`;
  }
}

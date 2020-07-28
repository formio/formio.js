import { superGet } from '../../utils/utils';

import { AddressProvider } from './AddressProvider';

export class CustomAddressProvider extends AddressProvider {
  static get name() {
    return 'custom';
  }

  static get displayName() {
    return 'Custom';
  }

  get queryProperty() {
    return this.options.queryProperty || superGet(AddressProvider, 'queryProperty', this);
  }

  get responseProperty() {
    return this.options.responseProperty || superGet(AddressProvider, 'responseProperty', this);
  }

  get displayValueProperty() {
    return this.options.displayValueProperty || superGet(AddressProvider, 'displayValueProperty', this);
  }

  getRequestUrl(options = {}) {
    const { params, url } = options;

    return `${url}?${this.serialize(params)}`;
  }
}

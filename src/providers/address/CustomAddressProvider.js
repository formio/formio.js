import { AddressProvider } from './AddressProvider';

/**
 * CustomAddressProvider class extends the AddressProvider class and provides custom functionality for address handling.
 * @augments AddressProvider
 */
export class CustomAddressProvider extends AddressProvider {
  /**
   * Returns the name of the custom address provider.
   * @type {string}
   */
  static get name() {
    return 'custom';
  }

  /**
   * Returns the display name of the custom address provider.
   * @type {string}
   */
  static get displayName() {
    return 'Custom';
  }

  /**
   * Returns the query property of the custom address provider.
   * If not provided, falls back to the query property of the parent class.
   * @type {string}
   */
  get queryProperty() {
    return this.options.queryProperty || super.queryProperty;
  }

  /**
   * Returns the response property of the custom address provider.
   * If not provided, falls back to the response property of the parent class.
   * @type {string}
   */
  get responseProperty() {
    return this.options.responseProperty || super.responseProperty;
  }

  /**
   * Returns the display value property of the custom address provider.
   * If not provided, falls back to the display value property of the parent class.
   * @type {string}
   */
  get displayValueProperty() {
    return this.options.displayValueProperty || super.displayValueProperty;
  }

  /**
   * Returns the request URL for the custom address provider.
   * @param {object} options - The options for the request.
   * @param {object} options.params - The parameters for the request.
   * @param {string} options.url - The URL for the request.
   * @returns {string} The request URL.
   */
  getRequestUrl(options = {}) {
    const { params, url } = options;

    return `${url}?${this.serialize(params)}`;
  }
}

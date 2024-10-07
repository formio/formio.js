import { AddressProvider } from './AddressProvider';

/**
 * @typedef {object} NominatimAddressProviderOptionsParams
 * @property {{ addressdetails: string, format: string } } params - The parameters for the Nominatim API request.
 */
/**
 * Represents an Nominatim address provider.
 * {extends AddressProvider}
 */

export class NominatimAddressProvider extends AddressProvider {
  /**
   * Gets the name of the address provider.
   * @type {string}
   */
  static get name() {
    return 'nominatim';
  }
  /**
   * Gets the display name of the address provider.
   * @type {string}
   */
  static get displayName() {
    return 'OpenStreetMap Nominatim';
  }
  /**
   * Gets the default options for the address provider.
   * @returns {NominatimAddressProviderOptionsParams}  The default options.
   */
  get defaultOptions() {
    return {
      params: {
        addressdetails: '1',
        format: 'json',
      },
    };
  }
  /**
   * Gets the response property for the address provider.
   * @type {string}
   */
  get queryProperty() {
    return 'q';
  }
  /**
   * Gets the display value property for the address provider.
   * @returns {string} The property to use for display value.
   */
  get displayValueProperty() {
    return 'display_name';
  }
  /**
   * Generates the request URL for the address provider with options.
   * @param {NominatimAddressProviderOptionsParams} options - The request options.
   * @returns {string} The formatted Url.
   */
  getRequestUrl(options = {}) {
    const { params } = options;

    return `https://nominatim.openstreetmap.org/search?${this.serialize(params)}`;
  }
}

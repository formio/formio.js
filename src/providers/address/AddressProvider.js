import _ from 'lodash';

import { Formio } from '../../Formio';

/**
 * @typedef {object} RequestOptions
 * @property {object} params - The request parameters.
 * @property {boolean} noToken - Whether to include a token in the request.
 */

/**
 * @typedef {object} Address
 * @property {string} street - The street address.
 * @property {string} city - The city.
 * @property {string} state - The state.
 * @property {string} country - The country.
 * @property {string} postalCode - The postal code.
 */

/**
 * @class AddressProvider
 * @classdesc Represents an address provider.
 */
export class AddressProvider {
  /**
   * @static
   * @type {string}
   * @description The name of the address provider.
   */
  static get name() {

    return 'address';
  }

  /**
   * @static
   * @type {string}
   * @description The display name of the address provider.
   */
  static get displayName() {

    return 'Address';
  }

  /**
   * @class
   * @param {object} options - The options for the address provider.
   */
  constructor(options = {}) {

    this.beforeMergeOptions(options);
    this.options = _.merge({}, this.defaultOptions, options);
  }

  /**
   * @private
   * @description Executes before merging the options.
   */
  beforeMergeOptions() {

    return;
  }

  /**
   * @private
   * @type {object}
   * @description The default options for the address provider.
   */

  get defaultOptions() {
    return {};
  }

  /**
   * @private
   * @type {string}
   * @description The query property name.
   */
  get queryProperty() {
    return 'query';
  }


  /**
   * @private
   * @type {string|null}
   * @description The response property name.
   */
  get responseProperty() {
    return null;
  }


  /**
   * @private
   * @type {string|null}
   * @description The display value property name.
   */
  get displayValueProperty() {
    return null;
  }

  /**
   * @private
   * @param {object} params - The parameters to serialize.
   * @returns {string} The serialized parameters.
   */
  serialize(params) {
    return _.toPairs(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
  }

  /**
   * @private
   * @param {object} options - The request options.
   * @returns {RequestOptions} The merged request options.
   */
  getRequestOptions(options = {}) {
    return _.merge({}, this.options, options);
  }

  /**
   * @private
   * @param {object} _options - The request options.
   * @throws {Error} Throws an error if the method is not implemented.
   */
  getRequestUrl(_options = {}) {
    throw new Error('Method AddressProvider#getRequestUrl(options) is abstract.');
  }

  /**
   * @private
   * @param {object} options - The request options.
   * @returns {Promise} A promise that resolves with the request result.
   */
  makeRequest(options = {}) {
    return Formio.makeStaticRequest(this.getRequestUrl(options), 'GET', null, {
      noToken: true,
    });
  }

  /**
   * @public
   * @description The search parameters for the request.
   * @param {string} query - The search query.
   * @param {object} options - The search options.
   * @returns {Promise<Address[]>} A promise that resolves with the search results.
   */
  search(query, options = {}) {
    const requestOptions = this.getRequestOptions(options);
    const params = requestOptions.params = requestOptions.params || {};
    params[this.queryProperty] = query;
    return this.makeRequest(requestOptions)
      .then((result) => this.responseProperty ? _.get(result, this.responseProperty, []) : result);
  }

  /**
   * @public
   * @param {Address} address - The address object.
   * @returns {string} The display value of the address.
   */
  getDisplayValue(address) {
    return this.displayValueProperty ? _.get(address, this.displayValueProperty, '') : String(address);
  }
}

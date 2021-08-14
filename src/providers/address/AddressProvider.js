import _ from 'lodash';

import { GlobalFormio as Formio } from '../../Formio';

export class AddressProvider {
  static get name() {
    return 'address';
  }

  static get displayName() {
    return 'Address';
  }

  constructor(options = {}) {
    this.beforeMergeOptions(options);
    this.options = _.merge({}, this.defaultOptions, options);
  }

  beforeMergeOptions() {
    return;
  }

  get defaultOptions() {
    return {};
  }

  get queryProperty() {
    return 'query';
  }

  get responseProperty() {
    return null;
  }

  get displayValueProperty() {
    return null;
  }

  serialize(params) {
    return _.toPairs(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
  }

  getRequestOptions(options = {}) {
    return _.merge({}, this.options, options);
  }

  // eslint-disable-next-line no-unused-vars
  getRequestUrl(options = {}) {
    throw new Error('Method AddressProvider#getRequestUrl(options) is abstract.');
  }

  makeRequest(options = {}) {
    return Formio.makeStaticRequest(this.getRequestUrl(options), 'GET', null, {
      noToken: true,
    });
  }

  search(query, options = {}) {
    const requestOptions = this.getRequestOptions(options);
    const params = requestOptions.params = requestOptions.params || {};
    params[this.queryProperty] = query;

    return this.makeRequest(requestOptions)
      .then((result) => this.responseProperty ? _.get(result, this.responseProperty, []) : result);
  }

  getDisplayValue(address) {
    return this.displayValueProperty ? _.get(address, this.displayValueProperty, '') : String(address);
  }
}

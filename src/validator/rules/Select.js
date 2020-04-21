import { interpolate } from '../../utils/utils';
import NativePromise from 'native-promise-only';
import fetchPonyfill from 'fetch-ponyfill';
const { fetch, Headers, Request } = fetchPonyfill({
  Promise: NativePromise
});
import _ from 'lodash';

const Rule = require('./Rule');

module.exports = class Select extends Rule {
  defaultMessage = '{{field}} contains an invalid selection';

  check(value, data, row, async) {
    // Skip if value is empty
    if (!value || _.isEmpty(value)) {
      return true;
    }

    // Skip if we're not async-capable
    if (!async) {
      return true;
    }

    const schema = this.component.component;

    // Initialize the request options
    const requestOptions = {
      url: this.settings.url,
      method: 'GET',
      qs: {},
      json: true,
      headers: {}
    };

    // If the url is a boolean value
    if (_.isBoolean(requestOptions.url)) {
      requestOptions.url = !!requestOptions.url;

      if (
        !requestOptions.url ||
        schema.dataSrc !== 'url' ||
        !schema.data.url ||
        !schema.searchField
      ) {
        return true;
      }

      // Get the validation url
      requestOptions.url = schema.data.url;

      // Add the search field
      requestOptions.qs[schema.searchField] = value;

      // Add the filters
      if (schema.filter) {
        requestOptions.url += (!requestOptions.url.includes('?') ? '?' : '&') + schema.filter;
      }

      // If they only wish to return certain fields.
      if (schema.selectFields) {
        requestOptions.qs.select = schema.selectFields;
      }
    }

    if (!requestOptions.url) {
      return true;
    }

    // Make sure to interpolate.
    requestOptions.url = interpolate(requestOptions.url, { data: this.component.data });

    // Add query string to URL
    requestOptions.url += (requestOptions.url.includes('?') ? '&' : '?') + _.chain(requestOptions.qs)
      .map((val, key) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
      .join('&')
      .value();

    // Set custom headers.
    if (schema.data && schema.data.headers) {
      _.each(schema.data.headers, header => {
        if (header.key) {
          requestOptions.headers[header.key] = header.value;
        }
      });
    }

    // Set form.io authentication.
    if (schema.authenticate && this.config.token) {
      requestOptions.headers['x-jwt-token'] = this.config.token;
    }

    return fetch(new Request(requestOptions.url, {
      headers: new Headers(requestOptions.headers)
    }))
      .then(response => {
        if (!response.ok) {
          return false;
        }

        return response.json();
      })
      .then((results) => {
        return results && results.length;
      })
      .catch(() => false);
  }
};

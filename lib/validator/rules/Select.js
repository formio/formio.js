var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { interpolate } from '../../utils/utils';
import NativePromise from 'native-promise-only';
import fetchPonyfill from 'fetch-ponyfill';
var _a = fetchPonyfill({
    Promise: NativePromise
}), fetch = _a.fetch, Headers = _a.Headers, Request = _a.Request;
import _ from 'lodash';
var Rule = require('./Rule');
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} contains an invalid selection';
        return _this;
    }
    Select.prototype.check = function (value, data, row, async) {
        // Skip if value is empty
        if (!value || _.isEmpty(value)) {
            return true;
        }
        // Skip if we're not async-capable
        if (!async) {
            return true;
        }
        var schema = this.component.component;
        // Initialize the request options
        var requestOptions = {
            url: this.settings.url,
            method: 'GET',
            qs: {},
            json: true,
            headers: {}
        };
        // If the url is a boolean value
        if (_.isBoolean(requestOptions.url)) {
            requestOptions.url = !!requestOptions.url;
            if (!requestOptions.url ||
                schema.dataSrc !== 'url' ||
                !schema.data.url ||
                !schema.searchField) {
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
            .map(function (val, key) { return encodeURIComponent(key) + "=" + encodeURIComponent(val); })
            .join('&')
            .value();
        // Set custom headers.
        if (schema.data && schema.data.headers) {
            _.each(schema.data.headers, function (header) {
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
            .then(function (response) {
            if (!response.ok) {
                return false;
            }
            return response.json();
        })
            .then(function (results) {
            return results && results.length;
        })
            .catch(function () { return false; });
    };
    return Select;
}(Rule));
export { Select };
;

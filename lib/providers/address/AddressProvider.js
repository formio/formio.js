import _ from 'lodash';
import { Formio } from '../../Formio';
var AddressProvider = /** @class */ (function () {
    function AddressProvider(options) {
        if (options === void 0) { options = {}; }
        this.options = _.merge({}, this.defaultOptions, options);
    }
    Object.defineProperty(AddressProvider, "name", {
        get: function () {
            return 'address';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressProvider, "displayName", {
        get: function () {
            return 'Address';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressProvider.prototype, "defaultOptions", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressProvider.prototype, "queryProperty", {
        get: function () {
            return 'query';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressProvider.prototype, "responseProperty", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressProvider.prototype, "displayValueProperty", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    AddressProvider.prototype.serialize = function (params) {
        return _.toPairs(params).map(function (_a) {
            var key = _a[0], value = _a[1];
            return encodeURIComponent(key) + "=" + encodeURIComponent(value);
        }).join('&');
    };
    AddressProvider.prototype.getRequestOptions = function (options) {
        if (options === void 0) { options = {}; }
        return _.merge({}, this.options, options);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AddressProvider.prototype.getRequestUrl = function (options) {
        if (options === void 0) { options = {}; }
        throw new Error('Method AddressProvider#getRequestUrl(options) is abstract.');
    };
    AddressProvider.prototype.makeRequest = function (options) {
        if (options === void 0) { options = {}; }
        return Formio.makeStaticRequest(this.getRequestUrl(options), 'GET', null, {
            noToken: true,
        });
    };
    AddressProvider.prototype.search = function (query, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var requestOptions = this.getRequestOptions(options);
        var params = requestOptions.params = requestOptions.params || {};
        params[this.queryProperty] = query;
        return this.makeRequest(requestOptions)
            .then(function (result) { return _this.responseProperty ? _.get(result, _this.responseProperty, []) : result; });
    };
    AddressProvider.prototype.getDisplayValue = function (address) {
        return this.displayValueProperty ? _.get(address, this.displayValueProperty, '') : String(address);
    };
    return AddressProvider;
}());
export { AddressProvider };

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
import { AddressProvider } from './AddressProvider';
import NativePromise from 'native-promise-only';
var GoogleAddressProvider = /** @class */ (function (_super) {
    __extends(GoogleAddressProvider, _super);
    function GoogleAddressProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GoogleAddressProvider, "name", {
        get: function () {
            return 'google';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GoogleAddressProvider, "displayName", {
        get: function () {
            return 'Google Maps';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GoogleAddressProvider.prototype, "defaultOptions", {
        get: function () {
            return {
                params: {
                    sensor: 'false',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GoogleAddressProvider.prototype, "queryProperty", {
        get: function () {
            return 'address';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GoogleAddressProvider.prototype, "responseProperty", {
        get: function () {
            return 'results';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GoogleAddressProvider.prototype, "displayValueProperty", {
        get: function () {
            return 'formatted_address';
        },
        enumerable: false,
        configurable: true
    });
    GoogleAddressProvider.prototype.makeRequest = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new NativePromise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('GET', _this.getRequestUrl(options), true);
            xhr.onload = function () { return resolve(xhr.response); };
            xhr.onerror = reject;
            xhr.send();
        });
    };
    GoogleAddressProvider.prototype.getRequestUrl = function (options) {
        if (options === void 0) { options = {}; }
        var params = options.params;
        return "https://maps.googleapis.com/maps/api/geocode/json?" + this.serialize(params);
    };
    return GoogleAddressProvider;
}(AddressProvider));
export { GoogleAddressProvider };

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
var NominatimAddressProvider = /** @class */ (function (_super) {
    __extends(NominatimAddressProvider, _super);
    function NominatimAddressProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NominatimAddressProvider, "name", {
        get: function () {
            return 'nominatim';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NominatimAddressProvider, "displayName", {
        get: function () {
            return 'OpenStreetMap Nominatim';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NominatimAddressProvider.prototype, "defaultOptions", {
        get: function () {
            return {
                params: {
                    addressdetails: '1',
                    format: 'json',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NominatimAddressProvider.prototype, "queryProperty", {
        get: function () {
            return 'q';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NominatimAddressProvider.prototype, "displayValueProperty", {
        get: function () {
            return 'display_name';
        },
        enumerable: false,
        configurable: true
    });
    NominatimAddressProvider.prototype.getRequestUrl = function (options) {
        if (options === void 0) { options = {}; }
        var params = options.params;
        return "https://nominatim.openstreetmap.org/search?" + this.serialize(params);
    };
    return NominatimAddressProvider;
}(AddressProvider));
export { NominatimAddressProvider };

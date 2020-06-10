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
var CustomAddressProvider = /** @class */ (function (_super) {
    __extends(CustomAddressProvider, _super);
    function CustomAddressProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CustomAddressProvider, "name", {
        get: function () {
            return 'custom';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomAddressProvider, "displayName", {
        get: function () {
            return 'Custom';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomAddressProvider.prototype, "queryProperty", {
        get: function () {
            return this.options.queryProperty || _super.prototype.queryProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomAddressProvider.prototype, "responseProperty", {
        get: function () {
            return this.options.responseProperty || _super.prototype.responseProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomAddressProvider.prototype, "displayValueProperty", {
        get: function () {
            return this.options.displayValueProperty || _super.prototype.displayValueProperty;
        },
        enumerable: false,
        configurable: true
    });
    CustomAddressProvider.prototype.getRequestUrl = function (options) {
        if (options === void 0) { options = {}; }
        var params = options.params, url = options.url;
        return url + "?" + this.serialize(params);
    };
    return CustomAddressProvider;
}(AddressProvider));
export { CustomAddressProvider };

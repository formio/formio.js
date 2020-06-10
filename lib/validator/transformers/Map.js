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
import { IterateeTransformer } from './Iteratee';
var MapTransformer = /** @class */ (function (_super) {
    __extends(MapTransformer, _super);
    function MapTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MapTransformer, "title", {
        get: function () {
            return 'Map';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MapTransformer, "name", {
        get: function () {
            return 'map';
        },
        enumerable: false,
        configurable: true
    });
    MapTransformer.prototype.transform = function (value, args) {
        var _a, _b;
        var iteratee = args.iteratee;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.map) === null || _a === void 0 ? void 0 : _a.call(value, this.getIteratee(iteratee))) !== null && _b !== void 0 ? _b : null;
    };
    return MapTransformer;
}(IterateeTransformer));
export { MapTransformer };

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
import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
var MapKeysTransformer = /** @class */ (function (_super) {
    __extends(MapKeysTransformer, _super);
    function MapKeysTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MapKeysTransformer, "title", {
        get: function () {
            return 'Map Keys';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MapKeysTransformer, "name", {
        get: function () {
            return 'mapKeys';
        },
        enumerable: false,
        configurable: true
    });
    MapKeysTransformer.prototype.transform = function (value, args) {
        var _a;
        var iteratee = args.iteratee;
        return (_a = _.mapKeys(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    };
    return MapKeysTransformer;
}(IterateeTransformer));
export { MapKeysTransformer };

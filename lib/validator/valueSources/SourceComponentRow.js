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
import { SourceComponentValueSource } from './SourceComponent';
var SourceComponentRowValueSource = /** @class */ (function (_super) {
    __extends(SourceComponentRowValueSource, _super);
    function SourceComponentRowValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SourceComponentRowValueSource, "name", {
        get: function () {
            return 'sourceComponentRow';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceComponentRowValueSource, "title", {
        get: function () {
            return 'Source Component Row';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceComponentRowValueSource, "weight", {
        get: function () {
            return 220;
        },
        enumerable: false,
        configurable: true
    });
    SourceComponentRowValueSource.prototype.getValue = function () {
        var _a, _b;
        return (_b = (_a = _super.prototype.getValue.call(this)) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : null;
    };
    return SourceComponentRowValueSource;
}(SourceComponentValueSource));
export { SourceComponentRowValueSource };

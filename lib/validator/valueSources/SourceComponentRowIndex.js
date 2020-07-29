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
var SourceComponentRowIndexValueSource = /** @class */ (function (_super) {
    __extends(SourceComponentRowIndexValueSource, _super);
    function SourceComponentRowIndexValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SourceComponentRowIndexValueSource, "name", {
        get: function () {
            return 'sourceComponentRowIndex';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceComponentRowIndexValueSource, "title", {
        get: function () {
            return 'Source Component Row Index';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceComponentRowIndexValueSource, "weight", {
        get: function () {
            return 230;
        },
        enumerable: false,
        configurable: true
    });
    SourceComponentRowIndexValueSource.prototype.getValue = function () {
        var _a, _b;
        return (_b = (_a = _super.prototype.getValue.call(this)) === null || _a === void 0 ? void 0 : _a.rowIndex) !== null && _b !== void 0 ? _b : null;
    };
    return SourceComponentRowIndexValueSource;
}(SourceComponentValueSource));
export { SourceComponentRowIndexValueSource };

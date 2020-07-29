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
import { ThisComponentValueSource } from './ThisComponent';
var ThisComponentValueValueSource = /** @class */ (function (_super) {
    __extends(ThisComponentValueValueSource, _super);
    function ThisComponentValueValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ThisComponentValueValueSource, "name", {
        get: function () {
            return 'thisComponentValue';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThisComponentValueValueSource, "title", {
        get: function () {
            return 'This Component Value';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThisComponentValueValueSource, "weight", {
        get: function () {
            return 10;
        },
        enumerable: false,
        configurable: true
    });
    ThisComponentValueValueSource.prototype.getValue = function () {
        var _a, _b;
        return (_b = (_a = _super.prototype.getValue.call(this)) === null || _a === void 0 ? void 0 : _a.dataValue) !== null && _b !== void 0 ? _b : null;
    };
    return ThisComponentValueValueSource;
}(ThisComponentValueSource));
export { ThisComponentValueValueSource };

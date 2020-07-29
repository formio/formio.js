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
import { ValueSource } from './ValueSource';
var EmptyObjectValueSource = /** @class */ (function (_super) {
    __extends(EmptyObjectValueSource, _super);
    function EmptyObjectValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EmptyObjectValueSource, "name", {
        get: function () {
            return 'emptyObject';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmptyObjectValueSource, "title", {
        get: function () {
            return 'Empty Object';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmptyObjectValueSource, "weight", {
        get: function () {
            return 520;
        },
        enumerable: false,
        configurable: true
    });
    EmptyObjectValueSource.prototype.getValue = function () {
        return {};
    };
    return EmptyObjectValueSource;
}(ValueSource));
export { EmptyObjectValueSource };

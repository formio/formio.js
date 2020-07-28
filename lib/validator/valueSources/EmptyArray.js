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
var EmptyArrayValueSource = /** @class */ (function (_super) {
    __extends(EmptyArrayValueSource, _super);
    function EmptyArrayValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EmptyArrayValueSource, "name", {
        get: function () {
            return 'emptyArray';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmptyArrayValueSource, "title", {
        get: function () {
            return 'Empty Array';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmptyArrayValueSource, "weight", {
        get: function () {
            return 510;
        },
        enumerable: false,
        configurable: true
    });
    EmptyArrayValueSource.prototype.getValue = function () {
        return [];
    };
    return EmptyArrayValueSource;
}(ValueSource));
export { EmptyArrayValueSource };

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
import { BaseEntity } from '../BaseEntity';
var ValueSource = /** @class */ (function (_super) {
    __extends(ValueSource, _super);
    function ValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ValueSource, "weight", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    // eslint-disable-next-line no-unused-vars
    ValueSource.getInputEditForm = function (options) {
        return null;
    };
    // eslint-disable-next-line no-unused-vars
    ValueSource.prototype.getValue = function (input) {
        throw new Error('Method #getValue() is abstract.');
    };
    return ValueSource;
}(BaseEntity));
export { ValueSource };

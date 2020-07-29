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
var StringValueSource = /** @class */ (function (_super) {
    __extends(StringValueSource, _super);
    function StringValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StringValueSource, "name", {
        get: function () {
            return 'string';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StringValueSource, "title", {
        get: function () {
            return 'String';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StringValueSource, "weight", {
        get: function () {
            return 400;
        },
        enumerable: false,
        configurable: true
    });
    StringValueSource.getInputEditForm = function () {
        return {
            label: 'String',
            type: 'textfield',
            input: true,
        };
    };
    StringValueSource.prototype.getValue = function (input) {
        return String(input);
    };
    return StringValueSource;
}(ValueSource));
export { StringValueSource };

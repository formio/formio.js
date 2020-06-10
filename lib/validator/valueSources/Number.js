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
var NumberValueSource = /** @class */ (function (_super) {
    __extends(NumberValueSource, _super);
    function NumberValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NumberValueSource, "name", {
        get: function () {
            return 'number';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NumberValueSource, "title", {
        get: function () {
            return 'Number';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NumberValueSource, "weight", {
        get: function () {
            return 410;
        },
        enumerable: false,
        configurable: true
    });
    NumberValueSource.getInputEditForm = function () {
        return {
            label: 'Number',
            type: 'number',
            input: true,
            validate: {
                required: true,
            },
        };
    };
    NumberValueSource.prototype.getValue = function (input) {
        return Number(input);
    };
    return NumberValueSource;
}(ValueSource));
export { NumberValueSource };

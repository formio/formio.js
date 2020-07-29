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
var BooleanValueSource = /** @class */ (function (_super) {
    __extends(BooleanValueSource, _super);
    function BooleanValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BooleanValueSource, "name", {
        get: function () {
            return 'boolean';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BooleanValueSource, "title", {
        get: function () {
            return 'Boolean';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BooleanValueSource, "weight", {
        get: function () {
            return 420;
        },
        enumerable: false,
        configurable: true
    });
    BooleanValueSource.getInputEditForm = function () {
        return {
            label: 'Boolean',
            type: 'select',
            input: true,
            data: {
                values: [
                    {
                        label: 'True',
                        value: true,
                    },
                    {
                        label: 'False',
                        value: false,
                    },
                ],
            },
            dataType: 'boolean',
            validate: {
                required: true,
            },
        };
    };
    BooleanValueSource.prototype.getValue = function (input) {
        return Boolean(input);
    };
    return BooleanValueSource;
}(ValueSource));
export { BooleanValueSource };

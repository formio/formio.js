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
var RegExpValueSource = /** @class */ (function (_super) {
    __extends(RegExpValueSource, _super);
    function RegExpValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RegExpValueSource, "name", {
        get: function () {
            return 'regExp';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegExpValueSource, "title", {
        get: function () {
            return 'RegExp';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegExpValueSource, "weight", {
        get: function () {
            return 460;
        },
        enumerable: false,
        configurable: true
    });
    RegExpValueSource.getInputEditForm = function () {
        return {
            type: 'container',
            input: true,
            components: [
                {
                    label: 'RegExp',
                    key: 'pattern',
                    type: 'textfield',
                    input: true,
                    validate: {
                        required: true,
                    },
                },
                {
                    label: 'Ignore Case',
                    key: 'ignoreCase',
                    type: 'checkbox',
                    input: true,
                },
            ],
        };
    };
    RegExpValueSource.prototype.getValue = function (input) {
        if (input === void 0) { input = {}; }
        var _a = input.pattern, pattern = _a === void 0 ? '' : _a, _b = input.ignoreCase, ignoreCase = _b === void 0 ? false : _b;
        var flags = '';
        if (ignoreCase) {
            flags += 'i';
        }
        return RegExp(pattern, flags);
    };
    return RegExpValueSource;
}(ValueSource));
export { RegExpValueSource };

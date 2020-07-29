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
var ValuesValueSource = /** @class */ (function (_super) {
    __extends(ValuesValueSource, _super);
    function ValuesValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ValuesValueSource, "name", {
        get: function () {
            return 'values';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValuesValueSource, "title", {
        get: function () {
            return 'Values';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValuesValueSource, "weight", {
        get: function () {
            return 650;
        },
        enumerable: false,
        configurable: true
    });
    ValuesValueSource.prototype.getValue = function () {
        return this.getOption('values');
    };
    return ValuesValueSource;
}(ValueSource));
export { ValuesValueSource };

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
var AccumulatorValueSource = /** @class */ (function (_super) {
    __extends(AccumulatorValueSource, _super);
    function AccumulatorValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AccumulatorValueSource, "name", {
        get: function () {
            return 'accumulator';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AccumulatorValueSource, "title", {
        get: function () {
            return 'Accumulator';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AccumulatorValueSource, "weight", {
        get: function () {
            return 640;
        },
        enumerable: false,
        configurable: true
    });
    AccumulatorValueSource.prototype.getValue = function () {
        return this.getOption('accumulator');
    };
    return AccumulatorValueSource;
}(ValueSource));
export { AccumulatorValueSource };

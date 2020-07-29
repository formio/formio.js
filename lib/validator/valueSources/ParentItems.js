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
var ParentItemsValueSource = /** @class */ (function (_super) {
    __extends(ParentItemsValueSource, _super);
    function ParentItemsValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ParentItemsValueSource, "name", {
        get: function () {
            return 'parentItems';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParentItemsValueSource, "title", {
        get: function () {
            return 'Parent Items';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParentItemsValueSource, "weight", {
        get: function () {
            return 620;
        },
        enumerable: false,
        configurable: true
    });
    ParentItemsValueSource.prototype.getValue = function () {
        return this.getOption('parentItems');
    };
    return ParentItemsValueSource;
}(ValueSource));
export { ParentItemsValueSource };

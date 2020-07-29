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
var ItemIndexValueSource = /** @class */ (function (_super) {
    __extends(ItemIndexValueSource, _super);
    function ItemIndexValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ItemIndexValueSource, "name", {
        get: function () {
            return 'itemIndex';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ItemIndexValueSource, "title", {
        get: function () {
            return 'Item Index';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ItemIndexValueSource, "weight", {
        get: function () {
            return 610;
        },
        enumerable: false,
        configurable: true
    });
    ItemIndexValueSource.prototype.getValue = function () {
        return this.getOption('itemIndex');
    };
    return ItemIndexValueSource;
}(ValueSource));
export { ItemIndexValueSource };

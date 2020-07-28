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
var ItemValueSource = /** @class */ (function (_super) {
    __extends(ItemValueSource, _super);
    function ItemValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ItemValueSource, "name", {
        get: function () {
            return 'item';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ItemValueSource, "title", {
        get: function () {
            return 'Item';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ItemValueSource, "weight", {
        get: function () {
            return 600;
        },
        enumerable: false,
        configurable: true
    });
    ItemValueSource.prototype.getValue = function () {
        return this.getOption('item');
    };
    return ItemValueSource;
}(ValueSource));
export { ItemValueSource };

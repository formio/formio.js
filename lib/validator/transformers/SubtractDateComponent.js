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
import moment from 'moment';
import { Transformer } from './Transformer';
var SubtractDateComponentTransformer = /** @class */ (function (_super) {
    __extends(SubtractDateComponentTransformer, _super);
    function SubtractDateComponentTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SubtractDateComponentTransformer, "title", {
        get: function () {
            return 'Subtract Date Component';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractDateComponentTransformer, "name", {
        get: function () {
            return 'subtractDateComponent';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractDateComponentTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Value To Subtract',
                    key: 'valueToSubtract',
                    required: true,
                },
                {
                    name: 'Unit',
                    key: 'unit',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    SubtractDateComponentTransformer.prototype.transform = function (value, args) {
        var valueToSubtract = args.valueToSubtract, unit = args.unit;
        return moment(value).subtract(valueToSubtract, unit);
    };
    return SubtractDateComponentTransformer;
}(Transformer));
export { SubtractDateComponentTransformer };

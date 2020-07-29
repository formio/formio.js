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
var SetDateToEndOfComponentTransformer = /** @class */ (function (_super) {
    __extends(SetDateToEndOfComponentTransformer, _super);
    function SetDateToEndOfComponentTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetDateToEndOfComponentTransformer, "title", {
        get: function () {
            return 'Set Date To End of Component';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateToEndOfComponentTransformer, "name", {
        get: function () {
            return 'setDateToEndOfComponent';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateToEndOfComponentTransformer, "arguments", {
        get: function () {
            return [
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
    SetDateToEndOfComponentTransformer.prototype.transform = function (value, args) {
        var unit = args.unit;
        return moment(value).endOf(unit);
    };
    return SetDateToEndOfComponentTransformer;
}(Transformer));
export { SetDateToEndOfComponentTransformer };

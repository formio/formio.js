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
var GetDateComponentTransformer = /** @class */ (function (_super) {
    __extends(GetDateComponentTransformer, _super);
    function GetDateComponentTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetDateComponentTransformer, "title", {
        get: function () {
            return 'Get Date Component';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetDateComponentTransformer, "name", {
        get: function () {
            return 'getDateComponent';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetDateComponentTransformer, "arguments", {
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
    GetDateComponentTransformer.prototype.transform = function (value, args) {
        var unit = args.unit;
        return moment(value).get(unit);
    };
    return GetDateComponentTransformer;
}(Transformer));
export { GetDateComponentTransformer };

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
var GetDateDifferenceTransformer = /** @class */ (function (_super) {
    __extends(GetDateDifferenceTransformer, _super);
    function GetDateDifferenceTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetDateDifferenceTransformer, "title", {
        get: function () {
            return 'Get Date Difference';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetDateDifferenceTransformer, "name", {
        get: function () {
            return 'getDateDifference';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetDateDifferenceTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Different Date',
                    key: 'differentDate',
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
    Object.defineProperty(GetDateDifferenceTransformer, "optionsEditForm", {
        get: function () {
            return [
                {
                    label: 'Precise Result',
                    key: 'preciseResult',
                    type: 'checkbox',
                    input: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    GetDateDifferenceTransformer.prototype.transform = function (value, args, opts) {
        if (opts === void 0) { opts = {}; }
        var differentDate = args.differentDate, unit = args.unit;
        var _a = opts.preciseResult, preciseResult = _a === void 0 ? false : _a;
        return moment(value).diff(differentDate, unit, preciseResult);
    };
    return GetDateDifferenceTransformer;
}(Transformer));
export { GetDateDifferenceTransformer };

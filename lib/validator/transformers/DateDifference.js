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
var DateDifferenceTransformer = /** @class */ (function (_super) {
    __extends(DateDifferenceTransformer, _super);
    function DateDifferenceTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DateDifferenceTransformer, "title", {
        get: function () {
            return 'Date Difference';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateDifferenceTransformer, "name", {
        get: function () {
            return 'dateDifference';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateDifferenceTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Different Date',
                    key: 'differentDate',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateDifferenceTransformer, "optionsEditForm", {
        get: function () {
            return [
                {
                    label: 'Units',
                    key: 'units',
                    type: 'select',
                    input: true,
                    dataSrc: 'values',
                    data: {
                        values: [
                            {
                                label: 'Years',
                                value: 'years',
                            },
                            {
                                label: 'Months',
                                value: 'months',
                            },
                            {
                                label: 'Weeks',
                                value: 'weeks',
                            },
                            {
                                label: 'Days',
                                value: 'days',
                            },
                            {
                                label: 'Hours',
                                value: 'hours',
                            },
                            {
                                label: 'Minutes',
                                value: 'minutes',
                            },
                            {
                                label: 'Seconds',
                                value: 'seconds',
                            },
                            {
                                label: 'Milliseconds',
                                value: 'milliseconds',
                            },
                        ],
                    },
                    defaultValue: 'years',
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    DateDifferenceTransformer.prototype.transform = function (value, args, opts) {
        if (opts === void 0) { opts = {}; }
        var differentDate = args.differentDate;
        var _a = opts.units, units = _a === void 0 ? '' : _a;
        return moment(value).diff(differentDate, units);
    };
    return DateDifferenceTransformer;
}(Transformer));
export { DateDifferenceTransformer };

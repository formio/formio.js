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
import { ValueSource } from './ValueSource';
var format = 'YYYY-MM-DD';
var DateValueSource = /** @class */ (function (_super) {
    __extends(DateValueSource, _super);
    function DateValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DateValueSource, "name", {
        get: function () {
            return 'date';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateValueSource, "title", {
        get: function () {
            return 'Date';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateValueSource, "weight", {
        get: function () {
            return 440;
        },
        enumerable: false,
        configurable: true
    });
    DateValueSource.getInputEditForm = function () {
        return {
            label: 'Date',
            type: 'datetime',
            input: true,
            validate: {
                required: true,
            },
            format: 'yyyy-MM-dd',
            enableTime: false,
        };
    };
    DateValueSource.prototype.getValue = function (input) {
        return moment(input, format);
    };
    return DateValueSource;
}(ValueSource));
export { DateValueSource };

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
var format = 'YYYY-MM-DD HH:mm';
var DateTimeValueSource = /** @class */ (function (_super) {
    __extends(DateTimeValueSource, _super);
    function DateTimeValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DateTimeValueSource, "name", {
        get: function () {
            return 'dateTime';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateTimeValueSource, "title", {
        get: function () {
            return 'Date/Time';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateTimeValueSource, "weight", {
        get: function () {
            return 430;
        },
        enumerable: false,
        configurable: true
    });
    DateTimeValueSource.getInputEditForm = function () {
        return {
            label: 'Date/Time',
            type: 'datetime',
            input: true,
            validate: {
                required: true,
            },
            format: 'yyyy-MM-dd HH:mm',
            timePicker: {
                showMeridian: false
            },
        };
    };
    DateTimeValueSource.prototype.getValue = function (input) {
        return moment(input, format);
    };
    return DateTimeValueSource;
}(ValueSource));
export { DateTimeValueSource };

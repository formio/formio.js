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
var format = 'HH:mm';
var TimeValueSource = /** @class */ (function (_super) {
    __extends(TimeValueSource, _super);
    function TimeValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TimeValueSource, "name", {
        get: function () {
            return 'time';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeValueSource, "title", {
        get: function () {
            return 'Time';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeValueSource, "weight", {
        get: function () {
            return 450;
        },
        enumerable: false,
        configurable: true
    });
    TimeValueSource.getInputEditForm = function () {
        return {
            label: 'Time',
            type: 'datetime',
            input: true,
            validate: {
                required: true,
            },
            format: 'HH:mm',
            enableDate: false,
            timePicker: {
                showMeridian: false
            },
        };
    };
    TimeValueSource.prototype.getValue = function (input) {
        return moment(input, format);
    };
    return TimeValueSource;
}(ValueSource));
export { TimeValueSource };

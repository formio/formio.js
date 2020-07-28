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
var SetDateComponentTransformer = /** @class */ (function (_super) {
    __extends(SetDateComponentTransformer, _super);
    function SetDateComponentTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetDateComponentTransformer, "title", {
        get: function () {
            return 'Set Date Component';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateComponentTransformer, "name", {
        get: function () {
            return 'setDateComponent';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateComponentTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Value To Set',
                    key: 'valueToSet',
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
    SetDateComponentTransformer.prototype.transform = function (value, args) {
        var valueToSet = args.valueToSet, unit = args.unit;
        return moment(value).set(unit, valueToSet);
    };
    return SetDateComponentTransformer;
}(Transformer));
export { SetDateComponentTransformer };

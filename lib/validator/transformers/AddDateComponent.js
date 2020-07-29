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
var AddDateComponentTransformer = /** @class */ (function (_super) {
    __extends(AddDateComponentTransformer, _super);
    function AddDateComponentTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddDateComponentTransformer, "title", {
        get: function () {
            return 'Add Date Component';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddDateComponentTransformer, "name", {
        get: function () {
            return 'addDateComponent';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddDateComponentTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Value To Add',
                    key: 'valueToAdd',
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
    AddDateComponentTransformer.prototype.transform = function (value, args) {
        var valueToAdd = args.valueToAdd, unit = args.unit;
        return moment(value).add(valueToAdd, unit);
    };
    return AddDateComponentTransformer;
}(Transformer));
export { AddDateComponentTransformer };

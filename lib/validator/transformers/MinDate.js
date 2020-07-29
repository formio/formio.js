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
var MinDateTransformer = /** @class */ (function (_super) {
    __extends(MinDateTransformer, _super);
    function MinDateTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinDateTransformer, "title", {
        get: function () {
            return 'Min Date';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinDateTransformer, "name", {
        get: function () {
            return 'minDate';
        },
        enumerable: false,
        configurable: true
    });
    MinDateTransformer.prototype.transform = function (value) {
        return moment.min(value);
    };
    return MinDateTransformer;
}(Transformer));
export { MinDateTransformer };

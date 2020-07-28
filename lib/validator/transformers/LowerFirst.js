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
import _ from 'lodash';
import { Transformer } from './Transformer';
var LowerFirstTransformer = /** @class */ (function (_super) {
    __extends(LowerFirstTransformer, _super);
    function LowerFirstTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LowerFirstTransformer, "title", {
        get: function () {
            return 'Lower First';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LowerFirstTransformer, "name", {
        get: function () {
            return 'lowerFirst';
        },
        enumerable: false,
        configurable: true
    });
    LowerFirstTransformer.prototype.transform = function (value) {
        return _.lowerFirst(value);
    };
    return LowerFirstTransformer;
}(Transformer));
export { LowerFirstTransformer };

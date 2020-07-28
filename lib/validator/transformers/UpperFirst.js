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
var UpperFirstTransformer = /** @class */ (function (_super) {
    __extends(UpperFirstTransformer, _super);
    function UpperFirstTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UpperFirstTransformer, "title", {
        get: function () {
            return 'Upper First';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UpperFirstTransformer, "name", {
        get: function () {
            return 'upperFirst';
        },
        enumerable: false,
        configurable: true
    });
    UpperFirstTransformer.prototype.transform = function (value) {
        return _.upperFirst(value);
    };
    return UpperFirstTransformer;
}(Transformer));
export { UpperFirstTransformer };

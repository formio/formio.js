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
var CloneDeepTransformer = /** @class */ (function (_super) {
    __extends(CloneDeepTransformer, _super);
    function CloneDeepTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CloneDeepTransformer, "title", {
        get: function () {
            return 'Clone Deep';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloneDeepTransformer, "name", {
        get: function () {
            return 'cloneDeep';
        },
        enumerable: false,
        configurable: true
    });
    CloneDeepTransformer.prototype.transform = function (value) {
        return _.cloneDeep(value);
    };
    return CloneDeepTransformer;
}(Transformer));
export { CloneDeepTransformer };

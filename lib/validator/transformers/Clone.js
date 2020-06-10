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
var CloneTransformer = /** @class */ (function (_super) {
    __extends(CloneTransformer, _super);
    function CloneTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CloneTransformer, "title", {
        get: function () {
            return 'Clone';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloneTransformer, "name", {
        get: function () {
            return 'clone';
        },
        enumerable: false,
        configurable: true
    });
    CloneTransformer.prototype.transform = function (value) {
        return _.clone(value);
    };
    return CloneTransformer;
}(Transformer));
export { CloneTransformer };

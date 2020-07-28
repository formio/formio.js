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
import { IterateeTransformer } from './Iteratee';
var FindKeyTransformer = /** @class */ (function (_super) {
    __extends(FindKeyTransformer, _super);
    function FindKeyTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FindKeyTransformer, "title", {
        get: function () {
            return 'Find Key';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FindKeyTransformer, "name", {
        get: function () {
            return 'findKey';
        },
        enumerable: false,
        configurable: true
    });
    FindKeyTransformer.prototype.transform = function (value, args) {
        var _a;
        var iteratee = args.iteratee;
        return (_a = _.findKey(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    };
    return FindKeyTransformer;
}(IterateeTransformer));
export { FindKeyTransformer };

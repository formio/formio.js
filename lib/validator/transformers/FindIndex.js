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
var FindIndexTransformer = /** @class */ (function (_super) {
    __extends(FindIndexTransformer, _super);
    function FindIndexTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FindIndexTransformer, "title", {
        get: function () {
            return 'Find Index';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FindIndexTransformer, "name", {
        get: function () {
            return 'findIndex';
        },
        enumerable: false,
        configurable: true
    });
    FindIndexTransformer.prototype.transform = function (value, args) {
        var _a;
        var iteratee = args.iteratee;
        return (_a = _.findIndex(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    };
    return FindIndexTransformer;
}(IterateeTransformer));
export { FindIndexTransformer };

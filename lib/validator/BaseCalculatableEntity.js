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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { BaseEntity } from './BaseEntity';
var BaseCalculatableEntity = /** @class */ (function (_super) {
    __extends(BaseCalculatableEntity, _super);
    function BaseCalculatableEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseCalculatableEntity, "arguments", {
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCalculatableEntity, "lazyArgsEvaluation", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCalculatableEntity, "presetArguments", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCalculatableEntity, "optionsEditForm", {
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCalculatableEntity.prototype, "iterateeEngineOptions", {
        get: function () {
            return {
                cachable: false,
            };
        },
        enumerable: false,
        configurable: true
    });
    BaseCalculatableEntity.prototype.getIterateeContext = function (item, itemIndex) {
        var _a = this.options, _b = _a.item, parentItem = _b === void 0 ? null : _b, _c = _a.itemIndex, parentItemIndex = _c === void 0 ? null : _c, _d = _a.parentItems, parentItems = _d === void 0 ? [] : _d, _e = _a.parentItemIndexes, parentItemIndexes = _e === void 0 ? [] : _e;
        return {
            item: item,
            itemIndex: itemIndex,
            parentItems: parentItems.concat(parentItem !== null && parentItem !== void 0 ? parentItem : []),
            parentItemIndexes: parentItemIndexes.concat(parentItemIndex !== null && parentItemIndex !== void 0 ? parentItemIndex : []),
        };
    };
    BaseCalculatableEntity.prototype.getIteratee = function (valueEvaluator) {
        var _this = this;
        return function (item, itemIndex) {
            var context = valueEvaluator.evaluationContext.context;
            return valueEvaluator({
                context: __assign(__assign({}, context), { options: __assign(__assign({}, context.options), _this.getIterateeContext(item, itemIndex)), engineOptions: __assign(__assign({}, context.engineOptions), _this.iterateeEngineOptions) }),
            });
        };
    };
    return BaseCalculatableEntity;
}(BaseEntity));
export { BaseCalculatableEntity };

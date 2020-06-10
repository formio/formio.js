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
import { ValueSource } from './ValueSource';
var ConditionValueSource = /** @class */ (function (_super) {
    __extends(ConditionValueSource, _super);
    function ConditionValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ConditionValueSource, "name", {
        get: function () {
            return 'condition';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConditionValueSource, "title", {
        get: function () {
            return 'Condition';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConditionValueSource, "weight", {
        get: function () {
            return 710;
        },
        enumerable: false,
        configurable: true
    });
    ConditionValueSource.getInputEditForm = function (_a) {
        var customConditions = _a.customConditions, editFormUtils = _a.editFormUtils, excludeConditions = _a.excludeConditions;
        return __assign(__assign({}, editFormUtils.conditionSelector({
            customValues: customConditions,
            exclude: excludeConditions,
        })), { validate: {
                required: true,
            } });
    };
    ConditionValueSource.prototype.getValue = function (input) {
        return this.targetComponentInstance.calculateCondition(input, this.context);
    };
    return ConditionValueSource;
}(ValueSource));
export { ConditionValueSource };

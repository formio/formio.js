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
var VariableValueSource = /** @class */ (function (_super) {
    __extends(VariableValueSource, _super);
    function VariableValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(VariableValueSource, "name", {
        get: function () {
            return 'variable';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VariableValueSource, "title", {
        get: function () {
            return 'Variable';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VariableValueSource, "weight", {
        get: function () {
            return 700;
        },
        enumerable: false,
        configurable: true
    });
    VariableValueSource.getInputEditForm = function (_a) {
        var customVariables = _a.customVariables, editFormUtils = _a.editFormUtils, excludeVariables = _a.excludeVariables;
        return __assign(__assign({}, editFormUtils.variableSelector({
            customValues: customVariables,
            exclude: excludeVariables,
        })), { validate: {
                required: true,
            } });
    };
    VariableValueSource.prototype.getValue = function (input) {
        return this.targetComponentInstance.calculateVariable(input, this.context);
    };
    return VariableValueSource;
}(ValueSource));
export { VariableValueSource };

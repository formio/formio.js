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
import { QuickRule } from './QuickRule';
var MinLengthQuickRule = /** @class */ (function (_super) {
    __extends(MinLengthQuickRule, _super);
    function MinLengthQuickRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinLengthQuickRule, "name", {
        get: function () {
            return 'minLength';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinLengthQuickRule, "title", {
        get: function () {
            return 'Min Length';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinLengthQuickRule, "weight", {
        get: function () {
            return 100;
        },
        enumerable: false,
        configurable: true
    });
    MinLengthQuickRule.getEditForm = function () {
        return [
            {
                label: 'Min Length',
                key: 'minLength',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    };
    MinLengthQuickRule.prototype.addRule = function (helper, input) {
        var minLength = input.minLength;
        var variableName = 'Length';
        var variableKey = _.camelCase(variableName);
        var conditionName = "Min Length " + minLength;
        var conditionKey = _.camelCase(conditionName);
        helper.addVariable({
            name: variableName,
            key: variableKey,
            valueSource: 'thisComponentValue',
            transform: {
                name: 'length',
            },
        });
        helper.addCondition({
            name: conditionName,
            key: conditionKey,
            conjunction: 'and',
            parts: [
                {
                    type: 'new',
                    operator: {
                        name: 'greaterThanOrEqual',
                        greaterThanOrEqualArguments: {
                            left: {
                                valueSource: 'variable',
                                variableInput: variableKey,
                            },
                            right: {
                                valueSource: 'number',
                                numberInput: minLength,
                            },
                        },
                    },
                },
            ],
        });
        var validation = {
            condition: conditionKey,
            group: 'minLength',
            severity: 'error',
            message: "Min length is not met (" + minLength + ")",
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    };
    return MinLengthQuickRule;
}(QuickRule));
export { MinLengthQuickRule };

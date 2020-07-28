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
var MaxLengthQuickRule = /** @class */ (function (_super) {
    __extends(MaxLengthQuickRule, _super);
    function MaxLengthQuickRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MaxLengthQuickRule, "name", {
        get: function () {
            return 'maxLength';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaxLengthQuickRule, "title", {
        get: function () {
            return 'Max Length';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaxLengthQuickRule, "weight", {
        get: function () {
            return 200;
        },
        enumerable: false,
        configurable: true
    });
    MaxLengthQuickRule.getEditForm = function () {
        return [
            {
                label: 'Max Length',
                key: 'maxLength',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    };
    MaxLengthQuickRule.prototype.addRule = function (helper, input) {
        var maxLength = input.maxLength;
        var variableName = 'Length';
        var variableKey = _.camelCase(variableName);
        var conditionName = "Max Length " + maxLength;
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
                        name: 'lessThanOrEqual',
                        lessThanOrEqualArguments: {
                            left: {
                                valueSource: 'variable',
                                variableInput: variableKey,
                            },
                            right: {
                                valueSource: 'number',
                                numberInput: maxLength,
                            },
                        },
                    },
                },
            ],
        });
        var validation = {
            condition: conditionKey,
            group: 'maxLength',
            severity: 'error',
            message: "Max length exceeded (" + maxLength + ")",
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    };
    return MaxLengthQuickRule;
}(QuickRule));
export { MaxLengthQuickRule };

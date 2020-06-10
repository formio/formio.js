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
var MaxQuickRule = /** @class */ (function (_super) {
    __extends(MaxQuickRule, _super);
    function MaxQuickRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MaxQuickRule, "name", {
        get: function () {
            return 'max';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaxQuickRule, "title", {
        get: function () {
            return 'Max';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaxQuickRule, "weight", {
        get: function () {
            return 200;
        },
        enumerable: false,
        configurable: true
    });
    MaxQuickRule.getEditForm = function () {
        return [
            {
                label: 'Max',
                key: 'max',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    };
    MaxQuickRule.prototype.addRule = function (helper, input) {
        var max = input.max;
        var conditionName = "Max " + max;
        var conditionKey = _.camelCase(conditionName);
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
                                valueSource: 'thisComponentValue',
                            },
                            right: {
                                valueSource: 'number',
                                numberInput: max,
                            },
                        },
                    },
                },
            ],
        });
        var validation = {
            condition: conditionKey,
            group: 'max',
            severity: 'error',
            message: "Max exceeded (" + max + ")",
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    };
    return MaxQuickRule;
}(QuickRule));
export { MaxQuickRule };

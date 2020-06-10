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
var MinQuickRule = /** @class */ (function (_super) {
    __extends(MinQuickRule, _super);
    function MinQuickRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinQuickRule, "name", {
        get: function () {
            return 'min';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinQuickRule, "title", {
        get: function () {
            return 'Min';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinQuickRule, "weight", {
        get: function () {
            return 100;
        },
        enumerable: false,
        configurable: true
    });
    MinQuickRule.getEditForm = function () {
        return [
            {
                label: 'Min',
                key: 'min',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    };
    MinQuickRule.prototype.addRule = function (helper, input) {
        var min = input.min;
        var conditionName = "Min " + min;
        var conditionKey = _.camelCase(conditionName);
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
                                valueSource: 'thisComponentValue',
                            },
                            right: {
                                valueSource: 'number',
                                numberInput: min,
                            },
                        },
                    },
                },
            ],
        });
        var validation = {
            condition: conditionKey,
            group: 'min',
            severity: 'error',
            message: "Min is not met (" + min + ")",
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    };
    return MinQuickRule;
}(QuickRule));
export { MinQuickRule };

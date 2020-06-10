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
var PatternRule = /** @class */ (function (_super) {
    __extends(PatternRule, _super);
    function PatternRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PatternRule, "name", {
        get: function () {
            return 'pattern';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PatternRule, "title", {
        get: function () {
            return 'Pattern';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PatternRule, "weight", {
        get: function () {
            return 500;
        },
        enumerable: false,
        configurable: true
    });
    PatternRule.getEditForm = function () {
        return [
            {
                label: 'Pattern',
                key: 'pattern',
                type: 'textfield',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    };
    PatternRule.prototype.addRule = function (helper, input) {
        var pattern = input.pattern;
        var conditionName = "Match Pattern " + pattern;
        var conditionKey = _.camelCase(conditionName);
        helper.addCondition({
            name: conditionName,
            key: conditionKey,
            conjunction: 'and',
            parts: [
                {
                    type: 'new',
                    operator: {
                        name: 'matchPattern',
                        matchPatternArguments: {
                            value: {
                                valueSource: 'thisComponentValue',
                            },
                            pattern: {
                                valueSource: 'string',
                                stringInput: "^" + pattern + "$",
                            },
                        },
                    },
                },
            ],
        });
        var validation = {
            condition: conditionKey,
            group: 'pattern',
            severity: 'error',
            message: "Pattern is not met (" + pattern + ")",
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    };
    return PatternRule;
}(QuickRule));
export { PatternRule };

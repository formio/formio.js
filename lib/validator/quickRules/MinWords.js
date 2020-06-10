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
var MinWordsQuickRule = /** @class */ (function (_super) {
    __extends(MinWordsQuickRule, _super);
    function MinWordsQuickRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinWordsQuickRule, "name", {
        get: function () {
            return 'minWords';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinWordsQuickRule, "title", {
        get: function () {
            return 'Min Words';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinWordsQuickRule, "weight", {
        get: function () {
            return 300;
        },
        enumerable: false,
        configurable: true
    });
    MinWordsQuickRule.getEditForm = function () {
        return [
            {
                label: 'Min Words',
                key: 'minWords',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    };
    MinWordsQuickRule.prototype.addRule = function (helper, input) {
        var minWords = input.minWords;
        var wordsVariableName = 'Words';
        var wordsVariableKey = _.camelCase(wordsVariableName);
        var wordsCountVariableName = 'Words Count';
        var wordsCountVariableKey = _.camelCase(wordsCountVariableName);
        var conditionName = "Min Words " + minWords;
        var conditionKey = _.camelCase(conditionName);
        helper.addVariable({
            name: wordsVariableName,
            key: wordsVariableKey,
            valueSource: 'thisComponentValue',
            transform: {
                name: 'split',
                splitArguments: {
                    separator: {
                        valueSource: 'regExp',
                        regExpInput: {
                            pattern: '\\s+',
                        },
                    },
                },
            },
        });
        helper.addVariable({
            name: wordsCountVariableName,
            key: wordsCountVariableKey,
            valueSource: 'variable',
            variableInput: wordsVariableKey,
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
                                variableInput: wordsCountVariableKey,
                            },
                            right: {
                                valueSource: 'number',
                                numberInput: minWords,
                            },
                        },
                    },
                },
            ],
        });
        var validation = {
            condition: conditionKey,
            group: 'minWords',
            severity: 'error',
            message: "Min words count exceeded (" + minWords + ")",
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    };
    return MinWordsQuickRule;
}(QuickRule));
export { MinWordsQuickRule };

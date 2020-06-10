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
var MaxWordsQuickRule = /** @class */ (function (_super) {
    __extends(MaxWordsQuickRule, _super);
    function MaxWordsQuickRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MaxWordsQuickRule, "name", {
        get: function () {
            return 'maxWords';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaxWordsQuickRule, "title", {
        get: function () {
            return 'Max Words';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaxWordsQuickRule, "weight", {
        get: function () {
            return 400;
        },
        enumerable: false,
        configurable: true
    });
    MaxWordsQuickRule.getEditForm = function () {
        return [
            {
                label: 'Max Words',
                key: 'maxWords',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    };
    MaxWordsQuickRule.prototype.addRule = function (helper, input) {
        var maxWords = input.maxWords;
        var wordsVariableName = 'Words';
        var wordsVariableKey = _.camelCase(wordsVariableName);
        var wordsCountVariableName = 'Words Count';
        var wordsCountVariableKey = _.camelCase(wordsCountVariableName);
        var conditionName = "Max Words " + maxWords;
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
                        name: 'lessThanOrEqual',
                        lessThanOrEqualArguments: {
                            left: {
                                valueSource: 'variable',
                                variableInput: wordsCountVariableKey,
                            },
                            right: {
                                valueSource: 'number',
                                numberInput: maxWords,
                            },
                        },
                    },
                },
            ],
        });
        var validation = {
            condition: conditionKey,
            group: 'maxWords',
            severity: 'error',
            message: "Max words count exceeded (" + maxWords + ")",
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    };
    return MaxWordsQuickRule;
}(QuickRule));
export { MaxWordsQuickRule };

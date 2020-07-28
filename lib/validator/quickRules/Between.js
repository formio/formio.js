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
var BetweenQuickRule = /** @class */ (function (_super) {
    __extends(BetweenQuickRule, _super);
    function BetweenQuickRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BetweenQuickRule, "name", {
        get: function () {
            return 'between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BetweenQuickRule, "title", {
        get: function () {
            return 'Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BetweenQuickRule, "weight", {
        get: function () {
            return 100;
        },
        enumerable: false,
        configurable: true
    });
    BetweenQuickRule.getEditForm = function () {
        return [
            {
                label: 'From',
                key: 'from',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
            {
                label: 'To',
                key: 'to',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    };
    BetweenQuickRule.prototype.addRule = function (helper, input) {
        var from = input.from, to = input.to;
        var conditionName = "Between " + from + " And " + to;
        var conditionKey = _.camelCase(conditionName);
        helper.addCondition({
            name: conditionName,
            key: conditionKey,
            conjunction: 'and',
            parts: [
                {
                    type: 'new',
                    operator: {
                        name: 'between',
                        betweenArguments: {
                            left: {
                                valueSource: 'thisComponentValue',
                            },
                            from: {
                                valueSource: 'number',
                                numberInput: from,
                            },
                            to: {
                                valueSource: 'number',
                                numberInput: to,
                            },
                        },
                    },
                },
            ],
        });
        var validation = {
            condition: conditionKey,
            group: 'between',
            severity: 'error',
            message: "Value should be between " + from + " and " + to,
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    };
    return BetweenQuickRule;
}(QuickRule));
export { BetweenQuickRule };

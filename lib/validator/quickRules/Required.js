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
var RequiredQuickRule = /** @class */ (function (_super) {
    __extends(RequiredQuickRule, _super);
    function RequiredQuickRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RequiredQuickRule, "name", {
        get: function () {
            return 'required';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequiredQuickRule, "title", {
        get: function () {
            return 'Required';
        },
        enumerable: false,
        configurable: true
    });
    RequiredQuickRule.prototype.addRule = function (helper) {
        var conditionName = 'Required';
        var conditionKey = _.camelCase(conditionName);
        helper.addCondition({
            name: conditionName,
            key: conditionKey,
            conjunction: 'and',
            parts: [
                {
                    type: 'new',
                    operator: {
                        name: 'notIsEmpty',
                        notIsEmptyArguments: {
                            component: {
                                valueSource: 'thisComponent',
                            },
                        },
                    },
                },
            ],
        });
        var validation = {
            condition: conditionKey,
            severity: 'error',
            message: 'Component is required',
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    };
    return RequiredQuickRule;
}(QuickRule));
export { RequiredQuickRule };

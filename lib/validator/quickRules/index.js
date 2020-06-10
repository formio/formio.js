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
import { BetweenQuickRule } from './Between';
import { MaxQuickRule } from './Max';
import { MaxLengthQuickRule } from './MaxLength';
import { MaxWordsQuickRule } from './MaxWords';
import { MinQuickRule } from './Min';
import { MinLengthQuickRule } from './MinLength';
import { MinWordsQuickRule } from './MinWords';
import { PatternRule } from './Pattern';
import { RequiredQuickRule } from './Required';
var quickRules = [
    BetweenQuickRule,
    MaxQuickRule,
    MaxLengthQuickRule,
    MaxWordsQuickRule,
    MinQuickRule,
    MinLengthQuickRule,
    MinWordsQuickRule,
    PatternRule,
    RequiredQuickRule,
].reduce(function (result, quickRule) {
    var _a;
    return (__assign(__assign({}, result), (_a = {}, _a[quickRule.name] = quickRule, _a)));
}, {});
var QuickRules = /** @class */ (function () {
    function QuickRules() {
    }
    QuickRules.addQuickRule = function (name, quickRule) {
        QuickRules.quickRules[name] = quickRule;
    };
    QuickRules.addQuickRules = function (quickRules) {
        QuickRules.quickRules = __assign(__assign({}, QuickRules.quickRules), quickRules);
    };
    QuickRules.getQuickRule = function (name) {
        return QuickRules.quickRules[name];
    };
    QuickRules.getQuickRules = function () {
        return QuickRules.quickRules;
    };
    QuickRules.quickRules = quickRules;
    return QuickRules;
}());
export { QuickRules };

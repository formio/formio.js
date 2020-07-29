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
import { Custom } from './Custom';
import { DateRule } from './Date';
import { Day } from './Day';
import { Email } from './Email';
import { JSON } from './JSON';
import { Mask } from './Mask';
import { Max } from './Max';
import { MaxDate } from './MaxDate';
import { MaxLength } from './MaxLength';
import { MaxWords } from './MaxWords';
import { MaxYear } from './MaxYear';
import { Min } from './Min';
import { MinDate } from './MinDate';
import { MinLength } from './MinLength';
import { MinWords } from './MinWords';
import { MinYear } from './MinYear';
import { Pattern } from './Pattern';
import { Required } from './Required';
import { Select } from './Select';
import { Unique } from './Unique';
import { Url } from './Url';
import { Time } from './Time';
var rules = {
    custom: Custom,
    date: DateRule,
    day: Day,
    email: Email,
    json: JSON,
    mask: Mask,
    max: Max,
    maxDate: MaxDate,
    maxLength: MaxLength,
    maxWords: MaxWords,
    maxYear: MaxYear,
    min: Min,
    minDate: MinDate,
    minLength: MinLength,
    minWords: MinWords,
    minYear: MinYear,
    pattern: Pattern,
    required: Required,
    select: Select,
    unique: Unique,
    url: Url,
    time: Time,
};
var Rules = /** @class */ (function () {
    function Rules() {
    }
    Rules.addRule = function (name, rule) {
        Rules.rules[name] = rule;
    };
    Rules.addRules = function (rules) {
        Rules.rules = __assign(__assign({}, Rules.rules), rules);
    };
    Rules.getRule = function (name) {
        return Rules.rules[name];
    };
    Rules.getRules = function () {
        return Rules.rules;
    };
    Rules.rules = rules;
    return Rules;
}());
export { Rules };

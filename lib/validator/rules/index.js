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
var custom = require('./Custom');
var date = require('./Date');
var day = require('./Day');
var email = require('./Email');
var json = require('./JSON');
var mask = require('./Mask');
var max = require('./Max');
var maxDate = require('./MaxDate');
var maxLength = require('./MaxLength');
var maxWords = require('./MaxWords');
var maxYear = require('./MaxYear');
var min = require('./Min');
var minDate = require('./MinDate');
var minLength = require('./MinLength');
var minWords = require('./MinWords');
var minYear = require('./MinYear');
var pattern = require('./Pattern');
var required = require('./Required');
var select = require('./Select');
var unique = require('./Unique');
var url = require('./Url');
var rules = {
    custom: custom,
    date: date,
    day: day,
    email: email,
    json: json,
    mask: mask,
    max: max,
    maxDate: maxDate,
    maxLength: maxLength,
    maxWords: maxWords,
    maxYear: maxYear,
    min: min,
    minDate: minDate,
    minLength: minLength,
    minWords: minWords,
    minYear: minYear,
    pattern: pattern,
    required: required,
    select: select,
    unique: unique,
    url: url,
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

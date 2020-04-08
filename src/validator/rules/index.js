const custom = require('./Custom');
const date = require('./Date');
const day = require('./Day');
const email = require('./Email');
const json = require('./JSON');
const mask = require('./Mask');
const max = require('./Max');
const maxDate = require('./MaxDate');
const maxLength = require('./MaxLength');
const maxWords = require('./MaxWords');
const maxYear = require('./MaxYear');
const min = require('./Min');
const minDate = require('./MinDate');
const minLength = require('./MinLength');
const minWords = require('./MinWords');
const minYear = require('./MinYear');
const pattern = require('./Pattern');
const required = require('./Required');
const select = require('./Select');
const unique = require('./Unique');
const url = require('./Url');

const rules = {
  custom,
  date,
  day,
  email,
  json,
  mask,
  max,
  maxDate,
  maxLength,
  maxWords,
  maxYear,
  min,
  minDate,
  minLength,
  minWords,
  minYear,
  pattern,
  required,
  select,
  unique,
  url,
};

export class Rules {
  static rules = rules;

  static addRule(name, rule) {
    Rules.rules[name] = rule;
  }

  static addRules(rules) {
    Rules.rules = { ...Rules.rules, ...rules };
  }

  static getRule(name) {
    return Rules.rules[name];
  }

  static getRules() {
    return Rules.rules;
  }
}

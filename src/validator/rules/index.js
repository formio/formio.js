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

const rules = {
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

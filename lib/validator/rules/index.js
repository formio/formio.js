"use strict";

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

var min = require('./Min');

var minDate = require('./MinDate');

var minLength = require('./MinLength');

var minWords = require('./MinWords');

var pattern = require('./Pattern');

var required = require('./Required');

var select = require('./Select');

var unique = require('./Unique');

var url = require('./Url');

var minYear = require('./MinYear');

var maxYear = require('./MaxYear');

var time = require('./Time');

module.exports = {
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
  min: min,
  minDate: minDate,
  minLength: minLength,
  minWords: minWords,
  pattern: pattern,
  required: required,
  select: select,
  unique: unique,
  url: url,
  minYear: minYear,
  maxYear: maxYear,
  time: time
};
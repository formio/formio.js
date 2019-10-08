"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lessOrGreater = lessOrGreater;
exports.checkInvalidDate = checkInvalidDate;
exports.monthFormatCorrector = monthFormatCorrector;
exports.dynamicMonthLength = dynamicMonthLength;
exports.timeFormatLocaleCorrector = timeFormatLocaleCorrector;
exports.CALENDAR_ERROR_MESSAGES = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CALENDAR_ERROR_MESSAGES = {
  INVALID: 'You entered the Invalid Date',
  INCOMPLETE: 'You entered an incomplete date.',
  greater: function greater(date, format) {
    return "The entered date is greater than ".concat(date.format(format));
  },
  less: function less(date, format) {
    return "The entered date is less than ".concat(date.format(format));
  }
};
/**
 * Builds the response for checkInvalidDate.
 *
 * @param {String} message
 *   The message for response.
 * @param {Boolean} result
 *   The boolean flag for response.
 * * @return {{message: string, result: boolean}}
 */

exports.CALENDAR_ERROR_MESSAGES = CALENDAR_ERROR_MESSAGES;

function buildResponse(message, result) {
  return {
    message: message,
    result: result
  };
}
/**
 * Checks the value for a min date and max date.
 *
 * @param {moment} value
 *   The value to check.
 * @param {[String]} format
 *   A moment formats.
 * @param {Date} maxDate
 *   The max date.
 * @param {Date} minDate
 *   The min date.
 * * @return {{message: string, result: boolean}}
 */


function lessOrGreater(value, format, maxDate, minDate) {
  var message = '';
  var result = true;

  if (maxDate && value.isValid()) {
    var maxDateMoment = (0, _moment.default)(maxDate, format);

    if (value > maxDateMoment) {
      message = CALENDAR_ERROR_MESSAGES.greater(maxDateMoment, format);
      result = false;
    }
  }

  if (minDate && value.isValid()) {
    var minDateMoment = (0, _moment.default)(minDate, format);

    if (value < minDateMoment) {
      message = CALENDAR_ERROR_MESSAGES.less(minDateMoment, format);
      result = false;
    }
  }

  return {
    message: message,
    result: result
  };
}
/**
 * Checks the entered date for validity.
 *
 * @param {String} value
 *   The value to check.
 * @param {[String]} format
 *   A moment formats.
 * @param {Date} maxDate
 *   The max date.
 * @param {Date} minDate
 *   The min date.
 * * @return {{message: string, result: boolean}}
 */


function checkInvalidDate(value, format, minDate, maxDate) {
  var date = (0, _moment.default)(value, format, true);
  var isValidDate = date.isValid();

  if (!isValidDate) {
    var delimeters = value.match(/[^a-z0-9а-яё\u00C0-\u017F_]+/gi);
    var delimetersRegEx = new RegExp(delimeters.join('|'), 'gi');
    var inputParts = value.replace(/_*/gi, '').split(delimetersRegEx);
    var formatParts = format[1] ? format[1].split(delimetersRegEx) : format[0].split(delimetersRegEx);

    var timeIndex = _lodash.default.findIndex(formatParts, function (part, index) {
      return part.length === 1 && index === formatParts.length - 1;
    });

    var yearIndex = _lodash.default.findIndex(formatParts, function (part) {
      return part.match(/yyyy/gi);
    });

    if (inputParts[yearIndex] / 1000 < 1) {
      return buildResponse(CALENDAR_ERROR_MESSAGES.INVALID, false);
    }

    if (inputParts[0].length === formatParts[0].length) {
      var modifiedParts = inputParts.map(function (part, index) {
        var partValue = part;

        if (!part && index === timeIndex) {
          partValue = 'AM';
        } else if (!part) {
          partValue = '01';
        }

        if (delimeters[index]) {
          partValue = "".concat(partValue).concat(delimeters[index]);
        }

        return partValue;
      });
      var problemDate = (0, _moment.default)(modifiedParts.join(''), format, true);

      if (problemDate.isValid()) {
        var checkedLessOrGreater = lessOrGreater(problemDate, format[0], maxDate, minDate);

        if (!checkedLessOrGreater.result) {
          var message = checkedLessOrGreater.message,
              result = checkedLessOrGreater.result;
          return buildResponse(message, result);
        }

        return buildResponse(CALENDAR_ERROR_MESSAGES.INCOMPLETE, false);
      } else {
        return buildResponse(CALENDAR_ERROR_MESSAGES.INVALID, false);
      }
    } else {
      return buildResponse(CALENDAR_ERROR_MESSAGES.INVALID, false);
    }
  } else if (isValidDate && value.indexOf('_') === -1) {
    var _checkedLessOrGreater = lessOrGreater(date, format[0], maxDate, minDate);

    if (!_checkedLessOrGreater.result) {
      var _message = _checkedLessOrGreater.message,
          _result = _checkedLessOrGreater.result;
      return buildResponse(_message, _result);
    }
  }

  return buildResponse('', true);
}
/**
 * If date format has long or shorthand months it generates format for numeric too.
 *
 * @param {String} format
 *   The format dste string.
 * * @return {[String]}
 */


function monthFormatCorrector(format) {
  var momentFormat = [(0, _utils.convertFormatToMoment)(format)];

  if (momentFormat[0].match(/M{3,}/g)) {
    momentFormat.push(momentFormat[0].replace(/M{3,}/g, 'MM'));
  }

  return momentFormat;
}
/**
 * Compares the entered month with an array of months.
 *
 * @param {String} value
 *   The entered month.
 * @param {[String]} monthsArray
 *   The array of months.
 * * @return {Number}
 */


function dynamicMonthLength(value, monthsArray) {
  var lowerValue = value.toLowerCase();

  var comparedMonth = _lodash.default.find(monthsArray, function (month) {
    return month.toLowerCase().startsWith(lowerValue);
  });

  if (comparedMonth) {
    return comparedMonth.length;
  }

  return 0;
}
/**
 * Corrects the time format depending on locale.
 *
 * @param {Boolean} is24hours
 *   The value from locale settings.
 * @param {String} format
 *   The format from settings.
 * * @return {String}
 */


function timeFormatLocaleCorrector(is24hours, format) {
  if (is24hours && format.match(/[ha]/g)) {
    return format.replace(/h/g, 'H').replace(/a/g, '').trim();
  }

  return format;
}
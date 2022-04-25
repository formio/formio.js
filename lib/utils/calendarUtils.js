"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CALENDAR_ERROR_MESSAGES = void 0;
exports.checkInvalidDate = checkInvalidDate;
exports.lessOrGreater = lessOrGreater;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.find-index.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.concat.js");

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

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
    var delimeters = value.match(/[^a-z0-9_]/gi);
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
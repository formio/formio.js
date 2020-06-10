import moment from 'moment';
import _ from 'lodash';
export var CALENDAR_ERROR_MESSAGES = {
    INVALID: 'You entered the Invalid Date',
    INCOMPLETE: 'You entered an incomplete date.',
    greater: function (date, format) {
        return "The entered date is greater than " + date.format(format);
    },
    less: function (date, format) {
        return "The entered date is less than " + date.format(format);
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
export function lessOrGreater(value, format, maxDate, minDate) {
    var message = '';
    var result = true;
    if (maxDate && value.isValid()) {
        var maxDateMoment = moment(maxDate, format);
        if (value > maxDateMoment) {
            message = CALENDAR_ERROR_MESSAGES.greater(maxDateMoment, format);
            result = false;
        }
    }
    if (minDate && value.isValid()) {
        var minDateMoment = moment(minDate, format);
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
export function checkInvalidDate(value, format, minDate, maxDate) {
    var date = moment(value, format, true);
    var isValidDate = date.isValid();
    if (!isValidDate) {
        var delimeters_1 = value.match(/[^a-z0-9_]/gi);
        var delimetersRegEx = new RegExp(delimeters_1.join('|'), 'gi');
        var inputParts = value.replace(/_*/gi, '').split(delimetersRegEx);
        var formatParts_1 = format[1] ? format[1].split(delimetersRegEx) : format[0].split(delimetersRegEx);
        var timeIndex_1 = _.findIndex(formatParts_1, function (part, index) { return part.length === 1 && index === formatParts_1.length - 1; });
        var yearIndex = _.findIndex(formatParts_1, function (part) { return part.match(/yyyy/gi); });
        if (inputParts[yearIndex] / 1000 < 1) {
            return buildResponse(CALENDAR_ERROR_MESSAGES.INVALID, false);
        }
        if (inputParts[0].length === formatParts_1[0].length) {
            var modifiedParts = inputParts.map(function (part, index) {
                var partValue = part;
                if (!part && index === timeIndex_1) {
                    partValue = 'AM';
                }
                else if (!part) {
                    partValue = '01';
                }
                if (delimeters_1[index]) {
                    partValue = "" + partValue + delimeters_1[index];
                }
                return partValue;
            });
            var problemDate = moment(modifiedParts.join(''), format, true);
            if (problemDate.isValid()) {
                var checkedLessOrGreater = lessOrGreater(problemDate, format[0], maxDate, minDate);
                if (!checkedLessOrGreater.result) {
                    var message = checkedLessOrGreater.message, result = checkedLessOrGreater.result;
                    return buildResponse(message, result);
                }
                return buildResponse(CALENDAR_ERROR_MESSAGES.INCOMPLETE, false);
            }
            else {
                return buildResponse(CALENDAR_ERROR_MESSAGES.INVALID, false);
            }
        }
        else {
            return buildResponse(CALENDAR_ERROR_MESSAGES.INVALID, false);
        }
    }
    else if (isValidDate && value.indexOf('_') === -1) {
        var checkedLessOrGreater = lessOrGreater(date, format[0], maxDate, minDate);
        if (!checkedLessOrGreater.result) {
            var message = checkedLessOrGreater.message, result = checkedLessOrGreater.result;
            return buildResponse(message, result);
        }
    }
    return buildResponse('', true);
}

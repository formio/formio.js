import moment from 'moment';
import _ from 'lodash';

export const CALENDAR_ERROR_MESSAGES = {
  INVALID: 'You entered the Invalid Date',
  INCOMPLETE: 'You entered an incomplete date.',
  greater(date, format) {
    return `The entered date is greater than ${ date.format(format)}`;
  },
  less(date, format) {
    return `The entered date is less than ${date.format(format)}`;
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
    message,
    result
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
  let message = '';
  let result = true;

  if (maxDate && value.isValid()) {
    const maxDateMoment = moment(maxDate, format);

    if (value >  maxDateMoment) {
      message = CALENDAR_ERROR_MESSAGES.greater(maxDateMoment, format);
      result = false;
    }
  }

  if (minDate && value.isValid()) {
    const minDateMoment = moment(minDate, format);

    if (value < minDateMoment) {
      message = CALENDAR_ERROR_MESSAGES.less(minDateMoment, format);
      result = false;
    }
  }

  return {
    message,
    result
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
  const date = moment(value, format, true);
  const isValidDate = date.isValid();

  if (!isValidDate) {
    const delimeters = value.match(/[^a-z0-9_]/gi);
    const delimetersRegEx = new RegExp(delimeters.join('|'), 'gi');

    const inputParts = value.replace(/_*/gi, '').split(delimetersRegEx);
    const formatParts = format[1] ? format[1].split(delimetersRegEx) : format[0].split(delimetersRegEx);

    const timeIndex = _.findIndex(formatParts, (part, index) => part.length === 1 && index === formatParts.length - 1);
    const yearIndex = _.findIndex(formatParts, part => part.match(/yyyy/gi));

    if (inputParts[yearIndex]/ 1000 < 1) {
      return buildResponse(CALENDAR_ERROR_MESSAGES.INVALID, false);
    }

    if (inputParts[0].length === formatParts[0].length) {
      const modifiedParts = inputParts.map((part, index) => {
        let partValue = part;
        if (!part && index === timeIndex) {
          partValue = 'AM';
        }
        else if (!part) {
          partValue = '01';
        }
        if (delimeters[index]) {
          partValue = `${partValue}${delimeters[index]}`;
        }

        return partValue;
      });

      const problemDate = moment(modifiedParts.join(''), format, true);

      if (problemDate.isValid()) {
        const checkedLessOrGreater = lessOrGreater(problemDate, format[0], maxDate, minDate);
        if (!checkedLessOrGreater.result) {
          const { message, result } = checkedLessOrGreater;
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
    const checkedLessOrGreater = lessOrGreater(date, format[0], maxDate, minDate);
    if (!checkedLessOrGreater.result) {
      const { message, result } = checkedLessOrGreater;
      return buildResponse(message, result);
    }
  }

  return buildResponse('', true);
}

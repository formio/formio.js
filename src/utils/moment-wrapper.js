import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);
dayjs.extend(duration);

/**
 *
 * @param {...any} args
 */
function moment(...args) {
  return dayjs(...args).isValid() ? dayjs(...args) : dayjs('Invalid date');
}

moment.utc = () => dayjs.utc();
moment.tz = (date, timezone) => dayjs.tz(date, timezone);


moment.toISOString = () => {
  return dayjs.isValid() ? dayjs.toISOString() : "Invalid date";
}

moment.format = (formatStr) => {
  return dayjs(this).format(formatStr); 
};

export default moment;

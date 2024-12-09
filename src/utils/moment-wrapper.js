import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(duration);

function moment(...args) {
  return dayjs(...args);
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

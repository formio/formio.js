/* global $ */

import _ from 'lodash';
import fetchPonyfill from 'fetch-ponyfill';
import jsonLogic from 'json-logic-js';
import moment from 'moment-timezone/moment-timezone';
import jtz from 'jstimezonedetect';
import { lodashOperators } from './jsonlogic/operators';
import NativePromise from 'native-promise-only';
import dompurify from 'dompurify';
import { getValue } from './formUtils';
import Evaluator from './Evaluator';
const interpolate = Evaluator.interpolate;
const { fetch } = fetchPonyfill({
  Promise: NativePromise
});

export * from './formUtils';

// Configure JsonLogic
lodashOperators.forEach((name) => jsonLogic.add_operation(`_${name}`, _[name]));

// Retrieve Any Date
jsonLogic.add_operation('getDate', (date) => {
  return moment(date).toISOString();
});

// Set Relative Minimum Date
jsonLogic.add_operation('relativeMinDate', (relativeMinDate) => {
  return moment().subtract(relativeMinDate, 'days').toISOString();
});

// Set Relative Maximum Date
jsonLogic.add_operation('relativeMaxDate', (relativeMaxDate) => {
  return moment().add(relativeMaxDate, 'days').toISOString();
});

export { jsonLogic, moment };

/**
 * Evaluate a method.
 *
 * @param func
 * @param args
 * @return {*}
 */
export function evaluate(func, args, ret, tokenize) {
  let returnVal = null;
  const component = args.component ? args.component : { key: 'unknown' };
  if (!args.form && args.instance) {
    args.form = _.get(args.instance, 'root._form', {});
  }

  const componentKey = component.key;

  if (typeof func === 'string') {
    if (ret) {
      func += `;return ${ret}`;
    }

    if (tokenize) {
      // Replace all {{ }} references with actual data.
      func = func.replace(/({{\s+(.*)\s+}})/, (match, $1, $2) => {
        if ($2.indexOf('data.') === 0) {
          return _.get(args.data, $2.replace('data.', ''));
        }
        else if ($2.indexOf('row.') === 0) {
          return _.get(args.row, $2.replace('row.', ''));
        }

        // Support legacy...
        return _.get(args.data, $2);
      });
    }

    try {
      func = Evaluator.evaluator(func, args);
      args = _.values(args);
    }
    catch (err) {
      console.warn(`An error occured within the custom function for ${componentKey}`, err);
      returnVal = null;
      func = false;
    }
  }

  if (typeof func === 'function') {
    try {
      returnVal = Evaluator.evaluate(func, args);
    }
    catch (err) {
      returnVal = null;
      console.warn(`An error occured within custom function for ${componentKey}`, err);
    }
  }
  else if (typeof func === 'object') {
    try {
      returnVal = jsonLogic.apply(func, args);
    }
    catch (err) {
      returnVal = null;
      console.warn(`An error occured within custom function for ${componentKey}`, err);
    }
  }
  else if (func) {
    console.warn(`Unknown function type for ${componentKey}`);
  }
  return returnVal;
}

export function getRandomComponentId() {
  return `e${Math.random().toString(36).substring(7)}`;
}

/**
 * Get a property value of an element.
 *
 * @param style
 * @param prop
 * @return {number}
 */
export function getPropertyValue(style, prop) {
  let value = style.getPropertyValue(prop);
  value = value ? value.replace(/[^0-9.]/g, '') : '0';
  return parseFloat(value);
}

/**
 * Get an elements bounding rectagle.
 *
 * @param element
 * @return {{x: string, y: string, width: string, height: string}}
 */
export function getElementRect(element) {
  const style = window.getComputedStyle(element, null);
  return {
    x: getPropertyValue(style, 'left'),
    y: getPropertyValue(style, 'top'),
    width: getPropertyValue(style, 'width'),
    height: getPropertyValue(style, 'height')
  };
}

/**
 * Determines the boolean value of a setting.
 *
 * @param value
 * @return {boolean}
 */
export function boolValue(value) {
  if (_.isBoolean(value)) {
    return value;
  }
  else if (_.isString(value)) {
    return (value.toLowerCase() === 'true');
  }
  else {
    return !!value;
  }
}

/**
 * Check to see if an ID is a mongoID.
 * @param text
 * @return {Array|{index: number, input: string}|Boolean|*}
 */
export function isMongoId(text) {
  return text.toString().match(/^[0-9a-fA-F]{24}$/);
}

/**
 * Checks the calculated value for a provided component and data.
 *
 * @param {Object} component
 *   The component to check for the calculated value.
 * @param {Object} submission
 *   A submission object.
 * @param data
 *   The full submission data.
 */
export function checkCalculated(component, submission, rowData) {
  // Process calculated value stuff if present.
  if (component.calculateValue) {
    _.set(rowData, component.key, evaluate(component.calculateValue, {
      value: undefined,
      data: submission ? submission.data : rowData,
      row: rowData,
      util: this,
      component
    }, 'value'));
  }
}

/**
 * Check if a simple conditional evaluates to true.
 *
 * @param condition
 * @param condition
 * @param row
 * @param data
 * @returns {boolean}
 */
export function checkSimpleConditional(component, condition, row, data) {
  let value = null;
  if (row) {
    value = getValue({ data: row }, condition.when);
  }
  if (data && _.isNil(value)) {
    value = getValue({ data }, condition.when);
  }
  // FOR-400 - Fix issue where falsey values were being evaluated as show=true
  if (_.isNil(value)) {
    value = '';
  }

  const eq = String(condition.eq);
  const show = String(condition.show);

  // Special check for selectboxes component.
  if (_.isObject(value) && _.has(value, condition.eq)) {
    return String(value[condition.eq]) === show;
  }
  // FOR-179 - Check for multiple values.
  if (Array.isArray(value) && value.map(String).includes(eq)) {
    return show === 'true';
  }

  return (String(value) === eq) === (show === 'true');
}

/**
 * Check custom javascript conditional.
 *
 * @param component
 * @param custom
 * @param row
 * @param data
 * @returns {*}
 */
export function checkCustomConditional(component, custom, row, data, form, variable, onError, instance) {
  if (typeof custom === 'string') {
    custom = `var ${variable} = true; ${custom}; return ${variable};`;
  }
  const value = (instance && instance.evaluate) ?
    instance.evaluate(custom) :
    evaluate(custom, { row, data, form });
  if (value === null) {
    return onError;
  }
  return value;
}

export function checkJsonConditional(component, json, row, data, form, onError) {
  try {
    return jsonLogic.apply(json, {
      data,
      row,
      form,
      _,
    });
  }
  catch (err) {
    console.warn(`An error occurred in jsonLogic advanced condition for ${component.key}`, err);
    return onError;
  }
}

/**
 * Checks the conditions for a provided component and data.
 *
 * @param component
 *   The component to check for the condition.
 * @param row
 *   The data within a row
 * @param data
 *   The full submission data.
 *
 * @returns {boolean}
 */
export function checkCondition(component, row, data, form, instance) {
  if (component.customConditional) {
    return checkCustomConditional(component, component.customConditional, row, data, form, 'show', true, instance);
  }
  else if (component.conditional && component.conditional.when) {
    return checkSimpleConditional(component, component.conditional, row, data);
  }
  else if (component.conditional && component.conditional.json) {
    return checkJsonConditional(component, component.conditional.json, row, data, form, true);
  }

  // Default to show.
  return true;
}

/**
 * Test a trigger on a component.
 *
 * @param component
 * @param action
 * @param data
 * @param row
 * @returns {mixed}
 */
export function checkTrigger(component, trigger, row, data, form, instance) {
  // If trigger is empty, don't fire it
  if (!trigger[trigger.type]) {
    return false;
  }

  switch (trigger.type) {
    case 'simple':
      return checkSimpleConditional(component, trigger.simple, row, data);
    case 'javascript':
      return checkCustomConditional(component, trigger.javascript, row, data, form, 'result', false, instance);
    case 'json':
      return checkJsonConditional(component, trigger.json, row, data, form, false);
  }
  // If none of the types matched, don't fire the trigger.
  return false;
}

export function setActionProperty(component, action, result, row, data, instance) {
  const property = action.property.value;

  switch (action.property.type) {
    case 'boolean': {
      const currentValue = _.get(component, property, false).toString();
      const newValue = action.state.toString();

      if (currentValue !== newValue) {
        _.set(component, property, newValue === 'true');
      }

      break;
    }
    case 'string': {
      const evalData = {
        data,
        row,
        component,
        result,
      };
      const textValue = action.property.component ? action[action.property.component] : action.text;
      const currentValue = _.get(component, property, '');
      const newValue = (instance && instance.interpolate)
        ? instance.interpolate(textValue, evalData)
        : Evaluator.interpolate(textValue, evalData);

      if (newValue !== currentValue) {
        _.set(component, property, newValue);
      }

      break;
    }
  }

  return component;
}

/**
 * Unescape HTML characters like &lt, &gt, &amp and etc.
 * @param str
 * @returns {string}
 */
export function unescapeHTML(str) {
  if (typeof window === 'undefined' || !('DOMParser' in window)) {
    return str;
  }

  const doc = new window.DOMParser().parseFromString(str, 'text/html');
  return doc.documentElement.textContent;
}

/**
 * Make HTML element from string
 * @param str
 * @param selector
 * @returns {HTMLElement}
 */

export function convertStringToHTMLElement(str, selector) {
  const doc = new window.DOMParser().parseFromString(str, 'text/html');
  return doc.body.querySelector(selector);
}

/**
 * Make a filename guaranteed to be unique.
 * @param name
 * @param template
 * @param evalContext
 * @returns {string}
 */
export function uniqueName(name, template, evalContext) {
  template = template || '{{fileName}}-{{guid}}';
  //include guid in template anyway, to prevent overwriting issue if filename matches existing file
  if (!template.includes('{{guid}}')) {
    template = `${template}-{{guid}}`;
  }
  const parts = name.split('.');
  let fileName = parts.slice(0, parts.length - 1).join('.');
  const extension = parts.length > 1
    ? `.${_.last(parts)}`
    : '';
  //allow only 100 characters from original name to avoid issues with filename length restrictions
  fileName = fileName.substr(0, 100);
  evalContext = Object.assign(evalContext || {}, {
    fileName,
    guid: guid()
  });
  //only letters, numbers, dots, dashes, underscores and spaces are allowed. Anything else will be replaced with dash
  const uniqueName = `${Evaluator.interpolate(template, evalContext)}${extension}`.replace(/[^0-9a-zA-Z.\-_ ]/g, '-');
  return uniqueName;
}

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random()*16|0;
    const v = c === 'x'
      ? r
      : (r&0x3|0x8);
    return v.toString(16);
  });
}

/**
 * Return a translated date setting.
 *
 * @param date
 * @return {(null|Date)}
 */
export function getDateSetting(date) {
  if (_.isNil(date) || _.isNaN(date) || date === '') {
    return null;
  }

  if (date instanceof Date) {
    return date;
  }
  else if (typeof date.toDate === 'function') {
    return date.isValid() ? date.toDate() : null;
  }

  let dateSetting = ((typeof date !== 'string') || (date.indexOf('moment(') === -1)) ? moment(date) : null;
  if (dateSetting && dateSetting.isValid()) {
    return dateSetting.toDate();
  }

  dateSetting = null;
  try {
    const value = Evaluator.evaluator(`return ${date};`, 'moment')(moment);
    if (typeof value === 'string') {
      dateSetting = moment(value);
    }
    else if (typeof value.toDate === 'function') {
      dateSetting = moment(value.toDate().toUTCString());
    }
    else if (value instanceof Date) {
      dateSetting = moment(value);
    }
  }
  catch (e) {
    return null;
  }

  if (!dateSetting) {
    return null;
  }

  // Ensure this is a date.
  if (!dateSetting.isValid()) {
    return null;
  }

  return dateSetting.toDate();
}

export function isValidDate(date) {
  return _.isDate(date) && !_.isNaN(date.getDate());
}

/**
 * Get the current timezone string.
 *
 * @return {string}
 */
export function currentTimezone() {
  if (moment.currentTimezone) {
    return moment.currentTimezone;
  }
  moment.currentTimezone = jtz.determine().name();
  return moment.currentTimezone;
}

/**
 * Get an offset date provided a date object and timezone object.
 *
 * @param date
 * @param timezone
 * @return {Date}
 */
export function offsetDate(date, timezone) {
  if (timezone === 'UTC') {
    return {
      date: new Date(date.getTime() + (date.getTimezoneOffset() * 60000)),
      abbr: 'UTC'
    };
  }
  const dateMoment = moment(date).tz(timezone);
  return {
    date: new Date(date.getTime() + ((dateMoment.utcOffset() + date.getTimezoneOffset()) * 60000)),
    abbr: dateMoment.format('z')
  };
}

/**
 * Returns if the zones are loaded.
 *
 * @return {boolean}
 */
export function zonesLoaded() {
  return moment.zonesLoaded;
}

/**
 * Returns if we should load the zones.
 *
 * @param timezone
 * @return {boolean}
 */
export function shouldLoadZones(timezone) {
  if (timezone === currentTimezone() || timezone === 'UTC') {
    return false;
  }
  return true;
}

/**
 * Externally load the timezone data.
 *
 * @return {Promise<any> | *}
 */
export function loadZones(timezone) {
  if (timezone && !shouldLoadZones(timezone)) {
    // Return non-resolving promise.
    return new NativePromise(_.noop);
  }

  if (moment.zonesPromise) {
    return moment.zonesPromise;
  }
  return moment.zonesPromise = fetch(
    'https://cdn.form.io/moment-timezone/data/packed/latest.json',
  ).then(resp => resp.json().then(zones => {
    moment.tz.load(zones);
    moment.zonesLoaded = true;

    // Trigger a global event that the timezones have finished loading.
    if (document && document.createEvent && document.body && document.body.dispatchEvent) {
      var event = document.createEvent('Event');
      event.initEvent('zonesLoaded', true, true);
      document.body.dispatchEvent(event);
    }
  }));
}

/**
 * Get the moment date object for translating dates with timezones.
 *
 * @param value
 * @param format
 * @param timezone
 * @return {*}
 */
export function momentDate(value, format, timezone) {
  const momentDate = moment(value);
  if (timezone === 'UTC') {
    timezone = 'Etc/UTC';
  }
  if ((timezone !== currentTimezone() || (format && format.match(/\s(z$|z\s)/))) && moment.zonesLoaded) {
    return momentDate.tz(timezone);
  }
  return momentDate;
}

/**
 * Format a date provided a value, format, and timezone object.
 *
 * @param value
 * @param format
 * @param timezone
 * @return {string}
 */
export function formatDate(value, format, timezone) {
  const momentDate = moment(value);
  if (timezone === currentTimezone()) {
    // See if our format contains a "z" timezone character.
    if (format.match(/\s(z$|z\s)/)) {
      loadZones();
      if (moment.zonesLoaded) {
        return momentDate.tz(timezone).format(convertFormatToMoment(format));
      }
      else {
        return momentDate.format(convertFormatToMoment(format.replace(/\s(z$|z\s)/, '')));
      }
    }

    // Return the standard format.
    return momentDate.format(convertFormatToMoment(format));
  }
  if (timezone === 'UTC') {
    const offset = offsetDate(momentDate.toDate(), 'UTC');
    return `${moment(offset.date).format(convertFormatToMoment(format))} UTC`;
  }

  // Load the zones since we need timezone information.
  loadZones();
  if (moment.zonesLoaded && timezone) {
    return momentDate.tz(timezone).format(`${convertFormatToMoment(format)} z`);
  }
  else {
    return momentDate.format(convertFormatToMoment(format));
  }
}

/**
 * Pass a format function to format within a timezone.
 *
 * @param formatFn
 * @param date
 * @param format
 * @param timezone
 * @return {string}
 */
export function formatOffset(formatFn, date, format, timezone) {
  if (timezone === currentTimezone()) {
    return formatFn(date, format);
  }
  if (timezone === 'UTC') {
    return `${formatFn(offsetDate(date, 'UTC').date, format)} UTC`;
  }

  // Load the zones since we need timezone information.
  loadZones();
  if (moment.zonesLoaded) {
    const offset = offsetDate(date, timezone);
    return `${formatFn(offset.date, format)} ${offset.abbr}`;
  }
  else {
    return formatFn(date, format);
  }
}

export function getLocaleDateFormatInfo(locale) {
  const formatInfo = {};

  const day = 21;
  const exampleDate = new Date(2017, 11, day);
  const localDateString = exampleDate.toLocaleDateString(locale);

  formatInfo.dayFirst = localDateString.slice(0, 2) === day.toString();

  return formatInfo;
}

/**
 * Convert the format from the angular-datepicker module to flatpickr format.
 * @param format
 * @return {string}
 */
export function convertFormatToFlatpickr(format) {
  return format
  // Remove the Z timezone offset, not supported by flatpickr.
    .replace(/Z/g, '')

    // Year conversion.
    .replace(/y/g, 'Y')
    .replace('YYYY', 'Y')
    .replace('YY', 'y')

    // Month conversion.
    .replace('MMMM', 'F')
    .replace(/M/g, 'n')
    .replace('nnn', 'M')
    .replace('nn', 'm')

    // Day in month.
    .replace(/d/g, 'j')
    .replace(/jj/g, 'd')

    // Day in week.
    .replace('EEEE', 'l')
    .replace('EEE', 'D')

    // Hours, minutes, seconds
    .replace('HH', 'H')
    .replace('hh', 'G')
    .replace('mm', 'i')
    .replace('ss', 'S')
    .replace(/a/g, 'K');
}

/**
 * Convert the format from the angular-datepicker module to moment format.
 * @param format
 * @return {string}
 */
export function convertFormatToMoment(format) {
  return format
  // Year conversion.
    .replace(/y/g, 'Y')
    // Day in month.
    .replace(/d/g, 'D')
    // Day in week.
    .replace(/E/g, 'd')
    // AM/PM marker
    .replace(/a/g, 'A')
    // Unix Timestamp
    .replace(/U/g, 'X');
}

export function convertFormatToMask(format) {
  return format
  // Long month replacement.
    .replace(/M{4}/g, 'MM')
    // Initial short month conversion.
    .replace(/M{3}/g, '***')
    // Short month conversion if input as text.
    .replace(/e/g, 'Q')
    // Year conversion.
    .replace(/[ydhmsHMG]/g, '9')
    // AM/PM conversion.
    .replace(/a/g, 'AA');
}

/**
 * Returns an input mask that is compatible with the input mask library.
 * @param {string} mask - The Form.io input mask.
 * @returns {Array} - The input mask for the mask library.
 */
export function getInputMask(mask) {
  if (mask instanceof Array) {
    return mask;
  }
  const maskArray = [];
  maskArray.numeric = true;
  for (let i = 0; i < mask.length; i++) {
    switch (mask[i]) {
      case '9':
        maskArray.push(/\d/);
        break;
      case 'A':
        maskArray.numeric = false;
        maskArray.push(/[a-zA-Z]/);
        break;
      case 'a':
        maskArray.numeric = false;
        maskArray.push(/[a-z]/);
        break;
      case '*':
        maskArray.numeric = false;
        maskArray.push(/[a-zA-Z0-9]/);
        break;
      default:
        maskArray.numeric = false;
        maskArray.push(mask[i]);
        break;
    }
  }
  return maskArray;
}

export function matchInputMask(value, inputMask) {
  if (!inputMask) {
    return true;
  }

  // If value is longer than mask, it isn't valid.
  if (value.length > inputMask.length) {
    return false;
  }

  for (let i = 0; i < inputMask.length; i++) {
    const char = value[i];
    const charPart = inputMask[i];

    if (!(_.isRegExp(charPart) && charPart.test(char) || charPart === char)) {
      return false;
    }
  }

  return true;
}

export function getNumberSeparators(lang = 'en') {
  const formattedNumberString = (12345.6789).toLocaleString(lang);
  const delimeters = formattedNumberString.match(/..(.)...(.)../);
  if (!delimeters) {
    return {
      delimiter: ',',
      decimalSeparator: '.'
    };
  }
  return {
    delimiter: (delimeters.length > 1) ? delimeters[1] : ',',
    decimalSeparator: (delimeters.length > 2) ? delimeters[2] : '.',
  };
}

export function getNumberDecimalLimit(component, defaultLimit) {
  if (_.has(component, 'decimalLimit')) {
    return _.get(component, 'decimalLimit');
  }
  // Determine the decimal limit. Defaults to 20 but can be overridden by validate.step or decimalLimit settings.
  let decimalLimit = defaultLimit || 20;
  const step = _.get(component, 'validate.step', 'any');

  if (step !== 'any') {
    const parts = step.toString().split('.');
    if (parts.length > 1) {
      decimalLimit = parts[1].length;
    }
  }

  return decimalLimit;
}

export function getCurrencyAffixes({
   currency = 'USD',
   decimalLimit,
   decimalSeparator,
   lang,
 }) {
  // Get the prefix and suffix from the localized string.
  let regex = '(.*)?100';
  if (decimalLimit) {
    regex += `${decimalSeparator === '.' ? '\\.' : decimalSeparator}0{${decimalLimit}}`;
  }
  regex += '(.*)?';
  const parts = (100).toLocaleString(lang, {
    style: 'currency',
    currency,
    useGrouping: true,
    maximumFractionDigits: decimalLimit,
    minimumFractionDigits: decimalLimit
  }).replace('.', decimalSeparator).match(new RegExp(regex));
  return {
    prefix: parts[1] || '',
    suffix: parts[2] || ''
  };
}

/**
 * Fetch the field data provided a component.
 *
 * @param data
 * @param component
 * @return {*}
 */
export function fieldData(data, component) {
  if (!data) {
    return '';
  }
  if (!component || !component.key) {
    return data;
  }
  if (component.key.includes('.')) {
    let value = data;
    const parts = component.key.split('.');
    let key = '';
    for (let i = 0; i < parts.length; i++) {
      key = parts[i];

      // Handle nested resources
      if (value.hasOwnProperty('_id')) {
        value = value.data;
      }

      // Return if the key is not found on the value.
      if (!value.hasOwnProperty(key)) {
        return;
      }

      // Convert old single field data in submissions to multiple
      if (key === parts[parts.length - 1] && component.multiple && !Array.isArray(value[key])) {
        value[key] = [value[key]];
      }

      // Set the value of this key.
      value = value[key];
    }
    return value;
  }
  else {
    // Convert old single field data in submissions to multiple
    if (component.multiple && !Array.isArray(data[component.key])) {
      data[component.key] = [data[component.key]];
    }

    // Fix for checkbox type radio submission values in tableView
    if (component.type === 'checkbox' && component.inputType === 'radio') {
      return data[component.name] === component.value;
    }

    return data[component.key];
  }
}

/**
 * Delays function execution with possibility to execute function synchronously or cancel it.
 *
 * @param fn Function to delay
 * @param delay Delay time
 * @return {*}
 */
export function delay(fn, delay = 0, ...args) {
  const timer = setTimeout(fn, delay, ...args);

  function cancel() {
    clearTimeout(timer);
  }

  function earlyCall() {
    cancel();
    return fn(...args);
  }

  earlyCall.timer = timer;
  earlyCall.cancel = cancel;

  return earlyCall;
}

/**
 * Iterate the given key to make it unique.
 *
 * @param {String} key
 *   Modify the component key to be unique.
 *
 * @returns {String}
 *   The new component key.
 */
export function iterateKey(key) {
  if (!key.match(/(\d+)$/)) {
    return `${key}1`;
  }

  return key.replace(/(\d+)$/, function(suffix) {
    return Number(suffix) + 1;
  });
}

/**
 * Determines a unique key within a map provided the base key.
 *
 * @param map
 * @param base
 * @return {*}
 */
export function uniqueKey(map, base) {
  let newKey = base;
  while (map.hasOwnProperty(newKey)) {
    newKey = iterateKey(newKey);
  }
  return newKey;
}

/**
 * Determines the major version number of bootstrap.
 *
 * @return {number}
 */
export function bootstrapVersion(options) {
  if (options.bootstrap) {
    return options.bootstrap;
  }
  if ((typeof $ === 'function') && (typeof $().collapse === 'function')) {
    return parseInt($.fn.collapse.Constructor.VERSION.split('.')[0], 10);
  }
  return 0;
}

/**
 * Retrun provided argument.
 * If argument is a function, returns the result of a function call.
 * @param {*} e;
 *
 * @return {*}
 */
export function unfold(e) {
  if (typeof e === 'function') {
    return e();
  }

  return e;
}

/**
 * Map values through unfold and return first non-nil value.
 * @param {Array<T>} collection;
 *
 * @return {T}
 */
export const firstNonNil = _.flow([
  _.partialRight(_.map, unfold),
  _.partialRight(_.find, v => !_.isUndefined(v))
]);

/*
 * Create enclosed state.
 * Returns functions to getting and cycling between states.
 * @param {*} a - initial state.
 * @param {*} b - next state.
 * @return {Functions[]} -- [get, toggle];
 */
export function withSwitch(a, b) {
  let state = a;
  let next = b;

  function get() {
    return state;
  }

  function toggle() {
    const prev = state;
    state = next;
    next = prev;
  }

  return [get, toggle];
}

export function observeOverload(callback, options = {}) {
  const { limit = 50, delay = 500 } = options;
  let callCount = 0;
  let timeoutID = 0;

  const reset = () => callCount = 0;

  return () => {
    if (timeoutID !== 0) {
      clearTimeout(timeoutID);
      timeoutID = 0;
    }

    timeoutID = setTimeout(reset, delay);

    callCount += 1;

    if (callCount >= limit) {
      clearTimeout(timeoutID);
      reset();
      return callback();
    }
  };
}

export function getContextComponents(context) {
  const values = [];

  context.utils.eachComponent(context.instance.options.editForm.components, (component, path) => {
    if (component.key !== context.data.key) {
      values.push({
        label: `${component.label || component.key} (${path})`,
        value: path,
      });
    }
  });

  return values;
}

/**
 * Sanitize an html string.
 *
 * @param string
 * @returns {*}
 */
export function sanitize(string, options) {
  // Dompurify configuration
  const sanitizeOptions = {
    ADD_ATTR: ['ref', 'target'],
    USE_PROFILES: { html: true }
  };
  // Add attrs
  if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.addAttr) && options.sanitizeConfig.addAttr.length > 0) {
    options.sanitizeConfig.addAttr.forEach((attr) => {
      sanitizeOptions.ADD_ATTR.push(attr);
    });
  }
  // Add tags
  if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.addTags) && options.sanitizeConfig.addTags.length > 0) {
    sanitizeOptions.ADD_TAGS = options.sanitizeConfig.addTags;
  }
  // Allow tags
  if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.allowedTags) && options.sanitizeConfig.allowedTags.length > 0) {
    sanitizeOptions.ALLOWED_TAGS = options.sanitizeConfig.allowedTags;
  }
  // Allow attributes
  if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.allowedAttrs) && options.sanitizeConfig.allowedAttrs.length > 0) {
    sanitizeOptions.ALLOWED_ATTR = options.sanitizeConfig.allowedAttrs;
  }
  // Allowd URI Regex
  if (options.sanitizeConfig && options.sanitizeConfig.allowedUriRegex) {
    sanitizeOptions.ALLOWED_URI_REGEXP = options.sanitizeConfig.allowedUriRegex;
  }
  return dompurify.sanitize(string, sanitizeOptions);
}

/**
 * Fast cloneDeep for JSON objects only.
 */
export function fastCloneDeep(obj) {
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

export { Evaluator, interpolate };

export function isInputComponent(componentJson) {
  if (componentJson.input === false || componentJson.input === true) {
    return componentJson.input;
  }
  switch (componentJson.type) {
    case 'htmlelement':
    case 'content':
    case 'columns':
    case 'fieldset':
    case 'panel':
    case 'table':
    case 'tabs':
    case 'well':
    case 'button':
      return false;
    default:
      return true;
  }
}

export function getArrayFromComponentPath(pathStr) {
  if (!pathStr || !_.isString(pathStr)) {
    if (!_.isArray(pathStr)) {
      return [pathStr];
    }
    return pathStr;
  }
  return pathStr.replace(/[[\]]/g, '.')
    .replace(/\.\./g, '.')
    .replace(/(^\.)|(\.$)/g, '')
    .split('.')
    .map(part => _.defaultTo(_.toNumber(part), part));
}

export function getStringFromComponentPath(path) {
  if (!_.isArray(path)) {
    return path;
  }
  let strPath = '';
  path.forEach((part, i) => {
    if (_.isNumber(part)) {
      strPath += `[${part}]`;
    }
    else {
      strPath += i === 0 ? part : `.${part}`;
    }
  });
  return strPath;
}

export function round(number, precision) {
  if (_.isNumber(number)) {
    return number.toFixed(precision);
  }
  return number;
}

/**
 * Check for Internet Explorer browser version
 *
 * @return {(number|null)}
 */
export function getIEBrowserVersion() {
  if (typeof document === 'undefined' || !('documentMode' in document)) {
    return null;
  }

  return document['documentMode'];
}

"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.to-fixed");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  evaluate: true,
  getRandomComponentId: true,
  getPropertyValue: true,
  getElementRect: true,
  boolValue: true,
  isMongoId: true,
  checkCalculated: true,
  checkSimpleConditional: true,
  checkCustomConditional: true,
  checkJsonConditional: true,
  checkCondition: true,
  checkTrigger: true,
  setActionProperty: true,
  unescapeHTML: true,
  convertStringToHTMLElement: true,
  uniqueName: true,
  guid: true,
  getDateSetting: true,
  isValidDate: true,
  currentTimezone: true,
  offsetDate: true,
  zonesLoaded: true,
  shouldLoadZones: true,
  loadZones: true,
  momentDate: true,
  formatDate: true,
  formatOffset: true,
  getLocaleDateFormatInfo: true,
  convertFormatToFlatpickr: true,
  convertFormatToMoment: true,
  convertFormatToMask: true,
  getInputMask: true,
  matchInputMask: true,
  getNumberSeparators: true,
  getNumberDecimalLimit: true,
  getCurrencyAffixes: true,
  fieldData: true,
  delay: true,
  iterateKey: true,
  uniqueKey: true,
  bootstrapVersion: true,
  unfold: true,
  firstNonNil: true,
  withSwitch: true,
  observeOverload: true,
  getContextComponents: true,
  sanitize: true,
  fastCloneDeep: true,
  interpolate: true,
  isInputComponent: true,
  getArrayFromComponentPath: true,
  getStringFromComponentPath: true,
  round: true,
  getIEBrowserVersion: true,
  jsonLogic: true,
  moment: true,
  Evaluator: true
};
exports.evaluate = evaluate;
exports.getRandomComponentId = getRandomComponentId;
exports.getPropertyValue = getPropertyValue;
exports.getElementRect = getElementRect;
exports.boolValue = boolValue;
exports.isMongoId = isMongoId;
exports.checkCalculated = checkCalculated;
exports.checkSimpleConditional = checkSimpleConditional;
exports.checkCustomConditional = checkCustomConditional;
exports.checkJsonConditional = checkJsonConditional;
exports.checkCondition = checkCondition;
exports.checkTrigger = checkTrigger;
exports.setActionProperty = setActionProperty;
exports.unescapeHTML = unescapeHTML;
exports.convertStringToHTMLElement = convertStringToHTMLElement;
exports.uniqueName = uniqueName;
exports.guid = guid;
exports.getDateSetting = getDateSetting;
exports.isValidDate = isValidDate;
exports.currentTimezone = currentTimezone;
exports.offsetDate = offsetDate;
exports.zonesLoaded = zonesLoaded;
exports.shouldLoadZones = shouldLoadZones;
exports.loadZones = loadZones;
exports.momentDate = momentDate;
exports.formatDate = formatDate;
exports.formatOffset = formatOffset;
exports.getLocaleDateFormatInfo = getLocaleDateFormatInfo;
exports.convertFormatToFlatpickr = convertFormatToFlatpickr;
exports.convertFormatToMoment = convertFormatToMoment;
exports.convertFormatToMask = convertFormatToMask;
exports.getInputMask = getInputMask;
exports.matchInputMask = matchInputMask;
exports.getNumberSeparators = getNumberSeparators;
exports.getNumberDecimalLimit = getNumberDecimalLimit;
exports.getCurrencyAffixes = getCurrencyAffixes;
exports.fieldData = fieldData;
exports.delay = delay;
exports.iterateKey = iterateKey;
exports.uniqueKey = uniqueKey;
exports.bootstrapVersion = bootstrapVersion;
exports.unfold = unfold;
exports.withSwitch = withSwitch;
exports.observeOverload = observeOverload;
exports.getContextComponents = getContextComponents;
exports.sanitize = sanitize;
exports.fastCloneDeep = fastCloneDeep;
exports.isInputComponent = isInputComponent;
exports.getArrayFromComponentPath = getArrayFromComponentPath;
exports.getStringFromComponentPath = getStringFromComponentPath;
exports.round = round;
exports.getIEBrowserVersion = getIEBrowserVersion;
Object.defineProperty(exports, "jsonLogic", {
  enumerable: true,
  get: function get() {
    return _jsonLogicJs.default;
  }
});
Object.defineProperty(exports, "moment", {
  enumerable: true,
  get: function get() {
    return _momentTimezone.default;
  }
});
Object.defineProperty(exports, "Evaluator", {
  enumerable: true,
  get: function get() {
    return _Evaluator.default;
  }
});
exports.interpolate = exports.firstNonNil = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fetchPonyfill2 = _interopRequireDefault(require("fetch-ponyfill"));

var _jsonLogicJs = _interopRequireDefault(require("json-logic-js"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone/moment-timezone"));

var _jstimezonedetect = _interopRequireDefault(require("jstimezonedetect"));

var _operators = require("./jsonlogic/operators");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _dompurify = _interopRequireDefault(require("dompurify"));

var _formUtils = require("./formUtils");

Object.keys(_formUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _formUtils[key];
    }
  });
});

var _Evaluator = _interopRequireDefault(require("./Evaluator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var interpolate = _Evaluator.default.interpolate;
exports.interpolate = interpolate;

var _fetchPonyfill = (0, _fetchPonyfill2.default)({
  Promise: _nativePromiseOnly.default
}),
    fetch = _fetchPonyfill.fetch;

// Configure JsonLogic
_operators.lodashOperators.forEach(function (name) {
  return _jsonLogicJs.default.add_operation("_".concat(name), _lodash.default[name]);
}); // Retrieve Any Date


_jsonLogicJs.default.add_operation('getDate', function (date) {
  return (0, _momentTimezone.default)(date).toISOString();
}); // Set Relative Minimum Date


_jsonLogicJs.default.add_operation('relativeMinDate', function (relativeMinDate) {
  return (0, _momentTimezone.default)().subtract(relativeMinDate, 'days').toISOString();
}); // Set Relative Maximum Date


_jsonLogicJs.default.add_operation('relativeMaxDate', function (relativeMaxDate) {
  return (0, _momentTimezone.default)().add(relativeMaxDate, 'days').toISOString();
});

/**
 * Evaluate a method.
 *
 * @param func
 * @param args
 * @return {*}
 */
function evaluate(func, args, ret, tokenize) {
  var returnVal = null;
  var component = args.component ? args.component : {
    key: 'unknown'
  };

  if (!args.form && args.instance) {
    args.form = _lodash.default.get(args.instance, 'root._form', {});
  }

  var componentKey = component.key;

  if (typeof func === 'string') {
    if (ret) {
      func += ";return ".concat(ret);
    }

    if (tokenize) {
      // Replace all {{ }} references with actual data.
      func = func.replace(/({{\s+(.*)\s+}})/, function (match, $1, $2) {
        if ($2.indexOf('data.') === 0) {
          return _lodash.default.get(args.data, $2.replace('data.', ''));
        } else if ($2.indexOf('row.') === 0) {
          return _lodash.default.get(args.row, $2.replace('row.', ''));
        } // Support legacy...


        return _lodash.default.get(args.data, $2);
      });
    }

    try {
      func = _Evaluator.default.evaluator(func, args);
      args = _lodash.default.values(args);
    } catch (err) {
      console.warn("An error occured within the custom function for ".concat(componentKey), err);
      returnVal = null;
      func = false;
    }
  }

  if (typeof func === 'function') {
    try {
      returnVal = _Evaluator.default.evaluate(func, args);
    } catch (err) {
      returnVal = null;
      console.warn("An error occured within custom function for ".concat(componentKey), err);
    }
  } else if (_typeof(func) === 'object') {
    try {
      returnVal = _jsonLogicJs.default.apply(func, args);
    } catch (err) {
      returnVal = null;
      console.warn("An error occured within custom function for ".concat(componentKey), err);
    }
  } else if (func) {
    console.warn("Unknown function type for ".concat(componentKey));
  }

  return returnVal;
}

function getRandomComponentId() {
  return "e".concat(Math.random().toString(36).substring(7));
}
/**
 * Get a property value of an element.
 *
 * @param style
 * @param prop
 * @return {number}
 */


function getPropertyValue(style, prop) {
  var value = style.getPropertyValue(prop);
  value = value ? value.replace(/[^0-9.]/g, '') : '0';
  return parseFloat(value);
}
/**
 * Get an elements bounding rectagle.
 *
 * @param element
 * @return {{x: string, y: string, width: string, height: string}}
 */


function getElementRect(element) {
  var style = window.getComputedStyle(element, null);
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


function boolValue(value) {
  if (_lodash.default.isBoolean(value)) {
    return value;
  } else if (_lodash.default.isString(value)) {
    return value.toLowerCase() === 'true';
  } else {
    return !!value;
  }
}
/**
 * Check to see if an ID is a mongoID.
 * @param text
 * @return {Array|{index: number, input: string}|Boolean|*}
 */


function isMongoId(text) {
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


function checkCalculated(component, submission, rowData) {
  // Process calculated value stuff if present.
  if (component.calculateValue) {
    _lodash.default.set(rowData, component.key, evaluate(component.calculateValue, {
      value: undefined,
      data: submission ? submission.data : rowData,
      row: rowData,
      util: this,
      component: component
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


function checkSimpleConditional(component, condition, row, data) {
  var value = null;

  if (row) {
    value = (0, _formUtils.getValue)({
      data: row
    }, condition.when);
  }

  if (data && _lodash.default.isNil(value)) {
    value = (0, _formUtils.getValue)({
      data: data
    }, condition.when);
  } // FOR-400 - Fix issue where falsey values were being evaluated as show=true


  if (_lodash.default.isNil(value)) {
    value = '';
  }

  var eq = String(condition.eq);
  var show = String(condition.show); // Special check for selectboxes component.

  if (_lodash.default.isObject(value) && _lodash.default.has(value, condition.eq)) {
    return String(value[condition.eq]) === show;
  } // FOR-179 - Check for multiple values.


  if (Array.isArray(value) && value.map(String).includes(eq)) {
    return show === 'true';
  }

  return String(value) === eq === (show === 'true');
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


function checkCustomConditional(component, custom, row, data, form, variable, onError, instance) {
  if (typeof custom === 'string') {
    custom = "var ".concat(variable, " = true; ").concat(custom, "; return ").concat(variable, ";");
  }

  var value = instance && instance.evaluate ? instance.evaluate(custom) : evaluate(custom, {
    row: row,
    data: data,
    form: form
  });

  if (value === null) {
    return onError;
  }

  return value;
}

function checkJsonConditional(component, json, row, data, form, onError) {
  try {
    return _jsonLogicJs.default.apply(json, {
      data: data,
      row: row,
      form: form,
      _: _lodash.default
    });
  } catch (err) {
    console.warn("An error occurred in jsonLogic advanced condition for ".concat(component.key), err);
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


function checkCondition(component, row, data, form, instance) {
  if (component.customConditional) {
    return checkCustomConditional(component, component.customConditional, row, data, form, 'show', true, instance);
  } else if (component.conditional && component.conditional.when) {
    return checkSimpleConditional(component, component.conditional, row, data);
  } else if (component.conditional && component.conditional.json) {
    return checkJsonConditional(component, component.conditional.json, row, data, form, true);
  } // Default to show.


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


function checkTrigger(component, trigger, row, data, form, instance) {
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
  } // If none of the types matched, don't fire the trigger.


  return false;
}

function setActionProperty(component, action, result, row, data, instance) {
  var property = action.property.value;

  switch (action.property.type) {
    case 'boolean':
      {
        var currentValue = _lodash.default.get(component, property, false).toString();

        var newValue = action.state.toString();

        if (currentValue !== newValue) {
          _lodash.default.set(component, property, newValue === 'true');
        }

        break;
      }

    case 'string':
      {
        var evalData = {
          data: data,
          row: row,
          component: component,
          result: result
        };
        var textValue = action.property.component ? action[action.property.component] : action.text;

        var _currentValue = _lodash.default.get(component, property, '');

        var _newValue = instance && instance.interpolate ? instance.interpolate(textValue, evalData) : _Evaluator.default.interpolate(textValue, evalData);

        if (_newValue !== _currentValue) {
          _lodash.default.set(component, property, _newValue);
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


function unescapeHTML(str) {
  if (typeof window === 'undefined' || !('DOMParser' in window)) {
    return str;
  }

  var doc = new window.DOMParser().parseFromString(str, 'text/html');
  return doc.documentElement.textContent;
}
/**
 * Make HTML element from string
 * @param str
 * @param selector
 * @returns {HTMLElement}
 */


function convertStringToHTMLElement(str, selector) {
  var doc = new window.DOMParser().parseFromString(str, 'text/html');
  return doc.body.querySelector(selector);
}
/**
 * Make a filename guaranteed to be unique.
 * @param name
 * @param template
 * @param evalContext
 * @returns {string}
 */


function uniqueName(name, template, evalContext) {
  template = template || '{{fileName}}-{{guid}}'; //include guid in template anyway, to prevent overwriting issue if filename matches existing file

  if (!template.includes('{{guid}}')) {
    template = "".concat(template, "-{{guid}}");
  }

  var parts = name.split('.');
  var fileName = parts.slice(0, parts.length - 1).join('.');
  var extension = parts.length > 1 ? ".".concat(_lodash.default.last(parts)) : ''; //allow only 100 characters from original name to avoid issues with filename length restrictions

  fileName = fileName.substr(0, 100);
  evalContext = Object.assign(evalContext || {}, {
    fileName: fileName,
    guid: guid()
  }); //only letters, numbers, dots, dashes, underscores and spaces are allowed. Anything else will be replaced with dash

  var uniqueName = "".concat(_Evaluator.default.interpolate(template, evalContext)).concat(extension).replace(/[^0-9a-zA-Z.\-_ ]/g, '-');
  return uniqueName;
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
/**
 * Return a translated date setting.
 *
 * @param date
 * @return {(null|Date)}
 */


function getDateSetting(date) {
  if (_lodash.default.isNil(date) || _lodash.default.isNaN(date) || date === '') {
    return null;
  }

  if (date instanceof Date) {
    return date;
  } else if (typeof date.toDate === 'function') {
    return date.isValid() ? date.toDate() : null;
  }

  var dateSetting = typeof date !== 'string' || date.indexOf('moment(') === -1 ? (0, _momentTimezone.default)(date) : null;

  if (dateSetting && dateSetting.isValid()) {
    return dateSetting.toDate();
  }

  dateSetting = null;

  try {
    var value = _Evaluator.default.evaluator("return ".concat(date, ";"), 'moment')(_momentTimezone.default);

    if (typeof value === 'string') {
      dateSetting = (0, _momentTimezone.default)(value);
    } else if (typeof value.toDate === 'function') {
      dateSetting = (0, _momentTimezone.default)(value.toDate().toUTCString());
    } else if (value instanceof Date) {
      dateSetting = (0, _momentTimezone.default)(value);
    }
  } catch (e) {
    return null;
  }

  if (!dateSetting) {
    return null;
  } // Ensure this is a date.


  if (!dateSetting.isValid()) {
    return null;
  }

  return dateSetting.toDate();
}

function isValidDate(date) {
  return _lodash.default.isDate(date) && !_lodash.default.isNaN(date.getDate());
}
/**
 * Get the current timezone string.
 *
 * @return {string}
 */


function currentTimezone() {
  if (_momentTimezone.default.currentTimezone) {
    return _momentTimezone.default.currentTimezone;
  }

  _momentTimezone.default.currentTimezone = _jstimezonedetect.default.determine().name();
  return _momentTimezone.default.currentTimezone;
}
/**
 * Get an offset date provided a date object and timezone object.
 *
 * @param date
 * @param timezone
 * @return {Date}
 */


function offsetDate(date, timezone) {
  if (timezone === 'UTC') {
    return {
      date: new Date(date.getTime() + date.getTimezoneOffset() * 60000),
      abbr: 'UTC'
    };
  }

  var dateMoment = (0, _momentTimezone.default)(date).tz(timezone);
  return {
    date: new Date(date.getTime() + (dateMoment.utcOffset() + date.getTimezoneOffset()) * 60000),
    abbr: dateMoment.format('z')
  };
}
/**
 * Returns if the zones are loaded.
 *
 * @return {boolean}
 */


function zonesLoaded() {
  return _momentTimezone.default.zonesLoaded;
}
/**
 * Returns if we should load the zones.
 *
 * @param timezone
 * @return {boolean}
 */


function shouldLoadZones(timezone) {
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


function loadZones(timezone) {
  if (timezone && !shouldLoadZones(timezone)) {
    // Return non-resolving promise.
    return new _nativePromiseOnly.default(_lodash.default.noop);
  }

  if (_momentTimezone.default.zonesPromise) {
    return _momentTimezone.default.zonesPromise;
  }

  return _momentTimezone.default.zonesPromise = fetch('https://cdn.form.io/moment-timezone/data/packed/latest.json').then(function (resp) {
    return resp.json().then(function (zones) {
      _momentTimezone.default.tz.load(zones);

      _momentTimezone.default.zonesLoaded = true; // Trigger a global event that the timezones have finished loading.

      if (document && document.createEvent && document.body && document.body.dispatchEvent) {
        var event = document.createEvent('Event');
        event.initEvent('zonesLoaded', true, true);
        document.body.dispatchEvent(event);
      }
    });
  });
}
/**
 * Get the moment date object for translating dates with timezones.
 *
 * @param value
 * @param format
 * @param timezone
 * @return {*}
 */


function momentDate(value, format, timezone) {
  var momentDate = (0, _momentTimezone.default)(value);

  if (timezone === 'UTC') {
    timezone = 'Etc/UTC';
  }

  if ((timezone !== currentTimezone() || format && format.match(/\s(z$|z\s)/)) && _momentTimezone.default.zonesLoaded) {
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


function formatDate(value, format, timezone) {
  var momentDate = (0, _momentTimezone.default)(value);

  if (timezone === currentTimezone()) {
    // See if our format contains a "z" timezone character.
    if (format.match(/\s(z$|z\s)/)) {
      loadZones();

      if (_momentTimezone.default.zonesLoaded) {
        return momentDate.tz(timezone).format(convertFormatToMoment(format));
      } else {
        return momentDate.format(convertFormatToMoment(format.replace(/\s(z$|z\s)/, '')));
      }
    } // Return the standard format.


    return momentDate.format(convertFormatToMoment(format));
  }

  if (timezone === 'UTC') {
    var offset = offsetDate(momentDate.toDate(), 'UTC');
    return "".concat((0, _momentTimezone.default)(offset.date).format(convertFormatToMoment(format)), " UTC");
  } // Load the zones since we need timezone information.


  loadZones();

  if (_momentTimezone.default.zonesLoaded && timezone) {
    return momentDate.tz(timezone).format("".concat(convertFormatToMoment(format), " z"));
  } else {
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


function formatOffset(formatFn, date, format, timezone) {
  if (timezone === currentTimezone()) {
    return formatFn(date, format);
  }

  if (timezone === 'UTC') {
    return "".concat(formatFn(offsetDate(date, 'UTC').date, format), " UTC");
  } // Load the zones since we need timezone information.


  loadZones();

  if (_momentTimezone.default.zonesLoaded) {
    var offset = offsetDate(date, timezone);
    return "".concat(formatFn(offset.date, format), " ").concat(offset.abbr);
  } else {
    return formatFn(date, format);
  }
}

function getLocaleDateFormatInfo(locale) {
  var formatInfo = {};
  var day = 21;
  var exampleDate = new Date(2017, 11, day);
  var localDateString = exampleDate.toLocaleDateString(locale);
  formatInfo.dayFirst = localDateString.slice(0, 2) === day.toString();
  return formatInfo;
}
/**
 * Convert the format from the angular-datepicker module to flatpickr format.
 * @param format
 * @return {string}
 */


function convertFormatToFlatpickr(format) {
  return format // Remove the Z timezone offset, not supported by flatpickr.
  .replace(/Z/g, '') // Year conversion.
  .replace(/y/g, 'Y').replace('YYYY', 'Y').replace('YY', 'y') // Month conversion.
  .replace('MMMM', 'F').replace(/M/g, 'n').replace('nnn', 'M').replace('nn', 'm') // Day in month.
  .replace(/d/g, 'j').replace(/jj/g, 'd') // Day in week.
  .replace('EEEE', 'l').replace('EEE', 'D') // Hours, minutes, seconds
  .replace('HH', 'H').replace('hh', 'G').replace('mm', 'i').replace('ss', 'S').replace(/a/g, 'K');
}
/**
 * Convert the format from the angular-datepicker module to moment format.
 * @param format
 * @return {string}
 */


function convertFormatToMoment(format) {
  return format // Year conversion.
  .replace(/y/g, 'Y') // Day in month.
  .replace(/d/g, 'D') // Day in week.
  .replace(/E/g, 'd') // AM/PM marker
  .replace(/a/g, 'A') // Unix Timestamp
  .replace(/U/g, 'X');
}

function convertFormatToMask(format) {
  return format // Long month replacement.
  .replace(/M{4}/g, 'MM') // Initial short month conversion.
  .replace(/M{3}/g, '***') // Short month conversion if input as text.
  .replace(/e/g, 'Q') // Year conversion.
  .replace(/[ydhmsHMG]/g, '9') // AM/PM conversion.
  .replace(/a/g, 'AA');
}
/**
 * Returns an input mask that is compatible with the input mask library.
 * @param {string} mask - The Form.io input mask.
 * @returns {Array} - The input mask for the mask library.
 */


function getInputMask(mask) {
  if (mask instanceof Array) {
    return mask;
  }

  var maskArray = [];
  maskArray.numeric = true;

  for (var i = 0; i < mask.length; i++) {
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

function matchInputMask(value, inputMask) {
  if (!inputMask) {
    return true;
  } // If value is longer than mask, it isn't valid.


  if (value.length > inputMask.length) {
    return false;
  }

  for (var i = 0; i < inputMask.length; i++) {
    var char = value[i];
    var charPart = inputMask[i];

    if (!(_lodash.default.isRegExp(charPart) && charPart.test(char) || charPart === char)) {
      return false;
    }
  }

  return true;
}

function getNumberSeparators() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
  var formattedNumberString = 12345.6789.toLocaleString(lang);
  var delimeters = formattedNumberString.match(/..(.)...(.)../);

  if (!delimeters) {
    return {
      delimiter: ',',
      decimalSeparator: '.'
    };
  }

  return {
    delimiter: delimeters.length > 1 ? delimeters[1] : ',',
    decimalSeparator: delimeters.length > 2 ? delimeters[2] : '.'
  };
}

function getNumberDecimalLimit(component, defaultLimit) {
  if (_lodash.default.has(component, 'decimalLimit')) {
    return _lodash.default.get(component, 'decimalLimit');
  } // Determine the decimal limit. Defaults to 20 but can be overridden by validate.step or decimalLimit settings.


  var decimalLimit = defaultLimit || 20;

  var step = _lodash.default.get(component, 'validate.step', 'any');

  if (step !== 'any') {
    var parts = step.toString().split('.');

    if (parts.length > 1) {
      decimalLimit = parts[1].length;
    }
  }

  return decimalLimit;
}

function getCurrencyAffixes(_ref) {
  var _ref$currency = _ref.currency,
      currency = _ref$currency === void 0 ? 'USD' : _ref$currency,
      decimalLimit = _ref.decimalLimit,
      decimalSeparator = _ref.decimalSeparator,
      lang = _ref.lang;
  // Get the prefix and suffix from the localized string.
  var regex = '(.*)?100';

  if (decimalLimit) {
    regex += "".concat(decimalSeparator === '.' ? '\\.' : decimalSeparator, "0{").concat(decimalLimit, "}");
  }

  regex += '(.*)?';
  var parts = 100 .toLocaleString(lang, {
    style: 'currency',
    currency: currency,
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


function fieldData(data, component) {
  if (!data) {
    return '';
  }

  if (!component || !component.key) {
    return data;
  }

  if (component.key.includes('.')) {
    var value = data;
    var parts = component.key.split('.');
    var key = '';

    for (var i = 0; i < parts.length; i++) {
      key = parts[i]; // Handle nested resources

      if (value.hasOwnProperty('_id')) {
        value = value.data;
      } // Return if the key is not found on the value.


      if (!value.hasOwnProperty(key)) {
        return;
      } // Convert old single field data in submissions to multiple


      if (key === parts[parts.length - 1] && component.multiple && !Array.isArray(value[key])) {
        value[key] = [value[key]];
      } // Set the value of this key.


      value = value[key];
    }

    return value;
  } else {
    // Convert old single field data in submissions to multiple
    if (component.multiple && !Array.isArray(data[component.key])) {
      data[component.key] = [data[component.key]];
    } // Fix for checkbox type radio submission values in tableView


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


function delay(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var timer = setTimeout.apply(void 0, [fn, delay].concat(args));

  function cancel() {
    clearTimeout(timer);
  }

  function earlyCall() {
    cancel();
    return fn.apply(void 0, args);
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


function iterateKey(key) {
  if (!key.match(/(\d+)$/)) {
    return "".concat(key, "1");
  }

  return key.replace(/(\d+)$/, function (suffix) {
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


function uniqueKey(map, base) {
  var newKey = base;

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


function bootstrapVersion(options) {
  if (options.bootstrap) {
    return options.bootstrap;
  }

  if (typeof $ === 'function' && typeof $().collapse === 'function') {
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


function unfold(e) {
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


var firstNonNil = _lodash.default.flow([_lodash.default.partialRight(_lodash.default.map, unfold), _lodash.default.partialRight(_lodash.default.find, function (v) {
  return !_lodash.default.isUndefined(v);
})]);
/*
 * Create enclosed state.
 * Returns functions to getting and cycling between states.
 * @param {*} a - initial state.
 * @param {*} b - next state.
 * @return {Functions[]} -- [get, toggle];
 */


exports.firstNonNil = firstNonNil;

function withSwitch(a, b) {
  var state = a;
  var next = b;

  function get() {
    return state;
  }

  function toggle() {
    var prev = state;
    state = next;
    next = prev;
  }

  return [get, toggle];
}

function observeOverload(callback) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$limit = options.limit,
      limit = _options$limit === void 0 ? 50 : _options$limit,
      _options$delay = options.delay,
      delay = _options$delay === void 0 ? 500 : _options$delay;
  var callCount = 0;
  var timeoutID = 0;

  var reset = function reset() {
    return callCount = 0;
  };

  return function () {
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

function getContextComponents(context) {
  var values = [];
  context.utils.eachComponent(context.instance.options.editForm.components, function (component, path) {
    if (component.key !== context.data.key) {
      values.push({
        label: "".concat(component.label || component.key, " (").concat(path, ")"),
        value: path
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


function sanitize(string, options) {
  // Dompurify configuration
  var sanitizeOptions = {
    ADD_ATTR: ['ref', 'target'],
    USE_PROFILES: {
      html: true
    }
  }; // Add attrs

  if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.addAttr) && options.sanitizeConfig.addAttr.length > 0) {
    options.sanitizeConfig.addAttr.forEach(function (attr) {
      sanitizeOptions.ADD_ATTR.push(attr);
    });
  } // Add tags


  if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.addTags) && options.sanitizeConfig.addTags.length > 0) {
    sanitizeOptions.ADD_TAGS = options.sanitizeConfig.addTags;
  } // Allow tags


  if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.allowedTags) && options.sanitizeConfig.allowedTags.length > 0) {
    sanitizeOptions.ALLOWED_TAGS = options.sanitizeConfig.allowedTags;
  } // Allow attributes


  if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.allowedAttrs) && options.sanitizeConfig.allowedAttrs.length > 0) {
    sanitizeOptions.ALLOWED_ATTR = options.sanitizeConfig.allowedAttrs;
  } // Allowd URI Regex


  if (options.sanitizeConfig && options.sanitizeConfig.allowedUriRegex) {
    sanitizeOptions.ALLOWED_URI_REGEXP = options.sanitizeConfig.allowedUriRegex;
  }

  return _dompurify.default.sanitize(string, sanitizeOptions);
}
/**
 * Fast cloneDeep for JSON objects only.
 */


function fastCloneDeep(obj) {
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

function isInputComponent(componentJson) {
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

function getArrayFromComponentPath(pathStr) {
  if (!pathStr || !_lodash.default.isString(pathStr)) {
    if (!_lodash.default.isArray(pathStr)) {
      return [pathStr];
    }

    return pathStr;
  }

  return pathStr.replace(/[[\]]/g, '.').replace(/\.\./g, '.').replace(/(^\.)|(\.$)/g, '').split('.').map(function (part) {
    return _lodash.default.defaultTo(_lodash.default.toNumber(part), part);
  });
}

function getStringFromComponentPath(path) {
  if (!_lodash.default.isArray(path)) {
    return path;
  }

  var strPath = '';
  path.forEach(function (part, i) {
    if (_lodash.default.isNumber(part)) {
      strPath += "[".concat(part, "]");
    } else {
      strPath += i === 0 ? part : ".".concat(part);
    }
  });
  return strPath;
}

function round(number, precision) {
  if (_lodash.default.isNumber(number)) {
    return number.toFixed(precision);
  }

  return number;
}
/**
 * Check for Internet Explorer browser version
 *
 * @return {(number|null)}
 */


function getIEBrowserVersion() {
  if (typeof document === 'undefined' || !('documentMode' in document)) {
    return null;
  }

  return document['documentMode'];
}
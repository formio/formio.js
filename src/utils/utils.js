/* global jQuery */

import _ from 'lodash';
import jsonLogic from 'json-logic-js';
import moment from 'moment-timezone/moment-timezone';
import jtz from 'jstimezonedetect';
import { lodashOperators } from './jsonlogic/operators';
import dompurify from 'dompurify';
import { getValue } from './formUtils';
import { Evaluator } from './Evaluator';
import ConditionOperators from './conditionOperators';
const interpolate = Evaluator.interpolate;

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

export { jsonLogic, moment, ConditionOperators };

/**
 * Sets the path to the component and parent schema.
 * @param {import('@formio/core').Component} component - The component to set the path for.
 */
function setPathToComponentAndPerentSchema(component) {
  component.path = getComponentPath(component);
  const dataParent = getDataParentComponent(component);
  if (dataParent && typeof dataParent === 'object') {
    dataParent.path = getComponentPath(dataParent);
  }
}

/**
 * Evaluate a method.
 * @param {Function|string|object} func - The function to evaluate.
 * @param {*} args - A map of arguments to pass to the function.
 * @param {string} ret - The name of the "return" variable in the script.
 * @param {boolean} interpolate - True if the script should be interpolated before being executed.
 * @param {import('@formio/core').EvaluatorOptions} options - The evaluator options.
 * @returns {*} - The result of the evaluation.
 */
export function evaluate(func, args, ret, interpolate, options = {}) {
  return Evaluator.evaluate(func, args, ret, interpolate, undefined, options);
}

/**
 * Returns a random compoennt ID.
 * @returns {string} - A random component ID.
 */
export function getRandomComponentId() {
  return `e${Math.random().toString(36).substring(7)}`;
}

/**
 * Get a property value of an element.
 * @param {CSSStyleDeclaration} style - The style element to get the property value from.
 * @param {string} prop - The property to get the value for.
 * @returns {number} - The value of the property.
 */
export function getPropertyValue(style, prop) {
  let value = style.getPropertyValue(prop);
  value = value ? value.replace(/[^0-9.]/g, '') : '0';
  return parseFloat(value);
}

/**
 * Get an elements bounding rectagle.
 * @param {HTMLElement} element - A DOM element to get the bounding rectangle for.
 * @returns {{x: number, y: number, width: number, height: number}} - The bounding rectangle.
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
 * Get non HTMLElement property in the window object
 * @param {string} property - The window property to fetch the script plugin from.
 * @returns {any | undefined} - The HTML Element property on the window object.
 */
export function getScriptPlugin(property) {
  const obj = window[property];
  if (
    typeof HTMLElement === 'object' ? obj instanceof HTMLElement : //DOM2
      obj && typeof obj === 'object' && true && obj.nodeType === 1 && typeof obj.nodeName === 'string'
  ) {
    return undefined;
  }
  return obj;
}

/**
 * Determines the boolean value of a setting.
 * @param {string|boolean} value - A string or boolean value to convert to boolean.
 * @returns {boolean} - The boolean value of the setting.
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
 * @param {string} text - The text to check if it is a mongoID.
 * @returns {boolean} - TRUE if the text is a mongoID; FALSE otherwise.
 */
export function isMongoId(text) {
  return !!text.toString().match(/^[0-9a-fA-F]{24}$/);
}

/**
 * Checks the calculated value for a provided component and data.
 * @param {import('@formio/core').Component} component - The component to check for the calculated value.
 * @param {import('@formio/core').Submission} submission - A submission object.
 * @param {*} rowData - The contextual row data for the component.
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
 * @param {import('@formio/core').Component} component - The component to check for the conditional.
 * @param {import('@formio/core').SimpleConditional} condition - The condition to check.
 * @param {*} row - The row data for the component.
 * @param {*} data - The full submission data.
 * @param {import('../../src/components/_classes/component/Component').Component} instance - The instance of the component.
 * @returns {boolean} - TRUE if the condition is true; FALSE otherwise.
 */

function getConditionalPathsRecursive(conditionPaths, data) {
  let currentGlobalIndex = 0;
  const conditionalPathsArray = [];

  const getConditionalPaths = (data, currentPath = '', localIndex = 0) => {
    currentPath = currentPath.replace(/^\.+|\.+$/g, '');
    const currentLocalIndex = localIndex;
    const currentData = _.get(data, currentPath);

    if (Array.isArray(currentData) && currentData.filter(Boolean).length > 0) {
      if (currentData.some(element => typeof element !== 'object')) {
        return;
      }

      const hasInnerDataArray = currentData.find(x => Array.isArray(x[conditionPaths[currentLocalIndex]]));

      if (hasInnerDataArray) {
        currentData.forEach((_, indexOutside) => {
          const innerCompDataPath = `${currentPath}[${indexOutside}].${conditionPaths[currentLocalIndex]}`;
          getConditionalPaths(data, innerCompDataPath, currentLocalIndex + 1);
        });
      }
      else {
        currentData.forEach((x, index) => {
          if (!_.isNil(x[conditionPaths[currentLocalIndex]])) {
            const compDataPath = `${currentPath}[${index}].${conditionPaths[currentLocalIndex]}`;
            conditionalPathsArray.push(compDataPath);
          }
        });
      }
    }
    else {
      if (!conditionPaths[currentGlobalIndex]) {
        return;
      }
      currentGlobalIndex = currentGlobalIndex + 1;
      getConditionalPaths(data, `${currentPath}.${conditionPaths[currentGlobalIndex - 1]}`, currentGlobalIndex);
    }
  };

  getConditionalPaths(data);

  return conditionalPathsArray;
}

 export function checkSimpleConditional(component, condition, row, data, instance) {
  if (condition.when) {
    const value = getComponentActualValue(condition.when, data, row);

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
  else {
    const { conditions = [], conjunction = 'all',  show = true } = condition;

    if (!conditions.length) {
      return true;
    }

    const conditionsResult = _.map(conditions, (cond) => {
      const { value: comparedValue, operator, component: conditionComponentPath } = cond;
      if (!conditionComponentPath) {
        return true;
      }

      const splittedConditionPath = conditionComponentPath.split('.');

      const conditionalPaths = instance?.parent?.type === 'datagrid' || instance?.parent?.type === 'editgrid'  ? [] : getConditionalPathsRecursive(splittedConditionPath, data);

      if (conditionalPaths.length>0) {
        return conditionalPaths.map((path) => {
          const value = getComponentActualValue(path, data, row);

          const ConditionOperator = ConditionOperators[operator];
          return ConditionOperator
            ? new ConditionOperator().getResult({ value, comparedValue, instance, component, conditionComponentPath })
            : true;
        });
      }
      else {
        const value = getComponentActualValue(conditionComponentPath, data, row);
        const СonditionOperator = ConditionOperators[operator];
        return СonditionOperator
          ? new СonditionOperator().getResult({ value, comparedValue, instance, component, conditionComponentPath })
          : true;
      }
    });

    let result = false;

    switch (conjunction) {
      case 'any':
        result = _.some(conditionsResult.flat(), res => !!res);
        break;
      default:
        result = _.every(conditionsResult.flat(), res => !!res);
    }

    return show ? result : !result;
  }
}

/**
 * Returns a components normalized value.
 * @param {string} compPath - The full path to the component.
 * @param {*} data - The data object to get the value from.
 * @param {*} row - The contextual row data for the component.
 * @returns {*} - The normalized value of the component.
 */
export function getComponentActualValue(compPath, data, row) {
  let value = null;

  if (row) {
    value = getValue({ data: row }, compPath);
  }
  if (data && _.isNil(value)) {
    value = getValue({ data }, compPath);
  }
  // FOR-400 - Fix issue where falsey values were being evaluated as show=true
  if (_.isNil(value) || (_.isObject(value) && _.isEmpty(value))) {
    value = '';
  }
  return value;
}

/**
 * Check custom javascript conditional.
 * @param {import('@formio/core').Component} component - The component to check for the conditional.
 * @param {string} custom - The custom conditional string to evaluate.
 * @param {*} row - The row data for the component.
 * @param {*} data - The full submission data.
 * @param {import('@formio/core').Form} form - The form object.
 * @param {string} variable - The variable name for the result of the custom conditional.
 * @param {*} onError - A custom return if there is an error or the value is null from the evaluation.
 * @param {import('../../src/components/_classes/component/Component').Component} instance - The component instance.
 * @returns {*} - The result of the evaulation.
 */
export function checkCustomConditional(component, custom, row, data, form, variable, onError, instance) {
  if (typeof custom === 'string') {
    custom = `var ${variable} = true; ${custom}; return ${variable};`;
  }
  const value = (instance && instance.evaluate) ?
    instance.evaluate(custom, { row, data, form }) :
    evaluate(custom, { row, data, form });
  if (value === null) {
    return onError;
  }
  return value;
}

/**
 * Check a component for JSON conditionals.
 * @param {import('@formio/core').Component} component - The component 
 * @param {import('@formio/core').JSONConditional} json - The json conditional to check.
 * @param {*} row - The contextual row data for the component.
 * @param {*} data - The full submission data.
 * @param {import('@formio/core').Form} form - The Form JSON of the form.
 * @param {*} onError - Custom return value if there is an error.
 * @returns {boolean} - TRUE if the condition is true; FALSE otherwise.
 */
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
 * Returns the contextual row data for a component.
 * @param {import('@formio/core').Component} component - The component to get the row data for.
 * @param {*} row - The row data for the component.
 * @param {import('../../src/components/_classes/component/Component').Component} instance - The component instance.
 * @param {*} conditional - The component conditional.
 * @returns {*} - The contextual row data for the component.
 */
function getRow(component, row, instance, conditional) {
  const condition = conditional || component.conditional;
  // If no component's instance passed (happens only in 6.x server), calculate its path based on the schema
  if (!instance) {
    instance = _.cloneDeep(component);
    setPathToComponentAndPerentSchema(instance);
  }
  const dataParent = getDataParentComponent(instance);
  const parentPath = dataParent ? getComponentPath(dataParent) : null;
  const isTriggerCondtionComponentPath = condition.when || !condition.conditions
    ? condition.when?.startsWith(parentPath)
    : _.some(condition.conditions, cond => cond.component.startsWith(parentPath));

  if (dataParent && isTriggerCondtionComponentPath) {
    const newRow = {};
    _.set(newRow, parentPath, row);
    row = newRow;
  }

  return row;
}

/**
 * Checks the conditions for a provided component and data.
 * @param {import('@formio/core').Component} component - The component to check for the condition.
 * @param {*} row - The data within a row
 * @param {*} data - The full submission data.
 * @param {import('@formio/core').Form} form - The form object.
 * @param {import('../../src/components/_classes/component/Component').Component} instance - The component instance.
 * @returns {boolean} - TRUE if the condition is true; FALSE otherwise.
 */
export function checkCondition(component, row, data, form, instance) {
  const { customConditional, conditional } = component;
  if (customConditional) {
    return checkCustomConditional(component, customConditional, row, data, form, 'show', true, instance);
  }
  else if (conditional && (conditional.when || _.some(conditional.conditions || [], condition => condition.component && condition.operator))) {
    row = getRow(component, row, instance);
    return checkSimpleConditional(component, conditional, row, data, instance);
  }
  else if (conditional && conditional.json) {
    return checkJsonConditional(component, conditional.json, row, data, form, true);
  }

  // Default to show.
  return true;
}

/**
 * Test a trigger on a component.
 * @param {import('@formio/core').Component} component - The component to test the trigger against.
 * @param {import('@formio/core').LogicTrigger} trigger - The trigger configuration.
 * @param {import('@formio/core').DataObject} row - The contextual row data.
 * @param {import('@formio/core').DataObject} data - The root data object.
 * @param {import('@formio/core').Form} form - The form object.
 * @param {any} instance - The component that is performing the trigger.
 * @returns {boolean} - TRUE if the trigger should fire; FALSE otherwise.
 */
export function checkTrigger(component, trigger, row, data, form, instance) {
  // If trigger is empty, don't fire it
  if (!trigger || !trigger[trigger.type]) {
    return false;
  }

  switch (trigger.type) {
    case 'simple':
      row = getRow(component, row, instance, trigger.simple);
      return checkSimpleConditional(component, trigger.simple, row, data, instance);
    case 'javascript':
      return checkCustomConditional(component, trigger.javascript, row, data, form, 'result', false, instance);
    case 'json':
      return checkJsonConditional(component, trigger.json, row, data, form, false);
  }
  // If none of the types matched, don't fire the trigger.
  return false;
}

/**
 * Sets a property on a component via an executed Logic action.
 * @param {import('@formio/core').Component} component - The component to set the property on.
 * @param {import('@formio/core').LogicAction} action - The action to perform on the component.
 * @param {string} result - The name of the variable in the evaulation to use as the result.
 * @param {import('@formio/core').DataObject} row - The contextual row data.
 * @param {import('@formio/core').DataObject} data - The full submission data.
 * @param {any} instance - The component instance.
 * @returns {import('@formio/core').Component} - The modified component.
 */
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
 * Removes HTML tags from string e.g. <div>Hello World</div> => Hello World
 * @param {string} str - The string to remove HTML tags from.
 * @returns {string} - The string without HTML tags.
 */
export function removeHTML(str) {
  const doc = new window.DOMParser().parseFromString(str, 'text/html');
  return (doc.body.textContent || '').trim();
}

/**
 * Unescape HTML characters like &lt, &gt, &amp and etc.
 * @param {string} str - The string to unescape.
 * @returns {string} - The unescaped string.
 */
export function unescapeHTML(str) {
  if (typeof window === 'undefined' || !('DOMParser' in window)) {
    return str;
  }
  const elem = document.createElement('textarea');
  elem.innerHTML = str;
  return elem.value;
}

/**
 * Make HTML element from string
 * @param {string} str - The string to convert to an HTML element.
 * @param {string} selector - The selector to use to get the element once it is created.
 * @returns {HTMLElement} - The HTML element that was created.
 */
export function convertStringToHTMLElement(str, selector) {
  const doc = new window.DOMParser().parseFromString(str, 'text/html');
  return doc.body.querySelector(selector);
}

/**
 * Make a filename guaranteed to be unique.
 * @param {string} name - The original name of the file.
 * @param {string} template - The template to use for the unique name.
 * @param {object} evalContext - The context to use for the evaluation.
 * @returns {string} - A unique filename.
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

/**
 * Returns a GUID
 * @returns {string} - A GUID.
 */
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
 * @param {string|Date} date - The date to translate.
 * @returns {(null|Date)} - The translated date.
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

/**
 * Returns true if the date is a valid date. False otherwise.
 * @param {Date|string} date - The date to check for validity.
 * @returns {boolean} - TRUE if the date is valid; FALSE otherwise.
 */
export function isValidDate(date) {
  return _.isDate(date) && !_.isNaN(date.getDate());
}

/**
 * Get the current timezone string.
 * @returns {string} - The current timezone.
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
 * @param {Date} date - The date to offset.
 * @param {string} timezone - The timezone to offset the date to.
 * @returns {Date} - The offset date.
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
 * @returns {boolean} - TRUE if the zones are loaded; FALSE otherwise.
 */
export function zonesLoaded() {
  return moment.zonesLoaded;
}

/**
 * Returns if we should load the zones.
 * @param {string} timezone - The timezone to check if we should load the zones.
 * @returns {boolean} - TRUE if we should load the zones; FALSE otherwise.
 */
export function shouldLoadZones(timezone) {
  if (timezone === currentTimezone() || timezone === 'UTC') {
    return false;
  }
  return true;
}

/**
 * Externally load the timezone data.
 * @param {string} url - The URL to load the timezone data from.
 * @param {string} timezone - The timezone to load.
 * @returns {Promise<any> | *} - Resolves when the zones for this timezone are loaded.
 */
export function loadZones(url, timezone) {
  if (timezone && !shouldLoadZones(timezone)) {
    // Return non-resolving promise.
    return new Promise(_.noop);
  }

  if (moment.zonesPromise) {
    return moment.zonesPromise;
  }
  return moment.zonesPromise = fetch(url)
  .then(resp => resp.json().then(zones => {
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
 * @param {string|Date} value - The value to convert into a moment date.
 * @param {string} format - The format to convert the date to.
 * @param {string} timezone - The timezone to convert the date to.
 * @returns {Date} - The moment date object.
 */
export function momentDate(value, format, timezone) {
  const momentDate = moment(value);
  if (!timezone) {
    return momentDate;
  }
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
 * @param {string} timezonesUrl - The URL to load the timezone data from.
 * @param {string|Date} value - The value to format.
 * @param {string} format - The format to format the date to.
 * @param {string} timezone - The timezone to format the date to.
 * @param {string} flatPickrInputFormat - The format to use for flatpickr input.
 * @returns {string} - The formatted date.
 */
export function formatDate(timezonesUrl, value, format, timezone, flatPickrInputFormat) {
  const momentDate = moment(value, flatPickrInputFormat || undefined);
  if (timezone === currentTimezone()) {
    // See if our format contains a "z" timezone character.
    if (format.match(/\s(z$|z\s)/)) {
      loadZones(timezonesUrl);
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
  loadZones(timezonesUrl);
  if (moment.zonesLoaded && timezone) {
    return momentDate.tz(timezone).format(`${convertFormatToMoment(format)} z`);
  }
  else {
    return momentDate.format(convertFormatToMoment(format));
  }
}

/**
 * Pass a format function to format within a timezone.
 * @param {string} timezonesUrl - The URL to load the timezone data from.
 * @param {Function} formatFn - The format function to use.
 * @param {Date|string} date - The date to format.
 * @param {string} format - The format to format the date to.
 * @param {string} timezone - The timezone to format the date to.
 * @returns {string} - The formatted date.
 */
export function formatOffset(timezonesUrl, formatFn, date, format, timezone) {
  if (timezone === currentTimezone()) {
    return formatFn(date, format);
  }
  if (timezone === 'UTC') {
    return `${formatFn(offsetDate(date, 'UTC').date, format)} UTC`;
  }

  // Load the zones since we need timezone information.
  loadZones(timezonesUrl);
  if (moment.zonesLoaded) {
    const offset = offsetDate(date, timezone);
    return `${formatFn(offset.date, format)} ${offset.abbr}`;
  }
  else {
    return formatFn(date, format);
  }
}

/**
 * Returns the local date format information.
 * @param {Intl.LocalesArgument} locale - The locale to get the date format for.
 * @returns {object} - The local date format information.
 */
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
 * @param {string} format - The format to convert.
 * @returns {string} - The converted format.
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
 * @param {string} format - The format to convert.
 * @returns {string} - The converted format.
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

/**
 * Convert the format from the angular-datepicker module to mask format.
 * @param {string} format - The format to convert.
 * @returns {string} - The converted format.
 */
export function convertFormatToMask(format) {
  return format
  // Long month replacement.
    .replace(/M{4}/g, 'MM')
    // Initial short month conversion.
    .replace(/M{3}/g, '***')
    // Short month conversion if input as text.
    .replace(/e/g, 'Q')
    // Month number conversion.
    .replace(/W/g, '99')
    // Year conversion.
    .replace(/[ydhmswHMG]/g, '9')
    // AM/PM conversion.
    .replace(/a/g, 'AA');
}

/**
 * Returns an input mask that is compatible with the input mask library.
 * @param {string} mask - The Form.io input mask.
 * @param {string} placeholderChar - Char which is used as a placeholder.
 * @returns {Array} - The input mask for the mask library.
 */
export function getInputMask(mask, placeholderChar) {
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
      // If char which is used inside mask placeholder was used in the mask, replace it with space to prevent errors
      case placeholderChar:
        maskArray.numeric = false;
        maskArray.push(' ');
        break;
      default:
        maskArray.numeric = false;
        maskArray.push(mask[i]);
        break;
    }
  }
  return maskArray;
}

/**
 * Unmasks a value using the provided mask and placeholder characters.
 * @param {string} value - The value to unmask.
 * @param {string} mask - The mask to use for unmasking.
 * @param {string} placeholderChar - The placeholder character to use for unmasking.
 * @returns {string} - The unmasked value.
 */
export function unmaskValue(value, mask, placeholderChar) {
  if (!mask || !value || value.length > mask.length) {
    return value;
  }

  let unmaskedValue = value.split('');

  for (let i = 0; i < mask.length; i++) {
    const char = value[i] || '';
    const charPart = mask[i];

    if (!_.isRegExp(charPart) && char === charPart) {
      unmaskedValue[i] = '';
    }
  }

  unmaskedValue = unmaskedValue.join('').replace(placeholderChar, '');

  return unmaskedValue;
}

/**
 * Returns true if the value matches the input mask format.
 * @param {string} value - The value to check.
 * @param {string} inputMask - The input mask to check against.
 * @returns {boolean} - TRUE if the value matches the input mask; FALSE otherwise.
 */
export function matchInputMask(value, inputMask) {
  if (!inputMask) {
    return true;
  }

  // If value is longer than mask, it isn't valid.
  if (value.length > inputMask.length) {
    return false;
  }

  for (let i = 0; i < inputMask.length; i++) {
    const char = value[i] || '';
    const charPart = inputMask[i];

    if (!(_.isRegExp(charPart) && charPart.test(char) || charPart === char)) {
      return false;
    }
  }

  return true;
}

/**
 * Returns the number separators (i.e. 1,000) for the provided language.
 * @param {string} lang - The language code to get the number separators for.
 * @returns {{delimiter: string, decimalSeparator: string}} - The number separators.
 */
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

/**
 * Returns the number for the maximum amount of decimal places for a number.
 * @param {import('@formio/core').Component} component - The component to check for decimal limits.
 * @param {number} defaultLimit - The default limit to use if none is provided in the component.
 * @returns {number} - The number of decimal places allowed.
 */
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

/**
 * Returns the currency affixes for a specific language.
 * @param {object} arg0 - The arguments object.
 * @param {string} arg0.currency - The currency code to get the affixes for.
 * @param {number} arg0.decimalLimit - The number of decimal places to use.
 * @param {string} arg0.decimalSeparator - The decimal separator to use.
 * @param {string} arg0.lang - The language code to use.
 * @returns {{prefix: string, suffix: string}} - The currency affixes.
 */
export function getCurrencyAffixes({
   currency,
   decimalLimit,
   decimalSeparator,
   lang,
 }) {
  // Get the prefix and suffix from the localized string.
  let regex = `(.*)?${(100).toLocaleString(lang)}`;
  if (decimalLimit) {
    regex += `${decimalSeparator === '.' ? '\\.' : decimalSeparator}${(0).toLocaleString(lang)}{${decimalLimit}}`;
  }
  regex += '(.*)?';
  const parts = (100).toLocaleString(lang, {
    style: 'currency',
    currency: currency ? currency : 'USD',
    useGrouping: true,
    maximumFractionDigits: decimalLimit || 0,
    minimumFractionDigits: decimalLimit || 0
  }).replace('.', decimalSeparator).match(new RegExp(regex));
  return {
    prefix: parts?.[1] || '',
    suffix: parts?.[2] || ''
  };
}

/**
 * Fetch the field data provided a component.
 * @param {import('@formio/core').DataObject} data - The data object to fetch the field data from.
 * @param {import('@formio/core').Component} component - The component to fetch the field data for.
 * @returns {*} - The field data.
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
 * @param {Function} fn - Function to delay
 * @param {number} delay - Delay time
 * @param {...any} args - Arguments to pass to the function
 * @returns {*} - Function to cancel the delay
 */
export function delay(fn, delay = 0, ...args) {
  const timer = setTimeout(fn, delay, ...args);

  /**
   *
   */
  function cancel() {
    clearTimeout(timer);
  }

  /**
   * Execute the function early.
   * @returns {*} - The result of the function.
   */
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
 * @param {string} key
 *   Modify the component key to be unique.
 * @returns {string}
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
 * @param {Record<string, string>} map - The map to check for uniqueness.
 * @param {string} base - The base path of the key.
 * @returns {string} - The unique key.
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
 * @param {object} options - The options to check for bootstrap version.
 * @param {string} options.bootstrap - The bootstrap version to use.
 * @returns {number} - The bootstrap version.
 */
export function bootstrapVersion(options) {
  if (options.bootstrap) {
    return options.bootstrap;
  }
  if ((typeof jQuery === 'function') && (typeof jQuery().collapse === 'function')) {
    return parseInt(jQuery.fn.collapse.Constructor.VERSION.split('.')[0], 10);
  }
  if (window.bootstrap && window.bootstrap.Collapse) {
    return parseInt(window.bootstrap.Collapse.VERSION.split('.')[0], 10);
  }
  return 0;
}

/**
 * Retrun provided argument.
 * If argument is a function, returns the result of a function call.
 * @param {Function|any} e - The argument to check if a function and call if so.
 * @returns {any} - Either the result of the function call (e) or e if it is not a function.
 */
export function unfold(e) {
  if (typeof e === 'function') {
    return e();
  }

  return e;
}

/**
 * Map values through unfold and return first non-nil value.
 * @param {Array<T>} collection - The collection to map through unfold.;
 * @returns {T} - The first non-nil value.
 */
export const firstNonNil = _.flow([
  _.partialRight(_.map, unfold),
  _.partialRight(_.find, v => !_.isUndefined(v))
]);

/**
 * Create enclosed state. Returns functions to getting and cycling between states.
 * @param {*} a - initial state.
 * @param {*} b - next state.
 * @returns {Functions[]} -- [get, toggle];
 */
export function withSwitch(a, b) {
  let state = a;
  let next = b;

  /**
   * Returns the state of the switch.
   * @returns {*} - The current state.
   */
  function get() {
    return state;
  }

  /**
   * Toggles the state of the switch.
   */
  function toggle() {
    const prev = state;
    state = next;
    next = prev;
  }

  return [get, toggle];
}

/**
 * Create a function that will call the provided function only the provided limit.
 * @param {Function} callback - The callback to call.
 * @param {object} options - The options to use.
 * @param {number} options.limit - The limit to call the callback.
 * @param {number} options.delay - The delay to wait before resetting the call count.
 * @returns {Function} - The function that will call the callback only the provided limit.
 */
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

/**
 * Returns the components that are provided within an evaluation context.
 * @param {any} context - The evaluation context to get the components from.
 * @param {boolean} excludeNested - Exclude nested components.
 * @param {Array<string>} excludedTypes - The types of components to exclude.
 * @returns {Array} - The components within the evaluation context.
 */
export function getContextComponents(context, excludeNested, excludedTypes = []) {
  const values = [];

  context.utils.eachComponent(context.instance.options.editForm.components, (component, path) => {
    const addToContextComponents = excludeNested ? !component.tree : true;
    if (component.key !== context.data.key && addToContextComponents && !_.includes(excludedTypes, component.type)) {
      values.push({
        label: `${component.label || component.key} (${path})`,
        value: path,
      });
    }
  });

  return values;
}

/**
 * Returns the button components that are within an evaluation context.
 * @param {any} context - The evaluation context to get the components from.
 * @returns {Array} - The button components within the evaluation context.
 */
export function getContextButtons(context) {
  const values = [];

  context.utils.eachComponent(context.instance.options.editForm.components, (component) => {
    if (component.type === 'button') {
      values.push({
        label: `${component.key} (${component.label})`,
        value: component.key,
      });
    }
  });

  return values;
}

// Tags that could be in text, that should be ommited or handled in a special way
const inTextTags = ['#text', 'A', 'B', 'EM', 'I', 'SMALL', 'STRONG', 'SUB', 'SUP', 'INS', 'DEL', 'MARK', 'CODE'];

/**
 * Helper function for 'translateHTMLTemplate'. Translates text value of the passed html element.
 * @param {HTMLElement} elem - The element to translate.
 * @param {Function} translate - The translation function.
 * @returns {string} - Translated element template.
 */
function translateElemValue(elem, translate) {
  if (!elem.innerText) {
    return elem.innerHTML;
  }

  const elemValue = elem.innerText.replace(Evaluator.templateSettings.interpolate, '').replace(/\s\s+/g, ' ').trim();
  const translatedValue = translate(elemValue);

  if (elemValue !== translatedValue) {
    const links = elem.innerHTML.match(/<a[^>]*>(.*?)<\/a>/g);

    if (links && links.length) {
      if (links.length === 1 && links[0].length === elem.innerHTML.length) {
        return elem.innerHTML.replace(elemValue, translatedValue);
      }

      const translatedLinks = links.map(link => {
        const linkElem = document.createElement('a');
        linkElem.innerHTML = link;
        return translateElemValue(linkElem, translate);
      });

      return `${translatedValue} (${translatedLinks.join(', ')})`;
    }
    else {
      return elem.innerText.replace(elemValue, translatedValue);
    }
  }
  else {
    return elem.innerHTML;
  }
}

/**
 * Helper function for 'translateHTMLTemplate'. Goes deep through html tag children and calls function to translate their text values.
 * @param {HTMLElement} tag - The tag to translate.
 * @param {Function} translate - The translation function.
 * @returns {void}
 */
function translateDeepTag(tag, translate) {
  const children = tag.children.length && [...tag.children];
  const shouldTranslateEntireContent = children && children.every(child =>
    child.children.length === 0
    && inTextTags.some(tag => child.nodeName === tag)
  );

  if (!children || shouldTranslateEntireContent) {
    tag.innerHTML = translateElemValue(tag, translate);
  }
  else {
    children.forEach(child => translateDeepTag(child, translate));
  }
}

/**
 * Translates text values in html template.
 * @param {string} template - The template to translate.
 * @param {Function} translate - The translation function.
 * @returns {string} - Html template with translated values.
 */
export function translateHTMLTemplate(template, translate) {
  const isHTML = /<[^>]*>/.test(template);

  if (!isHTML) {
    return translate(template);
  }

  const tempElem = document.createElement('div');
  tempElem.innerHTML = template;

  if (tempElem.innerText && tempElem.children.length) {
    translateDeepTag(tempElem, translate);
    return tempElem.innerHTML;
  }

  return template;
}

/**
 * Sanitize an html string.
 * @param {string} string - The string to sanitize.
 * @param {any} options - The options to use for sanitization.
 * @returns {string} - The sanitized html string.
 */
export function sanitize(string, options) {
  if (typeof dompurify.sanitize !== 'function') {
    return string;
  }
  // Dompurify configuration
  const sanitizeOptions = {
    ADD_ATTR: ['ref', 'target'],
    USE_PROFILES: { html: true }
  };
  // Use profiles
  if (options.sanitizeConfig && options.sanitizeConfig.useProfiles) {
    Object.keys(options.sanitizeConfig.useProfiles).forEach(key => {
      sanitizeOptions.USE_PROFILES[key] = options.sanitizeConfig.useProfiles[key];
    });
  }
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
    const allowedUriRegex = options.sanitizeConfig.allowedUriRegex;
    sanitizeOptions.ALLOWED_URI_REGEXP = _.isString(allowedUriRegex) ? new RegExp(allowedUriRegex) : allowedUriRegex;
  }
  // Allow to extend the existing array of elements that are safe for URI-like values
  if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.addUriSafeAttr) && options.sanitizeConfig.addUriSafeAttr.length > 0) {
    sanitizeOptions.ADD_URI_SAFE_ATTR = options.sanitizeConfig.addUriSafeAttr;
  }
  return dompurify.sanitize(string, sanitizeOptions);
}

/**
 * Fast cloneDeep for JSON objects only.
 * @param {any} obj - The object to perform a fast clone deep against.
 * @returns {any} - The cloned object.
 */
export function fastCloneDeep(obj) {
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

export { Evaluator, interpolate };

/**
 * Returns if the component is an input component.
 * @param {import('@formio/core').Component} componentJson - The JSON of a component.
 * @returns {bool} - TRUE if the component is an input component; FALSE otherwise.
 */
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

/**
 * Takes a component path, and returns a component path array.
 * @param {string} pathStr - The path string to convert to an array.
 * @returns {Arryay<number>} - The array of paths.
 */
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

/**
 * Returns true if the component is a child of the parent.
 * @param {any} child - The child component to check.
 * @param {any} parent - The parent component to check.
 * @returns {boolean} - TRUE if the child is a child of the parent; FALSE otherwise.
 */
export function isChildOf(child, parent) {
  while (child && child.parent) {
    if (child.parent === parent) {
      return true;
    }
    child = child.parent;
  }
  return false;
}

/**
 * Takes an array of component path indexes, and returns a string version of that array.
 * @param {Array<number>} path - The path array to convert to a string.
 * @returns {string} - The string version of the path.
 */
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

/**
 * Takes a number and rounds it to the provided precision amount.
 * @param {number} number - The number to round.
 * @param {number} precision - The precision to round the number to.
 * @returns {string} - The rounded number.
 */
export function round(number, precision) {
  if (_.isNumber(number)) {
    return number.toFixed(precision);
  }
  return number.toString();
}

/**
 * Check for Internet Explorer browser version
 * @returns {(number|null)} - The IE browser version or null if not IE
 */
export function getIEBrowserVersion() {
  const { ie, version } = getBrowserInfo();

  return ie ? version : null;
}

/**
 * Get browser name and version (modified from 'jquery-browser-plugin')
 * @returns {object} -- {{browser name, version, isWebkit?}}
 * Possible browser names: chrome, safari, ie, edge, opera, mozilla, yabrowser
 */
export function getBrowserInfo() {
  const browser = {};

  if (typeof window === 'undefined') {
    return browser;
  }

  const ua = window.navigator.userAgent.toLowerCase();
  const match = /(edge|edg)\/([\w.]+)/.exec(ua) ||
                /(opr)[/]([\w.]+)/.exec(ua) ||
                /(yabrowser)[ /]([\w.]+)/.exec(ua) ||
                /(chrome)[ /]([\w.]+)/.exec(ua) ||
                /(iemobile)[/]([\w.]+)/.exec(ua) ||
                /(version)(applewebkit)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.exec(ua) ||
                /(webkit)[ /]([\w.]+).*(version)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.exec(ua) ||
                /(webkit)[ /]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) ||
                ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
                ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                [];
  const matched = {
    browser: match[5] || match[3] || match[1] || '',
    version: match[4] || match[2] || '0'
  };

  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = parseInt(matched.version, 10);
  }
  // Chrome, Opera 15+, Safari and Yandex.Browser are webkit based browsers
  if (browser.chrome || browser.opr || browser.safari || browser.edg || browser.yabrowser) {
    browser.isWebkit = true;
  }
  // IE11 has a new token so we will assign it ie to avoid breaking changes
  if (browser.rv || browser.iemobile) {
    browser.ie = true;
  }
  // Edge has a new token since it became webkit based
  if (browser.edg) {
    browser.edge = true;
  }
  // Opera 15+ are identified as opr
  if (browser.opr) {
    browser.opera = true;
  }

  return browser;
}

/**
 * Takes a component path, which may include array indicies (i.e. [0][1]), and returns the compoennt path without the indicies.
 * @param {string} path - The path to remove the indicies from.
 * @returns {string} - The path without the indicies.
 */
export function getComponentPathWithoutIndicies(path = '') {
  return path.replace(/\[\d+\]/, '');
}

/**
 * Returns a path to the component which based on its schema
 * @param {import('@formio/core').Component} component - Component containing link to its parent's schema in the 'parent' property
 * @param {string} path - Path to the component
 * @returns {string} - Path to the component
 */
export function getComponentPath(component, path = '') {
  if (!component || !component.key || component?._form?.display === 'wizard') { // unlike the Webform, the Wizard has the key and it is a duplicate of the panel key
    return path;
  }
  path = component.isInputComponent || component.input === true ? `${component.key}${path ? '.' : ''}${path}` : path;
  return getComponentPath(component.parent, path);
}

/**
 * Returns a parent component of the passed component instance skipping all the Layout components
 * @param {Component} componentInstance - The component to check for the parent.
 * @returns {Component|undefined} - The parent data component.
 */
export function getDataParentComponent(componentInstance) {
  if (!componentInstance) {
    return;
  }
  const { parent } = componentInstance;
  if (parent && (parent.isInputComponent || parent.input)) {
    return parent;
  }
  else {
    return getDataParentComponent(parent);
  }
}

/**
 * Returns whether the value is a promise
 * @param {any} value - The value to check
 * @returns {boolean} - TRUE if the value is a promise; FALSE otherwise
 */
 export function isPromise(value) {
   return value
     && value.then
     && typeof value.then === 'function'
     && Object.prototype.toString.call(value) === '[object Promise]';
 }

/**
 * Determines if the component has a scoping parent in tree (a component which scopes its children and manages its
 * changes by itself, e.g. EditGrid)
 * @param {Component} componentInstance - The component to check for the scoping parent.
 * @param {boolean} firstPass - Whether it is the first pass of the function
 * @returns {boolean|*} - TRUE if the component has a scoping parent; FALSE otherwise
 */
export function isInsideScopingComponent(componentInstance, firstPass = true) {
  if (!firstPass && componentInstance?.hasScopedChildren) {
    return true;
  }
  const dataParent = getDataParentComponent(componentInstance);
  if (dataParent?.hasScopedChildren) {
    return true;
  }
  else if (dataParent?.parent) {
    return isInsideScopingComponent(dataParent.parent, false);
  }
  return false;
}

/**
 * Returns all the focusable elements within the provided dom element.
 * @param {HTMLElement} element - The element to get the focusable elements from.
 * @returns {NodeList<HTMLElement>} - The focusable elements within the provided element.
 */
export function getFocusableElements(element) {
  const focusableSelector =
    `button:not([disabled]), input:not([disabled]), select:not([disabled]),
    textarea:not([disabled]), button:not([disabled]), [href]`;
  return element.querySelectorAll(focusableSelector);
}

// Export lodash to save space with other libraries.
export { _ };

export const componentValueTypes = {
  number: 'number',
  string: 'string',
  boolean: 'boolean',
  array: 'array',
  object: 'object',
  date: 'date',
  any: 'any',
};

/**
 * Returns the saved types for the component
 * @param {import('@formio/core').Component} fullSchema - The component schema
 * @returns {Array<string>|null} - The saved types for the component
 */
export function getComponentSavedTypes(fullSchema) {
  const schema = fullSchema || {};

  if (schema.persistent !== true) {
    return [];
  }

  if (schema.multiple) {
    return [componentValueTypes.array];
  }

  return null;
}

/**
 * Interpolates @formio/core errors so that they are compatible with the renderer
 * @param {Component} component - The component to interpolate the errors for
 * @param {FieldError[]} errors - The errors to interpolate
 * @param {Function} interpolateFn - The interpolation function
 * @returns {[]} - The interpolated errors
 */
export const interpolateErrors = (component, errors, interpolateFn) => {
 return errors.map((error) => {
    error.component = component;
    const { errorKeyOrMessage, context } = error;
    const toInterpolate = component.errors && component.errors[errorKeyOrMessage] ? component.errors[errorKeyOrMessage] : errorKeyOrMessage;
    return { ...error, message: unescapeHTML(interpolateFn(toInterpolate, context)), context: { ...context } };
  });
};

/**
 * Returns the template keys inside the template code.
 * @param {string} template - The template to get the keys from.
 * @returns {Array<string>} - The keys inside the template.
 */
export function getItemTemplateKeys(template) {
  const templateKeys = [];
  if (!template) {
    return templateKeys;
  }
  const keys = template.match(/({{\s*(.*?)\s*}})/g);

  if (keys) {
    keys.forEach((key) => {
      const propKey = key.match(/{{\s*item\.(.*?)\s*}}/);
      if (propKey && propKey.length > 1) {
        templateKeys.push(propKey[1]);
      }
    });
  }

  return templateKeys;
}

/**
 * Returns if the component is a select resource with an object for its value.
 * @param {import('@formio/core').Component} comp - The component to check.
 * @returns {boolean} - TRUE if the component is a select resource with an object for its value; FALSE otherwise.
 */
export function isSelectResourceWithObjectValue(comp = {}) {
  const { reference, dataSrc, valueProperty } = comp;
  return reference || (dataSrc === 'resource' && (!valueProperty || valueProperty === 'data'));
}

import _ from 'lodash';
import jsonLogic from 'json-logic-js';
import moment from 'moment';
import {lodashOperators} from './jsonlogic/operators';

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

export {jsonLogic};

/**
 * Evaluate a method.
 *
 * @param func
 * @param args
 * @return {*}
 */
export function evaluate(func, args, ret, tokenize) {
  let returnVal = null;
  const component = (args.component && args.component.component) ? args.component.component : {key: 'unknown'};
  if (!args.form && args.instance) {
    args.form = _.get(args.instance, 'root._form', {});
  }
  if (typeof func === 'string') {
    if (ret) {
      func += `;return ${ret}`;
    }
    const params = _.keys(args);

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

    func = new Function(...params, func);
  }
  if (typeof func === 'function') {
    const values = _.values(args);
    try {
      returnVal = func(...values);
    }
    catch (err) {
      returnVal = null;
      console.warn(`An error occured within custom function for ${component.key}`, err);
    }
  }
  else if (typeof func === 'object') {
    try {
      returnVal = jsonLogic.apply(func, args);
    }
    catch (err) {
      returnVal = null;
      console.warn(`An error occured within custom function for ${component.key}`, err);
    }
  }
  else {
    console.warn(`Unknown function type for ${component.key}`);
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
 * Determine if a component is a layout component or not.
 *
 * @param {Object} component
 *   The component to check.
 *
 * @returns {Boolean}
 *   Whether or not the component is a layout component.
 */
export function isLayoutComponent(component) {
  return Boolean(
    (component.columns && Array.isArray(component.columns)) ||
    (component.rows && Array.isArray(component.rows)) ||
    (component.components && Array.isArray(component.components))
  );
}

/**
 * Iterate through each component within a form.
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {Function} fn
 *   The iteration function to invoke for each component.
 * @param {Boolean} includeAll
 *   Whether or not to include layout components.
 * @param {String} path
 *   The current data path of the element. Example: data.user.firstName
 * @param {Object} parent
 *   The parent object.
 */
export function eachComponent(components, fn, includeAll, path, parent) {
  if (!components) return;
  path = path || '';
  components.forEach((component) => {
    const hasColumns = component.columns && Array.isArray(component.columns);
    const hasRows = component.rows && Array.isArray(component.rows);
    const hasComps = component.components && Array.isArray(component.components);
    let noRecurse = false;
    const newPath = component.key ? (path ? (`${path}.${component.key}`) : component.key) : '';

    // Keep track of parent references.
    if (parent) {
      // Ensure we don't create infinite JSON structures.
      component.parent = _.clone(parent);
      delete component.parent.components;
      delete component.parent.componentMap;
      delete component.parent.columns;
      delete component.parent.rows;
    }

    if (includeAll || component.tree || (!hasColumns && !hasRows && !hasComps)) {
      noRecurse = fn(component, newPath);
    }

    const subPath = () => {
      if (
        component.key &&
        (
          ['datagrid', 'container', 'editgrid'].includes(component.type) ||
          component.tree
        )
      ) {
        return newPath;
      }
      else if (
        component.key &&
        component.type === 'form'
      ) {
        return `${newPath}.data`;
      }
      return path;
    };

    if (!noRecurse) {
      if (hasColumns) {
        component.columns.forEach((column) =>
          eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null));
      }

      else if (hasRows) {
        component.rows.forEach((row) => row.forEach((column) =>
          eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null)));
      }

      else if (hasComps) {
        eachComponent(component.components, fn, includeAll, subPath(), parent ? component : null);
      }
    }
  });
}

/**
 * Matches if a component matches the query.
 *
 * @param component
 * @param query
 * @return {boolean}
 */
export function matchComponent(component, query) {
  if (_.isString(query)) {
    return component.key === query;
  }
  else {
    let matches = false;
    _.forOwn(query, (value, key) => {
      matches = (_.get(component, key) === value);
      if (!matches) {
        return false;
      }
    });
    return matches;
  }
}

/**
 * Get a component by its key
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {String|Object} key
 *   The key of the component to get, or a query of the component to search.
 *
 * @returns {Object}
 *   The component that matches the given key, or undefined if not found.
 */
export function getComponent(components, key, includeAll) {
  let result;
  eachComponent(components, (component, path) => {
    if (matchComponent(component, key)) {
      component.path = path;
      result = component;
      return true;
    }
  }, includeAll);
  return result;
}

/**
 * Finds a component provided a query of properties of that component.
 *
 * @param components
 * @param query
 * @return {*}
 */
export function findComponents(components, query) {
  const results = [];
  eachComponent(components, (component, path) => {
    if (matchComponent(component, query)) {
      component.path = path;
      results.push(component);
    }
  }, true);
  return results;
}

/**
 * Flatten the form components for data manipulation.
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {Boolean} includeAll
 *   Whether or not to include layout components.
 *
 * @returns {Object}
 *   The flattened components map.
 */
export function flattenComponents(components, includeAll) {
  const flattened = {};
  eachComponent(components, (component, path) => {
    flattened[path] = component;
  }, includeAll);
  return flattened;
}

/**
 * Returns if this component has a conditional statement.
 *
 * @param component - The component JSON schema.
 *
 * @returns {boolean} - TRUE - This component has a conditional, FALSE - No conditional provided.
 */
export function hasCondition(component) {
  return Boolean(
    (component.customConditional) ||
    (component.conditional && component.conditional.when) ||
    (component.conditional && component.conditional.json)
  );
}

/**
 * Extension of standard #parseFloat(value) function, that also clears input string.
 *
 * @param {any} value
 *   The value to parse.
 *
 * @returns {Number}
 *   Parsed value.
 */
export function parseFloatExt(value) {
  return parseFloat(_.isString(value)
    ? value.replace(/[^\de.+-]/gi, '')
    : value);
}

/**
 * Formats provided value in way how Currency component uses it.
 *
 * @param {any} value
 *   The value to format.
 *
 * @returns {String}
 *   Value formatted for Currency component.
 */
export function formatAsCurrency(value) {
  const parsedValue = parseFloatExt(value);

  if (_.isNaN(parsedValue)) {
    return '';
  }

  const parts = _.round(parsedValue, 2)
    .toString()
    .split('.');
  parts[0] = _.chunk(Array.from(parts[0]).reverse(), 3)
    .reverse()
    .map((part) => part
      .reverse()
      .join(''))
    .join(',');
  parts[1] = _.pad(parts[1], 2, '0');
  return parts.join('.');
}

/**
 * Escapes RegEx characters in provided String value.
 *
 * @param {String} value
 *   String for escaping RegEx characters.
 * @returns {string}
 *   String with escaped RegEx characters.
 */
export function escapeRegExCharacters(value) {
  return value.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
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
      value: [],
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
    value = getValue({data: row}, condition.when);
  }
  if (data && _.isNil(value)) {
    value = getValue({data: data}, condition.when);
  }
  // FOR-400 - Fix issue where falsey values were being evaluated as show=true
  if (_.isNil(value)) {
    value = '';
  }
  // Special check for selectboxes component.
  if (_.isObject(value) && _.has(value, condition.eq)) {
    return value[condition.eq].toString() === condition.show.toString();
  }
  // FOR-179 - Check for multiple values.
  if (Array.isArray(value) && value.includes(condition.eq)) {
    return (condition.show.toString() === 'true');
  }

  return (value.toString() === condition.eq.toString()) === (condition.show.toString() === 'true');
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
  const value = evaluate(custom, {component, row, data, form, instance});
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
      _
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
    return checkSimpleConditional(component, component.conditional, row, data, true);
  }
  else if (component.conditional && component.conditional.json) {
    return checkJsonConditional(component, component.conditional.json, row, data, form);
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

export function setActionProperty(component, action, row, data, result) {
  switch (action.property.type) {
    case 'boolean':
      if (_.get(component, action.property.value, false).toString() !== action.state.toString()) {
        _.set(component, action.property.value, action.state.toString() === 'true');
      }
      break;
    case 'string': {
      const newValue = interpolate(action.text, {
        data,
        row,
        component,
        result
      });
      if (newValue !== _.get(component, action.property.value, '')) {
        _.set(component, action.property.value, newValue);
      }
      break;
    }
  }
  return component;
}

/**
 * Get the value for a component key, in the given submission.
 *
 * @param {Object} submission
 *   A submission object to search.
 * @param {String} key
 *   A for components API key to search for.
 */
export function getValue(submission, key) {
  const search = (data) => {
    if (_.isPlainObject(data)) {
      if (_.has(data, key)) {
        return data[key];
      }

      let value = null;

      _.forOwn(data, (prop) => {
        const result = search(prop);
        if (!_.isNil(result)) {
          value = result;
          return false;
        }
      });

      return value;
    }
    else {
      return null;
    }
  };

  return search(submission.data);
}

/**
 * Interpolate a string and add data replacements.
 *
 * @param string
 * @param data
 * @returns {XML|string|*|void}
 */
export function interpolate(string, data) {
  const templateSettings = {
    evaluate: /\{%(.+?)%\}/g,
    interpolate: /\{\{(.+?)\}\}/g,
    escape: /\{\{\{(.+?)\}\}\}/g
  };
  try {
    return _.template(string, templateSettings)(data);
  }
  catch (err) {
    console.warn('Error interpolating template', err, string, data);
  }
}

/**
 * Make a filename guaranteed to be unique.
 * @param name
 * @returns {string}
 */
export function uniqueName(name) {
  const parts = name.toLowerCase().replace(/[^0-9a-z.]/g, '').split('.');
  const fileName = parts[0];
  const ext = parts.length > 1
    ? `.${_.last(parts)}`
    : '';
  return `${fileName.substr(0, 10)}-${guid()}${ext}`;
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
 * @return {*}
 */
export function getDateSetting(date) {
  if (_.isNil(date) || _.isNaN(date) || date === '') {
    return null;
  }

  let dateSetting = moment(date);
  if (dateSetting.isValid()) {
    return dateSetting.toDate();
  }

  try {
    const value = (new Function('moment', `return ${date};`))(moment);
    dateSetting = moment(value);
  }
  catch (e) {
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
    .replace('jj', 'd')

    // Day in week.
    .replace('EEEE', 'l')
    .replace('EEE', 'D')

    // Hours, minutes, seconds
    .replace('HH', 'H')
    .replace('hh', 'h')
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
    .replace(/a/g, 'A');
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
  return {
    delimiter: formattedNumberString.match(/12(.*)345/)[1],
    decimalSeparator: formattedNumberString.match(/345(.*)67/)[1]
  };
}

export function getNumberDecimalLimit(component) {
  // Determine the decimal limit. Defaults to 20 but can be overridden by validate.step or decimalLimit settings.
  let decimalLimit = 20;
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

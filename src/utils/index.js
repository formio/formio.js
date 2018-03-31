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

const FormioUtils = {
  jsonLogic, // Share

  /**
   * Determines the boolean value of a setting.
   *
   * @param value
   * @return {boolean}
   */
  boolValue(value) {
    if (_.isBoolean(value)) {
      return value;
    }
    else if (_.isString(value)) {
      return (value.toLowerCase() === 'true');
    }
    else {
      return !!value;
    }
  },

  /**
   * Check to see if an ID is a mongoID.
   * @param text
   * @return {Array|{index: number, input: string}|Boolean|*}
   */
  isMongoId(text) {
    return text.toString().match(/^[0-9a-fA-F]{24}$/);
  },

  /**
   * Determine if a component is a layout component or not.
   *
   * @param {Object} component
   *   The component to check.
   *
   * @returns {Boolean}
   *   Whether or not the component is a layout component.
   */
  isLayoutComponent(component) {
    return Boolean(
      (component.columns && Array.isArray(component.columns)) ||
      (component.rows && Array.isArray(component.rows)) ||
      (component.components && Array.isArray(component.components))
    );
  },

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
  eachComponent(components, fn, includeAll, path, parent) {
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
            FormioUtils.eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null));
        }

        else if (hasRows) {
          component.rows.forEach((row) => row.forEach((column) =>
            FormioUtils.eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null)));
        }

        else if (hasComps) {
          FormioUtils.eachComponent(component.components, fn, includeAll, subPath(), parent ? component : null);
        }
      }
    });
  },

  /**
   * Matches if a component matches the query.
   *
   * @param component
   * @param query
   * @return {boolean}
   */
  matchComponent(component, query) {
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
  },

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
  getComponent(components, key, includeAll) {
    let result;
    FormioUtils.eachComponent(components, (component, path) => {
      if (FormioUtils.matchComponent(component, key)) {
        component.path = path;
        result = component;
        return true;
      }
    }, includeAll);
    return result;
  },

  /**
   * Finds a component provided a query of properties of that component.
   *
   * @param components
   * @param query
   * @return {*}
   */
  findComponents(components, query) {
    const results = [];
    FormioUtils.eachComponent(components, (component, path) => {
      if (FormioUtils.matchComponent(component, query)) {
        component.path = path;
        results.push(component);
      }
    }, true);
    return results;
  },

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
  flattenComponents(components, includeAll) {
    const flattened = {};
    FormioUtils.eachComponent(components, (component, path) => {
      flattened[path] = component;
    }, includeAll);
    return flattened;
  },

  /**
   * Returns if this component has a conditional statement.
   *
   * @param component - The component JSON schema.
   *
   * @returns {boolean} - TRUE - This component has a conditional, FALSE - No conditional provided.
   */
  hasCondition(component) {
    return Boolean(
      (component.customConditional) ||
      (component.conditional && component.conditional.when) ||
      (component.conditional && component.conditional.json)
    );
  },

  /**
   * Extension of standard #parseFloat(value) function, that also clears input string.
   *
   * @param {any} value
   *   The value to parse.
   *
   * @returns {Number}
   *   Parsed value.
   */
  parseFloat(value) {
    return parseFloat(_.isString(value)
      ? value.replace(/[^\de.+-]/gi, '')
      : value);
  },

  /**
   * Formats provided value in way how Currency component uses it.
   *
   * @param {any} value
   *   The value to format.
   *
   * @returns {String}
   *   Value formatted for Currency component.
   */
  formatAsCurrency(value) {
    const parsedValue = this.parseFloat(value);

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
  },

  /**
   * Escapes RegEx characters in provided String value.
   *
   * @param {String} value
   *   String for escaping RegEx characters.
   * @returns {string}
   *   String with escaped RegEx characters.
   */
  escapeRegExCharacters(value) {
    return value.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
  },

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
  checkCalculated(component, submission, rowData) {
    // Process calculated value stuff if present.
    if (component.calculateValue) {
      const row = rowData;
      const data = submission ? submission.data : rowData;
      if (_.isString(component.calculateValue)) {
        try {
          _.set(rowData, component.key, (new Function('component', 'data', 'row', 'util', 'moment',
            `var value = [];${component.calculateValue.toString()}; return value;`))(component, data, row, this, moment));
        }
        catch (e) {
          console.warn(`An error occurred calculating a value for ${component.key}`, e);
        }
      }
      else {
        try {
          _.set(rowData, component.key, this.jsonLogic.apply(component.calculateValue, {
            data,
            row,
            _
          }));
        }
        catch (e) {
          console.warn(`An error occurred calculating a value for ${component.key}`, e);
        }
      }
    }
  },

  /**
   * Check if a simple conditional evaluates to true.
   *
   * @param condition
   * @param condition
   * @param row
   * @param data
   * @returns {boolean}
   */
  checkSimpleConditional(component, condition, row, data) {
    let value = null;
    if (row) {
      value = this.getValue({data: row}, condition.when);
    }
    if (data && _.isNil(value)) {
      value = this.getValue({data: data}, condition.when);
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
  },

  /**
   * Check custom javascript conditional.
   *
   * @param component
   * @param custom
   * @param row
   * @param data
   * @returns {*}
   */
  checkCustomConditional(component, custom, row, data, variable, onError) {
    try {
      return (new Function('component', 'data', 'row', 'util', 'moment',
        `var ${variable} = true; ${custom.toString()}; return ${variable};`))(component, data, row, this, moment);
    }
    catch (e) {
      console.warn(`An error occurred in a condition statement for component ${component.key}`, e);
      return onError;
    }
  },

  checkJsonConditional(component, json, row, data, onError) {
    try {
      return jsonLogic.apply(json, {
        data,
        row,
        _
      });
    }
    catch (err) {
      console.warn(`An error occurred in jsonLogic advanced condition for ${component.key}`, err);
      return onError;
    }
  },

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
  checkCondition(component, row, data) {
    if (component.customConditional) {
      return this.checkCustomConditional(component, component.customConditional, row, data, 'show', true);
    }
    else if (component.conditional && component.conditional.when) {
      return this.checkSimpleConditional(component, component.conditional, row, data, true);
    }
    else if (component.conditional && component.conditional.json) {
      return this.checkJsonConditional(component, component.conditional.json, row, data);
    }

    // Default to show.
    return true;
  },

  /**
   * Test a trigger on a component.
   *
   * @param component
   * @param action
   * @param data
   * @param row
   * @returns {mixed}
   */
  checkTrigger(component, trigger, row, data) {
    switch (trigger.type) {
      case 'simple':
        return this.checkSimpleConditional(component, trigger.simple, row, data);
      case 'javascript':
        return this.checkCustomConditional(component, trigger.javascript, row, data, 'result', false);
      case 'json':
        return this.checkJsonConditional(component, trigger.json, row, data, false);
    }
    // If none of the types matched, don't fire the trigger.
    return false;
  },

  setActionProperty(component, action, row, data, result) {
    switch (action.property.type) {
      case 'boolean':
        if (_.get(component, action.property.value, false).toString() !== action.state.toString()) {
          _.set(component, action.property.value, action.state.toString() === 'true');
        }
        break;
      case 'string': {
        const newValue = FormioUtils.interpolate(action.text, {
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
  },

  /**
   * Get the value for a component key, in the given submission.
   *
   * @param {Object} submission
   *   A submission object to search.
   * @param {String} key
   *   A for components API key to search for.
   */
  getValue(submission, key) {
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
  },

  /**
   * Interpolate a string and add data replacements.
   *
   * @param string
   * @param data
   * @returns {XML|string|*|void}
   */
  interpolate(string, data) {
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
  },

  /**
   * Make a filename guaranteed to be unique.
   * @param name
   * @returns {string}
   */
  uniqueName(name) {
    const parts = name.toLowerCase().replace(/[^0-9a-z.]/g, '').split('.');
    const fileName = parts[0];
    const ext = parts.length > 1
      ? `.${_.last(parts)}`
      : '';
    return `${fileName.substr(0, 10)}-${this.guid()}${ext}`;
  },

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random()*16|0;
      const v = c === 'x'
        ? r
        : (r&0x3|0x8);
      return v.toString(16);
    });
  },

  /**
   * Return a translated date setting.
   *
   * @param date
   * @return {*}
   */
  getDateSetting(date) {
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
  },
  isValidDate(date) {
    return _.isDate(date) && !_.isNaN(date.getDate());
  },
  getLocaleDateFormatInfo(locale) {
    const formatInfo = {};

    const day = 21;
    const exampleDate = new Date(2017, 11, day);
    const localDateString = exampleDate.toLocaleDateString(locale);

    formatInfo.dayFirst = localDateString.slice(0, 2) === day.toString();

    return formatInfo;
  },
  /**
   * Convert the format from the angular-datepicker module to flatpickr format.
   * @param format
   * @return {string}
   */
  convertFormatToFlatpickr(format) {
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
  },
  /**
   * Convert the format from the angular-datepicker module to moment format.
   * @param format
   * @return {string}
   */
  convertFormatToMoment(format) {
    return format
      // Year conversion.
      .replace(/y/g, 'Y')
      // Day in month.
      .replace(/d/g, 'D')
      // Day in week.
      .replace(/E/g, 'd')
      // AM/PM marker
      .replace(/a/g, 'A');
  },
  /**
   * Returns an input mask that is compatible with the input mask library.
   * @param {string} mask - The Form.io input mask.
   * @returns {Array} - The input mask for the mask library.
   */
  getInputMask(mask) {
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
  },
  matchInputMask(value, inputMask) {
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
  },
  getNumberSeparators(lang = 'en') {
    const formattedNumberString = (12345.6789).toLocaleString(lang);
    return {
      delimiter: formattedNumberString.match(/12(.*)345/)[1],
      decimalSeparator: formattedNumberString.match(/345(.*)67/)[1]
    };
  },
  getNumberDecimalLimit(component) {
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
  },
  getCurrencyAffixes({
    currency = 'USD',
    decimalLimit,
    decimalSeparator,
    lang,
  }) {
    // Get the prefix and suffix from the localized string.
    const regex = `(.*)?100${decimalSeparator === '.' ? '\\.' : decimalSeparator}0{${decimalLimit}}(.*)?`;
    const parts = (100).toLocaleString(lang, {
      style: 'currency',
      currency,
      useGrouping: true,
      maximumFractionDigits: decimalLimit
    }).replace('.', decimalSeparator).match(new RegExp(regex));
    return {
      prefix: parts[1] || '',
      suffix: parts[2] || ''
    };
  },
};

module.exports = global.FormioUtils = FormioUtils;
export default FormioUtils;

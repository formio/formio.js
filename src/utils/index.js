'use strict';
import _ from 'lodash';
import _clone from 'lodash/clone';
import _get from 'lodash/get';
import _round from 'lodash/round';
import _pad from 'lodash/pad';
import _chunk from 'lodash/chunk';
import _isNaN from 'lodash/isNaN';
import _has from 'lodash/has';
import _last from 'lodash/last';
import _isBoolean from 'lodash/isBoolean';
import _isString from 'lodash/isString';
import _isDate from 'lodash/isDate';
import _isNil from 'lodash/isNil';
import _isObject from 'lodash/isObject';
import _isArray from 'lodash/isArray';
import _isPlainObject from 'lodash/isPlainObject';
import _forOwn from 'lodash/forOwn';
import compile from 'lodash/template';
import jsonLogic from 'json-logic-js';
import { lodashOperators } from './jsonlogic/operators';
import momentModule from 'moment';

// Configure JsonLogic
lodashOperators.forEach((name) => jsonLogic.add_operation(`_${name}`, _[name]));

const FormioUtils = {
  jsonLogic, // Share

  /**
   * Determines the boolean value of a setting.
   *
   * @param value
   * @return {boolean}
   */
  boolValue(value) {
    if (_isBoolean(value)) {
      return value;
    }
    else if (_isString(value)) {
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
        component.parent = _clone(parent);
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
            [ 'datagrid', 'container', 'editgrid' ].includes(component.type) ||
            component.tree
          )
        ) {
          return newPath;
        }
        else if (
          component.key &&
          component.type === 'form'
        ) {
          return `${newPath}.data`
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
    if (_isString(query)) {
      return component.key === query;
    }
    else {
      let matches = false;
      _forOwn(query, (value, key) => {
        matches = (_get(component, key) === value);
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
  getComponent(components, key) {
    let result;
    FormioUtils.eachComponent(components, (component, path) => {
      if (FormioUtils.matchComponent(component, key)) {
        component.path = path;
        result = component;
        return true;
      }
    });
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
    let results = [];
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
    let flattened = {};
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
    return parseFloat(_isString(value)
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

    if (_isNaN(parsedValue)) {
      return '';
    }

    const parts = _round(parsedValue, 2)
      .toString()
      .split('.');
    parts[0] = _chunk(Array.from(parts[0]).reverse(), 3)
      .reverse()
      .map((part) => part
        .reverse()
        .join(''))
      .join(',');
    parts[1] = _pad(parts[1], 2, '0');
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
    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
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
  checkCalculated(component, submission, data) {
    // Process calculated value stuff if present.
    if (component.calculateValue) {
      if (_isString(component.calculateValue)) {
        try {
          const util = this;
          data[component.key] = eval(`(function(data, util) { var value = [];${component.calculateValue.toString()}; return value; })(data, util)`);
        }
        catch (e) {
          console.warn(`An error occurred calculating a value for ${component.key}`, e);
        }
      }
      else {
        try {
          data[component.key] = this.jsonLogic.apply(component.calculateValue, {
            data: submission ? submission.data : data,
            row: data,
            _
          });
        }
        catch (e) {
          console.warn(`An error occurred calculating a value for ${component.key}`, e);
        }
      }
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
      try {
        const script = `(function() { var show = true;${component.customConditional.toString()}; return show; })()`;
        const result = eval(script);
        return result.toString() === 'true';
      }
      catch (e) {
        console.warn(`An error occurred in a custom conditional statement for component ${component.key}`, e);
        return true;
      }
    }
    else if (component.conditional && component.conditional.when) {
      const cond = component.conditional;
      let value = null;
      if (row) {
        value = this.getValue({data: row}, cond.when);
      }
      if (data && _isNil(value)) {
        value = this.getValue({data: data}, cond.when);
      }
      // FOR-400 - Fix issue where falsey values were being evaluated as show=true
      if (_isNil(value)) {
        return false;
      }
      // Special check for selectboxes component.
      if (_isObject(value) && _has(value, cond.eq)) {
        return value[cond.eq].toString() === cond.show.toString();
      }
      // FOR-179 - Check for multiple values.
      if (_isArray(value) && value.includes(cond.eq)) {
        return (cond.show.toString() === 'true');
      }

      return (value.toString() === cond.eq.toString()) === (cond.show.toString() === 'true');
    }
    else if (component.conditional && component.conditional.json) {
      return jsonLogic.apply(component.conditional.json, {
        data,
        row,
        _
      });
    }

    // Default to show.
    return true;
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
      if (_isPlainObject(data)) {
        if (_has(data, key)) {
          return data[key];
        }

        let value = null;

        _forOwn(data, (prop) => {
          const result = search(prop);
          if (!_isNil(result)) {
            value = result;
            return false;
          }
        });

        return value;
      }
      else {
        return null
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
      evaluate: /\{\%(.+?)\%\}/g,
      interpolate: /\{\{(.+?)\}\}/g,
      escape: /\{\{\{(.+?)\}\}\}/g
    };
    try {
      return compile(string, templateSettings)(data);
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
    const parts = name.toLowerCase().replace(/[^0-9a-z\.]/g, '').split('.');
    const fileName = parts[0];
    const ext = parts.length > 1
      ? `.${_last(parts)}`
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
    if (_isNil(date) || _isNaN(date) || date === '') {
      return null;
    }

    let dateSetting = new Date(date);
    if (FormioUtils.isValidDate(dateSetting)) {
      return dateSetting;
    }

    try {
      // Moment constant might be used in eval.
      const moment = momentModule;
      dateSetting = new Date(eval(date));
    }
    catch (e) {
      return null;
    }

    // Ensure this is a date.
    if (!FormioUtils.isValidDate(dateSetting)) {
      dateSetting = null;
    }

    return dateSetting;
  },
  isValidDate(date) {
    return _isDate(date) && !_isNaN(date.getDate());
  }
};

module.exports = global.FormioUtils = FormioUtils;

'use strict';
import _clone from 'lodash/clone';
import _get from 'lodash/get';
import _isString from 'lodash/isString';
import _round from 'lodash/round';
import _pad from 'lodash/pad';
import _chunk from 'lodash/chunk';
import _isNaN from 'lodash/isNaN';
import compile from 'lodash/template';
import jsonLogic from 'json-logic-js';

const FormioUtils = {
  jsonLogic, // Share

  /**
   * Determines the boolean value of a setting.
   *
   * @param value
   * @return {boolean}
   */
  boolValue: function(value) {
    if (typeof value === 'boolean') {
      return value;
    }
    else if (typeof value === 'string') {
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
  isMongoId: function(text) {
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
  isLayoutComponent: function isLayoutComponent(component) {
    return (
      (component.columns && Array.isArray(component.columns)) ||
      (component.rows && Array.isArray(component.rows)) ||
      (component.components && Array.isArray(component.components))
    ) ? true : false;
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
  eachComponent: function eachComponent(components, fn, includeAll, path, parent) {
    if (!components) return;
    path = path || '';
    components.forEach(function(component) {
      var hasColumns = component.columns && Array.isArray(component.columns);
      var hasRows = component.rows && Array.isArray(component.rows);
      var hasComps = component.components && Array.isArray(component.components);
      var noRecurse = false;
      var newPath = component.key ? (path ? (path + '.' + component.key) : component.key) : '';

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

      var subPath = function() {
        if (
          component.key &&
          (
            (component.type === 'datagrid') ||
            (component.type === 'container') ||
            (component.type === 'editgrid') ||
            component.tree
          )
        ) {
          return newPath;
        }
        return path;
      };

      if (!noRecurse) {
        if (hasColumns) {
          component.columns.forEach(function(column) {
            eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null);
          });
        }

        else if (hasRows) {
          component.rows.forEach(function(row) {
            row.forEach((column) => {
              eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null);
            });
          });
        }

        else if (hasComps) {
          eachComponent(component.components, fn, includeAll, subPath(), parent ? component : null);
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
  matchComponent: function(component, query) {
    if (typeof query === 'string') {
      return component.key === query;
    }
    else {
      var matches = false;
      for (var search in query) {
        if (query.hasOwnProperty(search)) {
          matches = (_get(component, search) === query[search]);
          if (!matches) {
            break;
          }
        }
      }
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
  getComponent: function getComponent(components, key) {
    var result;
    FormioUtils.eachComponent(components, function(component, path) {
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
  findComponents: function findComponents(components, query) {
    var results = [];
    FormioUtils.eachComponent(components, function(component, path) {
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
  flattenComponents: function flattenComponents(components, includeAll) {
    var flattened = {};
    FormioUtils.eachComponent(components, function(component, path) {
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
  hasCondition: function(component) {
    return (
      (component.hasOwnProperty('customConditional') && component.customConditional) ||
      (component.hasOwnProperty('conditional') && component.conditional && component.conditional.when) ||
      (component.hasOwnProperty('conditional') && component.conditional && component.conditional.json)
    ) ? true : false;
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
  parseFloat: function(value) {
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
  formatAsCurrency: function(value) {
    const parsedValue = this.parseFloat(value);

    if (_isNaN(parsedValue)) {
      return '';
    }

    const parts = _round(parsedValue, 2)
      .toString()
      .split('.');
    parts[0] = _chunk(Array.from(parts[0]).reverse(), 3)
      .reverse()
      .map(function(part) {
        return part
          .reverse()
          .join('');
      })
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
  escapeRegExCharacters: function(value) {
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
  checkCalculated: function(component, submission, data) {
    // Process calculated value stuff if present.
    if (component.calculateValue) {
      if (typeof component.calculateValue === 'string') {
        try {
          const util = this;
          data[component.key] = eval('(function(data, util) { var value = [];' + component.calculateValue.toString() + '; return value; })(data, util)');
        }
        catch (e) {
          console.warn('An error occurred calculating a value for ' + component.key, e);
        }
      }
      else {
        try {
          data[component.key] = FormioUtils.jsonLogic.apply(component.calculateValue, {
            data: submission ? submission.data : data,
            row: data
          });
        }
        catch (e) {
          console.warn('An error occurred calculating a value for ' + component.key, e);
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
  checkCondition: function(component, row, data) {
    if (component.hasOwnProperty('customConditional') && component.customConditional) {
      try {
        var script = '(function() { var show = true;';
        script += component.customConditional.toString();
        script += '; return show; })()';
        var result = eval(script);
        return result.toString() === 'true';
      }
      catch (e) {
        console.warn('An error occurred in a custom conditional statement for component ' + component.key, e);
        return true;
      }
    }
    else if (component.hasOwnProperty('conditional') && component.conditional && component.conditional.when) {
      var cond = component.conditional;
      var value = null;
      if (row) {
        value = this.getValue({data: row}, cond.when);
      }
      if (data && (value === null || typeof value === 'undefined')) {
        value = this.getValue({data: data}, cond.when);
      }
      // FOR-400 - Fix issue where falsey values were being evaluated as show=true
      if (value === null || typeof value === 'undefined') {
        return false;
      }
      // Special check for selectboxes component.
      if (typeof value === 'object' && value.hasOwnProperty(cond.eq)) {
        return value[cond.eq].toString() === cond.show.toString();
      }
      // FOR-179 - Check for multiple values.
      if (value instanceof Array && value.includes(cond.eq)) {
        return (cond.show.toString() === 'true');
      }

      return (value.toString() === cond.eq.toString()) === (cond.show.toString() === 'true');
    }
    else if (component.hasOwnProperty('conditional') && component.conditional && component.conditional.json) {
      return jsonLogic.apply(component.conditional.json, {
        data: data,
        row: row
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
  getValue: function getValue(submission, key) {
    var data = submission.data || {};

    var search = function search(data) {
      var i;
      var value;

      if (!data) {
        return null;
      }

      if (typeof data === 'object' && !(data instanceof Array) && data !== null) {
        if (data.hasOwnProperty(key)) {
          return data[key];
        }

        var keys = Object.keys(data);
        for (i = 0; i < keys.length; i++) {
          if (typeof data[keys[i]] === 'object') {
            value = search(data[keys[i]]);
          }

          if (value) {
            return value;
          }
        }
      }
    };

    return search(data);
  },

  /**
   * Interpolate a string and add data replacements.
   *
   * @param string
   * @param data
   * @returns {XML|string|*|void}
   */
  interpolate: function(string, data) {
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
  uniqueName: function(name) {
    var parts = name.toLowerCase().replace(/[^0-9a-z\.]/g, '').split('.');
    var fileName = parts[0];
    var ext = '';
    if (parts.length > 1) {
      ext = '.' + parts[(parts.length - 1)];
    }
    return fileName.substr(0, 10) + '-' + this.guid() + ext;
  },

  guid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
};

module.exports = global.FormioUtils = FormioUtils;

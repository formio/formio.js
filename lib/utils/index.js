'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jsonLogicJs = require('json-logic-js');

var _jsonLogicJs2 = _interopRequireDefault(_jsonLogicJs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _operators = require('./jsonlogic/operators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configure JsonLogic
_operators.lodashOperators.forEach(function (name) {
  return _jsonLogicJs2.default.add_operation('_' + name, _lodash2.default[name]);
});

// Retrieve Any Date
_jsonLogicJs2.default.add_operation('getDate', function (date) {
  return (0, _moment2.default)(date).toISOString();
});

// Set Relative Minimum Date
_jsonLogicJs2.default.add_operation('relativeMinDate', function (relativeMinDate) {
  return (0, _moment2.default)().subtract(relativeMinDate, 'days').toISOString();
});

// Set Relative Maximum Date
_jsonLogicJs2.default.add_operation('relativeMaxDate', function (relativeMaxDate) {
  return (0, _moment2.default)().add(relativeMaxDate, 'days').toISOString();
});

var FormioUtils = {
  jsonLogic: _jsonLogicJs2.default, // Share

  /**
   * Determines the boolean value of a setting.
   *
   * @param value
   * @return {boolean}
   */
  boolValue: function boolValue(value) {
    if (_lodash2.default.isBoolean(value)) {
      return value;
    } else if (_lodash2.default.isString(value)) {
      return value.toLowerCase() === 'true';
    } else {
      return !!value;
    }
  },


  /**
   * Check to see if an ID is a mongoID.
   * @param text
   * @return {Array|{index: number, input: string}|Boolean|*}
   */
  isMongoId: function isMongoId(text) {
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
    return Boolean(component.columns && Array.isArray(component.columns) || component.rows && Array.isArray(component.rows) || component.components && Array.isArray(component.components));
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
    components.forEach(function (component) {
      var hasColumns = component.columns && Array.isArray(component.columns);
      var hasRows = component.rows && Array.isArray(component.rows);
      var hasComps = component.components && Array.isArray(component.components);
      var noRecurse = false;
      var newPath = component.key ? path ? path + '.' + component.key : component.key : '';

      // Keep track of parent references.
      if (parent) {
        // Ensure we don't create infinite JSON structures.
        component.parent = _lodash2.default.clone(parent);
        delete component.parent.components;
        delete component.parent.componentMap;
        delete component.parent.columns;
        delete component.parent.rows;
      }

      if (includeAll || component.tree || !hasColumns && !hasRows && !hasComps) {
        noRecurse = fn(component, newPath);
      }

      var subPath = function subPath() {
        if (component.key && (['datagrid', 'container', 'editgrid'].indexOf(component.type) !== -1 || component.tree)) {
          return newPath;
        } else if (component.key && component.type === 'form') {
          return newPath + '.data';
        }
        return path;
      };

      if (!noRecurse) {
        if (hasColumns) {
          component.columns.forEach(function (column) {
            return FormioUtils.eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null);
          });
        } else if (hasRows) {
          component.rows.forEach(function (row) {
            return row.forEach(function (column) {
              return FormioUtils.eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null);
            });
          });
        } else if (hasComps) {
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
  matchComponent: function matchComponent(component, query) {
    if (_lodash2.default.isString(query)) {
      return component.key === query;
    } else {
      var matches = false;
      _lodash2.default.forOwn(query, function (value, key) {
        matches = _lodash2.default.get(component, key) === value;
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
  getComponent: function getComponent(components, key, includeAll) {
    var result = void 0;
    FormioUtils.eachComponent(components, function (component, path) {
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
  findComponents: function findComponents(components, query) {
    var results = [];
    FormioUtils.eachComponent(components, function (component, path) {
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
    FormioUtils.eachComponent(components, function (component, path) {
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
  hasCondition: function hasCondition(component) {
    return Boolean(component.customConditional || component.conditional && component.conditional.when || component.conditional && component.conditional.json);
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
  parseFloat: function (_parseFloat) {
    function parseFloat(_x) {
      return _parseFloat.apply(this, arguments);
    }

    parseFloat.toString = function () {
      return _parseFloat.toString();
    };

    return parseFloat;
  }(function (value) {
    return parseFloat(_lodash2.default.isString(value) ? value.replace(/[^\de.+-]/gi, '') : value);
  }),


  /**
   * Formats provided value in way how Currency component uses it.
   *
   * @param {any} value
   *   The value to format.
   *
   * @returns {String}
   *   Value formatted for Currency component.
   */
  formatAsCurrency: function formatAsCurrency(value) {
    var parsedValue = this.parseFloat(value);

    if (_lodash2.default.isNaN(parsedValue)) {
      return '';
    }

    var parts = _lodash2.default.round(parsedValue, 2).toString().split('.');
    parts[0] = _lodash2.default.chunk(Array.from(parts[0]).reverse(), 3).reverse().map(function (part) {
      return part.reverse().join('');
    }).join(',');
    parts[1] = _lodash2.default.pad(parts[1], 2, '0');
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
  escapeRegExCharacters: function escapeRegExCharacters(value) {
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
  checkCalculated: function checkCalculated(component, submission, rowData) {
    // Process calculated value stuff if present.
    if (component.calculateValue) {
      var row = rowData;
      var data = submission ? submission.data : rowData;
      if (_lodash2.default.isString(component.calculateValue)) {
        try {
          _lodash2.default.set(rowData, component.key, new Function('component', 'data', 'row', 'util', 'moment', 'var value = [];' + component.calculateValue.toString() + '; return value;')(component, data, row, this, _moment2.default));
        } catch (e) {
          console.warn('An error occurred calculating a value for ' + component.key, e);
        }
      } else {
        try {
          _lodash2.default.set(rowData, component.key, this.jsonLogic.apply(component.calculateValue, {
            data: data,
            row: row,
            _: _lodash2.default
          }));
        } catch (e) {
          console.warn('An error occurred calculating a value for ' + component.key, e);
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
  checkSimpleConditional: function checkSimpleConditional(component, condition, row, data) {
    var value = null;
    if (row) {
      value = this.getValue({ data: row }, condition.when);
    }
    if (data && _lodash2.default.isNil(value)) {
      value = this.getValue({ data: data }, condition.when);
    }
    // FOR-400 - Fix issue where falsey values were being evaluated as show=true
    if (_lodash2.default.isNil(value)) {
      value = '';
    }
    // Special check for selectboxes component.
    if (_lodash2.default.isObject(value) && _lodash2.default.has(value, condition.eq)) {
      return value[condition.eq].toString() === condition.show.toString();
    }
    // FOR-179 - Check for multiple values.
    if (Array.isArray(value) && value.indexOf(condition.eq) !== -1) {
      return condition.show.toString() === 'true';
    }

    return value.toString() === condition.eq.toString() === (condition.show.toString() === 'true');
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
  checkCustomConditional: function checkCustomConditional(component, custom, row, data, variable, onError) {
    try {
      return new Function('component', 'data', 'row', 'util', 'moment', 'var ' + variable + ' = true; ' + custom.toString() + '; return ' + variable + ';')(component, data, row, this, _moment2.default);
    } catch (e) {
      console.warn('An error occurred in a condition statement for component ' + component.key, e);
      return onError;
    }
  },
  checkJsonConditional: function checkJsonConditional(component, json, row, data, onError) {
    try {
      return _jsonLogicJs2.default.apply(json, {
        data: data,
        row: row,
        _: _lodash2.default
      });
    } catch (err) {
      console.warn('An error occurred in jsonLogic advanced condition for ' + component.key, err);
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
  checkCondition: function checkCondition(component, row, data) {
    if (component.customConditional) {
      return this.checkCustomConditional(component, component.customConditional, row, data, 'show', true);
    } else if (component.conditional && component.conditional.when) {
      return this.checkSimpleConditional(component, component.conditional, row, data, true);
    } else if (component.conditional && component.conditional.json) {
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
  checkTrigger: function checkTrigger(component, trigger, row, data) {
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
  setActionProperty: function setActionProperty(component, action, row, data, result) {
    switch (action.property.type) {
      case 'boolean':
        if (_lodash2.default.get(component, action.property.value, false).toString() !== action.state.toString()) {
          _lodash2.default.set(component, action.property.value, action.state.toString() === 'true');
        }
        break;
      case 'string':
        {
          var newValue = FormioUtils.interpolate(action.text, {
            data: data,
            row: row,
            component: component,
            result: result
          });
          if (newValue !== _lodash2.default.get(component, action.property.value, '')) {
            _lodash2.default.set(component, action.property.value, newValue);
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
  getValue: function getValue(submission, key) {
    var search = function search(data) {
      if (_lodash2.default.isPlainObject(data)) {
        if (_lodash2.default.has(data, key)) {
          return data[key];
        }

        var value = null;

        _lodash2.default.forOwn(data, function (prop) {
          var result = search(prop);
          if (!_lodash2.default.isNil(result)) {
            value = result;
            return false;
          }
        });

        return value;
      } else {
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
  interpolate: function interpolate(string, data) {
    var templateSettings = {
      evaluate: /\{%(.+?)%\}/g,
      interpolate: /\{\{(.+?)\}\}/g,
      escape: /\{\{\{(.+?)\}\}\}/g
    };
    try {
      return _lodash2.default.template(string, templateSettings)(data);
    } catch (err) {
      console.warn('Error interpolating template', err, string, data);
    }
  },


  /**
   * Make a filename guaranteed to be unique.
   * @param name
   * @returns {string}
   */
  uniqueName: function uniqueName(name) {
    var parts = name.toLowerCase().replace(/[^0-9a-z.]/g, '').split('.');
    var fileName = parts[0];
    var ext = parts.length > 1 ? '.' + _lodash2.default.last(parts) : '';
    return fileName.substr(0, 10) + '-' + this.guid() + ext;
  },
  guid: function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },


  /**
   * Return a translated date setting.
   *
   * @param date
   * @return {*}
   */
  getDateSetting: function getDateSetting(date) {
    if (_lodash2.default.isNil(date) || _lodash2.default.isNaN(date) || date === '') {
      return null;
    }

    var dateSetting = (0, _moment2.default)(date);
    if (dateSetting.isValid()) {
      return dateSetting.toDate();
    }

    try {
      var value = new Function('moment', 'return ' + date + ';')(_moment2.default);
      dateSetting = (0, _moment2.default)(value);
    } catch (e) {
      return null;
    }

    // Ensure this is a date.
    if (!dateSetting.isValid()) {
      return null;
    }

    return dateSetting.toDate();
  },
  isValidDate: function isValidDate(date) {
    return _lodash2.default.isDate(date) && !_lodash2.default.isNaN(date.getDate());
  },
  getLocaleDateFormatInfo: function getLocaleDateFormatInfo(locale) {
    var formatInfo = {};

    var day = 21;
    var exampleDate = new Date(2017, 11, day);
    var localDateString = exampleDate.toLocaleDateString(locale);

    formatInfo.dayFirst = localDateString.slice(0, 2) === day.toString();

    return formatInfo;
  },

  /**
   * Convert the format from the angular-datepicker module to flatpickr format.
   * @param format
   * @return {string}
   */
  convertFormatToFlatpickr: function convertFormatToFlatpickr(format) {
    return format
    // Year conversion.
    .replace(/y/g, 'Y').replace('YYYY', 'Y').replace('YY', 'y')

    // Month conversion.
    .replace('MMMM', 'F').replace(/M/g, 'n').replace('nnn', 'M').replace('nn', 'm')

    // Day in month.
    .replace(/d/g, 'j').replace('jj', 'd')

    // Day in week.
    .replace('EEEE', 'l').replace('EEE', 'D')

    // Hours, minutes, seconds
    .replace('HH', 'H').replace('hh', 'h').replace('mm', 'i').replace('ss', 'S').replace(/a/g, 'K');
  },

  /**
   * Convert the format from the angular-datepicker module to moment format.
   * @param format
   * @return {string}
   */
  convertFormatToMoment: function convertFormatToMoment(format) {
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
  getInputMask: function getInputMask(mask) {
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
          maskArray.push(mask[i]);
          break;
      }
    }
    return maskArray;
  },
  matchInputMask: function matchInputMask(value, inputMask) {
    if (!inputMask) {
      return true;
    }
    for (var i = 0; i < inputMask.length; i++) {
      var char = value[i];
      var charPart = inputMask[i];

      if (!(_lodash2.default.isRegExp(charPart) && charPart.test(char) || charPart === char)) {
        return false;
      }
    }

    return true;
  },
  getNumberSeparators: function getNumberSeparators() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

    var formattedNumberString = 12345.6789.toLocaleString(lang);
    return {
      delimiter: formattedNumberString.match(/12(.*)345/)[1],
      decimalSeparator: formattedNumberString.match(/345(.*)67/)[1]
    };
  },
  getNumberDecimalLimit: function getNumberDecimalLimit(component) {
    // Determine the decimal limit. Defaults to 20 but can be overridden by validate.step or decimalLimit settings.
    var decimalLimit = 20;
    var step = _lodash2.default.get(component, 'validate.step', 'any');

    if (step !== 'any') {
      var parts = step.toString().split('.');
      if (parts.length > 1) {
        decimalLimit = parts[1].length;
      }
    }

    return decimalLimit;
  },
  getCurrencyAffixes: function getCurrencyAffixes(_ref) {
    var _ref$currency = _ref.currency,
        currency = _ref$currency === undefined ? 'USD' : _ref$currency,
        decimalLimit = _ref.decimalLimit,
        decimalSeparator = _ref.decimalSeparator,
        lang = _ref.lang;

    // Get the prefix and suffix from the localized string.
    var regex = '(.*)?100' + (decimalSeparator === '.' ? '\\.' : decimalSeparator) + '0{' + decimalLimit + '}(.*)?';
    var parts = 100 .toLocaleString(lang, {
      style: 'currency',
      currency: currency,
      useGrouping: true,
      maximumFractionDigits: decimalLimit
    }).replace('.', decimalSeparator).match(new RegExp(regex));
    return {
      prefix: parts[1] || '',
      suffix: parts[2] || ''
    };
  }
};

module.exports = global.FormioUtils = FormioUtils;
exports.default = FormioUtils;
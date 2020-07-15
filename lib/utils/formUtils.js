"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLayoutComponent = isLayoutComponent;
exports.eachComponent = eachComponent;
exports.matchComponent = matchComponent;
exports.getComponent = getComponent;
exports.searchComponents = searchComponents;
exports.findComponents = findComponents;
exports.findComponent = findComponent;
exports.removeComponent = removeComponent;
exports.generateFormChange = generateFormChange;
exports.applyFormChanges = applyFormChanges;
exports.flattenComponents = flattenComponents;
exports.hasCondition = hasCondition;
exports.parseFloatExt = parseFloatExt;
exports.formatAsCurrency = formatAsCurrency;
exports.escapeRegExCharacters = escapeRegExCharacters;
exports.getValue = getValue;
exports.getStrings = getStrings;

var _get = _interopRequireDefault(require("lodash/get"));

var _set = _interopRequireDefault(require("lodash/set"));

var _has = _interopRequireDefault(require("lodash/has"));

var _clone = _interopRequireDefault(require("lodash/clone"));

var _forOwn = _interopRequireDefault(require("lodash/forOwn"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isNaN = _interopRequireDefault(require("lodash/isNaN"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _round = _interopRequireDefault(require("lodash/round"));

var _chunk = _interopRequireDefault(require("lodash/chunk"));

var _pad = _interopRequireDefault(require("lodash/pad"));

var _fastJsonPatch = require("fast-json-patch");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determine if a component is a layout component or not.
 *
 * @param {Object} component
 *   The component to check.
 *
 * @returns {Boolean}
 *   Whether or not the component is a layout component.
 */
function isLayoutComponent(component) {
  return Boolean(component.columns && Array.isArray(component.columns) || component.rows && Array.isArray(component.rows) || component.components && Array.isArray(component.components));
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


function eachComponent(components, fn, includeAll, path, parent) {
  if (!components) return;
  path = path || '';
  components.forEach(function (component) {
    if (!component) {
      return;
    }

    var hasColumns = component.columns && Array.isArray(component.columns);
    var hasRows = component.rows && Array.isArray(component.rows);
    var hasComps = component.components && Array.isArray(component.components);
    var noRecurse = false;
    var newPath = component.key ? path ? "".concat(path, ".").concat(component.key) : component.key : ''; // Keep track of parent references.

    if (parent) {
      // Ensure we don't create infinite JSON structures.
      component.parent = (0, _clone.default)(parent);
      delete component.parent.components;
      delete component.parent.componentMap;
      delete component.parent.columns;
      delete component.parent.rows;
    } // there's no need to add other layout components here because we expect that those would either have columns, rows or components


    var layoutTypes = ['htmlelement', 'content'];
    var isLayoutComponent = hasColumns || hasRows || hasComps || layoutTypes.indexOf(component.type) > -1;

    if (includeAll || component.tree || !isLayoutComponent) {
      noRecurse = fn(component, newPath, components);
    }

    var subPath = function subPath() {
      if (component.key && !['panel', 'table', 'well', 'columns', 'fieldset', 'tabs', 'form'].includes(component.type) && (['datagrid', 'container', 'editgrid', 'address'].includes(component.type) || component.tree)) {
        return newPath;
      } else if (component.key && component.type === 'form') {
        return "".concat(newPath, ".data");
      }

      return path;
    };

    if (!noRecurse) {
      if (hasColumns) {
        component.columns.forEach(function (column) {
          return eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null);
        });
      } else if (hasRows) {
        component.rows.forEach(function (row) {
          if (Array.isArray(row)) {
            row.forEach(function (column) {
              return eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null);
            });
          }
        });
      } else if (hasComps) {
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


function matchComponent(component, query) {
  if ((0, _isString.default)(query)) {
    return component.key === query || component.path === query;
  } else {
    var matches = false;
    (0, _forOwn.default)(query, function (value, key) {
      matches = (0, _get.default)(component, key) === value;

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


function getComponent(components, key, includeAll) {
  var result;
  eachComponent(components, function (component, path) {
    if (path === key || component.path === key) {
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


function searchComponents(components, query) {
  var results = [];
  eachComponent(components, function (component) {
    if (matchComponent(component, query)) {
      results.push(component);
    }
  }, true);
  return results;
}
/**
 * Deprecated version of findComponents. Renamed to searchComponents.
 *
 * @param components
 * @param query
 * @returns {*}
 */


function findComponents(components, query) {
  console.warn('formio.js/utils findComponents is deprecated. Use searchComponents instead.');
  return searchComponents(components, query);
}
/**
 * This function will find a component in a form and return the component AND THE PATH to the component in the form.
 * Path to the component is stored as an array of nested components and their indexes.The Path is being filled recursively
 * when you iterating through the nested structure.
 * If the component is not found the callback won't be called and function won't return anything.
 *
 * @param components
 * @param key
 * @param fn
 * @param path
 * @returns {*}
 */


function findComponent(components, key, path, fn) {
  if (!components) return;
  path = path || [];

  if (!key) {
    return fn(components);
  }

  components.forEach(function (component, index) {
    var newPath = path.slice(); // Add an index of the component it iterates through in nested structure

    newPath.push(index);
    if (!component) return;

    if (component.hasOwnProperty('columns') && Array.isArray(component.columns)) {
      newPath.push('columns');
      component.columns.forEach(function (column, index) {
        var colPath = newPath.slice();
        colPath.push(index);
        colPath.push('components');
        findComponent(column.components, key, colPath, fn);
      });
    }

    if (component.hasOwnProperty('rows') && Array.isArray(component.rows)) {
      newPath.push('rows');
      component.rows.forEach(function (row, index) {
        var rowPath = newPath.slice();
        rowPath.push(index);
        row.forEach(function (column, index) {
          var colPath = rowPath.slice();
          colPath.push(index);
          colPath.push('components');
          findComponent(column.components, key, colPath, fn);
        });
      });
    }

    if (component.hasOwnProperty('components') && Array.isArray(component.components)) {
      newPath.push('components');
      findComponent(component.components, key, newPath, fn);
    }

    if (component.key === key) {
      //Final callback if the component is found
      fn(component, newPath, components);
    }
  });
}
/**
 * Remove a component by path.
 *
 * @param components
 * @param path
 */


function removeComponent(components, path) {
  // Using _.unset() leave a null value. Use Array splice instead.
  var index = path.pop();

  if (path.length !== 0) {
    components = (0, _get.default)(components, path);
  }

  components.splice(index, 1);
}

function generateFormChange(type, data) {
  var change;

  switch (type) {
    case 'add':
      change = {
        op: 'add',
        key: data.component.key,
        container: data.parent.key,
        // Parent component
        path: data.path,
        // Path to container within parent component.
        index: data.index,
        // Index of component in parent container.
        component: data.component
      };
      break;

    case 'edit':
      change = {
        op: 'edit',
        key: data.originalComponent.key,
        patches: (0, _fastJsonPatch.compare)(data.originalComponent, data.component)
      }; // Don't save if nothing changed.

      if (!change.patches.length) {
        change = null;
      }

      break;

    case 'remove':
      change = {
        op: 'remove',
        key: data.component.key
      };
      break;
  }

  return change;
}

function applyFormChanges(form, changes) {
  var failed = [];
  changes.forEach(function (change) {
    var found = false;

    switch (change.op) {
      case 'add':
        var newComponent = change.component; // Find the container to set the component in.

        findComponent(form.components, change.container, null, function (parent) {
          if (!change.container) {
            parent = form;
          } // A move will first run an add so remove any existing components with matching key before inserting.


          findComponent(form.components, change.key, null, function (component, path) {
            // If found, use the existing component. (If someone else edited it, the changes would be here)
            newComponent = component;
            removeComponent(form.components, path);
          });
          found = true;
          var container = (0, _get.default)(parent, change.path);
          container.splice(change.index, 0, newComponent);
        });
        break;

      case 'remove':
        findComponent(form.components, change.key, null, function (component, path) {
          found = true;
          var oldComponent = (0, _get.default)(form.components, path);

          if (oldComponent.key !== component.key) {
            path.pop();
          }

          removeComponent(form.components, path);
        });
        break;

      case 'edit':
        findComponent(form.components, change.key, null, function (component, path) {
          found = true;

          try {
            var oldComponent = (0, _get.default)(form.components, path);
            var _newComponent = (0, _fastJsonPatch.applyPatch)(component, change.patches).newDocument;

            if (oldComponent.key !== _newComponent.key) {
              path.pop();
            }

            (0, _set.default)(form.components, path, _newComponent);
          } catch (err) {
            failed.push(change);
          }
        });
        break;

      case 'move':
        break;
    }

    if (!found) {
      failed.push(change);
    }
  });
  return {
    form: form,
    failed: failed
  };
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


function flattenComponents(components, includeAll) {
  var flattened = {};
  eachComponent(components, function (component, path) {
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


function hasCondition(component) {
  return Boolean(component.customConditional || component.conditional && component.conditional.when || component.conditional && component.conditional.json);
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


function parseFloatExt(value) {
  return parseFloat((0, _isString.default)(value) ? value.replace(/[^\de.+-]/gi, '') : value);
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


function formatAsCurrency(value) {
  var parsedValue = parseFloatExt(value);

  if ((0, _isNaN.default)(parsedValue)) {
    return '';
  }

  var parts = (0, _round.default)(parsedValue, 2).toString().split('.');
  parts[0] = (0, _chunk.default)(Array.from(parts[0]).reverse(), 3).reverse().map(function (part) {
    return part.reverse().join('');
  }).join(',');
  parts[1] = (0, _pad.default)(parts[1], 2, '0');
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


function escapeRegExCharacters(value) {
  return value.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}
/**
 * Get the value for a component key, in the given submission.
 *
 * @param {Object} submission
 *   A submission object to search.
 * @param {String} key
 *   A for components API key to search for.
 */


function getValue(submission, key) {
  var search = function search(data) {
    if ((0, _isPlainObject.default)(data)) {
      if ((0, _has.default)(data, key)) {
        return _lodash.default.get(data, key);
      }

      var value = null;
      (0, _forOwn.default)(data, function (prop) {
        var result = search(prop);

        if (!(0, _isNil.default)(result)) {
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
}
/**
 * Iterate over all components in a form and get string values for translation.
 * @param form
 */


function getStrings(form) {
  var properties = ['label', 'title', 'legend', 'tooltip', 'description', 'placeholder', 'prefix', 'suffix', 'errorLabel', 'content', 'html'];
  var strings = [];
  eachComponent(form.components, function (component) {
    properties.forEach(function (property) {
      if (component.hasOwnProperty(property) && component[property]) {
        strings.push({
          key: component.key,
          type: component.type,
          property: property,
          string: component[property]
        });
      }
    });

    if ((!component.dataSrc || component.dataSrc === 'values') && component.hasOwnProperty('values') && Array.isArray(component.values) && component.values.length) {
      component.values.forEach(function (value, index) {
        strings.push({
          key: component.key,
          property: "value[".concat(index, "].label"),
          string: component.values[index].label
        });
      });
    } // Hard coded values from Day component


    if (component.type === 'day') {
      ['day', 'month', 'year', 'Day', 'Month', 'Year', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'].forEach(function (string) {
        strings.push({
          key: component.key,
          property: 'day',
          string: string
        });
      });

      if (component.fields.day.placeholder) {
        strings.push({
          key: component.key,
          property: 'fields.day.placeholder',
          string: component.fields.day.placeholder
        });
      }

      if (component.fields.month.placeholder) {
        strings.push({
          key: component.key,
          property: 'fields.month.placeholder',
          string: component.fields.month.placeholder
        });
      }

      if (component.fields.year.placeholder) {
        strings.push({
          key: component.key,
          property: 'fields.year.placeholder',
          string: component.fields.year.placeholder
        });
      }
    }

    if (component.type === 'editgrid') {
      var string = component.addAnother || 'Add Another';

      if (component.addAnother) {
        strings.push({
          key: component.key,
          property: 'addAnother',
          string: string
        });
      }
    }

    if (component.type === 'select') {
      ['loading...', 'Type to search'].forEach(function (string) {
        strings.push({
          key: component.key,
          property: 'select',
          string: string
        });
      });
    }
  }, true);
  return strings;
}
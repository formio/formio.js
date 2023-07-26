import get from 'lodash/get';
import set from 'lodash/set';
import has from 'lodash/has';
import clone from 'lodash/clone';
import forOwn from 'lodash/forOwn';
import isString from 'lodash/isString';
import isNaN from 'lodash/isNaN';
import isNil from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import round from 'lodash/round';
import chunk from 'lodash/chunk';
import pad from 'lodash/pad';
import { compare, applyPatch } from 'fast-json-patch';
import _ from 'lodash';

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
export function eachComponent(components, fn, includeAll, path, parent, inRecursion) {
  if (!components) return;
  path = path || '';
  if (inRecursion) {
    if (components.noRecurse) {
      delete components.noRecurse;
      return;
    }
    components.noRecurse = true;
  }
  components.forEach((component) => {
    if (!component) {
      return;
    }
    const hasColumns = component.columns && Array.isArray(component.columns);
    const hasRows = component.rows && Array.isArray(component.rows);
    const hasComps = component.components && Array.isArray(component.components);
    let noRecurse = false;
    const newPath = component.key ? (path ? (`${path}.${component.key}`) : component.key) : '';

    // Keep track of parent references.
    if (parent) {
      // Ensure we don't create infinite JSON structures.
      component.parent = clone(parent);
      delete component.parent.components;
      delete component.parent.componentMap;
      delete component.parent.columns;
      delete component.parent.rows;
    }

    // there's no need to add other layout components here because we expect that those would either have columns, rows or components
    const layoutTypes = ['htmlelement', 'content'];
    const isLayoutComponent = hasColumns || hasRows || (hasComps && !component.input) || layoutTypes.indexOf(component.type) > -1;
    if (includeAll || component.tree || !isLayoutComponent) {
      noRecurse = fn(component, newPath, components);
    }

    const subPath = () => {
      if (
        component.key &&
        !['panel', 'table', 'well', 'columns', 'fieldset', 'tabs', 'form'].includes(component.type) &&
        (
          ['datagrid', 'container', 'editgrid', 'address', 'dynamicWizard', 'datatable', 'tagpad'].includes(component.type) ||
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
          eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null), true);
      }

      else if (hasRows) {
        component.rows.forEach((row) => {
          if (Array.isArray(row)) {
            row.forEach((column) =>
              eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null), true);
          }
        });
      }

      else if (hasComps) {
        eachComponent(component.components, fn, includeAll, subPath(), parent ? component : null, true);
      }
    }
  });
  if (components.noRecurse) {
    delete components.noRecurse;
  }
}

/**
 * Matches if a component matches the query.
 *
 * @param component
 * @param query
 * @return {boolean}
 */
export function matchComponent(component, query) {
  if (isString(query)) {
    return (component.key === query) || (component.path === query);
  }
  else {
    let matches = false;
    forOwn(query, (value, key) => {
      matches = (get(component, key) === value);
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
    if ((path === key) || (component.path === key)) {
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
export function searchComponents(components, query) {
  const results = [];
  eachComponent(components, (component) => {
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
export function findComponents(components, query) {
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
export function findComponent(components, key, path, fn) {
  if (!components) return;
  path = path || [];

  if (!key) {
    return fn(components);
  }

  components.forEach(function(component, index) {
    var newPath = path.slice();
    // Add an index of the component it iterates through in nested structure
    newPath.push(index);
    if (!component) return;

    if (component.hasOwnProperty('columns') && Array.isArray(component.columns)) {
      newPath.push('columns');
      component.columns.forEach(function(column, index) {
        var colPath = newPath.slice();
        colPath.push(index);
        colPath.push('components');
        findComponent(column.components, key, colPath, fn);
      });
    }

    if (component.hasOwnProperty('rows') && Array.isArray(component.rows)) {
      newPath.push('rows');
      component.rows.forEach(function(row, index) {
        var rowPath = newPath.slice();
        rowPath.push(index);
        row.forEach(function(column, index) {
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
export function removeComponent(components, path) {
  // Using _.unset() leave a null value. Use Array splice instead.
  var index = path.pop();
  if (path.length !== 0) {
    components = get(components, path);
  }
  components.splice(index, 1);
}

export function generateFormChange(type, data) {
  let change;
  switch (type) {
    case 'add':
      change = {
        op: 'add',
        key: data.component.key,
        container: data.parent.key, // Parent component
        path: data.path, // Path to container within parent component.
        index: data.index, // Index of component in parent container.
        component: data.component
      };
      break;
    case 'edit':
      change = {
        op: 'edit',
        key: data.originalComponent.key,
        patches: compare(data.originalComponent, data.component)
      };

      // Don't save if nothing changed.
      if (!change.patches.length) {
        change = null;
      }
      break;
    case 'remove':
      change = {
        op: 'remove',
        key: data.component.key,
      };
      break;
  }

  return change;
}

export function applyFormChanges(form, changes) {
  const failed = [];
  changes.forEach(function(change) {
    var found = false;
    switch (change.op) {
      case 'add':
        var newComponent = change.component;

        // Find the container to set the component in.
        findComponent(form.components, change.container, null, function(parent) {
          if (!change.container) {
            parent = form;
          }

          // A move will first run an add so remove any existing components with matching key before inserting.
          findComponent(form.components, change.key, null, function(component, path) {
            // If found, use the existing component. (If someone else edited it, the changes would be here)
            newComponent = component;
            removeComponent(form.components, path);
          });

          found = true;
          var container = get(parent, change.path);
          container.splice(change.index, 0, newComponent);
        });
        break;
      case 'remove':
        findComponent(form.components, change.key, null, function(component, path) {
          found = true;
          const oldComponent = get(form.components, path);
          if (oldComponent.key !== component.key) {
            path.pop();
          }
          removeComponent(form.components, path);
        });
        break;
      case 'edit':
        findComponent(form.components, change.key, null, function(component, path) {
          found = true;
          try {
            const oldComponent = get(form.components, path);
            const newComponent = applyPatch(component, change.patches).newDocument;

            if (oldComponent.key !== newComponent.key) {
              path.pop();
            }

            set(form.components, path, newComponent);
          }
          catch (err) {
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
    form,
    failed
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
    (component.conditional && (component.conditional.when ||
      (_.some(component.conditional.conditions || [], (condition => condition.component && condition.operator))) ||
      component.conditional.json ||
      component.conditional.condition
    ))
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
  return parseFloat(isString(value)
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

  if (isNaN(parsedValue)) {
    return '';
  }

  const parts = round(parsedValue, 2)
    .toString()
    .split('.');
  parts[0] = chunk(Array.from(parts[0]).reverse(), 3)
    .reverse()
    .map((part) => part
      .reverse()
      .join(''))
    .join(',');
  parts[1] = pad(parts[1], 2, '0');
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
 * Get the value for a component key, in the given submission.
 *
 * @param {Object} submission
 *   A submission object to search.
 * @param {String} key
 *   A for components API key to search for.
 */
export function getValue(submission, key) {
  const search = (data) => {
    if (isPlainObject(data)) {
      if (has(data, key)) {
        return _.get(data, key);
      }

      let value = null;

      forOwn(data, (prop) => {
        const result = search(prop);
        if (!isNil(result)) {
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
 * Iterate over all components in a form and get string values for translation.
 * @param form
 */
export function getStrings(form) {
  const properties = ['label', 'title', 'legend', 'tooltip', 'description', 'placeholder', 'prefix', 'suffix', 'errorLabel', 'content', 'html'];
  const strings = [];
  eachComponent(form.components, component => {
    properties.forEach(property => {
      if (component.hasOwnProperty(property) && component[property]) {
        strings.push({
          key: component.key,
          type: component.type,
          property,
          string: component[property]
        });
      }
    });
    if ((!component.dataSrc || component.dataSrc === 'values') && component.hasOwnProperty('values') && Array.isArray(component.values) && component.values.length) {
      component.values.forEach((value, index) => {
        strings.push({
          key: component.key,
          property: `value[${index}].label`,
          string: component.values[index].label
        });
      });
    }

    // Hard coded values from Day component
    if (component.type === 'day') {
      [
        'day',
        'month',
        'year',
        'Day',
        'Month',
        'Year',
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
      ].forEach(string => {
        strings.push({
          key: component.key,
          property: 'day',
          string,
        });
      });

      if (component.fields.day.placeholder) {
        strings.push({
          key: component.key,
          property: 'fields.day.placeholder',
          string: component.fields.day.placeholder,
        });
      }

      if (component.fields.month.placeholder) {
        strings.push({
          key: component.key,
          property: 'fields.month.placeholder',
          string: component.fields.month.placeholder,
        });
      }

      if (component.fields.year.placeholder) {
        strings.push({
          key: component.key,
          property: 'fields.year.placeholder',
          string: component.fields.year.placeholder,
        });
      }
    }

    if (component.type === 'editgrid') {
      const string = component.addAnother || 'Add Another';
      if (component.addAnother) {
        strings.push({
          key: component.key,
          property: 'addAnother',
          string,
        });
      }
    }

    if (component.type === 'select') {
      [
        'loading...',
        'Type to search'
      ].forEach(string => {
        strings.push({
          key: component.key,
          property: 'select',
          string,
        });
      });
    }
  }, true);

  return strings;
}

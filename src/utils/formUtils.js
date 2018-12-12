import get from 'lodash/get';
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

    if (includeAll || component.tree || (!hasColumns && !hasRows && !hasComps)) {
      noRecurse = fn(component, newPath);
    }

    const subPath = () => {
      if (
        component.key &&
        !['panel', 'table', 'well', 'columns', 'fieldset', 'tabs', 'form'].includes(component.type) &&
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
        component.rows.forEach((row) => {
          if (Array.isArray(row)) {
            row.forEach((column) =>
              eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null));
          }
        });
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
  if (isString(query)) {
    return component.key === query;
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
    if (path === key) {
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
        return data[key];
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
  const properties = ['label', 'title', 'legend', 'tooltip', 'description', 'placeholder', 'prefix', 'suffix', 'errorLabel'];
  const strings = [];
  eachComponent(form.components, component => {
    properties.forEach(property => {
      if (component.hasOwnProperty(property) && component[property]) {
        strings.push({
          key: component.key,
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
      const string = this.component.addAnother || 'Add Another';
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

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.concat.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  /**
   * Appends a number to a component.key to keep it unique
   *
   * @param {Object} form
   *   The components parent form.
   * @param {Object} component
   *   The component to uniquify
   */
  uniquify: function uniquify(container, component) {
    var changed = false;
    var formKeys = {};
    (0, _utils.eachComponent)(container, function (comp) {
      formKeys[comp.key] = true;

      if (['address', 'container', 'datagrid', 'editgrid', 'dynamicWizard', 'tree'].includes(comp.type) || comp.tree || comp.arrayTree) {
        return true;
      }
    }, true); // Recurse into all child components.

    (0, _utils.eachComponent)([component], function (component) {
      // Skip key uniquification if this component doesn't have a key.
      if (!component.key) {
        return;
      }

      var newKey = (0, _utils.uniqueKey)(formKeys, component.key);

      if (newKey !== component.key) {
        component.key = newKey;
        changed = true;
      }

      formKeys[newKey] = true;

      if (['address', 'container', 'datagrid', 'editgrid', 'dynamicWizard', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
        return true;
      }
    }, true);
    return changed;
  },
  additionalShortcuts: {
    button: ['Enter', 'Esc']
  },
  getAlphaShortcuts: function getAlphaShortcuts() {
    return _lodash.default.range('A'.charCodeAt(), 'Z'.charCodeAt() + 1).map(function (charCode) {
      return String.fromCharCode(charCode);
    });
  },
  getAdditionalShortcuts: function getAdditionalShortcuts(type) {
    return this.additionalShortcuts[type] || [];
  },
  getBindedShortcuts: function getBindedShortcuts(components, input) {
    var result = [];
    (0, _utils.eachComponent)(components, function (component) {
      if (component === input) {
        return;
      }

      if (component.shortcut) {
        result.push(component.shortcut);
      }

      if (component.values) {
        component.values.forEach(function (value) {
          if (value.shortcut) {
            result.push(value.shortcut);
          }
        });
      }
    }, true);
    return result;
  },
  getAvailableShortcuts: function getAvailableShortcuts(form, component) {
    if (!component) {
      return [];
    }

    return [''].concat(_lodash.default.difference(this.getAlphaShortcuts().concat(this.getAdditionalShortcuts(component.type)), this.getBindedShortcuts(form.components, component))).map(function (shortcut) {
      return {
        label: shortcut,
        value: shortcut
      };
    });
  }
};
exports.default = _default;
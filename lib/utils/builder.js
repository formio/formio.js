'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuilderUtils = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BuilderUtils = exports.BuilderUtils = {
  /**
   * Iterate the given key to make it unique.
   *
   * @param {String} key
   *   Modify the component key to be unique.
   *
   * @returns {String}
   *   The new component key.
   */
  iterateKey: function iterateKey(key) {
    if (!key.match(/(\d+)$/)) {
      return key + '2';
    }

    return key.replace(/(\d+)$/, function (suffix) {
      return Number(suffix) + 1;
    });
  },


  /**
   * Appends a number to a component.key to keep it unique
   *
   * @param {Object} form
   *   The components parent form.
   * @param {Object} component
   *   The component to uniquify
   */
  uniquify: function uniquify(form, component) {
    var _this = this;

    var changed = false;
    var formKeys = {};
    _index2.default.eachComponent(form.components, function (comp) {
      formKeys[comp.key] = true;
    });

    // Recurse into all child components.
    _index2.default.eachComponent([component], function (component) {
      // Skip key uniquification if this component doesn't have a key.
      if (!component.key) {
        return;
      }

      while (formKeys.hasOwnProperty(component.key)) {
        component.key = _this.iterateKey(component.key);
        changed = true;
      }
    }, true);
    return changed;
  },


  additionalShortcuts: {
    button: ['Enter', 'Esc']
  },

  getAlphaShortcuts: function getAlphaShortcuts() {
    return _lodash2.default.range('A'.charCodeAt(), 'Z'.charCodeAt() + 1).map(function (charCode) {
      return String.fromCharCode(charCode);
    });
  },
  getAdditionalShortcuts: function getAdditionalShortcuts(type) {
    return this.additionalShortcuts[type] || [];
  },
  getBindedShortcuts: function getBindedShortcuts(components, input) {
    var result = [];

    _index2.default.eachComponent(components, function (component) {
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
    return [''].concat(_lodash2.default.difference(this.getAlphaShortcuts().concat(this.getAdditionalShortcuts(component.type)), this.getBindedShortcuts(form.components, component)));
  }
};
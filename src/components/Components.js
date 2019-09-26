"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.match");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Unknown = _interopRequireDefault(require("./unknown/Unknown"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Components =
/*#__PURE__*/
function () {
  function Components() {
    _classCallCheck(this, Components);
  }

  _createClass(Components, null, [{
    key: "setComponents",
    value: function setComponents(comps) {
      // Set the tableView method on BaseComponent.
      if (comps.base) {
        // Implement the tableView method.
        comps.base.tableView = function (value, options) {
          var comp = Components.create(options.component, options.options || {}, options.data || {}, true);
          return comp.getView(value);
        };
      }

      _lodash.default.assign(Components.components, comps);
    }
  }, {
    key: "addComponent",
    value: function addComponent(name, comp) {
      return Components.setComponent(name, comp);
    }
  }, {
    key: "setComponent",
    value: function setComponent(name, comp) {
      Components.components[name] = comp;
    }
    /**
     * Ensure that all components have a key that is not used else-where in the form.
     * @param component
     * @param options
     */

    /* eslint-disable max-depth */

  }, {
    key: "ensureKey",
    value: function ensureKey(component, options) {
      options = options || {};

      if (!options.unknown) {
        options.unknown = {
          __keys: {}
        };
      }

      if (!options.keys) {
        options.keys = {};
      } // Ensure all components have a key, even if it is dynamically determined.


      if (component) {
        if (!component.key) {
          if (!options.unknown[component.type]) {
            options.unknown[component.type] = {
              count: 0
            };
          }

          do {
            options.unknown[component.type].count++;
            component.key = component.type + options.unknown[component.type].count;
          } while (options.keys.hasOwnProperty(component.key));

          options.unknown.__keys[component.key] = true;
        } // Alter previously defined dynamic keys if a conflict exists.
        else if (options.keys.hasOwnProperty(component.key) && options.unknown.__keys.hasOwnProperty(component.key)) {
            var nextCount = component.key.match(/([0-9]+)$/g);

            if (nextCount) {
              options.unknown[component.type].count = parseInt(nextCount.pop(), 10);
              var prevComponent = options.keys[component.key];

              do {
                options.unknown[component.type].count++;
                prevComponent.key = component.type + options.unknown[component.type].count;
              } while (options.keys.hasOwnProperty(prevComponent.key));

              options.keys[prevComponent.key] = prevComponent;
              options.unknown.__keys[prevComponent.key] = true;
              delete options.unknown.__keys[component.key];
            }
          } // Save this component in the keys object.


        options.keys[component.key] = component;
      }
    }
    /* eslint-enable max-depth */

  }, {
    key: "create",
    value: function create(component, options, data, nobuild) {
      var comp = null;

      if (component.type && Components.components.hasOwnProperty(component.type)) {
        comp = new Components.components[component.type](component, options, data);
        Components.ensureKey(component, options);
      } else {
        comp = new _Unknown.default(component, options, data);
      }

      if (!nobuild) {
        comp.build();
        comp.isBuilt = true;
      }

      return comp;
    }
  }, {
    key: "components",
    get: function get() {
      if (!Components._components) {
        Components._components = {};
      }

      return Components._components;
    }
  }]);

  return Components;
}();

exports.default = Components;
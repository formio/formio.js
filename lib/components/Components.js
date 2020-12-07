"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component = _interopRequireDefault(require("./_classes/component/Component"));

var _utils = _interopRequireDefault(require("./_classes/component/editForm/utils"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Components = /*#__PURE__*/function () {
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
  }, {
    key: "create",
    value: function create(component, options, data) {
      var comp = null;

      if (component.type && Components.components.hasOwnProperty(component.type)) {
        comp = new Components.components[component.type](component, options, data);
      } else if (component.arrayTree) {
        // eslint-disable-next-line new-cap
        comp = new Components.components['datagrid'](component, options, data);
      } else if (component.tree) {
        // eslint-disable-next-line new-cap
        comp = new Components.components['nesteddata'](component, options, data);
      } else if (Array.isArray(component.components)) {
        // eslint-disable-next-line new-cap
        comp = new Components.components['nested'](component, options, data);
      } else {
        comp = new _Component.default(component, options, data);
      }

      return comp;
    }
  }, {
    key: "EditFormUtils",
    get: function get() {
      return _utils.default;
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
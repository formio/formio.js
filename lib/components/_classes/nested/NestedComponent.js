'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Field2 = _interopRequireDefault(require("../field/Field"));

var _Components = _interopRequireDefault(require("../../Components"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NestedComponent =
/*#__PURE__*/
function (_Field) {
  _inherits(NestedComponent, _Field);

  _createClass(NestedComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Field2.default.schema.apply(_Field2.default, [{
        tree: false
      }].concat(extend));
    }
  }]);

  function NestedComponent(component, options, data) {
    var _this;

    _classCallCheck(this, NestedComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NestedComponent).call(this, component, options, data));
    _this.type = 'components';
    _this._collapsed = !!_this.component.collapsed;
    return _this;
  }

  _createClass(NestedComponent, [{
    key: "getComponents",
    value: function getComponents() {
      return this.components || [];
    }
  }, {
    key: "getAllComponents",
    value: function getAllComponents() {
      return this.getComponents().reduce(function (components, component) {
        var result = component;

        if (component && component.getAllComponents) {
          result = component.getAllComponents();
        }

        return components.concat(result);
      }, []);
    }
    /**
     * Perform a deep iteration over every component, including those
     * within other container based components.
     *
     * @param {function} fn - Called for every component.
     */

  }, {
    key: "everyComponent",
    value: function everyComponent(fn) {
      var components = this.getComponents();

      _lodash.default.each(components, function (component, index) {
        if (fn(component, components, index) === false) {
          return false;
        }

        if (typeof component.everyComponent === 'function') {
          if (component.everyComponent(fn) === false) {
            return false;
          }
        }
      });
    }
  }, {
    key: "flattenComponents",
    value: function flattenComponents() {
      var result = {};
      this.everyComponent(function (component) {
        result[component.key] = component;
      });
      return result;
    }
    /**
     * Perform an iteration over each component within this container component.
     *
     * @param {function} fn - Called for each component
     */

  }, {
    key: "eachComponent",
    value: function eachComponent(fn) {
      _lodash.default.each(this.getComponents(), function (component, index) {
        if (fn(component, index) === false) {
          return false;
        }
      });
    }
    /**
     * Returns a component provided a key. This performs a deep search within the
     * component tree.
     *
     * @param {string} key - The key of the component to retrieve.
     * @param {function} fn - Called with the component once found.
     * @return {Object} - The component that is located.
     */

  }, {
    key: "getComponent",
    value: function getComponent(path, fn) {
      path = Array.isArray(path) ? path : [path];

      var _path = path,
          _path2 = _toArray(_path),
          key = _path2[0],
          remainingPath = _path2.slice(1);

      var comp = null;

      if (!_lodash.default.isString(key)) {
        return comp;
      }

      this.everyComponent(function (component, components) {
        if (component.component.key === key) {
          comp = component;

          if (remainingPath.length > 0 && 'getComponent' in component) {
            comp = component.getComponent(remainingPath, fn);
          } else if (fn) {
            fn(component, components);
          }

          return false;
        }
      });
      return comp;
    }
    /**
     * Return a component provided the Id of the component.
     *
     * @param {string} id - The Id of the component.
     * @param {function} fn - Called with the component once it is retrieved.
     * @return {Object} - The component retrieved.
     */

  }, {
    key: "getComponentById",
    value: function getComponentById(id, fn) {
      var comp = null;
      this.everyComponent(function (component, components) {
        if (component.id === id) {
          comp = component;

          if (fn) {
            fn(component, components);
          }

          return false;
        }
      });
      return comp;
    }
    /**
     * Create a new component and add it to the components array.
     *
     * @param component
     * @param data
     */

  }, {
    key: "createComponent",
    value: function createComponent(component, options, data, before) {
      options = options || this.options;
      data = data || this.data;
      options.parent = this;
      options.parentVisible = this.visible;
      options.root = this.root || this;

      var comp = _Components.default.create(component, options, data, true);

      comp.isBuilt = true;

      if (component.internal) {
        return comp;
      }

      if (before) {
        var index = _lodash.default.findIndex(this.components, {
          id: before.id
        });

        if (index !== -1) {
          this.components.splice(index, 0, comp);
        } else {
          this.components.push(comp);
        }
      } else {
        this.components.push(comp);
      }

      return comp;
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.element;
    }
  }, {
    key: "init",
    value: function init() {
      this.components = this.components || [];
      this.addComponents();
      return _get(_getPrototypeOf(NestedComponent.prototype), "init", this).call(this);
    }
    /**
     *
     * @param element
     * @param data
     */

  }, {
    key: "addComponents",
    value: function addComponents(data, options) {
      var _this2 = this;

      data = data || this.data;
      options = options || this.options;

      if (options.components) {
        this.components = options.components;
      } else {
        var components = this.hook('addComponents', this.componentComponents, this) || [];
        components.forEach(function (component) {
          return _this2.addComponent(component, data);
        });
      }
    }
    /**
     * Add a new component to the components array.
     *
     * @param {Object} component - The component JSON schema to add.
     * @param {Object} data - The submission data object to house the data for this component.
     * @param {HTMLElement} before - A DOM element to insert this element before.
     * @return {Component} - The created component instance.
     */

  }, {
    key: "addComponent",
    value: function addComponent(component, data, before, noAdd) {
      data = data || this.data;
      var comp = this.createComponent(component, this.options, data, before ? before : null);

      if (noAdd) {
        return comp;
      }

      return comp;
    }
  }, {
    key: "render",
    value: function render(children) {
      // If already rendering, don't re-render.
      return _get(_getPrototypeOf(NestedComponent.prototype), "render", this).call(this, children || this.renderTemplate(this.templateName, {
        children: this.renderComponents(),
        nestedKey: this.nestedKey,
        collapsed: this.collapsed
      }));
    }
  }, {
    key: "renderComponents",
    value: function renderComponents(components) {
      components = components || this.getComponents();
      var children = components.map(function (component) {
        return component.render();
      });
      return this.renderTemplate('components', {
        children: children,
        components: components
      });
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this3 = this;

      var superPromise = _get(_getPrototypeOf(NestedComponent.prototype), "attach", this).call(this, element);

      this.loadRefs(element, _defineProperty({
        header: 'single',
        collapsed: this.collapsed
      }, this.nestedKey, 'single'));

      var childPromise = _nativePromiseOnly.default.resolve();

      if (this.refs[this.nestedKey]) {
        childPromise = this.attachComponents(this.refs[this.nestedKey]);
      }

      if (this.component.collapsible && this.refs.header) {
        this.addEventListener(this.refs.header, 'click', function () {
          _this3.collapsed = !_this3.collapsed;
        });
      }

      return _nativePromiseOnly.default.all([superPromise, childPromise]);
    }
  }, {
    key: "attachComponents",
    value: function attachComponents(element, components, container) {
      components = components || this.components;
      container = container || this.component.components;
      element = this.hook('attachComponents', element, components, container, this);

      if (!element) {
        // Return a non-resolving promise.
        return new _nativePromiseOnly.default(function () {});
      }

      var index = 0;
      var promises = [];
      Array.prototype.slice.call(element.children).forEach(function (child) {
        if (!child.getAttribute('data-noattach') && components[index]) {
          promises.push(components[index].attach(child));
          index++;
        }
      });
      return _nativePromiseOnly.default.all(promises);
    }
    /**
     * Remove a component from the components array.
     *
     * @param {Component} component - The component to remove from the components.
     * @param {Array<Component>} components - An array of components to remove this component from.
     */

  }, {
    key: "removeComponent",
    value: function removeComponent(component, components) {
      component.destroy();

      _lodash.default.remove(components, {
        id: component.id
      });
    }
    /**
     * Removes a component provided the API key of that component.
     *
     * @param {string} key - The API key of the component to remove.
     * @param {function} fn - Called once the component is removed.
     * @return {null}
     */

  }, {
    key: "removeComponentByKey",
    value: function removeComponentByKey(key, fn) {
      var _this4 = this;

      var comp = this.getComponent(key, function (component, components) {
        _this4.removeComponent(component, components);

        if (fn) {
          fn(component, components);
        }
      });

      if (!comp) {
        if (fn) {
          fn(null);
        }

        return null;
      }
    }
    /**
     * Removes a component provided the Id of the component.
     *
     * @param {string} id - The Id of the component to remove.
     * @param {function} fn - Called when the component is removed.
     * @return {null}
     */

  }, {
    key: "removeComponentById",
    value: function removeComponentById(id, fn) {
      var _this5 = this;

      var comp = this.getComponentById(id, function (component, components) {
        _this5.removeComponent(component, components);

        if (fn) {
          fn(component, components);
        }
      });

      if (!comp) {
        if (fn) {
          fn(null);
        }

        return null;
      }
    }
  }, {
    key: "updateValue",
    value: function updateValue(value, flags) {
      return this.components.reduce(function (changed, comp) {
        return comp.updateValue(null, flags) || changed;
      }, _get(_getPrototypeOf(NestedComponent.prototype), "updateValue", this).call(this, value, flags));
    }
  }, {
    key: "hasChanged",
    value: function hasChanged() {
      return false;
    }
  }, {
    key: "checkData",
    value: function checkData(data, flags, components) {
      components = components || this.getComponents();
      return components.reduce(function (valid, comp) {
        return comp.checkData(data, flags) && valid;
      }, _get(_getPrototypeOf(NestedComponent.prototype), "checkData", this).call(this, data, flags));
    }
  }, {
    key: "checkConditions",
    value: function checkConditions(data) {
      this.getComponents().forEach(function (comp) {
        return comp.checkConditions(data);
      });
      return _get(_getPrototypeOf(NestedComponent.prototype), "checkConditions", this).call(this, data);
    }
  }, {
    key: "clearOnHide",
    value: function clearOnHide(show) {
      _get(_getPrototypeOf(NestedComponent.prototype), "clearOnHide", this).call(this, show);

      if (this.component.clearOnHide && this.hasValue()) {
        this.restoreComponentsContext();
      }

      this.getComponents().forEach(function (component) {
        return component.clearOnHide(show);
      });
    }
  }, {
    key: "restoreComponentsContext",
    value: function restoreComponentsContext() {
      var _this6 = this;

      this.getComponents().forEach(function (component) {
        return component.data = _this6.dataValue;
      });
    }
    /**
     * Allow components to hook into the next page trigger to perform their own logic.
     *
     * @return {*}
     */

  }, {
    key: "beforePage",
    value: function beforePage(next) {
      return _nativePromiseOnly.default.all(this.getComponents().map(function (comp) {
        return comp.beforePage(next);
      }));
    }
    /**
     * Allow components to hook into the submission to provide their own async data.
     *
     * @return {*}
     */

  }, {
    key: "beforeSubmit",
    value: function beforeSubmit() {
      return _nativePromiseOnly.default.all(this.getComponents().map(function (comp) {
        return comp.beforeSubmit();
      }));
    }
  }, {
    key: "calculateValue",
    value: function calculateValue(data, flags) {
      // Do not iterate into children and calculateValues if this nested component is conditionally hidden.
      if (!this.conditionallyVisible()) {
        return false;
      }

      return this.getComponents().reduce(function (changed, comp) {
        return comp.calculateValue(data, flags) || changed;
      }, _get(_getPrototypeOf(NestedComponent.prototype), "calculateValue", this).call(this, data, flags));
    }
  }, {
    key: "isLastPage",
    value: function isLastPage() {
      return this.pages.length - 1 === this.page;
    }
  }, {
    key: "isValid",
    value: function isValid(data, dirty) {
      return this.getComponents().reduce(function (valid, comp) {
        return comp.isValid(data, dirty) && valid;
      }, _get(_getPrototypeOf(NestedComponent.prototype), "isValid", this).call(this, data, dirty));
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty) {
      if (!this.checkCondition(null, data)) {
        this.setCustomValidity('');
        return true;
      }

      return this.getComponents().reduce(function (check, comp) {
        return comp.checkValidity(data, dirty) && check;
      }, _get(_getPrototypeOf(NestedComponent.prototype), "checkValidity", this).call(this, data, dirty));
    }
  }, {
    key: "setPristine",
    value: function setPristine(pristine) {
      _get(_getPrototypeOf(NestedComponent.prototype), "setPristine", this).call(this, pristine);

      this.getComponents().forEach(function (comp) {
        return comp.setPristine(pristine);
      });
    }
  }, {
    key: "detach",
    value: function detach() {
      this.components.forEach(function (component) {
        component.detach();
      });

      _get(_getPrototypeOf(NestedComponent.prototype), "detach", this).call(this);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.destroyComponents();

      _get(_getPrototypeOf(NestedComponent.prototype), "destroy", this).call(this);
    }
  }, {
    key: "destroyComponents",
    value: function destroyComponents() {
      var _this7 = this;

      var components = this.getComponents().slice();
      components.forEach(function (comp) {
        return _this7.removeComponent(comp, _this7.components);
      });
      this.components = [];
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.data;
    }
  }, {
    key: "resetValue",
    value: function resetValue() {
      this.getComponents().forEach(function (comp) {
        return comp.resetValue();
      });

      _lodash.default.unset(this.data, this.key);

      this.setPristine(true);
    }
  }, {
    key: "setNestedValue",
    value: function setNestedValue(component, value, flags, changed) {
      if (component.type === 'button') {
        return false;
      }

      if (component.type === 'components') {
        return component.setValue(value, flags) || changed;
      } else if (value && component.hasValue(value)) {
        return component.setValue(_lodash.default.get(value, component.key), flags) || changed;
      } else if (!this.rootPristine) {
        flags.noValidate = true;
        return component.setValue(component.defaultValue, flags) || changed;
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var _this8 = this;

      if (!value) {
        return false;
      }

      flags = flags || {};
      return this.getComponents().reduce(function (changed, component) {
        return _this8.setNestedValue(component, value, flags, changed);
      }, false);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return NestedComponent.schema();
    }
  }, {
    key: "schema",
    get: function get() {
      var schema = _get(_getPrototypeOf(NestedComponent.prototype), "schema", this);

      var components = _lodash.default.uniqBy(this.getComponents(), 'component.key');

      schema.components = _lodash.default.map(components, 'schema');
      return schema;
    }
  }, {
    key: "collapsed",
    get: function get() {
      return this._collapsed;
    },
    set: function set(value) {
      this._collapsed = value;
      this.redraw();
    }
  }, {
    key: "visible",
    set: function set(value) {
      _set(_getPrototypeOf(NestedComponent.prototype), "visible", value, this, true);

      var isVisible = this.visible;
      var forceShow = this.options.show && this.options.show[this.component.key];
      var forceHide = this.options.hide && this.options.hide[this.component.key];
      this.components.forEach(function (component) {
        var conditionallyVisible = component.conditionallyVisible();

        if (forceShow || !isVisible && conditionallyVisible) {
          component.visible = true;
        } else if (forceHide || isVisible && !conditionallyVisible) {
          component.visible = false;
        } // If hiding a nested component, clear all errors below.


        if (!component.visible) {
          component.error = '';
        }

        component.parentVisible = isVisible;
      });
    },
    get: function get() {
      return _get(_getPrototypeOf(NestedComponent.prototype), "visible", this);
    }
  }, {
    key: "parentVisible",
    set: function set(value) {
      var _this9 = this;

      _set(_getPrototypeOf(NestedComponent.prototype), "parentVisible", value, this, true);

      this.components.forEach(function (component) {
        component.parentVisible = _this9.visible;
      });
    },
    get: function get() {
      return _get(_getPrototypeOf(NestedComponent.prototype), "parentVisible", this);
    }
  }, {
    key: "disabled",
    get: function get() {
      return _get(_getPrototypeOf(NestedComponent.prototype), "disabled", this);
    },
    set: function set(disabled) {
      _set(_getPrototypeOf(NestedComponent.prototype), "disabled", disabled, this, true);

      this.components.forEach(function (component) {
        return component.parentDisabled = disabled;
      });
    }
  }, {
    key: "parentDisabled",
    set: function set(value) {
      var _this10 = this;

      _set(_getPrototypeOf(NestedComponent.prototype), "parentDisabled", value, this, true);

      this.components.forEach(function (component) {
        component.parentDisabled = _this10.disabled;
      });
    },
    get: function get() {
      return _get(_getPrototypeOf(NestedComponent.prototype), "parentDisabled", this);
    }
  }, {
    key: "ready",
    get: function get() {
      return _nativePromiseOnly.default.all(this.getComponents().map(function (component) {
        return component.ready;
      }));
    }
  }, {
    key: "currentForm",
    get: function get() {
      return _get(_getPrototypeOf(NestedComponent.prototype), "currentForm", this);
    },
    set: function set(instance) {
      _set(_getPrototypeOf(NestedComponent.prototype), "currentForm", instance, this, true);

      this.getComponents().forEach(function (component) {
        component.currentForm = instance;
      });
    }
  }, {
    key: "rowIndex",
    get: function get() {
      return this._rowIndex;
    },
    set: function set(value) {
      this._rowIndex = value;
      this.eachComponent(function (component) {
        component.rowIndex = value;
      });
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    },
    set: function set(value) {
      var _this11 = this;

      this._data = value;
      this.eachComponent(function (component) {
        component.data = _this11._data;
      });
    }
  }, {
    key: "componentComponents",
    get: function get() {
      return this.component.components || [];
    }
  }, {
    key: "nestedKey",
    get: function get() {
      return "nested-".concat(this.key);
    }
  }, {
    key: "templateName",
    get: function get() {
      return 'container';
    }
  }, {
    key: "errors",
    get: function get() {
      return this.getAllComponents().reduce(function (errors, comp) {
        return errors.concat(comp.errors || []);
      }, []);
    }
  }, {
    key: "dataReady",
    get: function get() {
      return _nativePromiseOnly.default.all(this.getComponents().map(function (component) {
        return component.dataReady;
      }));
    }
  }]);

  return NestedComponent;
}(_Field2.default);

exports.default = NestedComponent;
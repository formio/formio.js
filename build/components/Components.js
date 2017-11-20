'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormioComponents = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _remove2 = require('lodash/remove');

var _remove3 = _interopRequireDefault(_remove2);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

var _Base = require('./base/Base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormioComponents = exports.FormioComponents = function (_BaseComponent) {
  _inherits(FormioComponents, _BaseComponent);

  function FormioComponents(component, options, data) {
    _classCallCheck(this, FormioComponents);

    var _this = _possibleConstructorReturn(this, (FormioComponents.__proto__ || Object.getPrototypeOf(FormioComponents)).call(this, component, options, data));

    _this.type = 'components';
    _this.components = [];
    _this.hidden = [];
    return _this;
  }

  _createClass(FormioComponents, [{
    key: 'build',
    value: function build() {
      this.createElement();
      this.addComponents();
    }
  }, {
    key: 'getComponents',
    value: function getComponents() {
      return this.components;
    }

    /**
     * Perform a deep iteration over every component, including those
     * within other container based components.
     *
     * @param {function} cb - Called for every component.
     */

  }, {
    key: 'everyComponent',
    value: function everyComponent(cb) {
      var components = this.getComponents();
      (0, _each3.default)(components, function (component, index) {
        if (component.type === 'components') {
          if (component.everyComponent(cb) === false) {
            return false;
          }
        } else if (cb(component, components, index) === false) {
          return false;
        }
      });
    }

    /**
     * Perform an iteration over each component within this container component.
     *
     * @param {function} cb - Called for each component
     */

  }, {
    key: 'eachComponent',
    value: function eachComponent(cb) {
      (0, _each3.default)(this.getComponents(), function (component, index) {
        if (cb(component, index) === false) {
          return false;
        }
      });
    }

    /**
     * Returns a component provided a key. This performs a deep search within the
     * component tree.
     *
     * @param {string} key - The key of the component to retrieve.
     * @param {function} cb - Called with the component once found.
     * @return {Object} - The component that is located.
     */

  }, {
    key: 'getComponent',
    value: function getComponent(key, cb) {
      var comp = null;
      this.everyComponent(function (component, components) {
        if (component.component.key === key) {
          comp = component;
          if (cb) {
            cb(component, components);
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
     * @param {function} cb - Called with the component once it is retrieved.
     * @return {Object} - The component retrieved.
     */

  }, {
    key: 'getComponentById',
    value: function getComponentById(id, cb) {
      var comp = null;
      this.everyComponent(function (component, components) {
        if (component.id === id) {
          comp = component;
          if (cb) {
            cb(component, components);
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
    key: 'createComponent',
    value: function createComponent(component, options, data) {
      if (!this.options.components) {
        this.options.components = require('./index');
        (0, _assign3.default)(this.options.components, FormioComponents.customComponents);
      }
      var comp = this.options.components.create(component, options, data, true);
      comp.parent = this;
      comp.root = this.root || this;
      comp.build();
      this.components.push(comp);
      return comp;
    }

    /**
     * Add a new component to the components array.
     *
     * @param {Object} component - The component JSON schema to add.
     * @param {HTMLElement} element - The DOM element to append this child to.
     * @param {Object} data - The submission data object to house the data for this component.
     * @return {BaseComponent} - The created component instance.
     */

  }, {
    key: 'addComponent',
    value: function addComponent(component, element, data) {
      element = element || this.element;
      data = data || this.data;
      component.row = this.row;
      var comp = this.createComponent(component, this.options, data);
      this.setHidden(comp);
      element.appendChild(comp.getElement());
      return comp;
    }

    /**
     * Remove a component from the components array.
     *
     * @param {BaseComponent} component - The component to remove from the components.
     * @param {Array<BaseComponent>} components - An array of components to remove this component from.
     */

  }, {
    key: 'removeComponent',
    value: function removeComponent(component, components) {
      component.destroy();
      var element = component.getElement();
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      (0, _remove3.default)(components, { id: component.id });
    }

    /**
     * Removes a component provided the API key of that component.
     *
     * @param {string} key - The API key of the component to remove.
     * @param {function} cb - Called once the component is removed.
     * @return {null}
     */

  }, {
    key: 'removeComponentByKey',
    value: function removeComponentByKey(key, cb) {
      var _this2 = this;

      var comp = this.getComponent(key, function (component, components) {
        _this2.removeComponent(component, components);
        if (cb) {
          cb(component, components);
        }
      });
      if (!comp) {
        if (cb) {
          cb(null);
        }
        return null;
      }
    }

    /**
     * Removes a component provided the Id of the component.
     *
     * @param {string} id - The Id of the component to remove.
     * @param {function} cb - Called when the component is removed.
     * @return {null}
     */

  }, {
    key: 'removeComponentById',
    value: function removeComponentById(id, cb) {
      var _this3 = this;

      var comp = this.getComponentById(id, function (component, components) {
        _this3.removeComponent(component, components);
        if (cb) {
          cb(component, components);
        }
      });
      if (!comp) {
        if (cb) {
          cb(null);
        }
        return null;
      }
    }

    /**
     *
     * @param element
     * @param data
     */

  }, {
    key: 'addComponents',
    value: function addComponents(element, data) {
      var _this4 = this;

      element = element || this.element;
      data = data || this.data;
      (0, _each3.default)(this.component.components, function (component) {
        return _this4.addComponent(component, element, data);
      });
    }
  }, {
    key: 'updateValue',
    value: function updateValue(flags) {
      var changed = false;
      (0, _each3.default)(this.components, function (comp) {
        changed |= comp.updateValue(flags);
      });
      return changed;
    }
  }, {
    key: 'hasChanged',
    value: function hasChanged() {
      return false;
    }

    /**
     * A more performant way to check the conditions, calculations, and validity of
     * a submission once it has been changed.
     *
     * @param data
     * @param flags
     */

  }, {
    key: 'checkData',
    value: function checkData(data, flags) {
      flags = flags || {};
      var valid = true;
      if (flags.noCheck) {
        return;
      }

      // Update the value.
      var changed = this.updateValue({
        noUpdateEvent: true
      });

      // Iterate through all components and check conditions, and calculate values.
      (0, _each3.default)(this.getComponents(), function (comp) {
        changed |= comp.calculateValue(data, {
          noUpdateEvent: true
        });
        comp.checkConditions(data);
        if (!flags.noValidate) {
          valid &= comp.checkValidity(data);
        }
      });

      // Trigger the change if the values changed.
      if (changed) {
        this.triggerChange(flags);
      }

      // Return if the value is valid.
      return valid;
    }
  }, {
    key: 'checkConditions',
    value: function checkConditions(data) {
      var forceShow = false;
      var show = false;
      (0, _each3.default)(this.getComponents(), function (comp) {
        var compShow = comp.checkConditions(data);
        forceShow |= comp.hasCondition() && compShow;
        show |= compShow;
      });

      // If any child has conditions set and are visible, then force the show.
      if (forceShow) {
        return this.show(true);
      }

      // Show if it explicitely says so.
      show |= _get(FormioComponents.prototype.__proto__ || Object.getPrototypeOf(FormioComponents.prototype), 'checkConditions', this).call(this, data);
      return show;
    }

    /**
     * Allow components to hook into the next page trigger to perform their own logic.
     *
     * @return {*}
     */

  }, {
    key: 'beforeNext',
    value: function beforeNext() {
      var ops = [];
      (0, _each3.default)(this.getComponents(), function (comp) {
        return ops.push(comp.beforeNext());
      });
      return _nativePromiseOnly2.default.all(ops);
    }

    /**
     * Allow components to hook into the submission to provide their own async data.
     *
     * @return {*}
     */

  }, {
    key: 'beforeSubmit',
    value: function beforeSubmit() {
      var ops = [];
      (0, _each3.default)(this.getComponents(), function (comp) {
        return ops.push(comp.beforeSubmit());
      });
      return _nativePromiseOnly2.default.all(ops);
    }
  }, {
    key: 'onResize',
    value: function onResize(scale) {
      _get(FormioComponents.prototype.__proto__ || Object.getPrototypeOf(FormioComponents.prototype), 'onResize', this).call(this, scale);
      (0, _each3.default)(this.getComponents(), function (comp) {
        return comp.onResize(scale);
      });
    }
  }, {
    key: 'calculateValue',
    value: function calculateValue(data, flags) {
      var changed = _get(FormioComponents.prototype.__proto__ || Object.getPrototypeOf(FormioComponents.prototype), 'calculateValue', this).call(this, data, flags);
      (0, _each3.default)(this.getComponents(), function (comp) {
        changed |= comp.calculateValue(data, flags);
      });
      return changed;
    }
  }, {
    key: 'isValid',
    value: function isValid(data, dirty) {
      var valid = _get(FormioComponents.prototype.__proto__ || Object.getPrototypeOf(FormioComponents.prototype), 'isValid', this).call(this, data, dirty);
      (0, _each3.default)(this.getComponents(), function (comp) {
        valid &= comp.isValid(data, dirty);
      });
      return valid;
    }
  }, {
    key: 'checkValidity',
    value: function checkValidity(data, dirty) {
      var check = _get(FormioComponents.prototype.__proto__ || Object.getPrototypeOf(FormioComponents.prototype), 'checkValidity', this).call(this, data, dirty);
      (0, _each3.default)(this.getComponents(), function (comp) {
        check &= comp.checkValidity(data, dirty);
      });
      return check;
    }
  }, {
    key: 'setPristine',
    value: function setPristine(pristine) {
      _get(FormioComponents.prototype.__proto__ || Object.getPrototypeOf(FormioComponents.prototype), 'setPristine', this).call(this, pristine);
      (0, _each3.default)(this.getComponents(), function (comp) {
        return comp.setPristine(pristine);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(all) {
      var _this5 = this;

      _get(FormioComponents.prototype.__proto__ || Object.getPrototypeOf(FormioComponents.prototype), 'destroy', this).call(this, all);
      var components = (0, _clone3.default)(this.components);
      (0, _each3.default)(components, function (comp) {
        return _this5.removeComponent(comp, _this5.components);
      });
      this.components = [];
      this.hidden = [];
    }
  }, {
    key: 'setHidden',
    value: function setHidden(component) {
      if (component.components && component.components.length) {
        component.hideComponents(this.hidden);
      } else if (component.component.hidden) {
        component.visible = false;
      } else {
        component.visible = !this.hidden || this.hidden.indexOf(component.component.key) === -1;
      }
    }
  }, {
    key: 'hideComponents',
    value: function hideComponents(hidden) {
      var _this6 = this;

      this.hidden = hidden;
      this.eachComponent(function (component) {
        return _this6.setHidden(component);
      });
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.data;
    }
  }, {
    key: 'whenReady',
    value: function whenReady() {
      var promises = [];
      (0, _each3.default)(this.getComponents(), function (component) {
        promises.push(component.whenReady());
      });
      return _nativePromiseOnly2.default.all(promises);
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      if (!value) {
        return false;
      }
      flags = this.getFlags.apply(this, arguments);
      var changed = false;
      this.value = value;
      (0, _each3.default)(this.getComponents(), function (component) {
        if (component.type === 'button') {
          return;
        }

        if (component.type === 'components') {
          changed |= component.setValue(value, flags);
        } else if (value && value.hasOwnProperty(component.component.key)) {
          changed |= component.setValue(value[component.component.key], flags);
        } else if (component.component.input) {
          flags.noValidate = true;
          changed |= component.setValue(null, flags);
        }
      });
      return changed;
    }
  }, {
    key: 'disabled',
    set: function set(disabled) {
      (0, _each3.default)(this.components, function (component) {
        return component.disabled = disabled;
      });
    }
  }, {
    key: 'errors',
    get: function get() {
      var errors = [];
      (0, _each3.default)(this.getComponents(), function (comp) {
        var compErrors = comp.errors;
        if (compErrors.length) {
          errors = errors.concat(compErrors);
        }
      });
      return errors;
    }
  }]);

  return FormioComponents;
}(_Base.BaseComponent);

FormioComponents.customComponents = {};
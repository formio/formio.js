"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NestedComponent2 = _interopRequireDefault(require("../nested/NestedComponent"));

var _Base = _interopRequireDefault(require("../base/Base"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TabsComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(TabsComponent, _NestedComponent);

  _createClass(TabsComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        label: 'Tabs',
        type: 'tabs',
        input: false,
        key: 'tabs',
        persistent: false,
        components: [{
          label: 'Tab 1',
          key: 'tab1',
          components: []
        }]
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Tabs',
        group: 'layout',
        icon: 'fa fa-folder-o',
        weight: 50,
        documentation: 'http://help.form.io/userguide/#tabs',
        schema: TabsComponent.schema()
      };
    }
  }]);

  function TabsComponent(component, options, data) {
    var _this;

    _classCallCheck(this, TabsComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TabsComponent).call(this, component, options, data));
    _this.currentTab = 0;
    _this.validityTabs = [];
    return _this;
  }

  _createClass(TabsComponent, [{
    key: "build",
    value: function build(state, showLabel) {
      var _this2 = this;

      if (this.options.flatten) {
        this.element = _get(_getPrototypeOf(TabsComponent.prototype), "createElement", this).call(this);
        this.component.components.forEach(function (tab) {
          var body;

          var panel = _this2.ce('div', {
            id: _this2.id,
            class: 'mb-2 card border panel panel-default'
          }, [_this2.ce('div', {
            class: 'card-header bg-default panel-heading'
          }, _this2.ce('h4', {
            class: 'mb-0 card-title panel-title'
          }, tab.label)), body = _this2.ce('div', {
            class: 'card-body panel-body'
          })]);

          tab.components.forEach(function (component) {
            return _this2.addComponent(component, body, _this2.data, null, null, _this2.getComponentState(component, state));
          });

          _this2.element.appendChild(panel);
        });
      } else {
        return _get(_getPrototypeOf(TabsComponent.prototype), "build", this).call(this, state, showLabel);
      }
    }
  }, {
    key: "createElement",
    value: function createElement() {
      var _this3 = this;

      this.tabsBar = this.ce('ul', {
        class: 'nav nav-tabs'
      });
      this.tabsContent = this.ce('div', {
        class: 'tab-content'
      });
      this.tabLinks = [];
      this.tabs = [];
      this.component.components.forEach(function (tab, index) {
        var tabLink = _this3.ce('a', {
          class: 'nav-link',
          href: "#".concat(tab.key)
        }, tab.label);

        _this3.addEventListener(tabLink, 'click', function (event) {
          event.preventDefault();

          _this3.setTab(index);
        });

        var tabElement = _this3.ce('li', {
          class: 'nav-item',
          role: 'presentation'
        }, tabLink);

        tabElement.tabLink = tabLink;

        _this3.tabsBar.appendChild(tabElement);

        _this3.tabLinks.push(tabElement);

        var tabPanel = _this3.ce('div', {
          role: 'tabpanel',
          class: 'tab-pane',
          id: tab.key
        });

        _this3.tabsContent.appendChild(tabPanel);

        _this3.tabs.push(tabPanel);
      });

      if (this.element) {
        this.appendChild(this.element, [this.tabsBar, this.tabsContent]);
        this.element.className = this.className;
        return this.element;
      }

      this.element = this.ce('div', {
        id: this.id,
        class: this.className
      }, [this.tabsBar, this.tabsContent]);
      this.element.component = this;
      return this.element;
    }
    /**
     * Set the current tab.
     *
     * @param index
     */

  }, {
    key: "setTab",
    value: function setTab(index, state) {
      var _this4 = this;

      if (!this.tabs || !this.component.components || !this.component.components[this.currentTab] || this.currentTab >= this.tabs.length) {
        return;
      }

      this.currentTab = index; // Get the current tab.

      var tab = this.component.components[index];
      this.empty(this.tabs[index]);
      this.components.map(function (comp) {
        return comp.destroy();
      });
      this.components = [];
      var components = this.hook('addComponents', tab.components, this);
      components.forEach(function (component) {
        return _this4.addComponent(component, _this4.tabs[index], _this4.data, null, null, state);
      });
      this.restoreValue();

      if (this.tabLinks.length <= index) {
        return;
      }

      this.tabLinks.forEach(function (tabLink) {
        return _this4.removeClass(tabLink, 'active').removeClass(tabLink.tabLink, 'active');
      });
      this.tabs.forEach(function (tab) {
        return _this4.removeClass(tab, 'active');
      });
      this.addClass(this.tabLinks[index], 'active').addClass(this.tabLinks[index].tabLink, 'active').addClass(this.tabs[index], 'active');
      this.triggerChange();
    }
    /**
     * Return all the components within all the tabs.
     */

  }, {
    key: "getAllComponents",
    value: function getAllComponents() {
      // If the validity tabs are set, then this usually means we are getting the components that have
      // triggered errors and need to iterate through these to display them.
      if (this.validityTabs && this.validityTabs.length) {
        var comps = this.validityTabs.reduce(function (components, component) {
          if (component && component.getAllComponents) {
            component = component.getAllComponents();
          }

          return components.concat(component);
        }, []);
        this.validityTabs = [];
        return comps;
      }

      return _get(_getPrototypeOf(TabsComponent.prototype), "getAllComponents", this).call(this);
    }
    /**
     * Checks the validity by checking all tabs validity.
     *
     * @param data
     * @param dirty
     */

  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty) {
      var _this5 = this;

      if (!dirty) {
        return _get(_getPrototypeOf(TabsComponent.prototype), "checkValidity", this).call(this, data, dirty);
      }

      if (!this.checkCondition(null, data)) {
        this.setCustomValidity('');
        return true;
      }

      var isValid = _Base.default.prototype.checkValidity.call(this, data, dirty);

      this.validityTabs = [];
      return this.component.components.reduce(function (check, comp) {
        var tabComp = _lodash.default.clone(comp);

        tabComp.type = 'panel';
        tabComp.internal = true;

        var component = _this5.createComponent(tabComp);

        _this5.validityTabs.push(component);

        var valid = component.checkValidity(data, dirty) && check;
        component.destroy();
        return valid;
      }, isValid);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var state = _get(_getPrototypeOf(TabsComponent.prototype), "destroy", this).call(this) || {};
      state.currentTab = this.currentTab;
      return state;
    }
    /**
     * Make sure to include the tab on the component as it is added.
     *
     * @param component
     * @param element
     * @param data
     * @param before
     * @return {BaseComponent}
     */

  }, {
    key: "addComponent",
    value: function addComponent(component, element, data, before, noAdd, state) {
      component.tab = this.currentTab;
      return _get(_getPrototypeOf(TabsComponent.prototype), "addComponent", this).call(this, component, element, data, before, noAdd, state);
    }
    /**
     * Only add the components for the active tab.
     */

  }, {
    key: "addComponents",
    value: function addComponents(element, data, options, state) {
      var _ref = state && state.currentTab ? state : this,
          currentTab = _ref.currentTab;

      this.setTab(currentTab, state);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return TabsComponent.schema();
    }
  }, {
    key: "schema",
    get: function get() {
      var _this6 = this;

      var schema = _get(_getPrototypeOf(TabsComponent.prototype), "schema", this);

      schema.components = this.component.components.map(function (tab, index) {
        if (index === _this6.currentTab) {
          tab.components = _this6.getComponents().map(function (component) {
            return component.schema;
          });
        }

        return tab;
      });
      return schema;
    }
  }]);

  return TabsComponent;
}(_NestedComponent2.default);

exports.default = TabsComponent;
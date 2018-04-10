'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsComponent = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Components = require('../Components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabsComponent = exports.TabsComponent = function (_FormioComponents) {
  _inherits(TabsComponent, _FormioComponents);

  _createClass(TabsComponent, null, [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Components.FormioComponents.schema.apply(_Components.FormioComponents, [{
        type: 'tabs',
        input: false,
        key: 'tabs',
        components: [{
          label: 'Tab 1',
          key: 'tab1',
          components: []
        }]
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
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
    _classCallCheck(this, TabsComponent);

    var _this = _possibleConstructorReturn(this, (TabsComponent.__proto__ || Object.getPrototypeOf(TabsComponent)).call(this, component, options, data));

    _this.currentTab = 0;
    return _this;
  }

  _createClass(TabsComponent, [{
    key: 'createElement',
    value: function createElement() {
      var _this2 = this;

      this.tabBar = this.ce('ul', {
        class: 'nav nav-tabs'
      });
      this.tabContent = this.ce('div', {
        class: 'tab-content'
      });
      this.tabs = [];
      this.tabLinks = [];
      _lodash2.default.each(this.component.components, function (tab, index) {
        var tabPanel = _this2.ce('div', {
          role: 'tabpanel',
          class: 'tab-pane',
          id: tab.key
        });
        var tabLink = _this2.ce('a', {
          href: '#' + tab.key
        }, tab.label);
        _this2.addEventListener(tabLink, 'click', function (event) {
          event.preventDefault();
          _this2.setTab(index);
        });
        var tabElement = _this2.ce('li', {
          role: 'presentation'
        }, tabLink);
        _this2.tabLinks.push(tabElement);
        _this2.tabs.push(tabPanel);
        _this2.tabBar.appendChild(tabElement);
        _this2.tabContent.appendChild(tabPanel);
      });
      this.element = this.ce('div', {
        id: this.id,
        class: this.className
      }, [this.tabBar, this.tabContent]);
      this.element.component = this;
      return this.element;
    }

    /**
     * Set the current tab.
     *
     * @param index
     */

  }, {
    key: 'setTab',
    value: function setTab(index) {
      var _this3 = this;

      if (!this.tabs || !this.component.components || !this.component.components[this.currentTab] || this.currentTab >= this.tabs.length) {
        return;
      }

      this.currentTab = index;

      // Get the current tab.
      var tab = this.component.components[this.currentTab];
      this.empty(this.tabs[this.currentTab]);
      _lodash2.default.remove(this.components, function (comp) {
        return comp.component.tab === _this3.currentTab;
      });
      var components = this.hook('addComponents', tab.components);
      _lodash2.default.each(components, function (component) {
        return _this3.addComponent(component, _this3.tabs[_this3.currentTab]);
      });
      this.checkConditions(this.root ? this.root.data : {});

      if (this.tabLinks.length <= index) {
        return;
      }

      _lodash2.default.each(this.tabLinks, function (tabLink) {
        _this3.removeClass(tabLink, 'active');
      });
      this.addClass(this.tabLinks[index], 'active');
      _lodash2.default.each(this.tabs, function (tab) {
        _this3.removeClass(tab, 'active');
      });
      this.addClass(this.tabs[index], 'active');
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
    key: 'addComponent',
    value: function addComponent(component, element, data, before) {
      component.tab = this.currentTab;
      return _get(TabsComponent.prototype.__proto__ || Object.getPrototypeOf(TabsComponent.prototype), 'addComponent', this).call(this, component, element, data, before);
    }

    /**
     * Only add the components for the active tab.
     */

  }, {
    key: 'addComponents',
    value: function addComponents() {
      this.setTab(this.currentTab);
    }
  }, {
    key: 'defaultSchema',
    get: function get() {
      return TabsComponent.schema();
    }
  }, {
    key: 'schema',
    get: function get() {
      var schema = _get(TabsComponent.prototype.__proto__ || Object.getPrototypeOf(TabsComponent.prototype), 'schema', this);
      schema.components = [];
      var allComponents = _lodash2.default.groupBy(this.getComponents(), 'component.tab');
      _lodash2.default.each(this.component.components, function (tab, index) {
        var tabSchema = tab;
        tabSchema.components = [];
        _lodash2.default.each(allComponents[index], function (component) {
          return tabSchema.components.push(component.schema);
        });
        schema.components.push(tabSchema);
      });
      return schema;
    }
  }]);

  return TabsComponent;
}(_Components.FormioComponents);
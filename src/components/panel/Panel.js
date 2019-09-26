"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NestedComponent2 = _interopRequireDefault(require("../nested/NestedComponent"));

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

var PanelComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(PanelComponent, _NestedComponent);

  _createClass(PanelComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        label: 'Panel',
        type: 'panel',
        key: 'panel',
        title: '',
        theme: 'default',
        breadcrumb: 'default',
        components: [],
        clearOnHide: false,
        input: false,
        tableView: false,
        dataGridLabel: false,
        persistent: false,
        lazyLoad: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Panel',
        icon: 'fa fa-list-alt',
        group: 'layout',
        documentation: 'http://help.form.io/userguide/#panels',
        weight: 30,
        schema: PanelComponent.schema()
      };
    }
  }]);

  function PanelComponent(component, options, data) {
    var _this;

    _classCallCheck(this, PanelComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PanelComponent).call(this, component, options, data));
    _this.lazyLoaded = false;
    return _this;
  }

  _createClass(PanelComponent, [{
    key: "getContainer",
    value: function getContainer() {
      return this.panelBody;
    }
  }, {
    key: "getCollapseIcon",
    value: function getCollapseIcon() {
      var collapseIcon = this.getIcon(this.collapsed ? 'plus' : 'minus');
      this.addClass(collapseIcon, 'formio-collapse-icon');
      return collapseIcon;
    }
  }, {
    key: "setCollapsed",
    value: function setCollapsed(element) {
      _get(_getPrototypeOf(PanelComponent.prototype), "setCollapsed", this).call(this, element);

      if (this.collapseIcon) {
        var newIcon = this.getCollapseIcon();
        this.panelTitle.replaceChild(newIcon, this.collapseIcon);
        this.collapseIcon = newIcon;
      }
    }
    /**
     * Return if this panel is lazy loadable.
     * @return {boolean}
     */

  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty) {
      // Make sure to toggle the collapsed state before checking validity.
      if (dirty && this.lazyLoadable) {
        this.lazyLoaded = true;
        this.addComponents();
      }

      return _get(_getPrototypeOf(PanelComponent.prototype), "checkValidity", this).call(this, data, dirty);
    }
  }, {
    key: "addComponents",
    value: function addComponents(element, data, options, state) {
      // If they are lazy loading, then only add the components if they toggle the collapsed state.
      if (this.lazyLoadable) {
        return;
      }

      return _get(_getPrototypeOf(PanelComponent.prototype), "addComponents", this).call(this, element, data, options, state);
    }
  }, {
    key: "toggleCollapse",
    value: function toggleCollapse() {
      if (this.lazyLoadable) {
        this.lazyLoaded = true;
        this.addComponents();
      }

      _get(_getPrototypeOf(PanelComponent.prototype), "toggleCollapse", this).call(this);
    }
  }, {
    key: "build",
    value: function build(state) {
      this.component.theme = this.component.theme || 'default';
      var panelClass = 'mb-2 card border ';
      panelClass += "panel panel-".concat(this.component.theme, " ");
      panelClass += this.component.customClass;
      this.element = this.ce('div', {
        id: this.id,
        class: panelClass
      });
      this.element.component = this;
      this.panelBody = this.ce('div', {
        class: 'card-body panel-body'
      });

      if (this.component.title && !this.component.hideLabel) {
        var heading = this.ce('div', {
          class: "card-header bg-".concat(this.component.theme, " panel-heading")
        });
        this.panelTitle = this.ce('h4', {
          class: 'mb-0 card-title panel-title'
        });

        if (this.component.collapsible) {
          this.collapseIcon = this.getCollapseIcon();
          this.panelTitle.appendChild(this.collapseIcon);
          this.panelTitle.appendChild(this.text(' '));
        }

        this.panelTitle.appendChild(this.text(this.component.title));
        this.createTooltip(this.panelTitle);
        heading.appendChild(this.panelTitle);
        this.setCollapseHeader(heading);
        this.element.appendChild(heading);
      } else {
        this.createTooltip(this.panelBody, this.component, "".concat(this.iconClass('question-sign'), " text-muted formio-hide-label-panel-tooltip"));
      }

      this.addComponents(null, null, null, state);
      this.element.appendChild(this.panelBody);
      this.setCollapsed();
      this.attachLogic();
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return PanelComponent.schema();
    }
  }, {
    key: "className",
    get: function get() {
      return "panel panel-".concat(this.component.theme, " ").concat(_get(_getPrototypeOf(PanelComponent.prototype), "className", this));
    }
  }, {
    key: "lazyLoadable",
    get: function get() {
      return !this.options.builder && this.component.lazyLoad && this.component.collapsible && this.collapsed && !this.lazyLoaded;
    }
  }]);

  return PanelComponent;
}(_NestedComponent2.default);

exports.default = PanelComponent;
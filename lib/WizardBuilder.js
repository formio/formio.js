"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _WebformBuilder2 = _interopRequireDefault(require("./WebformBuilder"));

var _Webform = _interopRequireDefault(require("./Webform"));

var _builder = _interopRequireDefault(require("./utils/builder"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var WizardBuilder = /*#__PURE__*/function (_WebformBuilder) {
  _inherits(WizardBuilder, _WebformBuilder);

  var _super = _createSuper(WizardBuilder);

  function WizardBuilder() {
    var _this;

    _classCallCheck(this, WizardBuilder);

    var element, options;

    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    } else {
      options = arguments[0];
    } // Reset skipInit in case PDFBuilder has set it.


    options.skipInit = false;
    _this = _super.call(this, element, options);
    _this._form = {
      components: [_this.getPageConfig(1)]
    };
    _this.page = 0;

    _this.options.hooks.attachPanel = function (element, component) {
      if (component.refs.removeComponent) {
        _this.addEventListener(component.refs.removeComponent, 'click', function () {
          var pageIndex = _this.pages.findIndex(function (page) {
            return page.key === component.key;
          });

          var componentIndex = _this._form.components.findIndex(function (comp) {
            return comp.key === component.key;
          });

          if (pageIndex !== -1) {
            _this.removePage(pageIndex, componentIndex);
          }
        });
      }
    };

    var originalRenderComponentsHook = _this.options.hooks.renderComponents;

    _this.options.hooks.renderComponents = function (html, _ref) {
      var components = _ref.components,
          self = _ref.self;

      if (self.type === 'form' && !self.root) {
        return html;
      } else {
        return originalRenderComponentsHook(html, {
          components: components,
          self: self
        });
      }
    };

    var originalAttachComponentsHook = _this.options.hooks.attachComponents;

    _this.options.hooks.attachComponents = function (element, components, container, component) {
      if (component.type === 'form' && !component.root) {
        return element;
      }

      return originalAttachComponentsHook(element, components, container, component);
    }; // Wizard pages don't replace themselves in the right array. Do that here.


    _this.on('saveComponent', function (component, originalComponent) {
      var webformComponents = _this.webform.components.map(function (_ref2) {
        var component = _ref2.component;
        return component;
      });

      if (_this._form.components.includes(originalComponent)) {
        _this._form.components[_this._form.components.indexOf(originalComponent)] = component;

        _this.rebuild();
      } else if (webformComponents.includes(originalComponent)) {
        _this._form.components.push(component);

        _this.rebuild();
      } else {
        // Fallback to look for panel based on key.
        var formComponentIndex = _this._form.components.findIndex(function (comp) {
          return originalComponent.key === comp.key;
        });

        if (formComponentIndex !== -1) {
          _this._form.components[formComponentIndex] = component;

          _this.rebuild();
        }
      }
    }, true);

    return _this;
  }

  _createClass(WizardBuilder, [{
    key: "allowDrop",
    value: function allowDrop(element) {
      return this.webform && this.webform.refs && this.webform.refs.webform === element ? false : true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return this.renderTemplate('builderWizard', {
        sidebar: this.renderTemplate('builderSidebar', {
          scrollEnabled: this.sideBarScroll,
          groupOrder: this.groupOrder,
          groupId: "builder-sidebar-".concat(this.id),
          groups: this.groupOrder.map(function (groupKey) {
            return _this2.renderTemplate('builderSidebarGroup', {
              group: _this2.groups[groupKey],
              groupKey: groupKey,
              groupId: "builder-sidebar-".concat(_this2.id),
              subgroups: _this2.groups[groupKey].subgroups.map(function (group) {
                return _this2.renderTemplate('builderSidebarGroup', {
                  group: group,
                  groupKey: group.key,
                  groupId: "builder-sidebar-".concat(groupKey),
                  subgroups: []
                });
              })
            });
          })
        }),
        pages: this.pages,
        form: this.webform.render()
      });
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this3 = this;

      this.loadRefs(element, {
        addPage: 'multiple',
        gotoPage: 'multiple'
      });
      this.refs.addPage.forEach(function (link) {
        _this3.addEventListener(link, 'click', function (event) {
          event.preventDefault();

          _this3.addPage();
        });
      });
      this.refs.gotoPage.forEach(function (link, index) {
        _this3.addEventListener(link, 'click', function (event) {
          event.preventDefault();

          _this3.setPage(index);
        });
      });
      return _get(_getPrototypeOf(WizardBuilder.prototype), "attach", this).call(this, element);
    }
  }, {
    key: "rebuild",
    value: function rebuild() {
      var page = this.currentPage;
      this.webform.form = {
        display: 'form',
        type: 'form',
        components: page ? [page] : []
      };
      return this.redraw();
    }
  }, {
    key: "addPage",
    value: function addPage() {
      var pageNum = this.pages.length + 1;
      var newPage = this.getPageConfig(pageNum);

      _builder.default.uniquify(this._form.components, newPage);

      this._form.components.push(newPage);

      this.emit('saveComponent', newPage, this._form.components);
      this.emit('change', this._form);
      return this.rebuild();
    }
  }, {
    key: "removePage",
    value: function removePage(pageIndex, componentIndex) {
      this._form.components.splice(componentIndex, 1);

      this.emit('change', this._form);

      if (pageIndex === this.pages.length) {
        // If the last page is removed.
        if (pageIndex === 0) {
          this._form.components.push(this.getPageConfig(1));

          return this.rebuild();
        } else {
          return this.setPage(pageIndex - 1);
        }
      } else {
        return this.rebuild();
      }
    }
  }, {
    key: "setPage",
    value: function setPage(index) {
      if (index === this.page) {
        return;
      }

      this.page = index;
      return this.rebuild();
    }
  }, {
    key: "getPageConfig",
    value: function getPageConfig(index) {
      var components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return {
        title: "Page ".concat(index),
        label: "Page ".concat(index),
        type: 'panel',
        key: "page".concat(index),
        components: components
      };
    }
  }, {
    key: "pasteComponent",
    value: function pasteComponent(component) {
      if (component instanceof WizardBuilder) {
        return;
      }

      return _get(_getPrototypeOf(WizardBuilder.prototype), "pasteComponent", this).call(this, component);
    }
  }, {
    key: "pages",
    get: function get() {
      return _lodash.default.filter(this._form.components, {
        type: 'panel'
      });
    }
  }, {
    key: "currentPage",
    get: function get() {
      var pages = this.pages;
      return pages && pages.length >= this.page ? pages[this.page] : null;
    }
  }, {
    key: "form",
    set: function set(value) {
      this._form = value;

      if (!this._form.components || !Array.isArray(this._form.components)) {
        this._form.components = [];
      }

      if (this.pages.length === 0) {
        var components = this._form.components.filter(function (component) {
          return component.type !== 'button';
        });

        this._form.components = [this.getPageConfig(1, components)];
      }

      this.rebuild();
    },
    get: function get() {
      return this._form;
    }
  }, {
    key: "schema",
    get: function get() {
      _lodash.default.assign(this.currentPage, this.webform._form.components[0]);

      var webform = new _Webform.default(this.options);
      webform.setForm(this._form, {
        noEmit: true
      });
      return webform.schema;
    }
  }]);

  return WizardBuilder;
}(_WebformBuilder2.default);

exports.default = WizardBuilder;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.string.includes");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Webform2 = _interopRequireDefault(require("./Webform"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _utils = require("./utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var Wizard = /*#__PURE__*/function (_Webform) {
  _inherits(Wizard, _Webform);

  var _super = _createSuper(Wizard);

  /**
   * Constructor for wizard based forms
   * @param element Dom element to place this wizard.
   * @param {Object} options Options object, supported options are:
   *    - breadcrumbSettings.clickable: true (default) determines if the breadcrumb bar is clickable or not
   *    - buttonSettings.show*(Previous, Next, Cancel): true (default) determines if the button is shown or not
   *    - allowPrevious: false (default) determines if the breadcrumb bar is clickable or not for visited tabs
   */
  function Wizard() {
    var _this;

    _classCallCheck(this, Wizard);

    var element, options;

    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    } else {
      options = arguments[0];
    }

    _this = _super.call(this, element, options);
    _this.pages = [];
    _this.prefixComps = [];
    _this.suffixComps = [];
    _this.components = [];
    _this.originalComponents = [];
    _this.page = 0;
    _this.currentPanel = null;
    _this.currentPanels = null;
    _this.currentNextPage = 0;
    _this._seenPages = [0];
    _this.subWizards = [];
    _this.allPages = [];
    _this.lastPromise = _nativePromiseOnly.default.resolve();
    _this.enabledIndex = 0;
    _this.editMode = false;
    return _this;
  }

  _createClass(Wizard, [{
    key: "isLastPage",
    value: function isLastPage() {
      var next = this.getNextPage();

      if (_lodash.default.isNumber(next)) {
        return next === -1;
      }

      return _lodash.default.isNull(next);
    }
  }, {
    key: "getPages",
    value: function getPages() {
      var _this2 = this;

      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _args$all = args.all,
          all = _args$all === void 0 ? false : _args$all;
      var pages = this.hasExtraPages ? this.components : this.pages;
      var filteredPages = pages.filter(all ? _lodash.default.identity : function (p, index) {
        return _this2._seenPages.includes(index);
      });
      return filteredPages;
    }
  }, {
    key: "checkConditions",
    value: function checkConditions(data, flags, row) {
      this.establishPages(data);
      return _get(_getPrototypeOf(Wizard.prototype), "checkConditions", this).call(this, data, flags, row);
    }
  }, {
    key: "getComponents",
    value: function getComponents() {
      return this.submitting ? this.getPages({
        all: this.isLastPage()
      }) : _get(_getPrototypeOf(Wizard.prototype), "getComponents", this).call(this);
    }
  }, {
    key: "resetValue",
    value: function resetValue() {
      this.getPages({
        all: true
      }).forEach(function (page) {
        return page.resetValue();
      });
      this.setPristine(true);
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      // Check for and initlize button settings object
      this.options.buttonSettings = _lodash.default.defaults(this.options.buttonSettings, {
        showPrevious: true,
        showNext: true,
        showSubmit: true,
        showCancel: !this.options.readOnly
      });
      this.options.breadcrumbSettings = _lodash.default.defaults(this.options.breadcrumbSettings, {
        clickable: true
      });
      this.options.allowPrevious = this.options.allowPrevious || false;
      this.page = 0;

      var onReady = _get(_getPrototypeOf(Wizard.prototype), "init", this).call(this);

      this.setComponentSchema();

      if (this.pages && this.pages.length) {
        this.component = this.pages[this.page].component;
      }

      this.on('subWizardsUpdated', function (subForm) {
        var subWizard = _this3.subWizards.find(function (subWizard) {
          var _subWizard$subForm;

          return (subForm === null || subForm === void 0 ? void 0 : subForm.id) && ((_subWizard$subForm = subWizard.subForm) === null || _subWizard$subForm === void 0 ? void 0 : _subWizard$subForm.id) === (subForm === null || subForm === void 0 ? void 0 : subForm.id);
        });

        if (_this3.subWizards.length && subWizard) {
          subWizard.subForm.setValue(subForm._submission, {}, true);

          _this3.establishPages();

          _this3.redraw();
        }
      });
      return onReady;
    }
  }, {
    key: "prepareNavigationSettings",
    value: function prepareNavigationSettings(ctx) {
      var currentPanel = this.currentPanel;

      if (currentPanel && currentPanel.buttonSettings) {
        Object.keys(currentPanel.buttonSettings).forEach(function () {
          Object.keys(ctx.buttons).forEach(function (key) {
            if (typeof currentPanel.buttonSettings[key] !== 'undefined' && !currentPanel.buttonSettings[key] || ctx.isSubForm) {
              ctx.buttons[key] = null;
            }
          });
        });
      }

      return this.renderTemplate('wizardNav', ctx);
    }
  }, {
    key: "prepareHeaderSettings",
    value: function prepareHeaderSettings(ctx) {
      if (this.currentPanel && this.currentPanel.breadcrumb === 'none' || ctx.isSubForm) {
        return null;
      }

      return this.renderTemplate('wizardHeader', ctx);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var ctx = this.renderContext;

      if (this.component.key) {
        ctx.panels.map(function (panel) {
          if (panel.key === _this4.component.key) {
            _this4.currentPanel = panel;
          }
        });
      }

      var wizardNav = this.prepareNavigationSettings(ctx);
      var wizardHeader = this.prepareHeaderSettings(ctx);
      return this.renderTemplate('wizard', _objectSpread(_objectSpread({}, ctx), {}, {
        className: _get(_getPrototypeOf(Wizard.prototype), "getClassName", this).call(this),
        wizardHeader: wizardHeader,
        wizardNav: wizardNav,
        components: this.renderComponents([].concat(_toConsumableArray(this.prefixComps), _toConsumableArray(this.currentPage.components), _toConsumableArray(this.suffixComps)))
      }), this.builderMode ? 'builder' : 'form');
    }
  }, {
    key: "redrawNavigation",
    value: function redrawNavigation() {
      if (this.element) {
        var navElement = this.element.querySelector("#".concat(this.wizardKey, "-nav"));

        if (navElement) {
          var _this$loadRefs;

          this.detachNav();
          navElement.outerHTML = this.renderTemplate('wizardNav', this.renderContext);
          navElement = this.element.querySelector("#".concat(this.wizardKey, "-nav"));
          this.loadRefs(navElement, (_this$loadRefs = {}, _defineProperty(_this$loadRefs, "".concat(this.wizardKey, "-cancel"), 'single'), _defineProperty(_this$loadRefs, "".concat(this.wizardKey, "-previous"), 'single'), _defineProperty(_this$loadRefs, "".concat(this.wizardKey, "-next"), 'single'), _defineProperty(_this$loadRefs, "".concat(this.wizardKey, "-submit"), 'single'), _this$loadRefs));
          this.attachNav();
        }
      }
    }
  }, {
    key: "redrawHeader",
    value: function redrawHeader() {
      if (this.element) {
        var headerElement = this.element.querySelector("#".concat(this.wizardKey, "-header"));

        if (headerElement) {
          this.detachHeader();
          headerElement.outerHTML = this.renderTemplate('wizardHeader', this.renderContext);
          headerElement = this.element.querySelector("#".concat(this.wizardKey, "-header"));
          this.loadRefs(headerElement, _defineProperty({}, "".concat(this.wizardKey, "-link"), 'multiple'));
          this.attachHeader();
        }
      }
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this$loadRefs3,
          _this5 = this;

      this.element = element;
      this.loadRefs(element, (_this$loadRefs3 = {}, _defineProperty(_this$loadRefs3, this.wizardKey, 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-cancel"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-previous"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-next"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-submit"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-link"), 'multiple'), _this$loadRefs3));

      if ((this.options.readOnly || this.editMode) && !this.enabledIndex) {
        var _this$pages;

        this.enabledIndex = ((_this$pages = this.pages) === null || _this$pages === void 0 ? void 0 : _this$pages.length) - 1;
      }

      var promises = this.attachComponents(this.refs[this.wizardKey], [].concat(_toConsumableArray(this.prefixComps), _toConsumableArray(this.currentPage.components), _toConsumableArray(this.suffixComps)));
      this.attachNav();
      this.attachHeader();
      return promises.then(function () {
        return _this5.emit('render', {
          component: _this5.currentPage,
          page: _this5.page
        });
      });
    }
  }, {
    key: "isBreadcrumbClickable",
    value: function isBreadcrumbClickable() {
      var _this6 = this;

      var currentPage = null;
      this.pages.map(function (page) {
        if (_lodash.default.isEqual(_this6.currentPage.component, page.component)) {
          currentPage = page;
        }
      });
      return _lodash.default.get(currentPage.component, 'breadcrumbClickable', true);
    }
  }, {
    key: "isAllowPrevious",
    value: function isAllowPrevious() {
      var _this7 = this;

      var currentPage = null;
      this.pages.map(function (page) {
        if (_lodash.default.isEqual(_this7.currentPage.component, page.component)) {
          currentPage = page;
        }
      });
      return _lodash.default.get(currentPage.component, 'allowPrevious', this.options.allowPrevious);
    }
  }, {
    key: "attachNav",
    value: function attachNav() {
      var _this8 = this;

      _lodash.default.each(this.buttons, function (button) {
        var buttonElement = _this8.refs["".concat(_this8.wizardKey, "-").concat(button.name)];

        _this8.addEventListener(buttonElement, 'click', function (event) {
          event.preventDefault(); // Disable the button until done.

          buttonElement.setAttribute('disabled', 'disabled');

          _this8.setLoading(buttonElement, true); // Call the button method, then re-enable the button.


          _this8[button.method]().then(function () {
            buttonElement.removeAttribute('disabled');

            _this8.setLoading(buttonElement, false);
          }).catch(function () {
            buttonElement.removeAttribute('disabled');

            _this8.setLoading(buttonElement, false);
          });
        });
      });
    }
  }, {
    key: "emitWizardPageSelected",
    value: function emitWizardPageSelected(index) {
      this.emit('wizardPageSelected', this.pages[index], index);
    }
  }, {
    key: "attachHeader",
    value: function attachHeader() {
      var _this9 = this;

      var isAllowPrevious = this.isAllowPrevious();

      if (this.isBreadcrumbClickable() || isAllowPrevious) {
        this.refs["".concat(this.wizardKey, "-link")].forEach(function (link, index) {
          if (!isAllowPrevious || index <= _this9.enabledIndex) {
            _this9.addEventListener(link, 'click', function (event) {
              _this9.emit('wizardNavigationClicked', _this9.pages[index]);

              event.preventDefault();
              return _this9.setPage(index).then(function () {
                _this9.emitWizardPageSelected(index);
              });
            });
          }
        });
      }
    }
  }, {
    key: "detachNav",
    value: function detachNav() {
      var _this10 = this;

      _lodash.default.each(this.buttons, function (button) {
        _this10.removeEventListener(_this10.refs["".concat(_this10.wizardKey, "-").concat(button.name)], 'click');
      });
    }
  }, {
    key: "detachHeader",
    value: function detachHeader() {
      var _this11 = this;

      this.refs["".concat(this.wizardKey, "-link")].forEach(function (link) {
        _this11.removeEventListener(link, 'click');
      });
    }
  }, {
    key: "transformPages",
    value: function transformPages() {
      var _this12 = this;

      var allComponents = [];
      var components = this.getSortedComponents(this);
      var defferedComponents = [];
      this.allPages = []; // Get all components including all nested components and line up in the correct order

      var getAllComponents = function getAllComponents(nestedComp, compsArr) {
        var pushAllowed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var nestedPages = [];
        var currentComponents = nestedComp !== null && nestedComp !== void 0 && nestedComp.subForm ? _this12.getSortedComponents(nestedComp.subForm) : (nestedComp === null || nestedComp === void 0 ? void 0 : nestedComp.components) || [];
        var visibleComponents = currentComponents.filter(function (comp) {
          return comp._visible;
        });
        var additionalComponents = visibleComponents.filter(function (comp) {
          return !comp.subForm;
        });
        var hasNested = false;
        (0, _utils.eachComponent)(visibleComponents, function (comp) {
          if (comp.component.type === 'panel' && comp !== null && comp !== void 0 && comp.parent.wizard && !getAllComponents(comp, compsArr, false)) {
            if (pushAllowed) {
              _this12.setRootPanelId(comp);

              nestedPages.push(comp);
            }

            hasNested = true;
          }

          if (comp && comp.subForm) {
            var hasNestedForm = getAllComponents(comp, nestedPages, pushAllowed);

            if (!hasNested) {
              hasNested = hasNestedForm;
            }
          }
        }, true);

        if (nestedComp.component.type === 'panel') {
          if (!hasNested && pushAllowed) {
            _this12.setRootPanelId(nestedComp);

            compsArr.push(nestedComp);
          }

          if (hasNested && additionalComponents.length) {
            var newComp = _lodash.default.clone(nestedComp);

            newComp.components = additionalComponents;

            _this12.setRootPanelId(newComp);

            defferedComponents.push(newComp);
          }
        }

        if (pushAllowed) {
          compsArr.push.apply(compsArr, _toConsumableArray(defferedComponents).concat(nestedPages));
          defferedComponents = [];
        }

        return hasNested;
      };

      components.forEach(function (component) {
        getAllComponents(component, allComponents);
      }, []);
      this.allPages = allComponents;
    }
  }, {
    key: "getSortedComponents",
    value: function getSortedComponents(_ref) {
      var components = _ref.components,
          originalComponents = _ref.originalComponents;
      // sorts components if they were shuffled after the conditional logic
      var currentComponents = [];
      var currentPages = [];

      if (components && components.length) {
        components.map(function (page) {
          if (page.component.type === 'panel') {
            currentPages[page.component.key || page.component.title] = page;
          }
        });
      }

      originalComponents === null || originalComponents === void 0 ? void 0 : originalComponents.forEach(function (item) {
        if (!item.key) {
          item.key = item.title;
        }

        if (currentPages[item.key]) {
          currentComponents.push(currentPages[item.key]);
        }
      });
      return currentComponents;
    }
  }, {
    key: "findRootPanel",
    value: function findRootPanel(component) {
      var _component$parent;

      return (_component$parent = component.parent) !== null && _component$parent !== void 0 && _component$parent.parent ? this.findRootPanel(component.parent) : component;
    }
  }, {
    key: "setRootPanelId",
    value: function setRootPanelId(component) {
      var _component$parent2;

      if (component.rootPanelId && component.rootPanelId !== component.id) {
        return;
      }

      var parent = (_component$parent2 = component.parent) !== null && _component$parent2 !== void 0 && _component$parent2.parent ? this.findRootPanel(component.parent) : component;
      component.rootPanelId = parent.id;
    }
  }, {
    key: "establishPages",
    value: function establishPages() {
      var _this13 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data;
      this.pages = [];
      this.prefixComps = [];
      this.suffixComps = [];
      var visible = [];
      var currentPages = {};

      var pageOptions = _lodash.default.clone(this.options);

      if (this.components && this.components.length) {
        this.components.map(function (page) {
          if (page.component.type === 'panel') {
            currentPages[page.component.key || page.component.title] = page;
          }
        });
      }

      if (this.originalComponents) {
        this.originalComponents.forEach(function (item) {
          if (item.type === 'panel') {
            if (!item.key) {
              item.key = item.title;
            }

            var page = currentPages[item.key];
            var isVisible = (0, _utils.checkCondition)(item, data, data, _this13.component, _this13) && !item.hidden;

            if (isVisible) {
              visible.push(item);

              if (page) {
                _this13.pages.push(page);
              }
            }

            if (!page && isVisible) {
              page = _this13.createComponent(item, pageOptions);
              page.visible = isVisible;

              _this13.pages.push(page);

              page.eachComponent(function (component) {
                component.page = _this13.pages.length - 1;
              });
            } else if (page && !isVisible) {
              _this13.removeComponent(page);
            }
          } else if (item.type !== 'button') {
            if (!_this13.pages.length) {
              _this13.prefixComps.push(_this13.createComponent(item, pageOptions));
            } else {
              _this13.suffixComps.push(_this13.createComponent(item, pageOptions));
            }
          }
        });
      }

      if (this.pages.length) {
        this.emit('pagesChanged');
      }

      this.transformPages();

      if (this.allPages && this.allPages.length) {
        this.pages = this.allPages;
      }

      return visible;
    }
  }, {
    key: "addComponents",
    value: function addComponents() {
      this.establishPages();
    }
  }, {
    key: "setPage",
    value: function setPage(num) {
      var _this14 = this;

      if (num === this.page) {
        return _nativePromiseOnly.default.resolve();
      }

      if (!this.wizard.full && num >= 0 && num < this.pages.length) {
        this.page = num;
        this.pageFieldLogic(num);
        this.getNextPage();
        var parentNum = num;

        if (this.hasExtraPages) {
          var pageFromPages = this.pages[num];
          var pageFromComponents = this.components[num];

          if (!pageFromComponents || pageFromPages.id !== pageFromComponents.id) {
            parentNum = this.components.findIndex(function (comp) {
              return comp.id === _this14.pages[parentNum].rootPanelId;
            });
          }
        }

        if (!this._seenPages.includes(parentNum)) {
          this._seenPages = this._seenPages.concat(parentNum);
        }

        this.redraw().then(function () {
          _this14.checkData(_this14.submission.data);
        });
        return _nativePromiseOnly.default.resolve();
      } else if (this.wizard.full || !this.pages.length) {
        this.redraw();
        return _nativePromiseOnly.default.resolve();
      }

      return _nativePromiseOnly.default.reject('Page not found');
    }
  }, {
    key: "pageFieldLogic",
    value: function pageFieldLogic(page) {
      // Handle field logic on pages.
      this.component = this.pages[page].component;
      this.originalComponent = (0, _utils.fastCloneDeep)(this.component);
      this.fieldLogic(this.data); // If disabled changed, be sure to distribute the setting.

      this.disabled = this.shouldDisabled;
    }
  }, {
    key: "getNextPage",
    value: function getNextPage() {
      var data = this.submission.data;
      var form = this.pages[this.page].component; // Check conditional nextPage

      if (form) {
        var page = this.pages.length > this.page + 1 && !this.showAllErrors ? this.page + 1 : -1;

        if (form.nextPage) {
          var next = this.evaluate(form.nextPage, {
            next: page,
            data: data,
            page: page,
            form: form
          }, 'next');

          if (next === null) {
            this.currentNextPage = null;
            return null;
          }

          var pageNum = parseInt(next, 10);

          if (!isNaN(parseInt(pageNum, 10)) && isFinite(pageNum)) {
            this.currentNextPage = pageNum;
            return pageNum;
          }

          this.currentNextPage = this.getPageIndexByKey(next);
          return this.currentNextPage;
        }

        this.currentNextPage = page;
        return page;
      }

      this.currentNextPage = null;
      return null;
    }
  }, {
    key: "getPreviousPage",
    value: function getPreviousPage() {
      return this.page - 1;
    }
  }, {
    key: "beforeSubmit",
    value: function beforeSubmit() {
      var pages = this.getPages();
      return _nativePromiseOnly.default.all(pages.map(function (page) {
        page.options.beforeSubmit = true;
        return page.beforeSubmit();
      }));
    }
  }, {
    key: "beforePage",
    value: function beforePage(next) {
      var _this15 = this;

      return new _nativePromiseOnly.default(function (resolve, reject) {
        _this15.hook(next ? 'beforeNext' : 'beforePrev', _this15.currentPage, _this15.submission, function (err) {
          if (err) {
            _this15.showErrors(err, true);

            reject(err);
          }

          var form = _this15.currentPage;

          if (form) {
            form.beforePage(next).then(resolve).catch(reject);
          } else {
            resolve();
          }
        });
      });
    }
  }, {
    key: "emitNextPage",
    value: function emitNextPage() {
      this.emit('nextPage', {
        page: this.page,
        submission: this.submission
      });
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      var _this16 = this;

      // Read-only forms should not worry about validation before going to next page, nor should they submit.
      if (this.options.readOnly) {
        return this.setPage(this.getNextPage()).then(function () {
          _this16.emit('nextPage', {
            page: _this16.page,
            submission: _this16.submission
          });
        });
      } // Validate the form, before go to the next page


      if (this.checkValidity(this.submission.data, true, this.submission.data, true)) {
        this.checkData(this.submission.data);
        return this.beforePage(true).then(function () {
          return _this16.setPage(_this16.getNextPage()).then(function () {
            if (!(_this16.options.readOnly || _this16.editMode) && _this16.enabledIndex < _this16.page) {
              _this16.enabledIndex = _this16.page;

              _this16.redraw();
            }

            _this16.emitNextPage();
          });
        });
      } else {
        this.currentPage.components.forEach(function (comp) {
          return comp.setPristine(false);
        });
        return _nativePromiseOnly.default.reject(this.showErrors([], true));
      }
    }
  }, {
    key: "emitPrevPage",
    value: function emitPrevPage() {
      this.emit('prevPage', {
        page: this.page,
        submission: this.submission
      });
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      var _this17 = this;

      return this.beforePage().then(function () {
        return _this17.setPage(_this17.getPreviousPage()).then(function () {
          _this17.emitPrevPage();
        });
      });
    }
  }, {
    key: "cancel",
    value: function cancel(noconfirm) {
      var _this18 = this;

      if (_get(_getPrototypeOf(Wizard.prototype), "cancel", this).call(this, noconfirm)) {
        this.setPristine(true);
        return this.setPage(0).then(function () {
          if (_this18.enabledIndex) {
            _this18.enabledIndex = 0;
          }

          _this18.onChange();

          _this18.redraw();

          return _this18.page;
        });
      }

      return _nativePromiseOnly.default.resolve();
    }
  }, {
    key: "getPageIndexByKey",
    value: function getPageIndexByKey(key) {
      var pageIndex = this.page;
      this.pages.forEach(function (page, index) {
        if (page.component.key === key) {
          pageIndex = index;
          return false;
        }
      });
      return pageIndex;
    }
  }, {
    key: "setComponentSchema",
    value: function setComponentSchema() {
      var _this19 = this;

      var pageKeys = {};
      this.originalComponents = [];
      this.component.components.map(function (item) {
        if (item.type === 'panel') {
          item.key = (0, _utils.uniqueKey)(pageKeys, item.key || 'panel');
          pageKeys[item.key] = true;
        }

        _this19.originalComponents.push(_lodash.default.clone(item));
      });

      if (!Object.keys(pageKeys).length) {
        var newPage = {
          type: 'panel',
          title: 'Page 1',
          label: 'Page 1',
          key: 'page1',
          components: this.component.components
        };
        this.component.components = [newPage];
        this.originalComponents.push(_lodash.default.clone(newPage));
      }
    }
  }, {
    key: "setForm",
    value: function setForm(form, flags) {
      if (!form) {
        return;
      }

      return _get(_getPrototypeOf(Wizard.prototype), "setForm", this).call(this, form, flags);
    }
  }, {
    key: "onSetForm",
    value: function onSetForm(clonedForm, initialForm) {
      this.component.components = (this._parentPath ? initialForm.components : clonedForm.components) || [];
      this.setComponentSchema();
    }
  }, {
    key: "pageFieldLogicHandler",
    value: function pageFieldLogicHandler() {
      this.pageFieldLogic(this.page);
    }
  }, {
    key: "setValue",
    value: function setValue(submission) {
      var _this20 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ignoreEstablishment = arguments.length > 2 ? arguments[2] : undefined;
      this._submission = submission;

      if (flags && flags.fromSubmission && (this.options.readOnly || this.editMode)) {
        this._data = submission.data;
      }

      if (!ignoreEstablishment) {
        this.establishPages(submission.data);
      }

      var changed = this.getPages({
        all: true
      }).reduce(function (changed, page) {
        return _this20.setNestedValue(page, submission.data, flags, changed) || changed;
      }, false);
      this.pageFieldLogicHandler();

      if (!this.editMode && submission._id && !this.options.readOnly) {
        this.editMode = true;
        this.redraw();
      }

      return changed;
    }
  }, {
    key: "isClickable",
    value: function isClickable(page, index) {
      return this.page !== index && (0, _utils.firstNonNil)([_lodash.default.get(page, 'breadcrumbClickable'), this.options.breadcrumbSettings.clickable]);
    }
  }, {
    key: "hasButton",
    value: function hasButton(name) {
      var nextPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getNextPage();

      // get page options with global options as default values
      var _$get = _lodash.default.get(this.currentPage, 'component.buttonSettings', {}),
          _$get$previous = _$get.previous,
          previous = _$get$previous === void 0 ? this.options.buttonSettings.showPrevious : _$get$previous,
          _$get$cancel = _$get.cancel,
          cancel = _$get$cancel === void 0 ? this.options.buttonSettings.showCancel : _$get$cancel,
          _$get$submit = _$get.submit,
          submit = _$get$submit === void 0 ? this.options.buttonSettings.showSubmit : _$get$submit,
          _$get$next = _$get.next,
          next = _$get$next === void 0 ? this.options.buttonSettings.showNext : _$get$next;

      switch (name) {
        case 'previous':
          return previous && this.getPreviousPage() > -1;

        case 'next':
          return next && nextPage !== null && nextPage !== -1;

        case 'cancel':
          return cancel;

        case 'submit':
          return submit && !this.options.readOnly && (nextPage === null || this.page === this.pages.length - 1);

        default:
          return true;
      }
    }
  }, {
    key: "pageId",
    value: function pageId(page) {
      if (page.key) {
        // Some panels have the same key....
        return "".concat(page.key, "-").concat(page.title);
      } else if (page.components && page.components.length > 0) {
        return this.pageId(page.components[0]);
      } else {
        return page.title;
      }
    }
  }, {
    key: "onChange",
    value: function onChange(flags, changed, modified, changes) {
      var _this21 = this;

      _get(_getPrototypeOf(Wizard.prototype), "onChange", this).call(this, flags, changed, modified, changes);

      if (this.alert && !this.submitted) {
        this.checkValidity(this.submission.data, false, this.submission.data, true);
        this.showErrors([], true, true);
      } // If the pages change, need to redraw the header.


      var currentPanels;
      var panels;
      var currentNextPage = this.currentNextPage;

      if (this.hasExtraPages) {
        currentPanels = this.pages.map(function (page) {
          return page.component.key;
        });
        this.establishPages();
        panels = this.pages.map(function (page) {
          return page.component.key;
        });
      } else {
        currentPanels = this.currentPanels || this.pages.map(function (page) {
          return page.component.key;
        });
        panels = this.establishPages().map(function (panel) {
          return panel.key;
        });
        this.currentPanels = panels;

        if (this.currentPanel && this.currentPanel.key) {
          this.setPage(this.currentPanels.findIndex(function (panel) {
            return panel === _this21.currentPanel.key;
          }));
        }
      }

      if (!_lodash.default.isEqual(panels, currentPanels) || flags && flags.fromSubmission) {
        this.redrawHeader();
      } // If the next page changes, then make sure to redraw navigation.


      if (currentNextPage !== this.getNextPage()) {
        this.redrawNavigation();
      }
    }
  }, {
    key: "redraw",
    value: function redraw() {
      var _this$parent, _this$parent$componen;

      if ((_this$parent = this.parent) !== null && _this$parent !== void 0 && (_this$parent$componen = _this$parent.component) !== null && _this$parent$componen !== void 0 && _this$parent$componen.modalEdit) {
        return this.parent.redraw();
      }

      return _get(_getPrototypeOf(Wizard.prototype), "redraw", this).call(this);
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty, row, currentPageOnly) {
      if (!this.checkCondition(row, data)) {
        this.setCustomValidity('');
        return true;
      }

      var components = !currentPageOnly || this.isLastPage() ? this.getComponents() : this.currentPage.components;
      return components.reduce(function (check, comp) {
        return comp.checkValidity(data, dirty, row) && check;
      }, true);
    }
  }, {
    key: "focusOnComponent",
    value: function focusOnComponent(key) {
      var _this22 = this;

      var pageIndex = 0;

      var _this$pages$filter = this.pages.filter(function (page, index) {
        if (page.getComponent(key)) {
          pageIndex = index;
          return true;
        }

        return false;
      }),
          _this$pages$filter2 = _slicedToArray(_this$pages$filter, 1),
          page = _this$pages$filter2[0];

      if (page && page !== this.currentPage) {
        return this.setPage(pageIndex).then(function () {
          _this22.checkValidity(_this22.submission.data, true, _this22.submission.data);

          _this22.showErrors();

          _get(_getPrototypeOf(Wizard.prototype), "focusOnComponent", _this22).call(_this22, key);
        });
      }

      return _get(_getPrototypeOf(Wizard.prototype), "focusOnComponent", this).call(this, key);
    }
  }, {
    key: "hasExtraPages",
    get: function get() {
      return !_lodash.default.isEmpty(this.subWizards);
    }
  }, {
    key: "data",
    get: function get() {
      return _get(_getPrototypeOf(Wizard.prototype), "data", this);
    },
    set: function set(value) {
      var _this23 = this;

      this._data = value;

      _lodash.default.each(this.getPages({
        all: true
      }), function (component) {
        component.data = _this23.componentContext(component);
      });
    }
  }, {
    key: "wizardKey",
    get: function get() {
      return "wizard-".concat(this.id);
    }
  }, {
    key: "wizard",
    get: function get() {
      return this.form;
    },
    set: function set(form) {
      this.setForm(form);
    }
  }, {
    key: "buttons",
    get: function get() {
      var _this24 = this;

      var buttons = {};
      [{
        name: 'cancel',
        method: 'cancel'
      }, {
        name: 'previous',
        method: 'prevPage'
      }, {
        name: 'next',
        method: 'nextPage'
      }, {
        name: 'submit',
        method: 'submit'
      }].forEach(function (button) {
        if (_this24.hasButton(button.name)) {
          buttons[button.name] = button;
        }
      });
      return buttons;
    }
  }, {
    key: "renderContext",
    get: function get() {
      var _this$root, _this$root$component;

      return {
        wizardKey: this.wizardKey,
        isBreadcrumbClickable: this.isBreadcrumbClickable(),
        isSubForm: !!this.parent && !((_this$root = this.root) !== null && _this$root !== void 0 && (_this$root$component = _this$root.component) !== null && _this$root$component !== void 0 && _this$root$component.type) === 'wizard',
        panels: this.allPages.length ? this.allPages.map(function (page) {
          return page.component;
        }) : this.pages.map(function (page) {
          return page.component;
        }),
        buttons: this.buttons,
        currentPage: this.page
      };
    }
  }, {
    key: "currentPage",
    get: function get() {
      return this.pages && this.pages.length >= this.page ? this.pages[this.page] : {
        components: []
      };
    }
  }, {
    key: "schema",
    get: function get() {
      return this.wizard;
    }
  }, {
    key: "errors",
    get: function get() {
      if (!this.isLastPage()) {
        return this.currentPage.errors;
      }

      return _get(_getPrototypeOf(Wizard.prototype), "errors", this);
    }
  }]);

  return Wizard;
}(_Webform2.default);

exports.default = Wizard;
Wizard.setBaseUrl = _Formio.default.setBaseUrl;
Wizard.setApiUrl = _Formio.default.setApiUrl;
Wizard.setAppUrl = _Formio.default.setAppUrl;
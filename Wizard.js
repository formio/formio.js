"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.find-index.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Webform2 = _interopRequireDefault(require("./Webform"));

var _Formio = require("./Formio");

var _utils = require("./utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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
      options = arguments[1] || {};
    } else {
      options = arguments[0] || {};
    }

    options.display = 'wizard';
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
    _this.originalOptions = _lodash.default.cloneDeep(_this.options);
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
      var _this3 = this;

      this._data = value;

      _lodash.default.each(this.getPages({
        all: true
      }), function (component) {
        component.data = _this3.componentContext(component);
      });
    }
  }, {
    key: "localData",
    get: function get() {
      var _this$pages$this$page, _this$pages$this$page2;

      return ((_this$pages$this$page = this.pages[this.page]) === null || _this$pages$this$page === void 0 ? void 0 : (_this$pages$this$page2 = _this$pages$this$page.root) === null || _this$pages$this$page2 === void 0 ? void 0 : _this$pages$this$page2.submission.data) || this.submission.data;
    }
  }, {
    key: "checkConditions",
    value: function checkConditions(data, flags, row) {
      var visible = _get(_getPrototypeOf(Wizard.prototype), "checkConditions", this).call(this, data, flags, row);

      this.establishPages(data);
      return visible;
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
      var _this$pages,
          _this4 = this;

      // Check for and initlize button settings object
      this.options.buttonSettings = _lodash.default.defaults(this.options.buttonSettings, {
        showPrevious: true,
        showNext: true,
        showSubmit: true,
        showCancel: !this.options.readOnly
      });

      if (!this.isSecondInit) {
        var _this$options, _this$options$breadcr;

        this.isClickableDefined = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : (_this$options$breadcr = _this$options.breadcrumbSettings) === null || _this$options$breadcr === void 0 ? void 0 : _this$options$breadcr.hasOwnProperty('clickable');
        this.isSecondInit = true;
      }

      this.options.breadcrumbSettings = _lodash.default.defaults(this.options.breadcrumbSettings, {
        clickable: true
      });
      this.options.allowPrevious = this.options.allowPrevious || false;
      this.page = 0;

      var onReady = _get(_getPrototypeOf(Wizard.prototype), "init", this).call(this);

      this.setComponentSchema();

      if ((_this$pages = this.pages) !== null && _this$pages !== void 0 && _this$pages[this.page]) {
        this.component = this.pages[this.page].component;
      }

      this.on('subWizardsUpdated', function (subForm) {
        var subWizard = _this4.subWizards.find(function (subWizard) {
          var _subWizard$subForm;

          return (subForm === null || subForm === void 0 ? void 0 : subForm.id) && ((_subWizard$subForm = subWizard.subForm) === null || _subWizard$subForm === void 0 ? void 0 : _subWizard$subForm.id) === (subForm === null || subForm === void 0 ? void 0 : subForm.id);
        });

        if (_this4.subWizards.length && subWizard) {
          subWizard.subForm.setValue(subForm._submission, {}, true);

          _this4.establishPages();

          _this4.redraw();
        }
      });
      return onReady;
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
      var _this5 = this;

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
        if (_this5.hasButton(button.name)) {
          buttons[button.name] = button;
        }
      });
      return buttons;
    }
  }, {
    key: "buttonOrder",
    get: function get() {
      var _this$options$propert, _this$options$propert2, _this$options$propert3;

      var defaultButtonOrder = ['cancel', 'previous', 'next', 'submit'];
      return (_this$options$propert = (_this$options$propert2 = this.options.properties) === null || _this$options$propert2 === void 0 ? void 0 : (_this$options$propert3 = _this$options$propert2.wizardButtonOrder) === null || _this$options$propert3 === void 0 ? void 0 : _this$options$propert3.toLowerCase().split(', ')) !== null && _this$options$propert !== void 0 ? _this$options$propert : defaultButtonOrder;
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
        currentPage: this.page,
        buttonOrder: this.buttonOrder
      };
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
    value: function prepareHeaderSettings(ctx, headerType) {
      if (this.currentPanel && this.currentPanel.breadcrumb === 'none' || ctx.isSubForm) {
        return null;
      }

      return this.renderTemplate(headerType, ctx);
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var ctx = this.renderContext;

      if (this.component.key) {
        ctx.panels.map(function (panel) {
          if (panel.key === _this6.component.key) {
            _this6.currentPanel = panel;
            ctx.wizardPageTooltip = _this6.getFormattedTooltip(panel.tooltip);
          }
        });
      }

      var wizardNav = this.prepareNavigationSettings(ctx);
      var wizardHeaderType = "wizardHeader".concat(_lodash.default.get(this.form, 'settings.wizardHeaderType', ''));

      var wizardHeaderLocation = _lodash.default.get(this.form, 'settings.wizardHeaderLocation', 'left');

      var wizardHeader = this.prepareHeaderSettings(ctx, wizardHeaderType);
      return this.renderTemplate('wizard', _objectSpread(_objectSpread({}, ctx), {}, {
        className: _get(_getPrototypeOf(Wizard.prototype), "getClassName", this).call(this),
        wizardHeader: wizardHeader,
        wizardHeaderType: wizardHeaderType,
        wizardHeaderLocation: wizardHeaderLocation,
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
          var _this$loadRefs2;

          this.detachHeader();
          headerElement.outerHTML = this.renderTemplate("wizardHeader".concat(_lodash.default.get(this.form, 'settings.wizardHeaderType', '')), this.renderContext);
          headerElement = this.element.querySelector("#".concat(this.wizardKey, "-header"));
          this.loadRefs(headerElement, (_this$loadRefs2 = {}, _defineProperty(_this$loadRefs2, "".concat(this.wizardKey, "-link"), 'multiple'), _defineProperty(_this$loadRefs2, "".concat(this.wizardKey, "-tooltip"), 'multiple'), _this$loadRefs2));
          this.attachHeader();
        }
      }
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this$loadRefs3,
          _this7 = this;

      this.element = element;
      this.loadRefs(element, (_this$loadRefs3 = {}, _defineProperty(_this$loadRefs3, this.wizardKey, 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-header"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-cancel"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-previous"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-next"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-submit"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-link"), 'multiple'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-tooltip"), 'multiple'), _this$loadRefs3));

      if ((this.options.readOnly || this.editMode) && !this.enabledIndex) {
        var _this$pages2;

        this.enabledIndex = ((_this$pages2 = this.pages) === null || _this$pages2 === void 0 ? void 0 : _this$pages2.length) - 1;
      }

      this.hook('attachWebform', element, this);
      var promises = this.attachComponents(this.refs[this.wizardKey], [].concat(_toConsumableArray(this.prefixComps), _toConsumableArray(this.currentPage.components), _toConsumableArray(this.suffixComps)));
      this.attachNav();
      this.attachHeader();
      return promises.then(function () {
        _this7.emit('render', {
          component: _this7.currentPage,
          page: _this7.page
        });

        if (_this7.component.scrollToTop) {
          _this7.scrollPageToTop();
        }
      });
    }
  }, {
    key: "scrollPageToTop",
    value: function scrollPageToTop() {
      var _this$refs$;

      var pageTop = (_this$refs$ = this.refs["".concat(this.wizardKey, "-header")]) !== null && _this$refs$ !== void 0 ? _this$refs$ : this.refs[this.wizardKey];

      if (!pageTop) {
        return;
      }

      if ('scrollIntoView' in pageTop) {
        pageTop.scrollIntoView(true);
      } else {
        this.scrollIntoView(pageTop);
      }
    }
  }, {
    key: "isBreadcrumbClickable",
    value: function isBreadcrumbClickable() {
      var _this8 = this;

      var currentPage = null;
      this.pages.map(function (page) {
        if (_lodash.default.isEqual(_this8.currentPage.component, page.component)) {
          currentPage = page;
        }
      });
      return this.isClickableDefined ? this.options.breadcrumbSettings.clickable : _lodash.default.get(currentPage, 'component.breadcrumbClickable', true);
    }
  }, {
    key: "isAllowPrevious",
    value: function isAllowPrevious() {
      var _this9 = this;

      var currentPage = null;
      this.pages.map(function (page) {
        if (_lodash.default.isEqual(_this9.currentPage.component, page.component)) {
          currentPage = page;
        }
      });
      return _lodash.default.get(currentPage.component, 'allowPrevious', this.options.allowPrevious);
    }
  }, {
    key: "handleNaviageteOnEnter",
    value: function handleNaviageteOnEnter(event) {
      if (event.keyCode === 13) {
        var clickEvent = new CustomEvent('click');
        var buttonElement = this.refs["".concat(this.wizardKey, "-").concat(this.buttons.next.name)];

        if (buttonElement) {
          buttonElement.dispatchEvent(clickEvent);
        }
      }
    }
  }, {
    key: "handleSaveOnEnter",
    value: function handleSaveOnEnter(event) {
      if (event.keyCode === 13) {
        var clickEvent = new CustomEvent('click');
        var buttonElement = this.refs["".concat(this.wizardKey, "-").concat(this.buttons.submit.name)];

        if (buttonElement) {
          buttonElement.dispatchEvent(clickEvent);
        }
      }
    }
  }, {
    key: "attachNav",
    value: function attachNav() {
      var _this10 = this;

      if (this.component.navigateOnEnter) {
        this.addEventListener(document, 'keyup', this.handleNaviageteOnEnter.bind(this));
      }

      if (this.component.saveOnEnter) {
        this.addEventListener(document, 'keyup', this.handleSaveOnEnter.bind(this));
      }

      _lodash.default.each(this.buttons, function (button) {
        var buttonElement = _this10.refs["".concat(_this10.wizardKey, "-").concat(button.name)];

        _this10.addEventListener(buttonElement, 'click', function (event) {
          event.preventDefault(); // Disable the button until done.

          buttonElement.setAttribute('disabled', 'disabled');

          _this10.setLoading(buttonElement, true); // Call the button method, then re-enable the button.


          _this10[button.method]().then(function () {
            buttonElement.removeAttribute('disabled');

            _this10.setLoading(buttonElement, false);
          }).catch(function () {
            buttonElement.removeAttribute('disabled');

            _this10.setLoading(buttonElement, false);
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
      var _this11 = this;

      var isAllowPrevious = this.isAllowPrevious();
      this.attachTooltips(this.refs["".concat(this.wizardKey, "-tooltip")], this.currentPanel.tooltip);

      if (this.isBreadcrumbClickable() || isAllowPrevious) {
        var _this$refs$2;

        (_this$refs$2 = this.refs["".concat(this.wizardKey, "-link")]) === null || _this$refs$2 === void 0 ? void 0 : _this$refs$2.forEach(function (link, index) {
          if (!isAllowPrevious || index <= _this11.enabledIndex) {
            _this11.addEventListener(link, 'click', function (event) {
              _this11.emit('wizardNavigationClicked', _this11.pages[index]);

              event.preventDefault();
              return _this11.setPage(index).then(function () {
                _this11.emitWizardPageSelected(index);
              });
            });
          }
        });
      }
    }
  }, {
    key: "detachNav",
    value: function detachNav() {
      var _this12 = this;

      if (this.component.navigateOnEnter) {
        this.removeEventListener(document, 'keyup', this.handleNaviageteOnEnter.bind(this));
      }

      if (this.component.saveOnEnter) {
        this.removeEventListener(document, 'keyup', this.handleSaveOnEnter.bind(this));
      }

      _lodash.default.each(this.buttons, function (button) {
        _this12.removeEventListener(_this12.refs["".concat(_this12.wizardKey, "-").concat(button.name)], 'click');
      });
    }
  }, {
    key: "detachHeader",
    value: function detachHeader() {
      var _this13 = this;

      if (this.refs["".concat(this.wizardKey, "-link")]) {
        this.refs["".concat(this.wizardKey, "-link")].forEach(function (link) {
          _this13.removeEventListener(link, 'click');
        });
      }
    }
  }, {
    key: "transformPages",
    value: function transformPages() {
      var _this14 = this;

      var allComponents = [];
      var components = this.getSortedComponents(this);
      var defferedComponents = [];
      this.allPages = []; // Get all components including all nested components and line up in the correct order

      var getAllComponents = function getAllComponents(nestedComp, compsArr) {
        var pushAllowed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var nestedPages = [];
        var dataArrayComponents = ['datagrid', 'editgrid', 'dynamicWizard'];
        var currentComponents = nestedComp !== null && nestedComp !== void 0 && nestedComp.subForm ? _this14.getSortedComponents(nestedComp.subForm) : (nestedComp === null || nestedComp === void 0 ? void 0 : nestedComp.components) || [];
        var visibleComponents = currentComponents.filter(function (comp) {
          return comp._visible;
        });
        var filteredComponents = visibleComponents.filter(function (comp) {
          return !dataArrayComponents.includes(comp.component.type) && (comp.type !== 'form' || comp.isNestedWizard);
        });
        var additionalComponents = currentComponents.filter(function (comp) {
          var _comp$subForm;

          return ((_comp$subForm = comp.subForm) === null || _comp$subForm === void 0 ? void 0 : _comp$subForm._form.display) !== 'wizard';
        });
        var hasNested = false;
        (0, _utils.eachComponent)(filteredComponents, function (comp) {
          if (comp && comp.component) {
            if (comp.component.type === 'panel' && comp !== null && comp !== void 0 && comp.parent.wizard && !getAllComponents(comp, compsArr, false)) {
              if (pushAllowed) {
                _this14.setRootPanelId(comp);

                nestedPages.push(comp);
              }

              hasNested = true;
            }

            if (comp.isNestedWizard && comp.subForm) {
              var hasNestedForm = getAllComponents(comp, nestedPages, pushAllowed);

              if (!hasNested) {
                hasNested = hasNestedForm;
              }
            }
          }
        }, true);

        if (nestedComp.component.type === 'panel') {
          if (!hasNested && pushAllowed) {
            _this14.setRootPanelId(nestedComp);

            compsArr.push(nestedComp);
          }

          if (hasNested && additionalComponents.length) {
            var newComp = _lodash.default.clone(nestedComp);

            newComp.components = additionalComponents;

            _this14.setRootPanelId(newComp);

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
        if (component.visible) {
          getAllComponents(component, allComponents);
        }
      }, []); // recalculate pages only for root wizards, including the situation when the wizard is in a wrapper

      if (this.localRoot && this.id === this.localRoot.id) {
        allComponents.forEach(function (comp, index) {
          comp.eachComponent(function (component) {
            component.page = index;
          });
        });
      }

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
      var _this15 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data;
      this.pages = [];
      this.prefixComps = [];
      this.suffixComps = [];
      var visible = [];
      var currentPages = {};

      var pageOptions = _objectSpread(_objectSpread({}, _lodash.default.clone(this.options)), this.parent ? {
        root: this
      } : {});

      if (this.components && this.components.length) {
        this.components.forEach(function (page) {
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
            var forceShow = _this15.options.show ? _this15.options.show[item.key] : false;
            var forceHide = _this15.options.hide ? _this15.options.hide[item.key] : false;
            var isVisible = !page ? (0, _utils.checkCondition)(item, data, data, _this15.component, _this15) && !item.hidden : page.visible;

            if (forceShow) {
              isVisible = true;
            } else if (forceHide) {
              isVisible = false;
            }

            if (isVisible) {
              visible.push(item);

              if (page) {
                _this15.pages.push(page);
              }
            }

            if (!page && isVisible) {
              page = _this15.createComponent(item, pageOptions);
              page.visible = isVisible;

              _this15.pages.push(page);

              page.eachComponent(function (component) {
                component.page = _this15.pages.length - 1;
              });
            }
          } else if (item.type !== 'button') {
            if (!_this15.pages.length) {
              _this15.prefixComps.push(_this15.createComponent(item, pageOptions));
            } else {
              _this15.suffixComps.push(_this15.createComponent(item, pageOptions));
            }
          }
        });
      }

      if (this.pages.length) {
        this.emit('pagesChanged');
      }

      this.transformPages();

      if (this.allPages && this.allPages.length) {
        this.updatePages();
      }

      return visible;
    }
  }, {
    key: "updatePages",
    value: function updatePages() {
      this.pages = this.allPages;
    }
  }, {
    key: "addComponents",
    value: function addComponents() {
      this.establishPages();
    }
  }, {
    key: "setPage",
    value: function setPage(num) {
      var _this16 = this;

      if (num === this.page) {
        return _nativePromiseOnly.default.resolve();
      }

      if (num >= 0 && num < this.pages.length) {
        this.page = num;
        this.pageFieldLogic(num);
        this.getNextPage();
        var parentNum = num;

        if (this.hasExtraPages) {
          var pageFromPages = this.pages[num];
          var pageFromComponents = this.components[num];

          if (!pageFromComponents || (pageFromPages === null || pageFromPages === void 0 ? void 0 : pageFromPages.id) !== pageFromComponents.id) {
            parentNum = this.components.findIndex(function (comp) {
              var _this16$pages, _this16$pages$parentN;

              return comp.id === ((_this16$pages = _this16.pages) === null || _this16$pages === void 0 ? void 0 : (_this16$pages$parentN = _this16$pages[parentNum]) === null || _this16$pages$parentN === void 0 ? void 0 : _this16$pages$parentN.rootPanelId);
            });
          }
        }

        if (!this._seenPages.includes(parentNum)) {
          this._seenPages = this._seenPages.concat(parentNum);
        }

        this.redraw().then(function () {
          _this16.checkData(_this16.submission.data);
        });
        return _nativePromiseOnly.default.resolve();
      } else if (!this.pages.length) {
        this.redraw();
        return _nativePromiseOnly.default.resolve();
      }

      return _nativePromiseOnly.default.reject('Page not found');
    }
  }, {
    key: "pageFieldLogic",
    value: function pageFieldLogic(page) {
      var _this$pages3;

      if ((_this$pages3 = this.pages) !== null && _this$pages3 !== void 0 && _this$pages3[page]) {
        // Handle field logic on pages.
        this.component = this.pages[page].component;
        this.originalComponent = (0, _utils.fastCloneDeep)(this.component);
        this.fieldLogic(this.data); // If disabled changed, be sure to distribute the setting.

        this.disabled = this.shouldDisabled;
      }
    }
  }, {
    key: "currentPage",
    get: function get() {
      return this.pages && this.pages.length >= this.page ? this.pages[this.page] : {
        components: []
      };
    }
  }, {
    key: "getNextPage",
    value: function getNextPage() {
      var _this$pages4;

      if ((_this$pages4 = this.pages) !== null && _this$pages4 !== void 0 && _this$pages4[this.page]) {
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
      }

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
      var _this17 = this;

      return new _nativePromiseOnly.default(function (resolve, reject) {
        _this17.hook(next ? 'beforeNext' : 'beforePrev', _this17.currentPage, _this17.submission, function (err) {
          if (err) {
            _this17.showErrors(err, true);

            reject(err);
          }

          var form = _this17.currentPage;

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
      var _this18 = this;

      // Read-only forms should not worry about validation before going to next page, nor should they submit.
      if (this.options.readOnly) {
        return this.beforePage(true).then(function () {
          return _this18.setPage(_this18.getNextPage()).then(function () {
            _this18.emitNextPage();
          });
        });
      } // Validate the form, before go to the next page


      if (this.checkValidity(this.localData, true, this.localData, true)) {
        this.checkData(this.submission.data);
        return this.beforePage(true).then(function () {
          return _this18.setPage(_this18.getNextPage()).then(function () {
            if (!(_this18.options.readOnly || _this18.editMode) && _this18.enabledIndex < _this18.page) {
              _this18.enabledIndex = _this18.page;

              _this18.redraw();
            }

            _this18.emitNextPage();
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
      var _this19 = this;

      return this.beforePage().then(function () {
        return _this19.setPage(_this19.getPreviousPage()).then(function () {
          _this19.emitPrevPage();
        });
      });
    }
  }, {
    key: "cancel",
    value: function cancel(noconfirm) {
      var _this20 = this;

      if (this.options.readOnly) {
        return _nativePromiseOnly.default.resolve();
      }

      if (_get(_getPrototypeOf(Wizard.prototype), "cancel", this).call(this, noconfirm)) {
        this.setPristine(true);
        return this.setPage(0).then(function () {
          if (_this20.enabledIndex) {
            _this20.enabledIndex = 0;
          }

          _this20.onChange();

          _this20.redraw();

          return _this20.page;
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
    key: "schema",
    get: function get() {
      return this.wizard;
    }
  }, {
    key: "setComponentSchema",
    value: function setComponentSchema() {
      var _this21 = this;

      var pageKeys = {};
      this.originalComponents = [];
      this.component.components.map(function (item) {
        if (item.type === 'panel') {
          item.key = (0, _utils.uniqueKey)(pageKeys, item.key || 'panel');
          pageKeys[item.key] = true;

          if (_this21.wizard.full) {
            _this21.options.show = _this21.options.show || {};
            _this21.options.show[item.key] = true;
          } else if (_this21.wizard.hasOwnProperty('full') && !_lodash.default.isEqual(_this21.originalOptions.show, _this21.options.show)) {
            _this21.options.show = _objectSpread({}, _this21.originalOptions.show || {});
          }
        }

        _this21.originalComponents.push(_lodash.default.clone(item));
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
    key: "setEditMode",
    value: function setEditMode(submission) {
      if (!this.editMode && submission._id && !this.options.readOnly) {
        this.editMode = true;
        this.redraw();
      }
    }
  }, {
    key: "setValue",
    value: function setValue(submission) {
      var _this22 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ignoreEstablishment = arguments.length > 2 ? arguments[2] : undefined;
      this._submission = submission;

      if (flags && flags.fromSubmission && (this.options.readOnly || this.editMode) && !this.isHtmlRenderMode()) {
        this._data = submission.data;
      }

      if (!ignoreEstablishment) {
        this.establishPages(submission.data);
      }

      var changed = this.getPages({
        all: true
      }).reduce(function (changed, page) {
        return _this22.setNestedValue(page, submission.data, flags, changed) || changed;
      }, false);

      if (changed) {
        this.pageFieldLogic(this.page);
      }

      this.setEditMode(submission);
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
          return cancel && !this.options.readOnly;

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
      var _this23 = this;

      _get(_getPrototypeOf(Wizard.prototype), "onChange", this).call(this, flags, changed, modified, changes);

      if (this.alert && !this.submitted) {
        this.checkValidity(this.localData, false, this.localData, true);
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
        var _this$currentPanel, _this$currentPanels;

        currentPanels = this.currentPanels || this.pages.map(function (page) {
          return page.component.key;
        });
        panels = this.establishPages().map(function (panel) {
          return panel.key;
        });
        this.currentPanels = panels;

        if ((_this$currentPanel = this.currentPanel) !== null && _this$currentPanel !== void 0 && _this$currentPanel.key && (_this$currentPanels = this.currentPanels) !== null && _this$currentPanels !== void 0 && _this$currentPanels.length) {
          this.setPage(this.currentPanels.findIndex(function (panel) {
            return panel === _this23.currentPanel.key;
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
    key: "errors",
    get: function get() {
      if (!this.isLastPage()) {
        return this.currentPage.errors;
      }

      return _get(_getPrototypeOf(Wizard.prototype), "errors", this);
    }
  }, {
    key: "focusOnComponent",
    value: function focusOnComponent(key) {
      var _this24 = this;

      var pageIndex = 0;

      var _this$pages$filter = this.pages.filter(function (page, index) {
        var hasComponent = false;
        page.getComponent(key, function (comp) {
          if (comp.path === key) {
            pageIndex = index;
            hasComponent = true;
          }
        });
        return hasComponent;
      }),
          _this$pages$filter2 = _slicedToArray(_this$pages$filter, 1),
          page = _this$pages$filter2[0];

      if (page && page !== this.currentPage) {
        return this.setPage(pageIndex).then(function () {
          _this24.checkValidity(_this24.submission.data, true, _this24.submission.data);

          _this24.showErrors();

          _get(_getPrototypeOf(Wizard.prototype), "focusOnComponent", _this24).call(_this24, key);
        });
      }

      return _get(_getPrototypeOf(Wizard.prototype), "focusOnComponent", this).call(this, key);
    }
  }]);

  return Wizard;
}(_Webform2.default);

exports.default = Wizard;
Wizard.setBaseUrl = _Formio.GlobalFormio.setBaseUrl;
Wizard.setApiUrl = _Formio.GlobalFormio.setApiUrl;
Wizard.setAppUrl = _Formio.GlobalFormio.setAppUrl;
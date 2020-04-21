"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

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
    _this.currentNextPage = 0;
    _this._seenPages = [0];
    return _this;
  }

  _createClass(Wizard, [{
    key: "isLastPage",
    value: function isLastPage() {
      var next = this.getNextPage();

      if (_lodash.default.isNumber(next)) {
        return 0 < next && next >= this.pages.length;
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
      var pages = this.pages.filter(all ? _lodash.default.identity : function (p, index) {
        return _this2._seenPages.includes(index);
      });
      return pages;
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
      this.page = 0;

      var onReady = _get(_getPrototypeOf(Wizard.prototype), "init", this).call(this);

      this.setComponentSchema();
      return onReady;
    }
  }, {
    key: "render",
    value: function render() {
      var ctx = this.renderContext;
      return this.renderTemplate('wizard', _objectSpread({}, ctx, {
        className: _get(_getPrototypeOf(Wizard.prototype), "getClassName", this).call(this),
        wizardHeader: this.renderTemplate('wizardHeader', ctx),
        wizardNav: this.renderTemplate('wizardNav', ctx),
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
          _this3 = this;

      this.element = element;
      this.loadRefs(element, (_this$loadRefs3 = {}, _defineProperty(_this$loadRefs3, this.wizardKey, 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-cancel"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-previous"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-next"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-submit"), 'single'), _defineProperty(_this$loadRefs3, "".concat(this.wizardKey, "-link"), 'multiple'), _this$loadRefs3));
      var promises = this.attachComponents(this.refs[this.wizardKey], [].concat(_toConsumableArray(this.prefixComps), _toConsumableArray(this.currentPage.components), _toConsumableArray(this.suffixComps)));
      this.attachNav();
      this.attachHeader();
      return promises.then(function () {
        return _this3.emit('render', {
          component: _this3.currentPage,
          page: _this3.page
        });
      });
    }
  }, {
    key: "isBreadcrumbClickable",
    value: function isBreadcrumbClickable() {
      return _lodash.default.get(this.options, 'breadcrumbSettings.clickable', true);
    }
  }, {
    key: "attachNav",
    value: function attachNav() {
      var _this4 = this;

      _lodash.default.each(this.buttons, function (button) {
        var buttonElement = _this4.refs["".concat(_this4.wizardKey, "-").concat(button.name)];

        _this4.addEventListener(buttonElement, 'click', function (event) {
          event.preventDefault(); // Disable the button until done.

          buttonElement.setAttribute('disabled', 'disabled');

          _this4.setLoading(buttonElement, true); // Call the button method, then re-enable the button.


          _this4[button.method]().then(function () {
            buttonElement.removeAttribute('disabled');

            _this4.setLoading(buttonElement, false);
          }).catch(function () {
            buttonElement.removeAttribute('disabled');

            _this4.setLoading(buttonElement, false);
          });
        });
      });
    }
  }, {
    key: "attachHeader",
    value: function attachHeader() {
      var _this5 = this;

      if (this.isBreadcrumbClickable()) {
        this.refs["".concat(this.wizardKey, "-link")].forEach(function (link, index) {
          _this5.addEventListener(link, 'click', function (event) {
            _this5.emit('wizardNavigationClicked', _this5.pages[index]);

            event.preventDefault();
            return _this5.setPage(index).then(function () {
              _this5.emit('wizardPageSelected', _this5.pages[index], index);
            });
          });
        });
      }
    }
  }, {
    key: "detachNav",
    value: function detachNav() {
      var _this6 = this;

      _lodash.default.each(this.buttons, function (button) {
        _this6.removeEventListener(_this6.refs["".concat(_this6.wizardKey, "-").concat(button.name)], 'click');
      });
    }
  }, {
    key: "detachHeader",
    value: function detachHeader() {
      var _this7 = this;

      this.refs["".concat(this.wizardKey, "-link")].forEach(function (link) {
        _this7.removeEventListener(link, 'click');
      });
    }
  }, {
    key: "establishPages",
    value: function establishPages() {
      var _this8 = this;

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
            var isVisible = (0, _utils.checkCondition)(item, _this8.data, _this8.data, _this8.component, _this8);

            if (isVisible) {
              visible.push(item);

              if (page) {
                _this8.pages.push(page);
              }
            }

            if (!page && isVisible) {
              page = _this8.createComponent(item, pageOptions);

              _this8.pages.push(page);

              page.eachComponent(function (component) {
                component.page = _this8.pages.length - 1;
              });
            } else if (page && !isVisible) {
              _this8.removeComponent(page);
            }
          } else if (item.type !== 'button') {
            if (!_this8.pages.length) {
              _this8.prefixComps.push(_this8.createComponent(item, pageOptions));
            } else {
              _this8.suffixComps.push(_this8.createComponent(item, pageOptions));
            }
          }
        });
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
      var _this9 = this;

      if (num === this.page) {
        return _nativePromiseOnly.default.resolve();
      }

      if (!this.wizard.full && num >= 0 && num < this.pages.length) {
        this.page = num;
        this.pageFieldLogic(num);
        this.getNextPage();

        if (!this._seenPages.includes(num)) {
          this._seenPages = this._seenPages.concat(num);
        }

        this.redraw().then(function () {
          if (!_this9.options.readOnly) {
            _this9.checkValidity(_this9.submission.data, false, _this9.submission.data, true);
          }
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
        var page = this.pages.length > this.page + 1 ? this.page + 1 : -1;

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
      return _nativePromiseOnly.default.all(this.getPages().map(function (page) {
        page.options.beforeSubmit = true;
        return page.beforeSubmit();
      }));
    }
  }, {
    key: "beforePage",
    value: function beforePage(next) {
      var _this10 = this;

      return new _nativePromiseOnly.default(function (resolve, reject) {
        _this10.hook(next ? 'beforeNext' : 'beforePrev', _this10.currentPage, _this10.submission, function (err) {
          if (err) {
            _this10.showErrors(err, true);

            reject(err);
          }

          var form = _this10.currentPage;

          if (form) {
            form.beforePage(next).then(resolve).catch(reject);
          } else {
            resolve();
          }
        });
      });
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      var _this11 = this;

      // Read-only forms should not worry about validation before going to next page, nor should they submit.
      if (this.options.readOnly) {
        return this.setPage(this.getNextPage()).then(function () {
          _this11.emit('nextPage', {
            page: _this11.page,
            submission: _this11.submission
          });
        });
      } // Validate the form, before go to the next page


      if (this.checkValidity(this.submission.data, true, this.submission.data, true)) {
        this.checkData(this.submission.data);
        return this.beforePage(true).then(function () {
          return _this11.setPage(_this11.getNextPage()).then(function () {
            _this11.emit('nextPage', {
              page: _this11.page,
              submission: _this11.submission
            });
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
    key: "prevPage",
    value: function prevPage() {
      var _this12 = this;

      return this.beforePage().then(function () {
        return _this12.setPage(_this12.getPreviousPage()).then(function () {
          _this12.emit('prevPage', {
            page: _this12.page,
            submission: _this12.submission
          });
        });
      });
    }
  }, {
    key: "cancel",
    value: function cancel(noconfirm) {
      var _this13 = this;

      if (_get(_getPrototypeOf(Wizard.prototype), "cancel", this).call(this, noconfirm)) {
        this.setPristine(true);
        return this.setPage(0).then(function () {
          _this13.redraw();

          return _this13.page;
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
      var _this14 = this;

      var pageKeys = {};
      this.originalComponents = [];
      this.component.components.map(function (item) {
        if (item.type === 'panel') {
          item.key = (0, _utils.uniqueKey)(pageKeys, item.key || 'panel');
          pageKeys[item.key] = true;
        }

        _this14.originalComponents.push(_lodash.default.clone(item));
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
    value: function setForm(form) {
      if (!form) {
        return;
      }

      this.wizard = form;
      this.component.components = form.components || [];
      this.setComponentSchema();
      return _get(_getPrototypeOf(Wizard.prototype), "setForm", this).call(this, form);
    }
  }, {
    key: "setValue",
    value: function setValue(submission) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var changed = _get(_getPrototypeOf(Wizard.prototype), "setValue", this).call(this, submission, flags);

      this.pageFieldLogic(this.page);
      return changed;
    }
  }, {
    key: "isClickable",
    value: function isClickable(page, index) {
      return this.page !== index && (0, _utils.firstNonNil)([_lodash.default.get(page, 'breadcrumbClickable'), this.options.breadcrumbSettings.clickable]);
    }
  }, {
    key: "hasButton",
    value: function hasButton(name, nextPage) {
      var currentPage = this.currentPage;

      if (name === 'previous') {
        var show = (0, _utils.firstNonNil)([_lodash.default.get(currentPage, 'buttonSettings.previous'), this.options.buttonSettings.showPrevious]);
        return this.getPreviousPage() > -1 && show;
      }

      nextPage = nextPage === undefined ? this.getNextPage() : nextPage;

      if (name === 'next') {
        var _show = (0, _utils.firstNonNil)([_lodash.default.get(currentPage, 'buttonSettings.next'), this.options.buttonSettings.showNext]);

        return nextPage !== null && nextPage !== -1 && _show;
      }

      if (name === 'cancel') {
        return (0, _utils.firstNonNil)([_lodash.default.get(currentPage, 'buttonSettings.cancel'), this.options.buttonSettings.showCancel]);
      }

      if (name === 'submit') {
        var _show2 = (0, _utils.firstNonNil)([_lodash.default.get(currentPage, 'buttonSettings.submit'), this.options.buttonSettings.showSubmit]);

        return _show2 && !this.options.readOnly && (nextPage === null || this.page === this.pages.length - 1);
      }

      return true;
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
    value: function onChange(flags, changed, modified) {
      _get(_getPrototypeOf(Wizard.prototype), "onChange", this).call(this, flags, changed, modified);

      if (this.alert && !this.submitted) {
        this.checkValidity(this.submission.data, false, this.submission.data, true);
        this.showErrors([], true);
      } // If the pages change, need to redraw the header.


      var currentPanels = this.pages.map(function (page) {
        return page.component.key;
      });
      var panels = this.establishPages().map(function (panel) {
        return panel.key;
      });
      var currentNextPage = this.currentNextPage;

      if (!_lodash.default.isEqual(panels, currentPanels)) {
        this.redrawHeader();
      } // If the next page changes, then make sure to redraw navigation.


      if (currentNextPage !== this.getNextPage()) {
        this.redrawNavigation();
      }
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
      var _this15 = this;

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
          _this15.checkValidity(_this15.submission.data, true, _this15.submission.data);

          _this15.showErrors();

          _get(_getPrototypeOf(Wizard.prototype), "focusOnComponent", _this15).call(_this15, key);
        });
      }

      return _get(_getPrototypeOf(Wizard.prototype), "focusOnComponent", this).call(this, key);
    }
  }, {
    key: "wizardKey",
    get: function get() {
      return "wizard-".concat(this.id);
    }
  }, {
    key: "form",
    get: function get() {
      return this.wizard;
    },
    set: function set(value) {
      _set(_getPrototypeOf(Wizard.prototype), "form", value, this, true);
    }
  }, {
    key: "buttons",
    get: function get() {
      var _this16 = this;

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
        if (_this16.hasButton(button.name)) {
          buttons[button.name] = button;
        }
      });
      return buttons;
    }
  }, {
    key: "renderContext",
    get: function get() {
      return {
        wizardKey: this.wizardKey,
        isBreadcrumbClickable: this.isBreadcrumbClickable(),
        panels: this.pages.map(function (page) {
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
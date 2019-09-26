"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

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

var _Base = _interopRequireDefault(require("./components/base/Base"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _utils = require("./utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Wizard =
/*#__PURE__*/
function (_Webform) {
  _inherits(Wizard, _Webform);

  /**
   * Constructor for wizard based forms
   * @param element Dom element to place this wizard.
   * @param {Object} options Options object, supported options are:
   *    - breadcrumbSettings.clickable: true (default) determines if the breadcrumb bar is clickable or not
   *    - buttonSettings.show*(Previous, Next, Cancel): true (default) determines if the button is shown or not
   */
  function Wizard(element, options) {
    var _this;

    _classCallCheck(this, Wizard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Wizard).call(this, element, options));
    _this.wizard = null;
    _this.pages = [];
    _this.globalComponents = [];
    _this.page = 0;
    _this._nextPage = 0;
    _this._seenPages = [0];
    return _this;
  }

  _createClass(Wizard, [{
    key: "isLastPage",
    value: function isLastPage() {
      var next = this.getNextPage(this.submission.data, this.page);

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

      var pageOptions = _lodash.default.clone(this.options);

      var components = _lodash.default.clone(this.components);

      var pages = this.pages.filter(all ? _lodash.default.identity : function (p, index) {
        return _this2._seenPages.includes(index);
      }).map(function (page, index) {
        return _this2.createComponent(page, _lodash.default.assign(pageOptions, {
          components: index === _this2.page ? components : null
        }));
      });
      this.components = components;
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
    key: "setPage",
    value: function setPage(num) {
      if (!this.wizard.full && num >= 0 && num < this.pages.length) {
        this.page = num;

        if (!this._seenPages.includes(num)) {
          this._seenPages = this._seenPages.concat(num);
        }

        return _get(_getPrototypeOf(Wizard.prototype), "setForm", this).call(this, this.currentPage());
      } else if (this.wizard.full || !this.pages.length) {
        return _get(_getPrototypeOf(Wizard.prototype), "setForm", this).call(this, this.getWizard());
      }

      return _nativePromiseOnly.default.reject('Page not found');
    }
  }, {
    key: "getNextPage",
    value: function getNextPage(data, currentPage) {
      var form = this.pages[currentPage]; // Check conditional nextPage

      if (form) {
        var page = ++currentPage;

        if (form.nextPage) {
          var next = this.evaluate(form.nextPage, {
            next: page,
            data: data,
            page: page,
            form: form
          }, 'next');

          if (next === null) {
            return null;
          }

          var pageNum = parseInt(next, 10);

          if (!isNaN(parseInt(pageNum, 10)) && isFinite(pageNum)) {
            return pageNum;
          }

          return this.getPageIndexByKey(next);
        }

        return page;
      }

      return null;
    }
  }, {
    key: "getPreviousPage",
    value: function getPreviousPage() {
      return Math.max(this.page - 1, 0);
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
    key: "beforeNext",
    value: function beforeNext() {
      var _this3 = this;

      return new _nativePromiseOnly.default(function (resolve, reject) {
        _this3.hook('beforeNext', _this3.currentPage(), _this3.submission, function (err) {
          if (err) {
            _this3.showErrors(err, true);

            reject(err);
          }

          _get(_getPrototypeOf(Wizard.prototype), "beforeNext", _this3).call(_this3).then(resolve).catch(reject);
        });
      });
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      var _this4 = this;

      // Read-only forms should not worry about validation before going to next page, nor should they submit.
      if (this.options.readOnly) {
        return this.setPage(this.getNextPage(this.submission.data, this.page)).then(function () {
          _this4._nextPage = _this4.getNextPage(_this4.submission.data, _this4.page);

          _this4.emit('nextPage', {
            page: _this4.page,
            submission: _this4.submission
          });
        });
      } // Validate the form builed, before go to the next page


      if (this.checkCurrentPageValidity(this.submission.data, true)) {
        this.checkData(this.submission.data, {
          noValidate: true
        });
        return this.beforeNext().then(function () {
          return _this4.setPage(_this4.getNextPage(_this4.submission.data, _this4.page)).then(function () {
            _this4._nextPage = _this4.getNextPage(_this4.submission.data, _this4.page);

            _this4.emit('nextPage', {
              page: _this4.page,
              submission: _this4.submission
            });
          });
        });
      } else {
        return _nativePromiseOnly.default.reject(this.showErrors(null, true));
      }
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      var _this5 = this;

      var prevPage = this.getPreviousPage();
      return this.setPage(prevPage).then(function () {
        _this5.emit('prevPage', {
          page: _this5.page,
          submission: _this5.submission
        });
      });
    }
  }, {
    key: "cancel",
    value: function cancel(noconfirm) {
      if (_get(_getPrototypeOf(Wizard.prototype), "cancel", this).call(this, noconfirm)) {
        return this.setPage(0);
      } else {
        return this.setPage();
      }
    }
  }, {
    key: "getPageIndexByKey",
    value: function getPageIndexByKey(key) {
      var pageIndex = 0;
      this.pages.forEach(function (page, index) {
        if (page.key === key) {
          pageIndex = index;
          return false;
        }
      });
      return pageIndex;
    }
  }, {
    key: "addGlobalComponents",
    value: function addGlobalComponents(page) {
      // If there are non-page components, then add them here. This is helpful to allow for hidden fields that
      // can propogate between pages.
      if (this.globalComponents.length) {
        page.components = this.globalComponents.concat(page.components);
      }

      return page;
    }
  }, {
    key: "getPage",
    value: function getPage(pageNum) {
      if (pageNum >= 0 && pageNum < this.pages.length) {
        return this.addGlobalComponents(this.pages[pageNum]);
      }

      return null;
    }
  }, {
    key: "getWizard",
    value: function getWizard() {
      var pageIndex = 0;
      var page = null;

      var wizard = _lodash.default.clone(this.wizard);

      wizard.components = [];

      do {
        page = this.getPage(pageIndex);

        if (page) {
          wizard.components.push(page);
        }

        pageIndex = this.getNextPage(this.submission.data, pageIndex);
      } while (pageIndex); // Add all other components.


      this.wizard.components.forEach(function (component) {
        if (component.type !== 'panel') {
          wizard.components.push(component);
        }
      });
      return wizard;
    }
  }, {
    key: "currentPage",
    value: function currentPage() {
      return this.getPage(this.page);
    }
  }, {
    key: "buildPages",
    value: function buildPages(form) {
      var _this6 = this;

      this.pages = [];
      form.components.forEach(function (component) {
        if (component.type === 'panel') {
          // Ensure that this page can be seen.
          if ((0, _utils.checkCondition)(component, _this6.data, _this6.data, _this6.wizard, _this6)) {
            _this6.pages.push(component);
          }
        } else if (component.type === 'hidden') {
          // Global components are hidden components that can propagate between pages.
          _this6.globalComponents.push(component);
        }
      });
      this.buildWizardHeader();
      this.buildWizardNav();
    }
  }, {
    key: "setForm",
    value: function setForm(form) {
      if (!form) {
        return;
      }

      this.wizard = form;
      this.buildPages(this.wizard);
      return this.setPage(this.page);
    }
  }, {
    key: "build",
    value: function build() {
      var _this7 = this;

      _get(_getPrototypeOf(Wizard.prototype), "build", this).call(this);

      this.formReady.then(function () {
        _this7.buildWizardHeader();

        _this7.buildWizardNav();
      });
    }
  }, {
    key: "hasButton",
    value: function hasButton(name, nextPage) {
      // Check for and initlize button settings object
      var currentPage = this.currentPage();
      this.options.buttonSettings = _lodash.default.defaults(this.options.buttonSettings, {
        showPrevious: true,
        showNext: true,
        showCancel: !this.options.readOnly
      });

      if (name === 'previous') {
        var show = (0, _utils.firstNonNil)([_lodash.default.get(currentPage, 'buttonSettings.previous'), this.options.buttonSettings.showPrevious]);
        return this.page > 0 && show;
      }

      nextPage = nextPage === undefined ? this.getNextPage(this.submission.data, this.page) : nextPage;

      if (name === 'next') {
        var _show = (0, _utils.firstNonNil)([_lodash.default.get(currentPage, 'buttonSettings.next'), this.options.buttonSettings.showNext]);

        return nextPage !== null && nextPage < this.pages.length && _show;
      }

      if (name === 'cancel') {
        return (0, _utils.firstNonNil)([_lodash.default.get(currentPage, 'buttonSettings.cancel'), this.options.buttonSettings.showCancel]);
      }

      if (name === 'submit') {
        return !this.options.readOnly && (nextPage === null || this.page === this.pages.length - 1);
      }

      return true;
    }
  }, {
    key: "buildWizardHeader",
    value: function buildWizardHeader() {
      var _this8 = this;

      if (this.wizardHeader) {
        this.wizardHeader.innerHTML = '';
      }

      var currentPage = this.currentPage();

      if (!currentPage || this.wizard.full) {
        return;
      }

      currentPage.breadcrumb = currentPage.breadcrumb || 'default';

      if (currentPage.breadcrumb.toLowerCase() === 'none') {
        return;
      } // Check for and initlize breadcrumb settings object


      this.options.breadcrumbSettings = _lodash.default.defaults(this.options.breadcrumbSettings, {
        clickable: true
      });
      this.wizardHeader = this.ce('nav', {
        'aria-label': 'navigation'
      });
      this.wizardHeaderList = this.ce('ul', {
        class: 'pagination'
      });
      this.wizardHeader.appendChild(this.wizardHeaderList); // Add the header to the beginning.

      this.prepend(this.wizardHeader);
      var showHistory = currentPage.breadcrumb.toLowerCase() === 'history';
      this.pages.forEach(function (page, i) {
        // Iterate over predicates and returns first non-undefined value
        var clickableFlag = (0, _utils.firstNonNil)([// Now page (Panel) can override `breadcrumbSettings.clickable` option
        _lodash.default.get(page, 'breadcrumbClickable'), // Set clickable based on breadcrumb settings
        _this8.options.breadcrumbSettings.clickable]);
        var clickable = _this8.page !== i && clickableFlag;
        var pageClass = 'page-item ';
        pageClass += i === _this8.page ? 'active' : clickable ? '' : 'disabled';

        var pageButton = _this8.ce('li', {
          class: pageClass,
          style: clickable ? 'cursor: pointer;' : ''
        }); // Navigate to the page as they click on it.


        if (clickable) {
          _this8.addEventListener(pageButton, 'click', function (event) {
            _this8.emit('wizardNavigationClicked', _this8.pages[i]);

            event.preventDefault();

            _this8.setPage(i);
          });
        }

        var pageLabel = _this8.ce('span', {
          class: 'page-link'
        });

        var pageTitle = page.title;

        if (currentPage.breadcrumb.toLowerCase() === 'condensed') {
          pageTitle = i === _this8.page || showHistory ? page.title : i + 1;

          if (!pageTitle) {
            pageTitle = i + 1;
          }
        }

        pageLabel.appendChild(_this8.text(pageTitle));
        pageButton.appendChild(pageLabel);

        _this8.wizardHeaderList.appendChild(pageButton);
      });
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
    value: function onChange(flags, changed) {
      var _this9 = this;

      _get(_getPrototypeOf(Wizard.prototype), "onChange", this).call(this, flags, changed); // Only rebuild if there is a page change.


      var pageIndex = 0;
      var rebuild = false;
      this.wizard.components.forEach(function (component) {
        if (component.type !== 'panel') {
          return;
        }

        if ((0, _utils.hasCondition)(component)) {
          var hasPage = _this9.pages && _this9.pages[pageIndex] && _this9.pageId(_this9.pages[pageIndex]) === _this9.pageId(component);

          var shouldShow = (0, _utils.checkCondition)(component, _this9.data, _this9.data, _this9.wizard, _this9);

          if (shouldShow && !hasPage || !shouldShow && hasPage) {
            rebuild = true;
            return false;
          }

          if (shouldShow) {
            pageIndex++;
          }
        } else {
          pageIndex++;
        }
      });

      if (rebuild) {
        this.setForm(this.wizard);
      } // Update Wizard Nav


      var nextPage = this.getNextPage(this.submission.data, this.page);

      if (this._nextPage !== nextPage) {
        this.buildWizardNav(nextPage);
        this.emit('updateWizardNav', {
          oldpage: this._nextPage,
          newpage: nextPage,
          submission: this.submission
        });
        this._nextPage = nextPage;
      }
    }
  }, {
    key: "buildWizardNav",
    value: function buildWizardNav(nextPage) {
      var _this10 = this;

      if (this.wizardNav) {
        this.wizardNav.innerHTML = '';
        this.removeChild(this.wizardNav);
      }

      if (this.wizard.full) {
        return;
      }

      this.wizardNav = this.ce('ul', {
        class: 'list-inline'
      });
      this.element.appendChild(this.wizardNav);
      [{
        name: 'cancel',
        method: 'cancel',
        class: 'btn btn-default btn-secondary'
      }, {
        name: 'previous',
        method: 'prevPage',
        class: 'btn btn-primary'
      }, {
        name: 'next',
        method: 'nextPage',
        class: 'btn btn-primary'
      }, {
        name: 'submit',
        method: 'submit',
        class: 'btn btn-primary'
      }].forEach(function (button) {
        if (!_this10.hasButton(button.name, nextPage)) {
          return;
        }

        var buttonWrapper = _this10.ce('li', {
          class: 'list-inline-item'
        });

        var buttonProp = "".concat(button.name, "Button");

        var buttonElement = _this10[buttonProp] = _this10.ce('button', {
          class: "".concat(button.class, " btn-wizard-nav-").concat(button.name)
        });

        buttonElement.appendChild(_this10.text(_this10.t(button.name)));

        _this10.addEventListener(_this10[buttonProp], 'click', function (event) {
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

        buttonWrapper.appendChild(_this10[buttonProp]);

        _this10.wizardNav.appendChild(buttonWrapper);
      });
    }
  }, {
    key: "checkCurrentPageValidity",
    value: function checkCurrentPageValidity() {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_get2 = _get(_getPrototypeOf(Wizard.prototype), "checkValidity", this)).call.apply(_get2, [this].concat(args));
    }
  }, {
    key: "checkPagesValidity",
    value: function checkPagesValidity(pages) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var isValid = _Base.default.prototype.checkValidity.apply(this, args);

      return pages.reduce(function (check, pageComp) {
        return pageComp.checkValidity.apply(pageComp, args) && check;
      }, isValid);
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty) {
      if (this.submitting) {
        return this.checkPagesValidity(this.getPages(), data, dirty);
      } else {
        return this.checkCurrentPageValidity(data, dirty);
      }
    }
  }, {
    key: "schema",
    get: function get() {
      return this.wizard;
    }
  }, {
    key: "errors",
    get: function get() {
      if (this.isLastPage()) {
        var pages = this.getPages({
          all: true
        });
        this.checkPagesValidity(pages, this.submission.data, true);
        return pages.reduce(function (errors, pageComp) {
          return errors.concat(pageComp.errors || []);
        }, []);
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
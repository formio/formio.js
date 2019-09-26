"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _WebformBuilder2 = _interopRequireDefault(require("./WebformBuilder"));

var _lodash = _interopRequireDefault(require("lodash"));

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

var WizardBuilder =
/*#__PURE__*/
function (_WebformBuilder) {
  _inherits(WizardBuilder, _WebformBuilder);

  function WizardBuilder() {
    _classCallCheck(this, WizardBuilder);

    return _possibleConstructorReturn(this, _getPrototypeOf(WizardBuilder).apply(this, arguments));
  }

  _createClass(WizardBuilder, [{
    key: "setBuilderElement",
    value: function setBuilderElement() {
      var _this = this;

      return _get(_getPrototypeOf(WizardBuilder.prototype), "setBuilderElement", this).call(this).then(function () {
        var buildRegion = _this.ce('div', {
          class: 'col-xs-8 col-sm-9 col-md-10 formarea'
        });

        _this.element.setAttribute('class', '');

        _this.element.noDrop = true;

        _this.wrapper.insertBefore(buildRegion, _this.element);

        _this.pageBar = _this.ce('ol', {
          class: 'breadcrumb'
        });
        buildRegion.appendChild(_this.pageBar);
        buildRegion.appendChild(_this.element);
        _this.currentPage = 0;
      });
    }
  }, {
    key: "addSubmitButton",
    value: function addSubmitButton() {// Do nothing...
    }
  }, {
    key: "deleteComponent",
    value: function deleteComponent(component) {
      var _this2 = this;

      var cb;
      var isPage = this.components.includes(component);

      if (isPage) {
        cb = function cb() {
          return _this2.currentPage = 0;
        };

        this.on('deleteComponent', cb);
      }

      _get(_getPrototypeOf(WizardBuilder.prototype), "deleteComponent", this).call(this, component);

      if (isPage) {
        this.off('deleteComponent', cb);
      }
    }
  }, {
    key: "addPage",
    value: function addPage() {
      var pageNum = this.pages.length + 1;
      var newPage = {
        title: "Page ".concat(pageNum),
        label: "Page ".concat(pageNum),
        type: 'panel',
        key: "page".concat(pageNum)
      };
      this.component.components.push(newPage);
      this.addComponent(newPage);
      this.emit('saveComponent', newPage);
      this.form = this.schema;
    }
  }, {
    key: "addComponents",
    value: function addComponents(element, data, options, state) {
      var _this3 = this;

      element = element || this.getContainer();
      data = data || this.data;
      var components = this.hook('addComponents', this.componentComponents, this);

      _lodash.default.each(components, function (component, index) {
        return _this3.addComponent(component, element, data, null, index !== _this3.currentPage, _this3.getComponentState(component, state));
      });
    }
  }, {
    key: "gotoPage",
    value: function gotoPage(page) {
      this.currentPage = page;
      this.redraw(true);
    }
    /**
     * Only show the current page.
     *
     * @return {Array}
     */

  }, {
    key: "buildPageBar",
    value: function buildPageBar() {
      var _this4 = this;

      var pages = this.pages; // Always ensure we have a single page.

      if (!pages.length) {
        return this.addPage();
      }

      this.empty(this.pageBar);

      _lodash.default.each(pages, function (page, index) {
        var pageLink = _this4.ce('span', {
          title: page.title,
          class: index === _this4.currentPage ? 'mr-2 badge badge-primary bg-primary label label-primary wizard-page-label' : 'mr-2 badge badge-info bg-info label label-info wizard-page-label'
        }, _this4.text(page.title));

        _this4.pageBar.appendChild(_this4.ce('li', null, pageLink));

        _this4.addEventListener(pageLink, 'click', function (event) {
          event.preventDefault();

          _this4.gotoPage(index);
        });
      });

      var newPage = this.ce('span', {
        title: this.t('Create Page'),
        class: 'mr-2 badge badge-success bg-success label label-success wizard-page-label'
      }, [this.getIcon('plus'), this.text(' PAGE')]);
      this.addEventListener(newPage, 'click', function (event) {
        event.preventDefault();

        _this4.addPage();
      });
      this.pageBar.appendChild(this.ce('li', null, newPage));
    }
  }, {
    key: "build",
    value: function build(state) {
      var _this5 = this;

      _get(_getPrototypeOf(WizardBuilder.prototype), "build", this).call(this, state);

      this.builderReady.then(function () {
        return _this5.buildPageBar();
      });
    }
  }, {
    key: "currentPage",
    get: function get() {
      return this._currentPage || 0;
    },
    set: function set(currentPage) {
      this._currentPage = currentPage;
    }
  }, {
    key: "pages",
    get: function get() {
      return _lodash.default.filter(this.component.components, {
        type: 'panel'
      });
    }
  }, {
    key: "componentComponents",
    get: function get() {
      var components = this.pages;
      components.nodrop = true;
      return components;
    }
  }]);

  return WizardBuilder;
}(_WebformBuilder2.default);

exports.default = WizardBuilder;
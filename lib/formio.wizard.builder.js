'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormioWizardBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _formioForm = require('./formio.form.builder');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormioWizardBuilder = exports.FormioWizardBuilder = function (_FormioFormBuilder) {
  _inherits(FormioWizardBuilder, _FormioFormBuilder);

  function FormioWizardBuilder() {
    _classCallCheck(this, FormioWizardBuilder);

    return _possibleConstructorReturn(this, (FormioWizardBuilder.__proto__ || Object.getPrototypeOf(FormioWizardBuilder)).apply(this, arguments));
  }

  _createClass(FormioWizardBuilder, [{
    key: 'setBuilderElement',
    value: function setBuilderElement() {
      var _this2 = this;

      return _get(FormioWizardBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioWizardBuilder.prototype), 'setBuilderElement', this).call(this).then(function () {
        var buildRegion = _this2.ce('div', {
          class: 'col-xs-8 col-sm-9 col-md-10 formarea'
        });

        _this2.element.setAttribute('class', '');
        _this2.element.noDrop = true;
        _this2.wrapper.insertBefore(buildRegion, _this2.element);
        _this2.pageBar = _this2.ce('ol', {
          class: 'breadcrumb'
        });

        buildRegion.appendChild(_this2.pageBar);
        buildRegion.appendChild(_this2.element);
        _this2.currentPage = 0;
      });
    }
  }, {
    key: 'addSubmitButton',
    value: function addSubmitButton() {
      // Do nothing...
    }
  }, {
    key: 'deleteComponent',
    value: function deleteComponent(component) {
      if (_get(FormioWizardBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioWizardBuilder.prototype), 'deleteComponent', this).call(this, component)) {
        this.gotoPage(0);
      }
    }
  }, {
    key: 'addPage',
    value: function addPage() {
      var pageNum = this.pages.length + 1;
      var newPage = {
        title: 'Page ' + pageNum,
        label: 'Page ' + pageNum,
        type: 'panel',
        key: 'page' + pageNum
      };
      this.component.components.push(newPage);
      this.addComponent(newPage);
      this.emit('saveComponent', newPage);
      this.form = this.schema;
      this.redraw();
    }
  }, {
    key: 'addComponents',
    value: function addComponents(element, data) {
      var _this3 = this;

      element = element || this.getContainer();
      data = data || this.data;
      var components = this.hook('addComponents', this.componentComponents);
      _lodash2.default.each(components, function (component, index) {
        _this3.addComponent(component, element, data, null, index !== _this3.currentPage);
      });
    }
  }, {
    key: 'gotoPage',
    value: function gotoPage(page) {
      this.currentPage = page;
      this.redraw();
    }

    /**
     * Only show the current page.
     *
     * @return {Array}
     */

  }, {
    key: 'buildPageBar',
    value: function buildPageBar() {
      var _this4 = this;

      var pages = this.pages;

      // Always ensure we have a single page.
      if (!pages.length) {
        return this.addPage();
      }

      this.empty(this.pageBar);
      _lodash2.default.each(pages, function (page, index) {
        var pageLink = _this4.ce('a', {
          title: page.title,
          class: index === _this4.currentPage ? 'label label-primary' : 'label label-info'
        }, _this4.text(page.title));
        _this4.pageBar.appendChild(_this4.ce('li', null, pageLink));
        _this4.addEventListener(pageLink, 'click', function (event) {
          event.preventDefault();
          _this4.gotoPage(index);
        });
      });

      var newPage = this.ce('a', {
        title: this.t('Create Page'),
        class: 'label label-success'
      }, [this.getIcon('plus'), this.text(' PAGE')]);

      this.addEventListener(newPage, 'click', function (event) {
        event.preventDefault();
        _this4.addPage();
      });

      this.pageBar.appendChild(this.ce('li', null, newPage));
    }
  }, {
    key: 'build',
    value: function build() {
      var _this5 = this;

      _get(FormioWizardBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioWizardBuilder.prototype), 'build', this).call(this);
      this.builderReady.then(function () {
        return _this5.buildPageBar();
      });
    }
  }, {
    key: 'currentPage',
    get: function get() {
      return this._currentPage || 0;
    },
    set: function set(currentPage) {
      this._currentPage = currentPage;
    }
  }, {
    key: 'pages',
    get: function get() {
      return _lodash2.default.filter(this.component.components, { type: 'panel' });
    }
  }, {
    key: 'componentComponents',
    get: function get() {
      var components = this.pages;
      components.nodrop = true;
      return components;
    }
  }]);

  return FormioWizardBuilder;
}(_formioForm.FormioFormBuilder);
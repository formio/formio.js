"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Base = _interopRequireDefault(require("../base/Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HTMLComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(HTMLComponent, _BaseComponent);

  function HTMLComponent() {
    _classCallCheck(this, HTMLComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(HTMLComponent).apply(this, arguments));
  }

  _createClass(HTMLComponent, [{
    key: "setHTML",
    value: function setHTML() {
      this.htmlElement.innerHTML = this.interpolate(this.component.content);
    }
  }, {
    key: "build",
    value: function build() {
      var _this = this;

      this.createElement();
      this.htmlElement = this.ce(this.component.tag, {
        id: this.id,
        class: this.component.className
      });

      _lodash.default.each(this.component.attrs, function (attr) {
        if (attr.attr) {
          _this.htmlElement.setAttribute(attr.attr, attr.value);
        }
      });

      if (this.component.content) {
        this.setHTML();
      }

      if (this.component.refreshOnChange) {
        this.on('change', function () {
          return _this.setHTML();
        }, true);
      }

      this.element.appendChild(this.htmlElement);
      this.attachLogic();
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return HTMLComponent.schema();
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
        label: 'HTML',
        type: 'htmlelement',
        tag: 'p',
        attrs: [],
        content: '',
        input: false,
        persistent: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'HTML Element',
        group: 'advanced',
        icon: 'fa fa-code',
        weight: 90,
        documentation: 'http://help.form.io/userguide/#html-element-component',
        schema: HTMLComponent.schema()
      };
    }
  }]);

  return HTMLComponent;
}(_Base.default);

exports.default = HTMLComponent;
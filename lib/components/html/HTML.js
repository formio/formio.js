"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../_classes/component/Component"));

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

var HTMLComponent = /*#__PURE__*/function (_Component) {
  _inherits(HTMLComponent, _Component);

  var _super = _createSuper(HTMLComponent);

  function HTMLComponent() {
    _classCallCheck(this, HTMLComponent);

    return _super.apply(this, arguments);
  }

  _createClass(HTMLComponent, [{
    key: "checkRefreshOn",
    value: function checkRefreshOn(changed) {
      _get(_getPrototypeOf(HTMLComponent.prototype), "checkRefreshOn", this).call(this, changed);

      if (!this.builderMode && this.component.refreshOnChange && this.element && this.conditionallyVisible(this.data, this.row)) {
        this.setContent(this.element, this.renderContent());
      }
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this = this;

      var submission = _lodash.default.get(this.root, 'submission', {});

      return this.renderTemplate('html', {
        component: this.component,
        tag: this.component.tag,
        attrs: (this.component.attrs || []).map(function (attr) {
          return {
            attr: attr.attr,
            value: _this.interpolate(attr.value, {
              metadata: submission.metadata || {},
              submission: submission,
              data: _this.rootValue,
              row: _this.data
            })
          };
        }),
        content: this.content,
        singleTags: this.singleTags
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(HTMLComponent.prototype), "render", this).call(this, this.renderContent());
    }
  }, {
    key: "attach",
    value: function attach(element) {
      this.loadRefs(element, {
        html: 'single'
      });
      return _get(_getPrototypeOf(HTMLComponent.prototype), "attach", this).call(this, element);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return HTMLComponent.schema();
    }
  }, {
    key: "content",
    get: function get() {
      if (this.builderMode) {
        return this.component.content;
      }

      var submission = _lodash.default.get(this.root, 'submission', {});

      return this.component.content ? this.interpolate(this.component.content, {
        metadata: submission.metadata || {},
        submission: submission,
        data: this.rootValue,
        row: this.data
      }) : '';
    }
  }, {
    key: "singleTags",
    get: function get() {
      return ['br', 'img', 'hr'];
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Component2.default.schema.apply(_Component2.default, [{
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
        group: 'layout',
        icon: 'code',
        weight: 0,
        documentation: 'http://help.form.io/userguide/#html-element-component',
        schema: HTMLComponent.schema()
      };
    }
  }]);

  return HTMLComponent;
}(_Component2.default);

exports.default = HTMLComponent;
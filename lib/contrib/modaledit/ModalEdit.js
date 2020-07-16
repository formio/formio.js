"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _TextArea = _interopRequireDefault(require("../../components/textarea/TextArea"));

var _ModalEdit = _interopRequireDefault(require("./ModalEdit.form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var ModalEditComponent = /*#__PURE__*/function (_TextAreaComponent) {
  _inherits(ModalEditComponent, _TextAreaComponent);

  var _super = _createSuper(ModalEditComponent);

  function ModalEditComponent() {
    _classCallCheck(this, ModalEditComponent);

    return _super.apply(this, arguments);
  }

  _createClass(ModalEditComponent, [{
    key: "renderElement",

    /** @override **/
    value: function renderElement() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.renderTemplate('modaledit', {
        content: content
      });
    }
    /** @override **/

  }, {
    key: "attach",
    value: function attach(element) {
      this.loadRefs(element, {
        container: 'single',
        edit: 'single'
      });
      return _get(_getPrototypeOf(ModalEditComponent.prototype), "attach", this).call(this, element);
    }
    /** @override **/

  }, {
    key: "attachElement",
    value: function attachElement(element) {
      // Allow work with div as if it would be plain input
      Object.defineProperty(element, 'value', {
        get: function get() {
          return this.innerHTML;
        },
        set: function set(value) {
          this.innerHTML = value;
        }
      });
      var show = this.showModal.bind(this);
      this.addEventListener(this.refs.container, 'dblclick', show);
      this.addEventListener(this.refs.edit, 'click', show);
    }
    /** @override **/

  }, {
    key: "createModal",
    value: function createModal(element) {
      var _this = this;

      var self = this;
      var dialog = this.ce('div');
      this.setContent(dialog, this.renderTemplate('modaldialog'));
      dialog.refs = {};
      this.loadRefs.call(dialog, dialog, {
        overlay: 'single',
        content: 'single',
        inner: 'single',
        close: 'single'
      });
      var rect = this.getElementRect(this.refs.container);
      var layout = this.getModalLayout(rect);
      var styles = this.getModalStyle(layout);
      Object.assign(dialog.refs.content.style, styles);
      dialog.refs.inner.appendChild(element);
      this.addEventListener(dialog.refs.overlay, 'click', function (event) {
        event.preventDefault();
        dialog.close();
      });
      this.addEventListener(dialog.refs.close, 'click', function (event) {
        event.preventDefault();
        dialog.close();
      });
      this.addEventListener(dialog, 'close', function () {
        _this.removeChildFrom(dialog, document.body);
      });

      dialog.close = function () {
        dialog.dispatchEvent(new CustomEvent('close'));
        self.removeChildFrom(dialog, document.body);
      };

      document.body.appendChild(dialog);
      return dialog;
    }
    /** @override **/

  }, {
    key: "updateOnChange",
    value: function updateOnChange(flags) {
      var changed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (_get(_getPrototypeOf(ModalEditComponent.prototype), "updateOnChange", this).call(this, flags, changed)) {
        this.updateContentView(this.dataValue);
      }
    }
  }, {
    key: "showModal",
    value: function showModal() {
      var elt = this.ce('div');
      this.setContent(elt, _get(_getPrototypeOf(ModalEditComponent.prototype), "renderElement", this).call(this, this.dataValue));
      var editor = elt.children[0];

      if (this.isPlain) {
        editor.style.resize = 'vertical';
      }

      _get(_getPrototypeOf(ModalEditComponent.prototype), "attachElement", this).call(this, editor);

      this.createModal(editor);
    }
  }, {
    key: "updateContentView",
    value: function updateContentView() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var view = _lodash.default.get(this, 'refs.input[0]', null);

      return this.setContent(view, content);
    }
  }, {
    key: "getElementRect",
    value: function getElementRect(elt) {
      return elt.getBoundingClientRect();
    }
  }, {
    key: "getModalStyle",
    value: function getModalStyle(args) {
      var overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaultStyles = {
        position: 'absolute',
        height: 'auto'
      };

      var layout = _lodash.default.mapValues(_lodash.default.pick(args, ['top', 'left', 'width']), function (p) {
        return "".concat(p, "px");
      });

      return _objectSpread(_objectSpread(_objectSpread({}, defaultStyles), overrides), layout);
    }
  }, {
    key: "getModalLayout",
    value: function getModalLayout(rect) {
      var _this$getModalSize = this.getModalSize(rect.width, rect.height),
          width = _this$getModalSize.width,
          minHeight = _this$getModalSize.height;

      return {
        left: rect.left,
        minHeight: minHeight,
        top: rect.top,
        width: width
      };
    }
  }, {
    key: "getModalSize",
    value: function getModalSize(currentWidth, currentHeight) {
      var _this$defaultModalSiz = _slicedToArray(this.defaultModalSize, 2),
          dw = _this$defaultModalSiz[0],
          dh = _this$defaultModalSiz[1];

      var type = _lodash.default.get(this.component, 'modalLayout', 'fixed');

      var _this$layoutProps$typ = this.layoutProps[type],
          widthProp = _this$layoutProps$typ.widthProp,
          heightProp = _this$layoutProps$typ.heightProp;

      var width = _lodash.default.get(this.component, widthProp, dw);

      var height = _lodash.default.get(this.component, heightProp, dh);

      if (type === 'fluid') {
        return {
          width: Math.max(currentWidth, width),
          height: Math.max(currentHeight, height)
        };
      }

      return {
        width: width,
        height: height
      };
    }
  }, {
    key: "defaultModalSize",
    get: function get() {
      return [475, 300];
    }
  }, {
    key: "layoutProps",
    get: function get() {
      return {
        fixed: {
          widthProp: 'width',
          heightProp: 'height'
        },
        fluid: {
          widthProp: 'minWidth',
          heightProp: 'minHeight'
        }
      };
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _TextArea.default.schema.apply(_TextArea.default, [{
        type: 'modaledit',
        label: 'Modal Edit',
        key: 'modalEdit',
        modalLayout: 'fixed'
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Modal Edit',
        group: 'data',
        icon: 'font',
        weight: 40,
        schema: ModalEditComponent.schema()
      };
    }
  }]);

  return ModalEditComponent;
}(_TextArea.default);

exports.default = ModalEditComponent;
ModalEditComponent.editForm = _ModalEdit.default;
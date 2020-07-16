"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

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
exports.default = exports.KEY_CODES = void 0;

var _choices = _interopRequireDefault(require("choices.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

/**
 * TODO: REMOVE THIS ONCE THE PULL REQUEST HAS BEEN RESOLVED.
 *
 * https://github.com/jshjohnson/Choices/pull/788
 *
 * This is intentionally not part of the extended class, since other components use Choices and need this fix as well.
 * @type {Choices._generatePlaceholderValue}
 * @private
 */
_choices.default.prototype._generatePlaceholderValue = function () {
  if (this._isSelectElement && this.passedElement.placeholderOption) {
    var placeholderOption = this.passedElement.placeholderOption;
    return placeholderOption ? placeholderOption.text : false;
  }

  var _this$config = this.config,
      placeholder = _this$config.placeholder,
      placeholderValue = _this$config.placeholderValue;
  var dataset = this.passedElement.element.dataset;

  if (placeholder) {
    if (placeholderValue) {
      return placeholderValue;
    }

    if (dataset.placeholder) {
      return dataset.placeholder;
    }
  }

  return false;
};

var KEY_CODES = {
  BACK_KEY: 46,
  DELETE_KEY: 8,
  TAB_KEY: 9,
  ENTER_KEY: 13,
  A_KEY: 65,
  ESC_KEY: 27,
  UP_KEY: 38,
  DOWN_KEY: 40,
  PAGE_UP_KEY: 33,
  PAGE_DOWN_KEY: 34
};
exports.KEY_CODES = KEY_CODES;

var ChoicesWrapper = /*#__PURE__*/function (_Choices) {
  _inherits(ChoicesWrapper, _Choices);

  var _super = _createSuper(ChoicesWrapper);

  function ChoicesWrapper() {
    var _this;

    _classCallCheck(this, ChoicesWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this._onTabKey = _this._onTabKey.bind(_assertThisInitialized(_this));
    _this.isDirectionUsing = false;
    _this.shouldOpenDropDown = true;
    return _this;
  }

  _createClass(ChoicesWrapper, [{
    key: "_handleButtonAction",
    value: function _handleButtonAction(activeItems, element) {
      if (!this._isSelectOneElement) {
        return _get(_getPrototypeOf(ChoicesWrapper.prototype), "_handleButtonAction", this).call(this, activeItems, element);
      }

      if (!activeItems || !element || !this.config.removeItems || !this.config.removeItemButton) {
        return;
      }

      _get(_getPrototypeOf(ChoicesWrapper.prototype), "_handleButtonAction", this).call(this, activeItems, element);
    }
  }, {
    key: "_onEnterKey",
    value: function _onEnterKey(args) {
      // Prevent dropdown form opening when removeItemButton was pressed using 'Enter' on keyboard
      if (args.event.target.className === 'choices__button') {
        this.shouldOpenDropDown = false;
      }

      _get(_getPrototypeOf(ChoicesWrapper.prototype), "_onEnterKey", this).call(this, args);
    }
  }, {
    key: "_onDirectionKey",
    value: function _onDirectionKey() {
      var _get3;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (!this._isSelectOneElement) {
        var _get2;

        return (_get2 = _get(_getPrototypeOf(ChoicesWrapper.prototype), "_onDirectionKey", this)).call.apply(_get2, [this].concat(args));
      }

      this.isDirectionUsing = true;

      (_get3 = _get(_getPrototypeOf(ChoicesWrapper.prototype), "_onDirectionKey", this)).call.apply(_get3, [this].concat(args));

      this.onSelectValue.apply(this, args);
      this.isDirectionUsing = false;
    }
  }, {
    key: "_onTabKey",
    value: function _onTabKey(_ref) {
      var activeItems = _ref.activeItems,
          hasActiveDropdown = _ref.hasActiveDropdown;

      if (hasActiveDropdown) {
        this._selectHighlightedChoice(activeItems);
      }
    }
  }, {
    key: "_selectHighlightedChoice",
    value: function _selectHighlightedChoice(activeItems) {
      var highlightedChoice = this.dropdown.getChild(".".concat(this.config.classNames.highlightedState));

      if (highlightedChoice) {
        this._handleChoiceAction(activeItems, highlightedChoice);
      }

      event.preventDefault();
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(event) {
      var _keyDownActions;

      if (!this._isSelectOneElement) {
        return _get(_getPrototypeOf(ChoicesWrapper.prototype), "_onKeyDown", this).call(this, event);
      }

      var target = event.target,
          keyCode = event.keyCode,
          ctrlKey = event.ctrlKey,
          metaKey = event.metaKey;

      if (target !== this.input.element && !this.containerOuter.element.contains(target)) {
        return;
      }

      var activeItems = this._store.activeItems;
      var hasFocusedInput = this.input.isFocussed;
      var hasActiveDropdown = this.dropdown.isActive;
      var hasItems = this.itemList.hasChildren;
      var keyString = String.fromCharCode(keyCode);
      var BACK_KEY = KEY_CODES.BACK_KEY,
          DELETE_KEY = KEY_CODES.DELETE_KEY,
          TAB_KEY = KEY_CODES.TAB_KEY,
          ENTER_KEY = KEY_CODES.ENTER_KEY,
          A_KEY = KEY_CODES.A_KEY,
          ESC_KEY = KEY_CODES.ESC_KEY,
          UP_KEY = KEY_CODES.UP_KEY,
          DOWN_KEY = KEY_CODES.DOWN_KEY,
          PAGE_UP_KEY = KEY_CODES.PAGE_UP_KEY,
          PAGE_DOWN_KEY = KEY_CODES.PAGE_DOWN_KEY;
      var hasCtrlDownKeyPressed = ctrlKey || metaKey; // If a user is typing and the dropdown is not active

      if (!this._isTextElement && /[a-zA-Z0-9-_ ]/.test(keyString)) {
        this.showDropdown();
      } // Map keys to key actions


      var keyDownActions = (_keyDownActions = {}, _defineProperty(_keyDownActions, A_KEY, this._onAKey), _defineProperty(_keyDownActions, TAB_KEY, this._onTabKey), _defineProperty(_keyDownActions, ENTER_KEY, this._onEnterKey), _defineProperty(_keyDownActions, ESC_KEY, this._onEscapeKey), _defineProperty(_keyDownActions, UP_KEY, this._onDirectionKey), _defineProperty(_keyDownActions, PAGE_UP_KEY, this._onDirectionKey), _defineProperty(_keyDownActions, DOWN_KEY, this._onDirectionKey), _defineProperty(_keyDownActions, PAGE_DOWN_KEY, this._onDirectionKey), _defineProperty(_keyDownActions, DELETE_KEY, this._onDeleteKey), _defineProperty(_keyDownActions, BACK_KEY, this._onDeleteKey), _keyDownActions); // If keycode has a function, run it

      if (keyDownActions[keyCode]) {
        keyDownActions[keyCode]({
          event: event,
          target: target,
          keyCode: keyCode,
          metaKey: metaKey,
          activeItems: activeItems,
          hasFocusedInput: hasFocusedInput,
          hasActiveDropdown: hasActiveDropdown,
          hasItems: hasItems,
          hasCtrlDownKeyPressed: hasCtrlDownKeyPressed
        });
      }
    }
  }, {
    key: "onSelectValue",
    value: function onSelectValue(_ref2) {
      var event = _ref2.event,
          activeItems = _ref2.activeItems,
          hasActiveDropdown = _ref2.hasActiveDropdown;

      if (hasActiveDropdown) {
        this._selectHighlightedChoice(activeItems);
      } else if (this._isSelectOneElement) {
        this.showDropdown();
        event.preventDefault();
      }
    }
  }, {
    key: "showDropdown",
    value: function showDropdown() {
      var _get4;

      if (!this.shouldOpenDropDown) {
        this.shouldOpenDropDown = true;
        return;
      }

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      (_get4 = _get(_getPrototypeOf(ChoicesWrapper.prototype), "showDropdown", this)).call.apply(_get4, [this].concat(args));
    }
  }, {
    key: "hideDropdown",
    value: function hideDropdown() {
      var _get5;

      if (this.isDirectionUsing) {
        return;
      }

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      (_get5 = _get(_getPrototypeOf(ChoicesWrapper.prototype), "hideDropdown", this)).call.apply(_get5, [this].concat(args));
    }
  }]);

  return ChoicesWrapper;
}(_choices.default);

var _default = ChoicesWrapper;
exports.default = _default;
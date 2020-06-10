var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Choices from 'choices.js';
/**
 * TODO: REMOVE THIS ONCE THE PULL REQUEST HAS BEEN RESOLVED.
 *
 * https://github.com/jshjohnson/Choices/pull/788
 *
 * This is intentionally not part of the extended class, since other components use Choices and need this fix as well.
 * @type {Choices._generatePlaceholderValue}
 * @private
 */
Choices.prototype._generatePlaceholderValue = function () {
    if (this._isSelectElement && this.passedElement.placeholderOption) {
        var placeholderOption = this.passedElement.placeholderOption;
        return placeholderOption ? placeholderOption.text : false;
    }
    var _a = this.config, placeholder = _a.placeholder, placeholderValue = _a.placeholderValue;
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
export var KEY_CODES = {
    BACK_KEY: 46,
    DELETE_KEY: 8,
    TAB_KEY: 9,
    ENTER_KEY: 13,
    A_KEY: 65,
    ESC_KEY: 27,
    UP_KEY: 38,
    DOWN_KEY: 40,
    PAGE_UP_KEY: 33,
    PAGE_DOWN_KEY: 34,
};
var ChoicesWrapper = /** @class */ (function (_super) {
    __extends(ChoicesWrapper, _super);
    function ChoicesWrapper() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this._onTabKey = _this._onTabKey.bind(_this);
        _this.isDirectionUsing = false;
        _this.shouldOpenDropDown = true;
        return _this;
    }
    ChoicesWrapper.prototype._handleButtonAction = function (activeItems, element) {
        if (!this._isSelectOneElement) {
            return _super.prototype._handleButtonAction.call(this, activeItems, element);
        }
        if (!activeItems ||
            !element ||
            !this.config.removeItems ||
            !this.config.removeItemButton) {
            return;
        }
        this.shouldOpenDropDown = false;
        _super.prototype._handleButtonAction.call(this, activeItems, element);
    };
    ChoicesWrapper.prototype._onDirectionKey = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this._isSelectOneElement) {
            return _super.prototype._onDirectionKey.apply(this, args);
        }
        this.isDirectionUsing = true;
        _super.prototype._onDirectionKey.apply(this, args);
        this.onSelectValue.apply(this, args);
        this.isDirectionUsing = false;
    };
    ChoicesWrapper.prototype._onTabKey = function (_a) {
        var activeItems = _a.activeItems, hasActiveDropdown = _a.hasActiveDropdown;
        if (hasActiveDropdown) {
            this._selectHighlightedChoice(activeItems);
        }
    };
    ChoicesWrapper.prototype._selectHighlightedChoice = function (activeItems) {
        var highlightedChoice = this.dropdown.getChild("." + this.config.classNames.highlightedState);
        if (highlightedChoice) {
            this._handleChoiceAction(activeItems, highlightedChoice);
        }
        event.preventDefault();
    };
    ChoicesWrapper.prototype._onKeyDown = function (event) {
        var _a;
        if (!this._isSelectOneElement) {
            return _super.prototype._onKeyDown.call(this, event);
        }
        var target = event.target, keyCode = event.keyCode, ctrlKey = event.ctrlKey, metaKey = event.metaKey;
        if (target !== this.input.element &&
            !this.containerOuter.element.contains(target)) {
            return;
        }
        var activeItems = this._store.activeItems;
        var hasFocusedInput = this.input.isFocussed;
        var hasActiveDropdown = this.dropdown.isActive;
        var hasItems = this.itemList.hasChildren;
        var keyString = String.fromCharCode(keyCode);
        var BACK_KEY = KEY_CODES.BACK_KEY, DELETE_KEY = KEY_CODES.DELETE_KEY, TAB_KEY = KEY_CODES.TAB_KEY, ENTER_KEY = KEY_CODES.ENTER_KEY, A_KEY = KEY_CODES.A_KEY, ESC_KEY = KEY_CODES.ESC_KEY, UP_KEY = KEY_CODES.UP_KEY, DOWN_KEY = KEY_CODES.DOWN_KEY, PAGE_UP_KEY = KEY_CODES.PAGE_UP_KEY, PAGE_DOWN_KEY = KEY_CODES.PAGE_DOWN_KEY;
        var hasCtrlDownKeyPressed = ctrlKey || metaKey;
        // If a user is typing and the dropdown is not active
        if (!this._isTextElement && /[a-zA-Z0-9-_ ]/.test(keyString)) {
            this.showDropdown();
        }
        // Map keys to key actions
        var keyDownActions = (_a = {},
            _a[A_KEY] = this._onAKey,
            _a[TAB_KEY] = this._onTabKey,
            _a[ENTER_KEY] = this._onEnterKey,
            _a[ESC_KEY] = this._onEscapeKey,
            _a[UP_KEY] = this._onDirectionKey,
            _a[PAGE_UP_KEY] = this._onDirectionKey,
            _a[DOWN_KEY] = this._onDirectionKey,
            _a[PAGE_DOWN_KEY] = this._onDirectionKey,
            _a[DELETE_KEY] = this._onDeleteKey,
            _a[BACK_KEY] = this._onDeleteKey,
            _a);
        // If keycode has a function, run it
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
                hasCtrlDownKeyPressed: hasCtrlDownKeyPressed,
            });
        }
    };
    ChoicesWrapper.prototype.onSelectValue = function (_a) {
        var event = _a.event, activeItems = _a.activeItems, hasActiveDropdown = _a.hasActiveDropdown;
        if (hasActiveDropdown) {
            this._selectHighlightedChoice(activeItems);
        }
        else if (this._isSelectOneElement) {
            this.showDropdown();
            event.preventDefault();
        }
    };
    ChoicesWrapper.prototype.showDropdown = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.shouldOpenDropDown) {
            this.shouldOpenDropDown = true;
            return;
        }
        _super.prototype.showDropdown.apply(this, args);
    };
    ChoicesWrapper.prototype.hideDropdown = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.isDirectionUsing) {
            return;
        }
        _super.prototype.hideDropdown.apply(this, args);
    };
    return ChoicesWrapper;
}(Choices));
export default ChoicesWrapper;

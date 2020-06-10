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
import _ from 'lodash';
import Element from '../Element';
import NativePromise from 'native-promise-only';
var InputWidget = /** @class */ (function (_super) {
    __extends(InputWidget, _super);
    function InputWidget(settings, component) {
        var _this = _super.call(this, settings) || this;
        _this.namespace = 'formio.widget';
        _this.component = component || {};
        _this.settings = _.merge({}, _this.defaultSettings, settings || {});
        return _this;
    }
    Object.defineProperty(InputWidget, "defaultSettings", {
        get: function () {
            return {
                type: 'input'
            };
        },
        enumerable: false,
        configurable: true
    });
    InputWidget.prototype.attach = function (input) {
        this._input = input;
        return NativePromise.resolve();
    };
    Object.defineProperty(InputWidget.prototype, "defaultSettings", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputWidget.prototype, "disabled", {
        set: function (disabled) {
            if (disabled) {
                this._input.setAttribute('disabled', 'disabled');
            }
            else {
                this._input.removeAttribute('disabled');
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputWidget.prototype, "input", {
        get: function () {
            return this._input;
        },
        enumerable: false,
        configurable: true
    });
    InputWidget.prototype.getValue = function () {
        return this._input.value;
    };
    InputWidget.prototype.getValueAsString = function (value) {
        return value;
    };
    InputWidget.prototype.validationValue = function (value) {
        return value;
    };
    InputWidget.prototype.addPrefix = function () {
        return null;
    };
    InputWidget.prototype.addSuffix = function () {
        return null;
    };
    InputWidget.prototype.setValue = function (value) {
        this._input.value = value;
    };
    return InputWidget;
}(Element));
export default InputWidget;

'use strict';
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Component from '../component/Component';
import NestedComponent from '../nested/NestedComponent';
import _ from 'lodash';
var NestedDataComponent = /** @class */ (function (_super) {
    __extends(NestedDataComponent, _super);
    function NestedDataComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NestedDataComponent.prototype.hasChanged = function (newValue, oldValue) {
        // If we do not have a value and are getting set to anything other than undefined or null, then we changed.
        if (newValue !== undefined &&
            newValue !== null &&
            !this.hasValue()) {
            return true;
        }
        return !_.isEqual(newValue, oldValue);
    };
    Object.defineProperty(NestedDataComponent.prototype, "allowData", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    NestedDataComponent.prototype.getValueAsString = function (value, options) {
        if (options === null || options === void 0 ? void 0 : options.email) {
            var result_1 = ("\n        <table border=\"1\" style=\"width:100%\">\n          <tbody>\n      ");
            this.everyComponent(function (component) {
                if (component.isInputComponent && component.visible && !component.skipInEmail) {
                    result_1 += ("\n            <tr>\n              <th style=\"padding: 5px 10px;\">" + component.label + "</th>\n              <td style=\"width:100%;padding:5px 10px;\">" + component.getView(component.dataValue, options) + "</td>\n            </tr>\n          ");
                }
            }, __assign(__assign({}, options), { fromRoot: true }));
            result_1 += ("\n          </tbody>\n        </table>\n      ");
            return result_1;
        }
        return '[Complex Data]';
    };
    NestedDataComponent.prototype.everyComponent = function (fn, options) {
        if (options === null || options === void 0 ? void 0 : options.email) {
            if (options.fromRoot) {
                delete options.fromRoot;
            }
            else {
                return;
            }
        }
        return _super.prototype.everyComponent.call(this, fn, options);
    };
    /**
     * Get the value of this component.
     *
     * @returns {*}
     */
    NestedDataComponent.prototype.getValue = function () {
        return this.dataValue;
    };
    NestedDataComponent.prototype.updateValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        // Intentionally skip over nested component updateValue method to keep
        // recursive update from occurring with sub components.
        return Component.prototype.updateValue.call(this, value, flags);
    };
    return NestedDataComponent;
}(NestedComponent));
export default NestedDataComponent;

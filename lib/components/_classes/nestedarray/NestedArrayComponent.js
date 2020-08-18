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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import _ from 'lodash';
import { superGet } from '../../../utils/utils';
import Component from '../component/Component';
import NestedDataComponent from '../nesteddata/NestedDataComponent';
var NestedArrayComponent = /** @class */ (function (_super) {
    __extends(NestedArrayComponent, _super);
    function NestedArrayComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NestedArrayComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedDataComponent.schema.apply(NestedDataComponent, __spreadArrays([{
                disableAddingRemovingRows: false
            }], extend));
    };
    NestedArrayComponent.prototype.componentContext = function (component) {
        return this.iteratableRows[component.rowIndex].data;
    };
    Object.defineProperty(NestedArrayComponent.prototype, "iteratableRows", {
        get: function () {
            throw new Error('Getter #iteratableRows() is not implemented');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedArrayComponent.prototype, "rowIndex", {
        get: function () {
            return superGet(NestedDataComponent, 'rowIndex', this);
        },
        set: function (value) {
            this._rowIndex = value;
        },
        enumerable: false,
        configurable: true
    });
    NestedArrayComponent.prototype.checkData = function (data, flags, row) {
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        return this.checkRows('checkData', data, flags, Component.prototype.checkData.call(this, data, flags, row));
    };
    NestedArrayComponent.prototype.checkRows = function (method, data, opts, defaultValue, silentCheck) {
        var _this = this;
        return this.iteratableRows.reduce(function (valid, row) { return _this.checkRow(method, data, opts, row.data, row.components, silentCheck) && valid; }, defaultValue);
    };
    NestedArrayComponent.prototype.checkRow = function (method, data, opts, row, components, silentCheck) {
        return _.reduce(components, function (valid, component) { return component[method](data, opts, row, silentCheck) && valid; }, true);
    };
    NestedArrayComponent.prototype.hasAddButton = function () {
        var maxLength = _.get(this.component, 'validate.maxLength');
        var conditionalAddButton = _.get(this.component, 'conditionalAddButton');
        return !this.component.disableAddingRemovingRows &&
            !this.options.readOnly &&
            !this.disabled &&
            this.fullMode &&
            !this.options.preview &&
            (!maxLength || (this.iteratableRows.length < maxLength)) &&
            (!conditionalAddButton || this.evaluate(conditionalAddButton, {
                value: this.dataValue,
            }, 'show'));
    };
    NestedArrayComponent.prototype.getComponent = function (path, fn, originalPath) {
        if (this.builderMode) {
            return _super.prototype.getComponent.call(this, path, fn, originalPath);
        }
        path = Array.isArray(path) ? path : [path];
        var key = path.shift();
        var remainingPath = path;
        var result = [];
        var possibleComp = null;
        var comp = null;
        var rowIndex = null;
        if (_.isNumber(key)) {
            rowIndex = key;
            key = remainingPath.shift();
        }
        if (!_.isString(key)) {
            return result;
        }
        this.everyComponent(function (component, components) {
            if (component.component.key === key) {
                possibleComp = component;
                if (remainingPath.length > 0 && 'getComponent' in component) {
                    comp = component.getComponent(remainingPath, fn, originalPath);
                }
                else if (fn) {
                    fn(component, components);
                }
                result = rowIndex !== null ? comp : result.concat(comp || possibleComp);
            }
        }, rowIndex);
        if ((!result || result.length === 0) && possibleComp) {
            result = rowIndex !== null ? possibleComp : [possibleComp];
        }
        return result;
    };
    NestedArrayComponent.prototype.everyComponent = function (fn, rowIndex, options) {
        if (_.isObject(rowIndex)) {
            options = rowIndex;
            rowIndex = null;
        }
        if (options === null || options === void 0 ? void 0 : options.email) {
            return;
        }
        var components = this.getComponents(rowIndex);
        _.each(components, function (component, index) {
            if (fn(component, components, index) === false) {
                return false;
            }
            if (typeof component.everyComponent === 'function') {
                if (component.everyComponent(fn, options) === false) {
                    return false;
                }
            }
        });
    };
    NestedArrayComponent.prototype.getValueAsString = function (value, options) {
        if (options === null || options === void 0 ? void 0 : options.email) {
            var result_1 = ("\n        <table border=\"1\" style=\"width:100%\">\n          <thead>\n            <tr>\n      ");
            this.component.components.forEach(function (component) {
                var label = component.label || component.key;
                result_1 += "<th style=\"padding: 5px 10px;\">" + label + "</th>";
            });
            result_1 += ("\n          </tr>\n        </thead>\n        <tbody>\n      ");
            this.iteratableRows.forEach(function (_a) {
                var components = _a.components;
                result_1 += '<tr>';
                _.each(components, function (component) {
                    result_1 += '<td style="padding:5px 10px;">';
                    if (component.isInputComponent && component.visible && !component.skipInEmail) {
                        result_1 += component.getView(component.dataValue, options);
                    }
                    result_1 += '</td>';
                });
                result_1 += '</tr>';
            });
            result_1 += ("\n          </tbody>\n        </table>\n      ");
            return result_1;
        }
        return _super.prototype.getValueAsString.call(this, value, options);
    };
    NestedArrayComponent.prototype.getComponents = function (rowIndex) {
        if (rowIndex) {
            if (!this.iteratableRows[rowIndex]) {
                return [];
            }
            return this.iteratableRows[rowIndex].components;
        }
        return _super.prototype.getComponents.call(this);
    };
    return NestedArrayComponent;
}(NestedDataComponent));
export default NestedArrayComponent;

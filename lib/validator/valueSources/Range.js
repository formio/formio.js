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
import { ConditionalAssignmentValueSource } from './ConditionalAssignment';
import { ListValueSource } from './List';
import { ValueSource } from './ValueSource';
var RangeValueSource = /** @class */ (function (_super) {
    __extends(RangeValueSource, _super);
    function RangeValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RangeValueSource, "name", {
        get: function () {
            return 'range';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RangeValueSource, "title", {
        get: function () {
            return 'Range';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RangeValueSource, "weight", {
        get: function () {
            return 480;
        },
        enumerable: false,
        configurable: true
    });
    RangeValueSource.getInputEditForm = function (_a) {
        var customConditions = _a.customConditions, customVariables = _a.customVariables, editFormUtils = _a.editFormUtils, excludeConditions = _a.excludeConditions, excludeValueSources = _a.excludeValueSources, excludeVariables = _a.excludeVariables;
        var getParam = function (label, key, required) {
            if (required === void 0) { required = true; }
            return ({
                label: label,
                key: key,
                type: 'container',
                input: true,
                hideLabel: false,
                components: editFormUtils.valueDeclaration({
                    customConditions: customConditions,
                    customVariables: customVariables,
                    excludeConditions: excludeConditions,
                    excludeValueSources: __spreadArrays(excludeValueSources, [
                        ConditionalAssignmentValueSource.name,
                        ListValueSource.name,
                        RangeValueSource.name,
                    ]),
                    excludeVariables: excludeVariables,
                    required: required,
                }),
            });
        };
        return {
            label: 'Range',
            type: 'container',
            input: true,
            hideLabel: false,
            components: [
                getParam('From', 'from', false),
                getParam('To', 'to'),
                getParam('Step', 'step', false),
            ],
        };
    };
    RangeValueSource.prototype.getValue = function (input) {
        var _a, _b;
        var from = input.from, to = input.to, step = input.step;
        var fromValue = (_a = this.targetComponentInstance.calculateValueDefinition(from.valueSource, from[from.valueSource + "Input"], this.context)) !== null && _a !== void 0 ? _a : 0;
        var toValue = this.targetComponentInstance.calculateValueDefinition(to.valueSource, to[to.valueSource + "Input"], this.context);
        var stepValue = (_b = this.targetComponentInstance.calculateValueDefinition(step.valueSource, step[step.valueSource + "Input"], this.context)) !== null && _b !== void 0 ? _b : 1;
        var ascending = (fromValue < toValue);
        return _.range(fromValue, toValue + (ascending ? 1 : -1), ascending ? stepValue : -stepValue);
    };
    return RangeValueSource;
}(ValueSource));
export { RangeValueSource };

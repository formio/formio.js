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
import { ListValueSource } from './List';
import { RangeValueSource } from './Range';
import { ValueSource } from './ValueSource';
var ConditionalAssignmentValueSource = /** @class */ (function (_super) {
    __extends(ConditionalAssignmentValueSource, _super);
    function ConditionalAssignmentValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ConditionalAssignmentValueSource, "name", {
        get: function () {
            return 'conditionalAssignment';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConditionalAssignmentValueSource, "title", {
        get: function () {
            return 'Conditional Assignment';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConditionalAssignmentValueSource, "weight", {
        get: function () {
            return 720;
        },
        enumerable: false,
        configurable: true
    });
    ConditionalAssignmentValueSource.getInputEditForm = function (_a) {
        var customConditions = _a.customConditions, customVariables = _a.customVariables, editFormUtils = _a.editFormUtils, excludeConditions = _a.excludeConditions, excludeValueSources = _a.excludeValueSources, excludeVariables = _a.excludeVariables;
        return {
            label: 'Conditional Assignment',
            input: true,
            type: 'editgrid',
            templates: {
                header: ("<div class=\"row\">\n            <div class=\"col-sm-5\">Condition</div>\n            <div class=\"col-sm-5\">Value</div>\n            <div class=\"col-sm-2\"></div>\n          </div>"),
                row: function (_a) {
                    var flattenedComponents = _a.flattenedComponents, row = _a.row;
                    function displayFullPath(componentPath) {
                        return componentPath.map(function (pathPart, pathPartIndex) {
                            var pathFlattenedComponents = flattenedComponents.componentPathInput.flattenComponents(pathPartIndex);
                            var componentKey = pathFlattenedComponents.component.getView(pathPart.component);
                            var inputName = pathPart.indexType + "Index";
                            var index = (pathPart.indexType === 'same')
                                ? 'Same Index'
                                : pathFlattenedComponents[inputName]
                                    ? pathFlattenedComponents[inputName].getView(pathPart[inputName])
                                    : '';
                            return "" + componentKey + (index ? " [" + index + "]" : '');
                        }).join('.');
                    }
                    var condition = flattenedComponents.condition.getView(row.condition);
                    var inputName = row.valueSource + "Input";
                    var value = (row.valueSource === 'thisComponent')
                        ? 'This Component Value'
                        : (row.valueSource === 'componentPath')
                            ? displayFullPath(row[inputName])
                            : flattenedComponents[inputName]
                                ? flattenedComponents[inputName].getView(row[inputName])
                                : '';
                    return ("<div class=\"row\">\n              <div class=\"col-sm-5\">" + condition + "</div>\n              <div class=\"col-sm-5\">" + value + "</div>\n              <div class=\"col-sm-2\">\n                <button class=\"btn btn-default btn-light btn-sm editRow\">E</button>\n                <button class=\"btn btn-danger btn-sm removeRow\">D</button>\n              </div>\n            </div>");
                },
            },
            addAnother: 'Add Assignment',
            saveRow: 'Save Assignment',
            components: __spreadArrays([
                editFormUtils.conditionSelector({
                    customValues: customConditions,
                    exclude: excludeConditions,
                })
            ], editFormUtils.valueDeclaration({
                customConditions: customConditions,
                customVariables: customVariables,
                excludeConditions: excludeConditions,
                excludeValueSources: __spreadArrays(excludeValueSources, [
                    // Exclude current valueSource to prevent infinite recursion.
                    ConditionalAssignmentValueSource.name,
                    ListValueSource.name,
                    RangeValueSource.name,
                ]),
                excludeVariables: excludeVariables,
            })),
        };
    };
    ConditionalAssignmentValueSource.prototype.getValue = function (input) {
        var _this = this;
        var branch = input.find(function (_a) {
            var condition = _a.condition;
            return (!condition || _this.targetComponentInstance.calculateCondition(condition));
        });
        return (branch
            ? this.targetComponentInstance.calculateValueDefinition(branch.valueSource, branch[branch.valueSource + "Input"], this.context)
            : null);
    };
    return ConditionalAssignmentValueSource;
}(ValueSource));
export { ConditionalAssignmentValueSource };

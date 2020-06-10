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
import { ConditionalAssignmentValueSource } from './ConditionalAssignment';
import { ValueSource } from './ValueSource';
var ListValueSource = /** @class */ (function (_super) {
    __extends(ListValueSource, _super);
    function ListValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ListValueSource, "name", {
        get: function () {
            return 'list';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListValueSource, "title", {
        get: function () {
            return 'List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListValueSource, "weight", {
        get: function () {
            return 470;
        },
        enumerable: false,
        configurable: true
    });
    ListValueSource.getInputEditForm = function (_a) {
        var customConditions = _a.customConditions, customVariables = _a.customVariables, editFormUtils = _a.editFormUtils, excludeConditions = _a.excludeConditions, excludeValueSources = _a.excludeValueSources, excludeVariables = _a.excludeVariables;
        return {
            label: 'Values',
            input: true,
            type: 'editgrid',
            templates: {
                header: ("<div class=\"row\">\n            <div class=\"col-sm-10\">Value</div>\n            <div class=\"col-sm-2\"></div>\n          </div>"),
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
                    var inputName = row.valueSource + "Input";
                    var value = (row.valueSource === 'thisComponent')
                        ? 'This Component Value'
                        : (row.valueSource === 'componentPath')
                            ? displayFullPath(row[inputName])
                            : flattenedComponents[inputName]
                                ? flattenedComponents[inputName].getView(row[inputName])
                                : '';
                    return ("<div class=\"row\">\n              <div class=\"col-sm-10\">" + value + "</div>\n              <div class=\"col-sm-2\">\n                <button class=\"btn btn-default btn-light btn-sm editRow\">E</button>\n                <button class=\"btn btn-danger btn-sm removeRow\">D</button>\n              </div>\n            </div>");
                },
            },
            addAnother: 'Add Value',
            saveRow: 'Save Value',
            components: __spreadArrays(editFormUtils.valueDeclaration({
                customConditions: customConditions,
                customVariables: customVariables,
                excludeConditions: excludeConditions,
                excludeValueSources: __spreadArrays(excludeValueSources, [
                    // Exclude current valueSource to prevent infinite recursion.
                    ConditionalAssignmentValueSource.name,
                    ListValueSource.name,
                ]),
                excludeVariables: excludeVariables,
            })),
        };
    };
    ListValueSource.prototype.getValue = function (input) {
        var _this = this;
        return input.map(function (_a) {
            var valueSource = _a.valueSource, _b = valueSource + "Input", valueSourceInput = _a[_b];
            return _this.targetComponentInstance.calculateValueDefinition(valueSource, valueSourceInput, _this.context);
        });
    };
    return ListValueSource;
}(ValueSource));
export { ListValueSource };

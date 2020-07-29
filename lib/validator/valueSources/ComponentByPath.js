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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import _ from 'lodash';
import { NumberValueSource } from './Number';
import { SameIndexValueSource } from './SameIndex';
import { ValueSource } from './ValueSource';
import { VariableValueSource } from './Variable';
var indexTypes = [
    NumberValueSource,
    SameIndexValueSource,
    VariableValueSource,
].reduce(function (result, indexType) {
    var _a;
    return (__assign(__assign({}, result), (_a = {}, _a[indexType.name] = indexType, _a)));
}, {});
var commonIndexSources = [
    NumberValueSource,
    VariableValueSource,
];
var ComponentByPathValueSource = /** @class */ (function (_super) {
    __extends(ComponentByPathValueSource, _super);
    function ComponentByPathValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ComponentByPathValueSource, "name", {
        get: function () {
            return 'componentPath';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComponentByPathValueSource, "title", {
        get: function () {
            return 'Component By Path';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComponentByPathValueSource, "weight", {
        get: function () {
            return 100;
        },
        enumerable: false,
        configurable: true
    });
    ComponentByPathValueSource.getInputEditForm = function (options) {
        return {
            label: 'Component Path',
            inlineEdit: true,
            type: 'editgrid',
            input: true,
            templates: {
                header: ("<div class=\"row\">\n            <div class=\"col-sm-10\">Path Part</div>\n            <div class=\"col-sm-2\"></div>\n          </div>"),
                row: function (_a) {
                    var flattenedComponents = _a.flattenedComponents, row = _a.row;
                    var componentKey = flattenedComponents.component.getView(row.component);
                    var inputName = row.indexType + "Index";
                    var index = (row.indexType === 'same')
                        ? 'Same Index'
                        : flattenedComponents[inputName]
                            ? flattenedComponents[inputName].getView(row[inputName])
                            : '';
                    var path = "" + componentKey + (index ? " [" + index + "]" : '');
                    return ("<div class=\"row\">\n              <div class=\"col-sm-10\">" + path + "</div>\n              <div class=\"col-sm-2\">\n                <button class=\"btn btn-default btn-light btn-sm editRow\">E</button>\n                <button class=\"btn btn-danger btn-sm removeRow\">D</button>\n              </div>\n            </div>");
                },
            },
            addAnother: 'Add Path Part',
            saveRow: 'Save Path Part',
            components: __spreadArrays([
                {
                    label: 'Component',
                    dataSrc: 'custom',
                    data: {
                        custom: function (_a) {
                            var instance = _a.instance, rowIndex = _a.rowIndex;
                            var pathComponentsMapping = instance.root.pathComponentsMapping;
                            var path = instance.parent.dataValue;
                            var currentPath = path.slice(0, rowIndex).map(function (_a) {
                                var component = _a.component;
                                return component;
                            }).join('.');
                            // const contextRow = {
                            //   label: 'Context',
                            //   value: '[context]',
                            // };
                            return pathComponentsMapping[currentPath];
                        },
                    },
                    valueProperty: 'key',
                    dataType: 'string',
                    template: '<span>{{ item.label || item.key }} ({{ item.key }})</span>',
                    validate: {
                        required: true,
                    },
                    key: 'component',
                    type: 'select',
                    input: true,
                },
                {
                    label: 'Index',
                    dataSrc: 'custom',
                    data: {
                        custom: function (_a) {
                            var instance = _a.instance, rowIndex = _a.rowIndex;
                            var parentPath = instance.root.parentPath;
                            var path = instance.parent.dataValue;
                            var currentPath = path.slice(0, rowIndex + 1).map(function (_a) {
                                var component = _a.component;
                                return component;
                            }).join('.');
                            var inSameScope = parentPath.startsWith(currentPath + ".") || (parentPath === currentPath);
                            var commonOptions = commonIndexSources.map(function (indexSource) { return ({
                                label: indexSource.title,
                                value: indexSource.name,
                            }); });
                            return (inSameScope
                                ? [
                                    {
                                        label: SameIndexValueSource.title,
                                        value: SameIndexValueSource.name,
                                    },
                                ]
                                : []).concat(commonOptions);
                        },
                    },
                    valueProperty: 'value',
                    dataType: 'string',
                    key: 'indexType',
                    customConditional: function (_a) {
                        var instance = _a.instance, rowIndex = _a.rowIndex;
                        var arrayDataComponentPaths = instance.root.arrayDataComponentPaths;
                        var path = instance.parent.dataValue;
                        var currentPath = path.slice(0, rowIndex + 1).map(function (_a) {
                            var component = _a.component;
                            return component;
                        }).join('.');
                        return arrayDataComponentPaths.includes(currentPath);
                    },
                    type: 'select',
                    input: true,
                }
            ], commonIndexSources.map(function (indexSource) { return (__assign(__assign({}, indexSource.getInputEditForm(options)), { key: indexSource.name + "Index", conditional: {
                    json: {
                        '===': [
                            {
                                var: 'row.indexType',
                            },
                            indexSource.name,
                        ],
                    },
                } })); })),
            conditionalAddButton: function (_a) {
                var value = _a.value, instance = _a.instance;
                var pathComponentsMapping = instance.root.pathComponentsMapping;
                var currentPath = value.map(function (_a) {
                    var component = _a.component;
                    return component;
                }).join('.');
                return Boolean(pathComponentsMapping[currentPath]);
            },
        };
    };
    ComponentByPathValueSource.prototype.getValue = function (input) {
        var _this = this;
        var pathForRowIndex;
        var lastIndex = null;
        var component = input.reduce(function (context, pathPart) {
            var _a = pathPart, component = _a.component, indexType = _a.indexType, _b = indexType + "Index", indexInput = _a[_b];
            var lastIndexExists = _.isNumber(lastIndex);
            var getNextContext = function (prevContext) {
                if (_.isNil(prevContext)) {
                    return prevContext;
                }
                var nextContext = prevContext.getComponent(component);
                return (lastIndexExists && _.isArray(nextContext))
                    ? nextContext[lastIndex]
                    : nextContext;
            };
            var nextContext = Array.isArray(context)
                ? context.flatMap(function (contextElement) { return getNextContext(contextElement); })
                : getNextContext(context);
            pathForRowIndex = "" + (pathForRowIndex ? "" + pathForRowIndex + (lastIndexExists ? "[" + lastIndex + "]" : '') + "." : '') + component;
            if (lastIndexExists) {
                lastIndex = null;
            }
            if (indexType) {
                var IndexType = indexTypes[indexType];
                if (!IndexType) {
                    return null;
                }
                var indexTypeInstance = new IndexType(__assign(__assign({}, _this.context), { options: __assign(__assign({}, _this.options), { pathForRowIndex: pathForRowIndex }) }));
                lastIndex = indexTypeInstance.getValue(indexInput);
            }
            return nextContext;
        }, this.formInstance);
        return component !== null && component !== void 0 ? component : null;
    };
    return ComponentByPathValueSource;
}(ValueSource));
export { ComponentByPathValueSource };

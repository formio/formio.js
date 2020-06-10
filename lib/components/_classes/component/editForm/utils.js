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
import { Conjunctions, QuickRulesHelper, Operators, Transformers, ValueSources, } from '../../../../validator';
import Evaluator from '../../../../utils/Evaluator';
var EditFormUtils = {
    sortAndFilterComponents: function (components) {
        return _.filter(_.sortBy(components, 'weight'), function (item) { return !item.ignore; });
    },
    unifyComponents: function (objValue, srcValue) {
        if (objValue.key && srcValue.key) {
            if (objValue.skipMerge || srcValue.skipMerge) {
                return false;
            }
            if (objValue.key === srcValue.key) {
                // Create complete objects by including missing keys.
                _.each(objValue, function (value, prop) {
                    if (objValue.overrideEditForm || !srcValue.hasOwnProperty(prop)) {
                        srcValue[prop] = value;
                    }
                });
                _.each(srcValue, function (value, prop) {
                    if (srcValue.overrideEditForm || !objValue.hasOwnProperty(prop)) {
                        objValue[prop] = value;
                    }
                });
                if (objValue.components) {
                    srcValue.components = EditFormUtils.sortAndFilterComponents(_.unionWith(objValue.components, srcValue.components, EditFormUtils.unifyComponents));
                }
                if (objValue.sidebar) {
                    srcValue.sidebar = EditFormUtils.sortAndFilterComponents(_.unionWith(objValue.sidebar, srcValue.sidebar, EditFormUtils.unifyComponents));
                }
                return true;
            }
            else {
                return false;
            }
        }
        return _.isEqual(objValue, srcValue);
    },
    logicVariablesTable: function (additional) {
        additional = additional || '';
        return {
            type: 'htmlelement',
            tag: 'div',
            /* eslint-disable prefer-template */
            content: '<p>The following variables are available in all scripts.</p>' +
                '<table class="table table-bordered table-condensed table-striped">' +
                additional +
                '<tr><th>form</th><td>The complete form JSON object</td></tr>' +
                '<tr><th>submission</th><td>The complete submission object.</td></tr>' +
                '<tr><th>data</th><td>The complete submission data object.</td></tr>' +
                '<tr><th>row</th><td>Contextual "row" data, used within DataGrid, EditGrid, and Container components</td></tr>' +
                '<tr><th>component</th><td>The current component JSON</td></tr>' +
                '<tr><th>instance</th><td>The current component instance.</td></tr>' +
                '<tr><th>value</th><td>The current value of the component.</td></tr>' +
                '<tr><th>moment</th><td>The moment.js library for date manipulation.</td></tr>' +
                '<tr><th>_</th><td>An instance of <a href="https://lodash.com/docs/" target="_blank">Lodash</a>.</td></tr>' +
                '<tr><th>utils</th><td>An instance of the <a href="http://formio.github.io/formio.js/docs/identifiers.html#utils" target="_blank">FormioUtils</a> object.</td></tr>' +
                '<tr><th>util</th><td>An alias for "utils".</td></tr>' +
                '</table><br/>',
        };
    },
    logicSectionHandler: {
        js: function (_a) {
            var commonName = _a.commonName, property = _a.property, example = _a.example;
            return {
                type: 'panel',
                title: 'JavaScript',
                collapsible: true,
                collapsed: false,
                style: { 'margin-bottom': '10px' },
                key: commonName + "-js",
                customConditional: function () {
                    return !Evaluator.noeval;
                },
                components: [
                    {
                        type: 'textarea',
                        key: property,
                        rows: 5,
                        editor: 'ace',
                        hideLabel: true,
                        input: true,
                    },
                    {
                        type: 'htmlelement',
                        tag: 'div',
                        content: "<p>Enter custom javascript code.</p>" + example,
                    },
                ],
            };
        },
        json: function (_a) {
            var commonName = _a.commonName, property = _a.property, example = _a.example;
            return {
                type: 'panel',
                title: 'JSONLogic',
                collapsible: true,
                collapsed: true,
                key: commonName + "-json",
                components: [
                    {
                        type: 'htmlelement',
                        tag: 'div',
                        /* eslint-disable prefer-template */
                        content: '<p>Execute custom logic using <a href="http://jsonlogic.com/" target="_blank">JSONLogic</a>.</p>' +
                            '<p>Full <a href="https://lodash.com/docs" target="_blank">Lodash</a> support is provided using an "_" before each operation, such as <code>{"_sum": {var: "data.a"}}</code></p>' +
                            example,
                    },
                    {
                        type: 'textarea',
                        key: property,
                        rows: 5,
                        editor: 'ace',
                        hideLabel: true,
                        as: 'json',
                        input: true,
                    },
                ],
            };
        },
        variable: function (_a) {
            var commonName = _a.commonName, property = _a.property;
            return {
                type: 'panel',
                title: 'Variable',
                collapsible: true,
                collapsed: true,
                key: commonName + "-variable",
                components: [
                    __assign(__assign({}, EditFormUtils.variableSelector()), { key: property }),
                ],
            };
        },
        condition: function (_a) {
            var commonName = _a.commonName, property = _a.property;
            return {
                type: 'panel',
                title: 'Condition',
                collapsible: true,
                collapsed: true,
                key: commonName + "-condition",
                components: [
                    __assign(__assign({}, EditFormUtils.conditionSelector()), { key: property }),
                ],
            };
        },
    },
    javaScriptValue: function (title, property, weight, logicSections, additionalParams) {
        var _this = this;
        return {
            type: 'panel',
            title: title,
            theme: 'default',
            collapsible: true,
            collapsed: true,
            key: property + "Panel",
            weight: weight,
            components: __spreadArrays([
                this.logicVariablesTable(additionalParams)
            ], logicSections.map(function (logicSection) { return _this.logicSectionHandler[logicSection.type](__assign({ commonName: property }, logicSection)); })),
        };
    },
    valueDeclaration: function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.customConditions, customConditions = _c === void 0 ? null : _c, _d = _b.customVariables, customVariables = _d === void 0 ? null : _d, _e = _b.excludeConditions, excludeConditions = _e === void 0 ? [] : _e, _f = _b.excludeValueSources, excludeValueSources = _f === void 0 ? [] : _f, _g = _b.excludeVariables, excludeVariables = _g === void 0 ? [] : _g, _h = _b.required, required = _h === void 0 ? true : _h;
        var valueSources = _
            .chain(ValueSources.getValueSources())
            .values()
            .reject(function (_a) {
            var name = _a.name;
            return excludeValueSources.includes(name);
        })
            .sortBy('weight')
            .value();
        return __spreadArrays([
            {
                label: 'Value Source',
                data: {
                    values: valueSources.map(function (valueSource) { return ({
                        label: valueSource.title,
                        value: valueSource.name,
                    }); }),
                },
                validate: {
                    required: required,
                },
                key: 'valueSource',
                type: 'select',
                input: true,
            }
        ], valueSources
            .map(function (valueSource) {
            var editForm = valueSource.getInputEditForm({
                customConditions: customConditions,
                customVariables: customVariables,
                editFormUtils: EditFormUtils,
                excludeConditions: excludeConditions,
                excludeValueSources: excludeValueSources,
                excludeVariables: excludeVariables,
            });
            return editForm
                ? __assign(__assign({}, editForm), { key: valueSource.name + "Input", conditional: {
                        json: {
                            '===': [
                                {
                                    'var': 'row.valueSource',
                                },
                                valueSource.name,
                            ],
                        },
                    } }) : null;
        })
            .filter(_.identity));
    },
    variableSelector: function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.customValues, customValues = _c === void 0 ? null : _c, _d = _b.exclude, exclude = _d === void 0 ? [] : _d;
        return {
            type: 'select',
            input: true,
            key: 'variable',
            label: 'Variable',
            dataSrc: 'custom',
            groupProperty: 'group',
            data: {
                custom: function (args) {
                    var data = args.data, options = args.options;
                    var _a = options.editComponentParentInstance, editComponentParentInstance = _a === void 0 ? null : _a;
                    var getDefaultVariables = function () {
                        var _a, _b;
                        var result = ((_a = data.variables) !== null && _a !== void 0 ? _a : []).map(function (variable) { return (__assign(__assign({}, variable), { group: 'This Component' })); });
                        var current = editComponentParentInstance;
                        while (current) {
                            var variables = ((_b = current.variables) !== null && _b !== void 0 ? _b : []).map(function (variable) { return (__assign(__assign({}, variable), { group: current.parent ? current.label : 'Webform' })); });
                            result = result.concat(variables);
                            current = current.parent;
                        }
                        return result;
                    };
                    var values = customValues ? customValues(args) : getDefaultVariables();
                    return _
                        .chain(values)
                        .map(function (_a) {
                        var name = _a.name, key = _a.key, group = _a.group;
                        return ({
                            name: name,
                            key: key,
                            group: group,
                        });
                    })
                        .reject(function (_a) {
                        var key = _a.key;
                        return exclude.some(function (excludeVariable) { return (_.isFunction(excludeVariable)
                            ? excludeVariable(key, args)
                            : (key !== excludeVariable)); });
                    })
                        .value();
                },
            },
            valueProperty: 'key',
            template: '<span>{{ item.name || item.key }} ({{ item.key }})</span>',
        };
    },
    conditionSelector: function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.customValues, customValues = _c === void 0 ? null : _c, _d = _b.exclude, exclude = _d === void 0 ? [] : _d;
        return {
            type: 'select',
            input: true,
            key: 'condition',
            label: 'Condition',
            dataSrc: 'custom',
            groupProperty: 'group',
            data: {
                custom: function (args) {
                    var data = args.data, options = args.options;
                    var _a = options.editComponentParentInstance, editComponentParentInstance = _a === void 0 ? null : _a;
                    var getDefaultConditions = function () {
                        var _a, _b;
                        var result = ((_a = data.conditions) !== null && _a !== void 0 ? _a : []).map(function (condition) { return (__assign(__assign({}, condition), { group: 'This Component' })); });
                        var current = editComponentParentInstance;
                        while (current) {
                            var conditions = ((_b = current.conditions) !== null && _b !== void 0 ? _b : []).map(function (condition) { return (__assign(__assign({}, condition), { group: current.parent ? current.label : 'Webform' })); });
                            result = result.concat(conditions);
                            current = current.parent;
                        }
                        return result;
                    };
                    var values = customValues ? customValues(args) : getDefaultConditions();
                    return _
                        .chain(values)
                        .map(function (_a) {
                        var name = _a.name, key = _a.key, group = _a.group;
                        return ({
                            name: name,
                            key: key,
                            group: group,
                        });
                    })
                        .reject(function (_a) {
                        var key = _a.key;
                        return exclude.some(function (excludeCondition) { return (_.isFunction(excludeCondition)
                            ? excludeCondition(key, args)
                            : (key !== excludeCondition)); });
                    })
                        .value();
                },
            },
            valueProperty: 'key',
            template: '<span>{{ item.name || item.key }} ({{ item.key }})</span>',
        };
    },
    getTransformer: function (_a, _b) {
        var title = _a.title, name = _a.name, transformerArguments = _a.arguments, optionsEditForm = _a.optionsEditForm;
        var _c = _b === void 0 ? {} : _b, _d = _c.customConditions, customConditions = _d === void 0 ? null : _d, _e = _c.customVariables, customVariables = _e === void 0 ? null : _e, _f = _c.excludeValueSources, excludeValueSources = _f === void 0 ? [] : _f, _g = _c.excludeVariables, excludeVariables = _g === void 0 ? [] : _g;
        var conditional = {
            json: {
                '===': [
                    {
                        var: 'row.name',
                    },
                    name,
                ],
            },
        };
        return ((transformerArguments && transformerArguments.length)
            ? ([
                {
                    label: title + " Transform Arguments",
                    key: name + "Arguments",
                    type: 'container',
                    input: true,
                    components: transformerArguments.map(function (argumentDescription) { return EditFormUtils.getArgument(argumentDescription, {
                        customConditions: customConditions,
                        customVariables: customVariables,
                        excludeValueSources: excludeValueSources,
                        excludeVariables: __spreadArrays([
                            function (key, _a) {
                                var _b, _c, _d, _e;
                                var instance = _a.instance;
                                return (key === ((_e = (_d = (_c = (_b = instance === null || instance === void 0 ? void 0 : instance.parent) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.parent) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.key));
                            },
                            function (key, _a) {
                                var _b, _c, _d, _e, _f;
                                var instance = _a.instance;
                                return (key === ((_f = (_e = (_d = (_c = (_b = instance === null || instance === void 0 ? void 0 : instance.parent) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.parent) === null || _d === void 0 ? void 0 : _d.parent) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.key));
                            },
                            function (key, _a) {
                                var _b, _c, _d, _e, _f, _g;
                                var instance = _a.instance;
                                return (key === ((_g = (_f = (_e = (_d = (_c = (_b = instance === null || instance === void 0 ? void 0 : instance.parent) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.parent) === null || _d === void 0 ? void 0 : _d.parent) === null || _e === void 0 ? void 0 : _e.parent) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.key));
                            }
                        ], excludeVariables),
                    }); }),
                    conditional: conditional,
                },
            ])
            : [])
            .concat((optionsEditForm && optionsEditForm.length)
            ? ({
                label: 'Options',
                key: name + "Options",
                type: 'container',
                input: true,
                components: [
                    {
                        key: name + "OptionsPanel",
                        type: 'panel',
                        title: 'Options',
                        input: false,
                        collapsible: true,
                        collapsed: true,
                        components: optionsEditForm,
                    },
                ],
                conditional: conditional,
            })
            : []);
    },
    getOperator: function (_a, _b) {
        var title = _a.title, name = _a.name, operatorArguments = _a.arguments, optionsEditForm = _a.optionsEditForm;
        var _c = _b === void 0 ? {} : _b, _d = _c.customConditions, customConditions = _d === void 0 ? null : _d, _e = _c.customVariables, customVariables = _e === void 0 ? null : _e, _f = _c.excludeConditions, excludeConditions = _f === void 0 ? [] : _f, _g = _c.excludeValueSources, excludeValueSources = _g === void 0 ? [] : _g;
        var conditional = {
            json: {
                '===': [
                    {
                        var: 'row.name',
                    },
                    name,
                ],
            },
        };
        return ([
            {
                label: title,
                key: name + "Arguments",
                type: 'container',
                input: true,
                components: [
                    {
                        key: name + "ArgumentsPanel",
                        type: 'panel',
                        title: 'Arguments',
                        input: false,
                        collapsible: true,
                        collapsed: false,
                        components: operatorArguments.map(function (argumentDescription) { return EditFormUtils.getArgument(argumentDescription, {
                            customConditions: customConditions,
                            customVariables: customVariables,
                            excludeConditions: __spreadArrays([
                                function (key, _a) {
                                    var instance = _a.instance;
                                    return (key === instance.parent.parent.parent.parent.parent.data.key);
                                },
                                function (key, _a) {
                                    var instance = _a.instance;
                                    return (key === instance.parent.parent.parent.parent.parent.parent.data.key);
                                }
                            ], excludeConditions),
                            excludeValueSources: excludeValueSources,
                        }); }),
                    },
                ],
                conditional: conditional,
            },
        ]).concat((optionsEditForm && optionsEditForm.length)
            ? ({
                label: 'Options',
                key: name + "Options",
                type: 'container',
                input: true,
                components: [
                    {
                        key: name + "OptionsPanel",
                        type: 'panel',
                        title: 'Options',
                        input: false,
                        collapsible: true,
                        collapsed: true,
                        components: optionsEditForm,
                    },
                ],
                conditional: conditional,
            })
            : []);
    },
    getArgument: function (_a, _b) {
        var name = _a.name, key = _a.key, _c = _a.required, required = _c === void 0 ? false : _c;
        var _d = _b === void 0 ? {} : _b, _e = _d.customConditions, customConditions = _e === void 0 ? null : _e, _f = _d.customVariables, customVariables = _f === void 0 ? null : _f, _g = _d.excludeConditions, excludeConditions = _g === void 0 ? [] : _g, _h = _d.excludeValueSources, excludeValueSources = _h === void 0 ? [] : _h, _j = _d.excludeVariables, excludeVariables = _j === void 0 ? [] : _j;
        return {
            label: name,
            hideLabel: false,
            key: key,
            type: 'container',
            input: true,
            components: EditFormUtils.valueDeclaration({
                customConditions: customConditions,
                customVariables: customVariables,
                excludeConditions: excludeConditions,
                excludeValueSources: __spreadArrays([
                    'conditionalAssignment'
                ], excludeValueSources),
                excludeVariables: excludeVariables,
                required: required,
            }),
        };
    },
    addQuickRule: function (QuickRule) {
        var name = QuickRule.name, title = QuickRule.title, weight = QuickRule.weight;
        var editForm = QuickRule.getEditForm() || [];
        return {
            type: 'panel',
            title: title,
            key: name + "Title",
            input: false,
            collapsible: true,
            collapsed: true,
            components: [
                {
                    type: 'container',
                    key: name,
                    label: title,
                    input: true,
                    weight: weight,
                    components: editForm.concat({
                        type: 'button',
                        key: name + "Apply",
                        label: 'Add',
                        input: true,
                        action: 'custom',
                        custom: function (_a) {
                            var form = _a.form;
                            var helper = new QuickRulesHelper(form.componentEditForm, {});
                            var quickRuleInstance = new QuickRule({});
                            var inputContainer = form.getComponent(name);
                            var input = inputContainer.dataValue;
                            quickRuleInstance.addRule(helper, input);
                            form.resetValue();
                        },
                    }),
                },
            ],
        };
    },
    getVariablesEditForm: function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.customConditions, customConditions = _c === void 0 ? null : _c, _d = _b.customVariables, customVariables = _d === void 0 ? null : _d, _e = _b.excludeValueSources, excludeValueSources = _e === void 0 ? [] : _e;
        return {
            label: 'Variables',
            key: 'variables',
            input: true,
            type: 'editgrid',
            inlineEdit: true,
            templates: {
                header: ("<div class=\"row\">\n            <div class=\"col-sm-10\">Name</div>\n            <div class=\"col-sm-2\">Actions</div>\n          </div>"),
                row: ("<div class=\"row\">\n            <div class=\"col-sm-10\">{{ row.name ? row.name + \" (\" + row.key + \")\" : row.key }}</div>\n            <div class=\"col-sm-2\">\n              <button class=\"btn btn-default btn-light btn-sm cloneRow\">Clone</button>\n              <button class=\"btn btn-default btn-light btn-sm editRow\">Edit</button>\n              <button class=\"btn btn-danger btn-sm removeRow\">Delete</button>\n            </div>\n          </div>"),
            },
            addAnother: 'Add Variable',
            saveRow: 'Save Variable',
            lazyComponentsInstantiation: true,
            components: __spreadArrays([
                {
                    type: 'textfield',
                    input: true,
                    key: 'name',
                    label: 'Name',
                    validate: {
                        required: true,
                    },
                },
                {
                    type: 'textfield',
                    input: true,
                    key: 'key',
                    label: 'Key',
                    allowCalculateOverride: true,
                    calculateValue: {
                        _camelCase: [
                            {
                                var: 'row.name',
                            },
                        ],
                    },
                    validate: {
                        required: true,
                    },
                }
            ], EditFormUtils.valueDeclaration({
                customConditions: customConditions,
                customVariables: customVariables,
                excludeVariables: [
                    function (key, _a) {
                        var row = _a.row;
                        return (key === row.key);
                    },
                    function (key, _a) {
                        var _b, _c;
                        var instance = _a.instance;
                        return (key === ((_c = (_b = instance === null || instance === void 0 ? void 0 : instance.parent) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.key));
                    },
                    function (key, _a) {
                        var _b, _c, _d;
                        var instance = _a.instance;
                        return (key === ((_d = (_c = (_b = instance === null || instance === void 0 ? void 0 : instance.parent) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.key));
                    },
                    function (key, _a) {
                        var _b, _c, _d, _e;
                        var instance = _a.instance;
                        return (key === ((_e = (_d = (_c = (_b = instance === null || instance === void 0 ? void 0 : instance.parent) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.parent) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.key));
                    },
                ],
                excludeValueSources: excludeValueSources,
            }), [
                {
                    label: 'Transform',
                    key: 'transform',
                    input: true,
                    type: 'container',
                    components: __spreadArrays([
                        {
                            label: 'Transform',
                            dataSrc: 'values',
                            defaultValue: 'identity',
                            data: {
                                values: _.map(Transformers.getTransformers(), function (transform) { return ({
                                    label: transform.title,
                                    value: transform.name,
                                }); }),
                            },
                            dataType: 'string',
                            validate: {
                                required: true,
                            },
                            key: 'name',
                            type: 'select',
                            input: true,
                        }
                    ], _.flatMap(Transformers.getTransformers(), function (transformer) { return EditFormUtils.getTransformer(transformer, {
                        customConditions: customConditions,
                        customVariables: customVariables,
                        excludeValueSources: excludeValueSources,
                    }); })),
                    conditional: {
                        json: {
                            and: [
                                {
                                    '!!': {
                                        var: 'row.valueSource',
                                    },
                                },
                                {
                                    '!==': [
                                        {
                                            var: 'row.valueSource',
                                        },
                                        'conditionalAssignment',
                                    ],
                                },
                            ],
                        },
                    },
                },
            ]),
        };
    },
    getConditionsEditForm: function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.customConditions, customConditions = _c === void 0 ? null : _c, _d = _b.customVariables, customVariables = _d === void 0 ? null : _d, _e = _b.excludeValueSources, excludeValueSources = _e === void 0 ? [] : _e;
        return {
            type: 'editgrid',
            input: true,
            label: 'Conditions',
            key: 'conditions',
            inlineEdit: true,
            templates: {
                header: ("<div class=\"row\">\n            <div class=\"col-sm-10\">Name</div>\n            <div class=\"col-sm-2\">Actions</div>\n          </div>"),
                row: ("<div class=\"row\">\n            <div class=\"col-sm-10\">{{ row.name ? row.name + \" (\" + row.key + \")\" : row.key }}</div>\n            <div class=\"col-sm-2\">\n              <button class=\"btn btn-default btn-light btn-sm cloneRow\">Clone</button>\n              <button class=\"btn btn-default btn-light btn-sm editRow\">Edit</button>\n              <button class=\"btn btn-danger btn-sm removeRow\">Delete</button>\n            </div>\n          </div>"),
            },
            addAnother: 'Add Condition',
            saveRow: 'Save Condition',
            lazyComponentsInstantiation: true,
            components: [
                {
                    type: 'textfield',
                    input: true,
                    key: 'name',
                    label: 'Name',
                    validate: {
                        required: true,
                    },
                },
                {
                    type: 'textfield',
                    input: true,
                    key: 'key',
                    label: 'Key',
                    allowCalculateOverride: true,
                    calculateValue: {
                        _camelCase: [
                            {
                                var: 'row.name',
                            },
                        ],
                    },
                    validate: {
                        required: true,
                    },
                },
                {
                    type: 'radio',
                    input: true,
                    key: 'conjunction',
                    label: 'Conjunction',
                    hideLabel: true,
                    defaultValue: 'and',
                    inline: true,
                    values: _
                        .chain(Conjunctions.getConjunctions())
                        .sortBy('weight')
                        .map(function (conjunction) { return ({
                        label: conjunction.title,
                        value: conjunction.name,
                    }); })
                        .value(),
                    validate: {
                        required: true,
                    },
                },
                {
                    type: 'editgrid',
                    input: true,
                    key: 'parts',
                    label: 'Parts',
                    hideLabel: true,
                    inlineEdit: true,
                    templates: {
                        header: ("<div class=\"row\">\n                <div class=\"col-sm-2\">Type</div>\n                <div class=\"col-sm-8\">Description</div>\n                <div class=\"col-sm-2\">Actions</div>\n              </div>"),
                        row: ("<div class=\"row\">\n                <div class=\"col-sm-2\">{{ flattenedComponents.type.getView(row.type) }}</div>\n                <div class=\"col-sm-8\">{{ (row.type === 'existing') ? flattenedComponents.condition.getView(row.condition) : (row.description || flattenedComponents.name.getView(row.operator.name)) }}</div>\n                <div class=\"col-sm-2\">\n                  <button class=\"btn btn-default btn-light btn-sm editRow\">Edit</button>\n                  <button class=\"btn btn-danger btn-sm removeRow\">Delete</button>\n                </div>\n              </div>"),
                    },
                    addAnother: 'Add Condition Part',
                    saveRow: 'Save Condition Part',
                    components: [
                        {
                            type: 'select',
                            input: true,
                            key: 'type',
                            label: 'Type',
                            dataSrc: 'values',
                            data: {
                                values: [
                                    {
                                        label: 'New Condition',
                                        value: 'new',
                                    },
                                    {
                                        label: 'Existing Condition',
                                        value: 'existing',
                                    },
                                ],
                            },
                            validate: {
                                required: true,
                            },
                        },
                        __assign(__assign({}, EditFormUtils.conditionSelector({
                            customValues: customConditions,
                            exclude: [
                                function (key, _a) {
                                    var instance = _a.instance;
                                    return (key === instance.parent.data.key);
                                },
                            ],
                        })), { validate: {
                                required: true,
                            }, conditional: {
                                json: {
                                    '===': [
                                        {
                                            var: 'row.type',
                                        },
                                        'existing',
                                    ],
                                },
                            } }),
                        {
                            type: 'textfield',
                            input: true,
                            key: 'description',
                            label: 'Description',
                            conditional: {
                                json: {
                                    '===': [
                                        {
                                            var: 'row.type',
                                        },
                                        'new',
                                    ],
                                },
                            },
                        },
                        {
                            type: 'container',
                            input: true,
                            label: 'Operator',
                            key: 'operator',
                            components: __spreadArrays([
                                {
                                    type: 'select',
                                    input: true,
                                    key: 'name',
                                    label: 'Operator',
                                    dataSrc: 'values',
                                    data: {
                                        values: _.map(Operators.getOperators(), function (operator) { return ({
                                            label: operator.title,
                                            value: operator.name,
                                        }); }),
                                    },
                                    validate: {
                                        required: true,
                                    },
                                }
                            ], _.flatMap(Operators.getOperators(), function (operator) { return EditFormUtils.getOperator(operator, {
                                customConditions: customConditions,
                                customVariables: customVariables,
                                excludeValueSources: excludeValueSources,
                            }); })),
                            conditional: {
                                json: {
                                    '===': [
                                        {
                                            var: 'row.type',
                                        },
                                        'new',
                                    ],
                                },
                            },
                        },
                    ],
                },
            ],
        };
    },
    getWebformLogicEditFormSettings: function () {
        return {
            customConditions: function (_a) {
                var _b, _c;
                var data = _a.data;
                return ((_c = (_b = data.settings) === null || _b === void 0 ? void 0 : _b.conditions) !== null && _c !== void 0 ? _c : []).map(function (condition) { return (__assign(__assign({}, condition), { group: 'Webform' })); });
            },
            customVariables: function (_a) {
                var _b, _c;
                var data = _a.data;
                return ((_c = (_b = data.settings) === null || _b === void 0 ? void 0 : _b.variables) !== null && _c !== void 0 ? _c : []).map(function (variable) { return (__assign(__assign({}, variable), { group: 'Webform' })); });
            },
            excludeValueSources: [
                'thisComponent',
                'thisComponentRow',
                'thisComponentRowIndex',
                'thisComponentValue',
            ],
        };
    },
};
export default EditFormUtils;

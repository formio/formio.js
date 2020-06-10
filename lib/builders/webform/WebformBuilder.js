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
import Webform from '../../displays/webform/Webform';
import Component from '../../components/_classes/component/Component';
// Import from "dist" because it would require and "global" would not be defined in Angular apps.
import dragula from 'dragula/dist/dragula';
import Tooltip from 'tooltip.js';
import NativePromise from 'native-promise-only';
import Components from '../../components/Components';
import Formio from '../../Formio';
import { bootstrapVersion, fastCloneDeep } from '../../utils/utils';
import { eachComponent, getComponent } from '../../utils/formUtils';
import BuilderUtils from '../../utils/builder';
import _ from 'lodash';
import Templates from '../../templates/Templates';
require('../../components/builder');
import { FormEditForms } from '../../formEditForm';
var nestedDataComponents = ['container', 'datagrid', 'editgrid'];
var arrayDataComponents = ['datagrid', 'editgrid'];
var WebformBuilder = /** @class */ (function (_super) {
    __extends(WebformBuilder, _super);
    // eslint-disable-next-line max-statements
    function WebformBuilder() {
        var _this = this;
        var element, options;
        if (arguments[0] instanceof HTMLElement || arguments[1]) {
            element = arguments[0];
            options = arguments[1];
        }
        else {
            options = arguments[0];
        }
        // Reset skipInit in case PDFBuilder has set it.
        options.skipInit = false;
        _this = _super.call(this, null, options) || this;
        _this.element = element;
        _this.builderHeight = 0;
        _this.schemas = {};
        _this.repeatablePaths = [];
        _this.sideBarScroll = _.get(_this.options, 'sideBarScroll', true);
        _this.sideBarScrollOffset = _.get(_this.options, 'sideBarScrollOffset', 0);
        var componentInfo = {};
        for (var type in Components.components) {
            var component = Components.components[type];
            if (component.builderInfo) {
                component.type = type;
                componentInfo[type] = component.builderInfo;
            }
        }
        _this.dragDropEnabled = true;
        // Setup the builder options.
        _this.builder = _.defaultsDeep({}, _this.options.builder, _this.defaultGroups);
        // Turn off if explicitely said to do so...
        _.each(_this.defaultGroups, function (config, key) {
            if (config === false) {
                _this.builder[key] = false;
            }
        });
        // Add the groups.
        _this.groups = {};
        _this.groupOrder = [];
        var _loop_1 = function (group) {
            if (this_1.builder[group]) {
                this_1.builder[group].key = group;
                this_1.groups[group] = this_1.builder[group];
                this_1.groups[group].components = this_1.groups[group].components || {};
                this_1.groups[group].componentOrder = this_1.groups[group].componentOrder || [];
                this_1.groups[group].subgroups = Object.keys(this_1.groups[group].groups || {}).map(function (groupKey) {
                    _this.groups[group].groups[groupKey].componentOrder = Object.keys(_this.groups[group].groups[groupKey].components).map(function (key) { return key; });
                    return _this.groups[group].groups[groupKey];
                });
                this_1.groupOrder.push(this_1.groups[group]);
            }
        };
        var this_1 = this;
        for (var group in _this.builder) {
            _loop_1(group);
        }
        _this.groupOrder = _this.groupOrder
            .filter(function (group) { return group && !group.ignore; })
            .sort(function (a, b) { return a.weight - b.weight; })
            .map(function (group) { return group.key; });
        for (var type in Components.components) {
            var component = Components.components[type];
            if (component.builderInfo) {
                _this.schemas[type] = component.builderInfo.schema;
                component.type = type;
                var builderInfo = component.builderInfo;
                builderInfo.key = component.type;
                _this.addBuilderComponentInfo(builderInfo);
            }
        }
        // Filter out any extra components.
        // Add the components in each group.
        for (var group in _this.groups) {
            var info = _this.groups[group];
            for (var key in info.components) {
                var comp = info.components[key];
                if (comp) {
                    if (comp.schema) {
                        _this.schemas[key] = comp.schema;
                    }
                    info.components[key] = comp === true ? componentInfo[key] : comp;
                    info.components[key].key = key;
                }
            }
        }
        var _loop_2 = function (group) {
            if (this_2.groups[group] && this_2.groups[group].components) {
                this_2.groups[group].componentOrder = Object.keys(this_2.groups[group].components)
                    .map(function (key) { return _this.groups[group].components[key]; })
                    .filter(function (component) { return component && !component.ignore; })
                    .sort(function (a, b) { return a.weight - b.weight; })
                    .map(function (component) { return component.key; });
            }
        };
        var this_2 = this;
        // Need to create a component order for each group.
        for (var group in _this.groups) {
            _loop_2(group);
        }
        _this.options.hooks = _this.options.hooks || {};
        _this.options.hooks.renderComponent = function (html, _a) {
            var self = _a.self;
            if (self.type === 'form' && !self.key) {
                // The main webform shouldn't have this class as it adds extra styles.
                return _this.renderTemplate('builderForm', {
                    html: html.replace('formio-component-form', ''),
                });
            }
            if (_this.options.disabled && _this.options.disabled.includes(self.key) || self.parent.noDragDrop) {
                return html;
            }
            return self.renderTemplate('builderComponent', {
                html: html,
            });
        };
        _this.options.hooks.renderComponents = function (html, _a) {
            var components = _a.components, self = _a.self;
            // if Datagrid and already has a component, don't make it droppable.
            if (self.type === 'datagrid' && components.length > 0 || self.noDragDrop) {
                return html;
            }
            if (!components ||
                (!components.length && !components.nodrop) ||
                (self.type === 'form' && components.length <= 1 && (components.length === 0 || components[0].type === 'button'))) {
                html = _this.renderTemplate('builderPlaceholder', {
                    position: 0
                }) + html;
            }
            return _this.renderTemplate('builderComponents', {
                key: self.key,
                type: self.type,
                html: html,
            });
        };
        _this.options.hooks.renderInput = function (html, _a) {
            var self = _a.self;
            if (self.type === 'hidden') {
                return html + self.name;
            }
            return html;
        };
        _this.options.hooks.renderLoading = function (html, _a) {
            var self = _a.self;
            if (self.type === 'form' && self.key) {
                return self.name;
            }
            return html;
        };
        _this.options.hooks.attachComponents = function (element, components, container, component) {
            // Don't attach if no element was found or component doesn't participate in drag'n'drop.
            if (!element) {
                return;
            }
            if (component.noDragDrop) {
                return element;
            }
            // Attach container and component to element for later reference.
            var containerElement = element.querySelector("[ref=\"" + component.component.key + "-container\"]") || element;
            containerElement.formioContainer = container;
            containerElement.formioComponent = component;
            // Add container to draggable list.
            if (_this.dragula && _this.allowDrop(element)) {
                _this.dragula.containers.push(containerElement);
            }
            // If this is an existing datagrid element, don't make it draggable.
            if ((component.type === 'datagrid' || component.type === 'datamap') && components.length > 0) {
                return element;
            }
            // Since we added a wrapper, need to return the original element so that we can find the components inside it.
            return element.children[0];
        };
        _this.options.hooks.attachDatagrid = function (element, component) {
            var _a;
            component.loadRefs(element, (_a = {},
                _a[component.key + "-container"] = 'single',
                _a));
            component.attachComponents(component.refs[component.key + "-container"].parentNode, [], component.component.components);
        };
        _this.options.hooks.attachWebform = function (element, component) {
            component.loadRefs(element, {
                editForm: 'single',
                editFormJson: 'single',
            });
            if (component.refs.editForm) {
                new Tooltip(component.refs.editForm, {
                    trigger: 'hover',
                    placement: 'top',
                    title: _this.t('Edit'),
                });
                component.addEventListener(component.refs.editForm, 'click', function () { return _this.editBuildingForm(); });
            }
            if (component.refs.editFormJson) {
                new Tooltip(component.refs.editFormJson, {
                    trigger: 'hover',
                    placement: 'top',
                    title: _this.t('Edit JSON'),
                });
                component.addEventListener(component.refs.editFormJson, 'click', function () { return _this.editBuildingForm(true); });
            }
        };
        _this.options.hooks.attachComponent = function (element, component) {
            // Add component to element for later reference.
            element.formioComponent = component;
            component.loadRefs(element, {
                removeComponent: 'single',
                editComponent: 'single',
                moveComponent: 'single',
                copyComponent: 'single',
                pasteComponent: 'single',
                editJson: 'single',
            });
            if (component.refs.copyComponent) {
                new Tooltip(component.refs.copyComponent, {
                    trigger: 'hover',
                    placement: 'top',
                    title: _this.t('Copy'),
                });
                component.addEventListener(component.refs.copyComponent, 'click', function () {
                    return _this.copyComponent(component);
                });
            }
            if (component.refs.pasteComponent) {
                var pasteToolTip_1 = new Tooltip(component.refs.pasteComponent, {
                    trigger: 'hover',
                    placement: 'top',
                    title: _this.t('Paste below'),
                });
                component.addEventListener(component.refs.pasteComponent, 'click', function () {
                    pasteToolTip_1.hide();
                    _this.pasteComponent(component);
                });
            }
            if (component.refs.moveComponent) {
                new Tooltip(component.refs.moveComponent, {
                    trigger: 'hover',
                    placement: 'top',
                    title: _this.t('Move'),
                });
            }
            var parent = _this.getParentElement(element);
            if (component.refs.editComponent) {
                new Tooltip(component.refs.editComponent, {
                    trigger: 'hover',
                    placement: 'top',
                    title: _this.t('Edit'),
                });
                component.addEventListener(component.refs.editComponent, 'click', function () {
                    return _this.editComponent(component.schema, parent, false, false, component.component);
                });
            }
            if (component.refs.editJson) {
                new Tooltip(component.refs.editJson, {
                    trigger: 'hover',
                    placement: 'top',
                    title: _this.t('Edit JSON'),
                });
                component.addEventListener(component.refs.editJson, 'click', function () {
                    return _this.editComponent(component.schema, parent, false, true, component.component);
                });
            }
            if (component.refs.removeComponent) {
                new Tooltip(component.refs.removeComponent, {
                    trigger: 'hover',
                    placement: 'top',
                    title: _this.t('Remove'),
                });
                component.addEventListener(component.refs.removeComponent, 'click', function () {
                    return _this.removeComponent(component.schema, parent, component.component);
                });
            }
            return element;
        };
        // Load resources tagged as 'builder'
        var query = {
            params: {
                type: 'resource',
                limit: 4294967295,
                select: '_id,title,name,components'
            }
        };
        if (_this.options && _this.options.resourceTag) {
            query.params.tags = [_this.options.resourceTag];
        }
        else if (!_this.options || !_this.options.hasOwnProperty('resourceTag')) {
            query.params.tags = ['builder'];
        }
        var formio = new Formio(Formio.projectUrl);
        var isResourcesDisabled = _this.options.builder && _this.options.builder.resource === false;
        if (!formio.noProject && !isResourcesDisabled) {
            var resourceOptions_1 = _this.options.builder && _this.options.builder.resource;
            formio.loadForms(query)
                .then(function (resources) {
                if (resources.length) {
                    _this.builder.resource = {
                        title: resourceOptions_1 ? resourceOptions_1.title : 'Existing Resource Fields',
                        key: 'resource',
                        weight: resourceOptions_1 ? resourceOptions_1.weight : 50,
                        subgroups: [],
                        components: [],
                        componentOrder: []
                    };
                    _this.groups.resource = {
                        title: resourceOptions_1 ? resourceOptions_1.title : 'Existing Resource Fields',
                        key: 'resource',
                        weight: resourceOptions_1 ? resourceOptions_1.weight : 50,
                        subgroups: [],
                        components: [],
                        componentOrder: []
                    };
                    if (!_this.groupOrder.includes('resource')) {
                        _this.groupOrder.push('resource');
                    }
                    _this.addExistingResourceFields(resources);
                }
            });
        }
        // Notify components if they need to modify their render.
        _this.options.attachMode = 'builder';
        _this.webform = _this.webform || _this.createForm(_this.options);
        _this.pathComponentsMapping = {};
        _this.arrayDataComponentPaths = [];
        _this.nestedDataComponents = [];
        _this.arrayDataComponents = [];
        return _this;
    }
    WebformBuilder.prototype.allowDrop = function () {
        return true;
    };
    WebformBuilder.prototype.addExistingResourceFields = function (resources) {
        var _this = this;
        _.each(resources, function (resource, index) {
            var resourceKey = "resource-" + resource.name;
            var subgroup = {
                key: resourceKey,
                title: resource.title,
                components: [],
                componentOrder: [],
                default: index === 0,
            };
            eachComponent(resource.components, function (component) {
                if (component.type === 'button')
                    return;
                if (_this.options &&
                    _this.options.resourceFilter &&
                    (!component.tags || component.tags.indexOf(_this.options.resourceFilter) === -1))
                    return;
                var componentName = component.label;
                if (!componentName && component.key) {
                    componentName = _.upperFirst(component.key);
                }
                subgroup.componentOrder.push(component.key);
                subgroup.components[component.key] = _.merge(fastCloneDeep(Components.components[component.type]
                    ? Components.components[component.type].builderInfo
                    : Components.components['unknown'].builderInfo), {
                    key: component.key,
                    title: componentName,
                    group: 'resource',
                    subgroup: resourceKey,
                }, {
                    schema: __assign(__assign({}, component), { label: component.label, key: component.key, lockKey: true, source: (!_this.options.noSource ? resource._id : undefined), isNew: true })
                });
            }, true);
            _this.groups.resource.subgroups.push(subgroup);
        });
        this.triggerRedraw();
    };
    WebformBuilder.prototype.getNestedComponents = function (components, path) {
        var _this = this;
        if (components === void 0) { components = []; }
        if (path === void 0) { path = ''; }
        var mappedComponents = this.pathComponentsMapping[path] = [];
        eachComponent(components, function (component) {
            if (component.input) {
                mappedComponents.push(component);
            }
            if (nestedDataComponents.includes(component.type)) {
                var nestedPath = path ? path + "." + component.key : component.key;
                _this.nestedDataComponents.push({
                    path: nestedPath,
                    component: component,
                });
                if (arrayDataComponents.includes(component.type)) {
                    _this.arrayDataComponentPaths.push(nestedPath);
                    _this.arrayDataComponents.push({
                        path: nestedPath,
                        component: component,
                    });
                }
                _this.getNestedComponents(component.components, nestedPath);
                return true;
            }
            return false;
        }, true);
    };
    WebformBuilder.prototype.getNestedComponentsMap = function () {
        this.pathComponentsMapping = {};
        this.arrayDataComponentPaths = [];
        this.nestedDataComponents = [];
        this.arrayDataComponents = [];
        this.getNestedComponents(this.getComponents());
    };
    WebformBuilder.prototype.getComponents = function () {
        return this.webform.schema.components;
    };
    WebformBuilder.prototype.createForm = function (options) {
        this.webform = new Webform(this.element, options);
        if (this.element) {
            this.loadRefs(this.element, {
                form: 'single'
            });
            if (this.refs.form) {
                this.webform.element = this.refs.form;
            }
        }
        return this.webform;
    };
    Object.defineProperty(WebformBuilder.prototype, "ready", {
        /**
         * Called when everything is ready.
         *
         * @returns {Promise} - Wait for webform to be ready.
         */
        get: function () {
            return this.webform.ready;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebformBuilder.prototype, "defaultGroups", {
        get: function () {
            return {
                basic: {
                    title: 'Basic',
                    weight: 0,
                    default: true,
                },
                advanced: {
                    title: 'Advanced',
                    weight: 10
                },
                layout: {
                    title: 'Layout',
                    weight: 20
                },
                data: {
                    title: 'Data',
                    weight: 30
                },
                premium: {
                    title: 'Premium',
                    weight: 40
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    WebformBuilder.prototype.redraw = function () {
        return Webform.prototype.redraw.call(this);
    };
    Object.defineProperty(WebformBuilder.prototype, "form", {
        get: function () {
            return this.webform.form;
        },
        set: function (value) {
            this.setForm(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebformBuilder.prototype, "schema", {
        get: function () {
            return this.webform.schema;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebformBuilder.prototype, "container", {
        get: function () {
            return this.webform.form.components;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * When a component sets its api key, we need to check if it is unique within its namespace. Find the namespace root
     * so we can calculate this correctly.
     * @param component
     */
    WebformBuilder.prototype.findNamespaceRoot = function (component) {
        // First get the component with nested parents.
        var comp = getComponent(this.webform.form.components, component.key, true);
        var namespaceKey = this.recurseNamespace(comp);
        // If there is no key, it is the root form.
        if (!namespaceKey || this.form.key === namespaceKey) {
            return this.form.components;
        }
        // If the current component is the namespace, we don't need to find it again.
        if (namespaceKey === component.key) {
            return __spreadArrays(component.components, [component]);
        }
        // Get the namespace component so we have the original object.
        var namespaceComponent = getComponent(this.form.components, namespaceKey, true);
        return namespaceComponent.components;
    };
    WebformBuilder.prototype.recurseNamespace = function (component) {
        // If there is no parent, we are at the root level.
        if (!component) {
            return null;
        }
        // Some components are their own namespace.
        if (['container', 'datagrid', 'editgrid', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
            return component.key;
        }
        // Anything else, keep going up.
        return this.recurseNamespace(component.parent);
    };
    WebformBuilder.prototype.render = function () {
        var _this = this;
        return this.renderTemplate('builder', {
            sidebar: this.renderTemplate('builderSidebar', {
                scrollEnabled: this.sideBarScroll,
                groupOrder: this.groupOrder,
                groupId: "builder-sidebar-" + this.id,
                groups: this.groupOrder.map(function (groupKey) { return _this.renderTemplate('builderSidebarGroup', {
                    group: _this.groups[groupKey],
                    groupKey: groupKey,
                    groupId: "builder-sidebar-" + _this.id,
                    subgroups: _this.groups[groupKey].subgroups.map(function (group) { return _this.renderTemplate('builderSidebarGroup', {
                        group: group,
                        groupKey: group.key,
                        groupId: "group-container-" + groupKey,
                        subgroups: []
                    }); }),
                }); }),
            }),
            form: this.webform.render(),
        });
    };
    WebformBuilder.prototype.attach = function (element) {
        var _this = this;
        this.on('change', function (form) {
            _this.populateRecaptchaSettings(form);
        });
        return _super.prototype.attach.call(this, element).then(function () {
            _this.loadRefs(element, {
                form: 'single',
                sidebar: 'single',
                'container': 'multiple',
                'sidebar-anchor': 'multiple',
                'sidebar-group': 'multiple',
                'sidebar-container': 'multiple',
            });
            if (_this.sideBarScroll && Templates.current.handleBuilderSidebarScroll) {
                Templates.current.handleBuilderSidebarScroll.call(_this, _this);
            }
            // Add the paste status in form
            if (window.sessionStorage) {
                var data = window.sessionStorage.getItem('formio.clipboard');
                if (data) {
                    _this.addClass(_this.refs.form, 'builder-paste-mode');
                }
            }
            if (!bootstrapVersion(_this.options)) {
                // Initialize
                _this.refs['sidebar-group'].forEach(function (group) {
                    group.style.display = (group.getAttribute('data-default') === 'true') ? 'inherit' : 'none';
                });
                // Click event
                _this.refs['sidebar-anchor'].forEach(function (anchor, index) {
                    _this.addEventListener(anchor, 'click', function () {
                        var clickedParentId = anchor.getAttribute('data-parent').slice('#builder-sidebar-'.length);
                        var clickedId = anchor.getAttribute('data-target').slice('#group-'.length);
                        _this.refs['sidebar-group'].forEach(function (group, groupIndex) {
                            var openByDefault = group.getAttribute('data-default') === 'true';
                            var groupId = group.getAttribute('id').slice('group-'.length);
                            var groupParent = group.getAttribute('data-parent').slice('#builder-sidebar-'.length);
                            group.style.display =
                                ((openByDefault && groupParent === clickedId) ||
                                    groupId === clickedParentId ||
                                    groupIndex === index)
                                    ? 'inherit' : 'none';
                        });
                    }, true);
                });
            }
            if (_this.dragDropEnabled) {
                _this.initDragula();
            }
            if (_this.refs.form) {
                return _this.webform.attach(_this.refs.form);
            }
        });
    };
    WebformBuilder.prototype.initDragula = function () {
        var _this = this;
        var options = this.options;
        if (this.dragula) {
            this.dragula.destroy();
        }
        var containersArray = Array.prototype.slice.call(this.refs['sidebar-container']).filter(function (item) {
            return item.id !== 'group-container-resource';
        });
        this.dragula = dragula(containersArray, {
            moves: function (el) {
                var moves = true;
                var list = Array.from(el.classList).filter(function (item) { return item.indexOf('formio-component-') === 0; });
                list.forEach(function (item) {
                    var key = item.slice('formio-component-'.length);
                    if (options.disabled && options.disabled.includes(key)) {
                        moves = false;
                    }
                });
                if (el.classList.contains('no-drag')) {
                    moves = false;
                }
                return moves;
            },
            copy: function (el) {
                return el.classList.contains('drag-copy');
            },
            accepts: function (el, target) {
                return !el.contains(target) && !target.classList.contains('no-drop');
            }
        }).on('drop', function (element, target, source, sibling) { return _this.onDrop(element, target, source, sibling); });
    };
    WebformBuilder.prototype.detach = function () {
        if (this.dragula) {
            this.dragula.destroy();
        }
        this.dragula = null;
        if (this.sideBarScroll && Templates.current.clearBuilderSidebarScroll) {
            Templates.current.clearBuilderSidebarScroll.call(this, this);
        }
        _super.prototype.detach.call(this);
    };
    WebformBuilder.prototype.getComponentInfo = function (key, group) {
        var info;
        // This is a new component
        if (this.schemas.hasOwnProperty(key)) {
            info = fastCloneDeep(this.schemas[key]);
        }
        else if (this.groups.hasOwnProperty(group)) {
            var groupComponents = this.groups[group].components;
            if (groupComponents.hasOwnProperty(key)) {
                info = fastCloneDeep(groupComponents[key].schema);
            }
        }
        if (group.slice(0, group.indexOf('-')) === 'resource') {
            // This is an existing resource field.
            var resourceGroups = this.groups.resource.subgroups;
            var resourceGroup = _.find(resourceGroups, { key: group });
            if (resourceGroup && resourceGroup.components.hasOwnProperty(key)) {
                info = fastCloneDeep(resourceGroup.components[key].schema);
            }
        }
        if (info) {
            info.key = _.camelCase(info.title ||
                info.label ||
                info.placeholder ||
                info.type);
        }
        return info;
    };
    WebformBuilder.prototype.getComponentsPath = function (component, parent) {
        // Get path to the component in the parent component.
        var path = 'components';
        var columnIndex = 0;
        var tableRowIndex = 0;
        var tableColumnIndex = 0;
        var tabIndex = 0;
        switch (parent.type) {
            case 'table':
                tableRowIndex = _.findIndex(parent.rows, function (row) { return row.some(function (column) { return column.components.some(function (comp) { return comp.key === component.key; }); }); });
                tableColumnIndex = _.findIndex(parent.rows[tableRowIndex], (function (column) { return column.components.some(function (comp) { return comp.key === component.key; }); }));
                path = "rows[" + tableRowIndex + "][" + tableColumnIndex + "].components";
                break;
            case 'columns':
                columnIndex = _.findIndex(parent.columns, function (column) { return column.components.some(function (comp) { return comp.key === component.key; }); });
                path = "columns[" + columnIndex + "].components";
                break;
            case 'tabs':
                tabIndex = _.findIndex(parent.components, function (tab) { return tab.components.some(function (comp) { return comp.key === component.key; }); });
                path = "components[" + tabIndex + "].components";
                break;
        }
        return path;
    };
    /* eslint-disable max-statements */
    WebformBuilder.prototype.onDrop = function (element, target, source, sibling) {
        var _this = this;
        if (!target) {
            return;
        }
        // If you try to drop within itself.
        if (element.contains(target)) {
            return;
        }
        var key = element.getAttribute('data-key');
        var type = element.getAttribute('data-type');
        var group = element.getAttribute('data-group');
        var info, isNew, path, index;
        if (key) {
            // This is a new component.
            info = this.getComponentInfo(key, group);
            if (!info && type) {
                info = this.getComponentInfo(type, group);
            }
            isNew = true;
        }
        else if (source.formioContainer) {
            index = _.findIndex(source.formioContainer, { key: element.formioComponent.component.key });
            if (index !== -1) {
                // Grab and remove the component from the source container.
                info = source.formioContainer.splice(_.findIndex(source.formioContainer, { key: element.formioComponent.component.key }), 1);
                // Since splice returns an array of one object, we need to destructure it.
                info = info[0];
            }
        }
        // If we haven't found the component, stop.
        if (!info) {
            return;
        }
        if (target !== source) {
            // Ensure the key remains unique in its new container.
            BuilderUtils.uniquify(this.findNamespaceRoot(target.formioComponent.component), info);
        }
        var parent = target.formioComponent;
        // Insert in the new container.
        if (target.formioContainer) {
            if (sibling) {
                if (!sibling.getAttribute('data-noattach')) {
                    index = _.findIndex(target.formioContainer, { key: _.get(sibling, 'formioComponent.component.key') });
                    index = (index === -1) ? 0 : index;
                }
                else {
                    index = sibling.getAttribute('data-position');
                }
                if (index !== -1) {
                    target.formioContainer.splice(index, 0, info);
                }
            }
            else {
                target.formioContainer.push(info);
            }
            path = this.getComponentsPath(info, parent.component);
            index = _.findIndex(_.get(parent.schema, path), { key: info.key });
            if (index === -1) {
                index = 0;
            }
        }
        if (parent && parent.addChildComponent) {
            parent.addChildComponent(info, element, target, source, sibling);
        }
        if (isNew && !this.options.noNewEdit) {
            this.editComponent(info, target, isNew);
        }
        // Only rebuild the parts needing to be rebuilt.
        var rebuild;
        if (target !== source) {
            if (source.formioContainer && source.contains(target)) {
                rebuild = source.formioComponent.rebuild();
            }
            else if (target.contains(source)) {
                rebuild = target.formioComponent.rebuild();
            }
            else {
                if (source.formioContainer) {
                    rebuild = source.formioComponent.rebuild();
                }
                rebuild = target.formioComponent.rebuild();
            }
        }
        else {
            // If they are the same, only rebuild one.
            rebuild = target.formioComponent.rebuild();
        }
        if (!rebuild) {
            rebuild = NativePromise.resolve();
        }
        return rebuild.then(function () {
            _this.emit('addComponent', info, parent, path, index, isNew && !_this.options.noNewEdit);
            if (!isNew || _this.options.noNewEdit) {
                _this.emit('change', _this.form);
            }
        });
    };
    WebformBuilder.prototype.setForm = function (form) {
        var _this = this;
        if (!form.components) {
            form.components = [];
        }
        var isShowSubmitButton = !this.options.noDefaultSubmitButton
            && !form.components.length;
        // Ensure there is at least a submit button.
        if (isShowSubmitButton) {
            form.components.push({
                type: 'button',
                label: 'Submit',
                key: 'submit',
                size: 'md',
                block: false,
                action: 'submit',
                disableOnInvalid: true,
                theme: 'primary'
            });
        }
        if (this.webform) {
            var shouldRebuild_1 = !this.webform.form.components;
            return this.webform.setForm(form).then(function () {
                if (_this.refs.form) {
                    _this.builderHeight = _this.refs.form.offsetHeight;
                }
                if (!shouldRebuild_1) {
                    return _this.form;
                }
                return _this.rebuild().then(function () { return _this.form; });
            });
        }
        return NativePromise.resolve(form);
    };
    WebformBuilder.prototype.populateRecaptchaSettings = function (form) {
        //populate isEnabled for recaptcha form settings
        var isRecaptchaEnabled = false;
        if (this.form.components) {
            eachComponent(form.components, function (component) {
                if (isRecaptchaEnabled) {
                    return;
                }
                if (component.type === 'recaptcha') {
                    isRecaptchaEnabled = true;
                    return false;
                }
            });
            if (isRecaptchaEnabled) {
                _.set(form, 'settings.recaptcha.isEnabled', true);
            }
            else if (_.get(form, 'settings.recaptcha.isEnabled')) {
                _.set(form, 'settings.recaptcha.isEnabled', false);
            }
        }
    };
    WebformBuilder.prototype.removeComponent = function (component, parent, original) {
        var _this = this;
        if (!parent) {
            return;
        }
        var remove = true;
        if (!component.skipRemoveConfirm &&
            ((Array.isArray(component.components) && component.components.length) ||
                (Array.isArray(component.rows) && component.rows.length) ||
                (Array.isArray(component.columns) && component.columns.length))) {
            var message = 'Removing this component will also remove all of its children. Are you sure you want to do this?';
            remove = window.confirm(this.t(message));
        }
        if (!original) {
            original = parent.formioContainer.find(function (comp) { return comp.key === component.key; });
        }
        var index = parent.formioContainer ? parent.formioContainer.indexOf(original) : 0;
        if (remove && index !== -1) {
            var path_1 = this.getComponentsPath(component, parent.formioComponent.component);
            if (parent.formioContainer) {
                parent.formioContainer.splice(index, 1);
            }
            else if (parent.formioComponent && parent.formioComponent.removeChildComponent) {
                parent.formioComponent.removeChildComponent(component);
            }
            var rebuild = parent.formioComponent.rebuild() || NativePromise.resolve();
            rebuild.then(function () {
                _this.emit('removeComponent', component, parent.formioComponent.schema, path_1, index);
                _this.emit('change', _this.form);
            });
        }
        return remove;
    };
    WebformBuilder.prototype.updateComponent = function (component, changed) {
        // Update the sidebarForm.
        if (this.sidebarForm) {
            var sidebarFormTabs = this.sidebarForm.components[0];
            var editFormTabs = this.editForm.components[0];
            var tabIndex = editFormTabs.currentTab;
            sidebarFormTabs.setTab(tabIndex);
            if (sidebarFormTabs.tabs[tabIndex].length) {
                this.editFormWrapper.classList.add('col-sm-6');
                this.editFormWrapper.classList.remove('col-sm-12');
                this.sidebarFormWrapper.classList.remove('d-none');
            }
            else {
                this.editFormWrapper.classList.add('col-sm-12');
                this.editFormWrapper.classList.remove('col-sm-6');
                this.sidebarFormWrapper.classList.add('d-none');
            }
            var previewComponent = getComponent(this.sidebarForm.components, 'preview');
            if (previewComponent) {
                _.assign(previewComponent.component, _.omit(component, [
                    'hidden',
                    'conditional',
                    'customDefaultValue',
                    'customDefaultValueVariable',
                    'calculateValue',
                    'calculateValueVariable',
                    'logic',
                    'autofocus',
                    'customConditional',
                    'validations',
                ]));
                previewComponent.rebuild();
            }
        }
        // Change the "default value" field to be reflective of this component.
        var defaultValueComponent = getComponent(this.editForm.components, 'defaultValue');
        if (defaultValueComponent) {
            var defaultChanged = changed && ((changed.component && changed.component.key === 'defaultValue')
                || (changed.instance && defaultValueComponent.hasComponent && defaultValueComponent.hasComponent(changed.instance)));
            if (!defaultChanged) {
                _.assign(defaultValueComponent.component, _.omit(component, [
                    'key',
                    'label',
                    'placeholder',
                    'tooltip',
                    'hidden',
                    'autofocus',
                    'validate',
                    'disabled',
                    'defaultValue',
                    'customDefaultValue',
                    'customDefaultValueVariable',
                    'calculateValue',
                    'calculateValueVariable',
                    'conditional',
                    'customConditional',
                    'validations',
                ]));
                defaultValueComponent.rebuild();
            }
        }
        // Called when we update a component.
        this.emit('updateComponent', component);
    };
    WebformBuilder.prototype.findRepeatablePaths = function () {
        var repeatablePaths = [];
        var keys = new Map();
        eachComponent(this.form.components, function (comp, path) {
            if (!comp.key) {
                return;
            }
            if (keys.has(comp.key)) {
                if (keys.get(comp.key).includes(path)) {
                    repeatablePaths.push(path);
                }
                else {
                    keys.set(comp.key, __spreadArrays(keys.get(comp.key), [path]));
                }
            }
            else {
                keys.set(comp.key, [path]);
            }
        });
        return repeatablePaths;
    };
    WebformBuilder.prototype.highlightInvalidComponents = function () {
        var repeatablePaths = this.findRepeatablePaths();
        eachComponent(this.webform.getComponents(), function (comp, path) {
            if (repeatablePaths.includes(path)) {
                comp.setCustomValidity("API Key is not unique: " + comp.key);
            }
        });
    };
    /**
     * Called when a new component is saved.
     *
     * @param parent
     * @param component
     * @return {boolean}
     */
    WebformBuilder.prototype.saveComponent = function (component, parent, isNew, original) {
        var _this = this;
        this.editForm.detach();
        var parentContainer = parent ? parent.formioContainer : this.container;
        var parentComponent = parent ? parent.formioComponent : this;
        this.dialog.close();
        var path = parentContainer ? this.getComponentsPath(component, parentComponent.component) : '';
        if (!original) {
            original = parent.formioContainer.find(function (comp) { return comp.id === component.id; });
        }
        var index = parentContainer ? parentContainer.indexOf(original) : 0;
        if (index !== -1) {
            var submissionData = this.editForm.submission.data;
            submissionData = submissionData.componentJson || submissionData;
            var comp_1 = null;
            parentComponent.getComponents().forEach(function (component) {
                if (component.key === original.key) {
                    comp_1 = component;
                }
            });
            var originalComp_1 = comp_1.component;
            if (parentContainer) {
                parentContainer[index] = submissionData;
                if (comp_1) {
                    comp_1.component = submissionData;
                }
            }
            else if (parentComponent && parentComponent.saveChildComponent) {
                parentComponent.saveChildComponent(submissionData);
            }
            var rebuild = parentComponent.rebuild() || NativePromise.resolve();
            return rebuild.then(function () {
                var schema = parentContainer ? parentContainer[index] : (comp_1 ? comp_1.schema : []);
                _this.emit('saveComponent', schema, originalComp_1, parentComponent.schema, path, index, isNew);
                _this.emit('change', _this.form);
                _this.highlightInvalidComponents();
            });
        }
        this.highlightInvalidComponents();
        return NativePromise.resolve();
    };
    WebformBuilder.prototype.getAdditionalPages = function () {
    };
    WebformBuilder.prototype.editBuildingForm = function (isJsonEdit) {
        var _this = this;
        if (this.dialog) {
            this.dialog.close();
        }
        if (this.editForm) {
            this.editForm.destroy();
        }
        if (this.sidebarForm) {
            this.sidebarForm.destroy();
        }
        var editFormOptions = _.clone(_.get(this, 'options.editForm', {}));
        editFormOptions.editForm = this.form;
        this.editForm = new Webform(__assign(__assign(__assign({}, _.omit(this.options, ['hooks', 'builder', 'events', 'attachMode', 'skipInit'])), { language: this.options.language }), editFormOptions));
        this.getNestedComponentsMap();
        this.editForm.pathComponentsMapping = this.pathComponentsMapping;
        this.editForm.arrayDataComponentPaths = this.arrayDataComponentPaths;
        this.editForm.nestedDataComponents = this.nestedDataComponents;
        this.editForm.arrayDataComponents = this.arrayDataComponents;
        this.editForm.parentPath = '';
        this.editForm.form = isJsonEdit ? {
            components: [
                {
                    type: 'textarea',
                    as: 'json',
                    editor: 'ace',
                    weight: 10,
                    input: true,
                    key: 'componentJson',
                    label: 'Component JSON',
                    tooltip: 'Edit the JSON for this component.'
                }
            ]
        } : FormEditForms.getFormEditForm(this.form.display || 'form')();
        var form = _.cloneDeep(this.form);
        this.editForm.submission = isJsonEdit ? {
            data: {
                componentJson: form,
            },
        } : {
            data: form,
        };
        this.componentEdit = this.ce('div', { 'class': 'component-edit-container' });
        this.setContent(this.componentEdit, this.renderTemplate('builderFormEditForm', {
            editForm: this.editForm.render(),
        }));
        this.dialog = this.createModal(this.componentEdit, _.get(this.options, 'dialogAttr', {}));
        this.editForm.attach(this.componentEdit.querySelector('[ref="editForm"]'));
        var cancelButtons = this.componentEdit.querySelectorAll('[ref="cancelButton"]');
        cancelButtons.forEach(function (cancelButton) {
            _this.addEventListener(cancelButton, 'click', function (event) {
                event.preventDefault();
                _this.editForm.detach();
                _this.dialog.close();
                _this.emit('cancelFormEditForm', _this.form);
            });
        });
        var saveButtons = this.componentEdit.querySelectorAll('[ref="saveButton"]');
        saveButtons.forEach(function (saveButton) {
            _this.addEventListener(saveButton, 'click', function (event) {
                event.preventDefault();
                if (!_this.editForm.checkValidity(_this.editForm.data, true, _this.editForm.data)) {
                    _this.editForm.setPristine(false);
                    _this.editForm.showErrors();
                    return false;
                }
                var newFormSchema = isJsonEdit ? _this.editForm.data.componentJson : _this.editForm.data;
                _this.editForm.detach();
                _this.dialog.close();
                _this.form = newFormSchema;
                _this.emit('saveFormEditForm', newFormSchema);
                _this.emit('change', _this.form);
            });
        });
        var dialogClose = function () {
            _this.editForm.destroy();
            // Clean up.
            _this.removeEventListener(_this.dialog, 'close', dialogClose);
            _this.dialog = null;
        };
        this.addEventListener(this.dialog, 'close', dialogClose);
        // Called when we edit a component.
        this.emit('editFormEditForm', this.form);
    };
    WebformBuilder.prototype.editComponent = function (component, parent, isNew, isJsonEdit, original) {
        var _this = this;
        var _a;
        if (!component.key) {
            return;
        }
        var saved = false;
        var componentCopy = fastCloneDeep(component);
        var ComponentClass = Components.components[componentCopy.type];
        var isCustom = ComponentClass === undefined;
        isJsonEdit = isJsonEdit || isCustom;
        ComponentClass = isCustom ? Components.components.unknown : ComponentClass;
        // Make sure we only have one dialog open at a time.
        if (this.dialog) {
            this.dialog.close();
            this.highlightInvalidComponents();
        }
        // This is the render step.
        var editFormOptions = _.clone(_.get(this, 'options.editForm', {}));
        if (this.editForm) {
            this.editForm.destroy();
        }
        // Allow editForm overrides per component.
        var overrides = _.get(this.options, "editForm." + componentCopy.type, {});
        // Pass along the form being edited.
        editFormOptions.editForm = this.form;
        editFormOptions.editComponent = component;
        editFormOptions.editComponentParentInstance = parent.formioComponent;
        this.editForm = new Webform(__assign(__assign(__assign({}, _.omit(this.options, ['hooks', 'builder', 'events', 'attachMode', 'skipInit'])), { language: this.options.language }), editFormOptions));
        this.getNestedComponentsMap();
        this.editForm.pathComponentsMapping = this.pathComponentsMapping;
        this.editForm.arrayDataComponentPaths = this.arrayDataComponentPaths;
        this.editForm.nestedDataComponents = this.nestedDataComponents;
        this.editForm.arrayDataComponents = this.arrayDataComponents;
        this.editForm.parentPath = (_a = parent === null || parent === void 0 ? void 0 : parent.formioComponent) === null || _a === void 0 ? void 0 : _a.path;
        this.editForm.form = (isJsonEdit && !isCustom) ? {
            components: [
                {
                    type: 'textarea',
                    as: 'json',
                    editor: 'ace',
                    weight: 10,
                    input: true,
                    key: 'componentJson',
                    label: 'Component JSON',
                    tooltip: 'Edit the JSON for this component.'
                }
            ]
        } : ComponentClass.editForm(_.cloneDeep(overrides));
        var instance = new ComponentClass(componentCopy, { preview: true });
        var schema = instance.component;
        this.editForm.submission = isJsonEdit ? {
            data: {
                componentJson: schema,
            },
        } : {
            data: schema,
        };
        if (this.sidebarForm) {
            this.sidebarForm.destroy();
        }
        if (!isJsonEdit && (!ComponentClass.builderInfo.hasOwnProperty('preview') || ComponentClass.builderInfo.preview)) {
            this.sidebarForm = new Webform(_.omit(__assign(__assign({}, this.options), { preview: true }), [
                'hooks',
                'builder',
                'events',
                'attachMode',
                'calculateValue'
            ]));
            this.sidebarForm.form = {
                components: [
                    {
                        key: 'tabs',
                        type: 'tabs',
                        hideHeader: true,
                        components: this.editForm.form.components[0].components.map(function (_a) {
                            var label = _a.label, key = _a.key, sidebar = _a.sidebar;
                            return ({
                                label: label,
                                key: key,
                                components: (sidebar !== null && sidebar !== void 0 ? sidebar : []).map(function (component) { return (_.isFunction(component) ? component(schema) : component); }),
                            });
                        }),
                    },
                ],
            };
            this.sidebarForm.componentEditForm = this.editForm;
        }
        this.componentEdit = this.ce('div', { 'class': 'component-edit-container' });
        this.setContent(this.componentEdit, this.renderTemplate('builderEditForm', {
            componentInfo: ComponentClass.builderInfo,
            editForm: this.editForm.render(),
            sidebarForm: this.sidebarForm ? this.sidebarForm.render() : false,
        }));
        this.dialog = this.createModal(this.componentEdit, _.get(this.options, 'dialogAttr', {}));
        // This is the attach step.
        this.editForm.attach(this.componentEdit.querySelector('[ref="editForm"]'));
        if (this.sidebarForm) {
            this.sidebarForm.attach(this.componentEdit.querySelector('[ref="sidebarForm"]'));
        }
        this.editFormWrapper = this.componentEdit.querySelector('[ref="editFormWrapper"]');
        this.sidebarFormWrapper = this.componentEdit.querySelector('[ref="sidebarFormWrapper"]');
        this.updateComponent(componentCopy);
        this.editForm.on('change', function (event) {
            if (event.changed) {
                // See if this is a manually modified key. Treat custom component keys as manually modified
                if ((event.changed.component && (event.changed.component.key === 'key')) || isJsonEdit) {
                    componentCopy.keyModified = true;
                }
                if (event.changed.component && (['label', 'title'].includes(event.changed.component.key))) {
                    // Ensure this component has a key.
                    if (isNew) {
                        if (!event.data.keyModified) {
                            _this.editForm.everyComponent(function (component) {
                                if (component.key === 'key' && component.parent.component.key === 'tabs') {
                                    component.setValue(_.camelCase(event.data.title ||
                                        event.data.label ||
                                        event.data.placeholder ||
                                        event.data.type));
                                    return false;
                                }
                            });
                        }
                        if (_this.form) {
                            // Set a unique key for this component.
                            BuilderUtils.uniquify(_this.findNamespaceRoot(parent.formioComponent.component), event.data);
                        }
                    }
                }
                // Update the component.
                _this.updateComponent(event.data.componentJson || event.data, event.changed);
            }
        });
        var cancelButtons = this.componentEdit.querySelectorAll('[ref="cancelButton"]');
        cancelButtons.forEach(function (cancelButton) {
            _this.addEventListener(cancelButton, 'click', function (event) {
                event.preventDefault();
                _this.editForm.detach();
                _this.emit('cancelComponent', component);
                _this.dialog.close();
                _this.highlightInvalidComponents();
            });
        });
        var removeButtons = this.componentEdit.querySelectorAll('[ref="removeButton"]');
        removeButtons.forEach(function (removeButton) {
            _this.addEventListener(removeButton, 'click', function (event) {
                event.preventDefault();
                // Since we are already removing the component, don't trigger another remove.
                saved = true;
                _this.editForm.detach();
                _this.removeComponent(component, parent, original);
                _this.dialog.close();
                _this.highlightInvalidComponents();
            });
        });
        var saveButtons = this.componentEdit.querySelectorAll('[ref="saveButton"]');
        saveButtons.forEach(function (saveButton) {
            _this.addEventListener(saveButton, 'click', function (event) {
                event.preventDefault();
                if (!_this.editForm.checkValidity(_this.editForm.data, true, _this.editForm.data)) {
                    _this.editForm.setPristine(false);
                    _this.editForm.showErrors();
                    return false;
                }
                saved = true;
                _this.saveComponent(component, parent, isNew, original);
            });
        });
        var dialogClose = function () {
            _this.editForm.destroy(true);
            if (_this.sidebarForm) {
                _this.sidebarForm.destroy(true);
                _this.sidebarForm = null;
            }
            if (isNew && !saved) {
                _this.removeComponent(component, parent, original);
                _this.highlightInvalidComponents();
            }
            // Clean up.
            _this.removeEventListener(_this.dialog, 'close', dialogClose);
            _this.dialog = null;
        };
        this.addEventListener(this.dialog, 'close', dialogClose);
        // Called when we edit a component.
        this.emit('editComponent', component);
    };
    /**
     * Creates copy of component schema and stores it under sessionStorage.
     * @param {Component} component
     * @return {*}
     */
    WebformBuilder.prototype.copyComponent = function (component) {
        if (!window.sessionStorage) {
            return console.warn('Session storage is not supported in this browser.');
        }
        this.addClass(this.refs.form, 'builder-paste-mode');
        window.sessionStorage.setItem('formio.clipboard', JSON.stringify(component.schema));
    };
    /**
     * Paste copied component after the current component.
     * @param {Component} component
     * @return {*}
     */
    WebformBuilder.prototype.pasteComponent = function (component) {
        if (!window.sessionStorage) {
            return console.warn('Session storage is not supported in this browser.');
        }
        this.removeClass(this.refs.form, 'builder-paste-mode');
        if (window.sessionStorage) {
            var data = window.sessionStorage.getItem('formio.clipboard');
            if (data) {
                var schema = JSON.parse(data);
                var parent_1 = this.getParentElement(component.element);
                BuilderUtils.uniquify(this.findNamespaceRoot(parent_1.formioComponent.component), schema);
                var path = '';
                var index = 0;
                if (parent_1.formioContainer) {
                    index = parent_1.formioContainer.indexOf(component.component);
                    path = this.getComponentsPath(schema, parent_1.formioComponent.component);
                    parent_1.formioContainer.splice(index + 1, 0, schema);
                }
                else if (parent_1.formioComponent && parent_1.formioComponent.saveChildComponent) {
                    parent_1.formioComponent.saveChildComponent(schema, false);
                }
                parent_1.formioComponent.rebuild();
                this.emit('saveComponent', schema, schema, parent_1.formioComponent.components, path, (index + 1), true);
                this.emit('change', this.form);
            }
        }
    };
    WebformBuilder.prototype.getParentElement = function (element) {
        var container = element;
        do {
            container = container.parentNode;
        } while (container && !container.formioComponent);
        return container;
    };
    WebformBuilder.prototype.addBuilderComponentInfo = function (component) {
        if (!component || !component.group || !this.groups[component.group]) {
            return;
        }
        component = _.clone(component);
        var groupInfo = this.groups[component.group];
        if (!groupInfo.components.hasOwnProperty(component.key)) {
            groupInfo.components[component.key] = component;
        }
        return component;
    };
    WebformBuilder.prototype.init = function () {
        if (this.webform) {
            this.webform.init();
        }
        return _super.prototype.init.call(this);
    };
    WebformBuilder.prototype.destroy = function (deleteFromGlobal) {
        if (this.webform.initialized) {
            this.webform.destroy(deleteFromGlobal);
        }
        _super.prototype.destroy.call(this, deleteFromGlobal);
    };
    WebformBuilder.prototype.addBuilderGroup = function (name, group) {
        if (!this.groups[name]) {
            this.groups[name] = group;
            this.groupOrder.push(name);
            this.triggerRedraw();
        }
        else {
            this.updateBuilderGroup(name, group);
        }
    };
    WebformBuilder.prototype.updateBuilderGroup = function (name, group) {
        if (this.groups[name]) {
            this.groups[name] = group;
            this.triggerRedraw();
        }
    };
    return WebformBuilder;
}(Component));
export default WebformBuilder;

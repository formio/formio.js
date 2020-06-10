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
import Component from '../_classes/component/Component';
import Components from '../Components';
import NestedComponent from '../_classes/nested/NestedComponent';
import Node from './Node';
import NativePromise from 'native-promise-only';
var TreeComponent = /** @class */ (function (_super) {
    __extends(TreeComponent, _super);
    function TreeComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.type = 'tree';
        return _this;
    }
    TreeComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent.schema.apply(NestedComponent, __spreadArrays([{
                label: 'Tree',
                key: 'tree',
                type: 'tree',
                clearOnHide: true,
                input: true,
                tree: true,
                components: [],
            }], extend));
    };
    Object.defineProperty(TreeComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Tree',
                icon: 'indent',
                group: 'data',
                weight: 40,
                schema: TreeComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TreeComponent.prototype, "emptyValue", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TreeComponent.prototype, "viewComponents", {
        get: function () {
            if (!this.viewComponentsInstantiated) {
                this.viewComponentsInstantiated = true;
                this._viewComponents = this.createComponents({});
            }
            return this._viewComponents;
        },
        enumerable: false,
        configurable: true
    });
    TreeComponent.prototype.init = function () {
        if (this.builderMode) {
            return _super.prototype.init.call(this);
        }
        this.components = [];
        this.componentOptions = __assign(__assign({}, this.options), { parent: this, root: this.root || this });
        this.setRoot();
        this.viewComponentsInstantiated = false;
        this._viewComponents = [];
    };
    TreeComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (!this.builderMode) {
            this.removeComponents(this._viewComponents);
        }
    };
    TreeComponent.prototype.createComponents = function (data, node) {
        var _this = this;
        var components = this.componentComponents.map(function (component) { return Components.create(component, _this.componentOptions, data); });
        if (node) {
            this.checkNode(this.data, node);
        }
        return components;
    };
    TreeComponent.prototype.removeComponents = function (components) {
        return components.map(function (component) { return component.destroy(); });
    };
    TreeComponent.prototype.render = function () {
        if (this.builderMode) {
            return _super.prototype.render.call(this);
        }
        return _super.prototype.render.call(this, this.renderTree(this.treeRoot));
    };
    TreeComponent.prototype.renderTree = function (node, odd) {
        if (node === void 0) { node = {}; }
        if (odd === void 0) { odd = true; }
        var childNodes = (node.hasChildren && !node.collapsed)
            ? this.renderChildNodes(node.children, !odd)
            : [];
        var content = node.changing
            ? this.renderEdit(node)
            : this.renderView(node);
        return this.renderTemplate('tree', {
            odd: odd,
            childNodes: childNodes,
            content: content,
            node: node,
        });
    };
    TreeComponent.prototype.renderChildNodes = function (nodes, odd) {
        var _this = this;
        if (nodes === void 0) { nodes = []; }
        return nodes.map(function (node) { return _this.renderTree(node, odd); });
    };
    TreeComponent.prototype.renderEdit = function (node) {
        if (node === void 0) { node = {}; }
        return this.renderTemplate('treeEdit', {
            children: this.renderComponents(node.components),
            node: node,
        });
    };
    TreeComponent.prototype.renderView = function (node) {
        if (node === void 0) { node = {}; }
        return this.renderTemplate('treeView', {
            values: this.viewComponents.map(function (component) {
                component.data = node.data;
                component.checkComponentConditions(node.data);
                return component.getView(component.dataValue);
            }),
            nodeData: node.data,
            node: node,
        });
    };
    TreeComponent.prototype.attach = function (element) {
        if (this.builderMode) {
            return _super.prototype.attach.call(this, element);
        }
        this.loadRefs(element, {
            root: 'single',
        });
        return NativePromise.all([
            _super.prototype.attach.call(this, element),
            this.attachNode(this.refs.root, this.treeRoot),
        ]);
    };
    TreeComponent.prototype.attachNode = function (element, node) {
        if (!element) {
            return NativePromise.resolve();
        }
        var componentsPromise = NativePromise.resolve();
        var childrenPromise = NativePromise.resolve();
        node.refs = _.reduce(element.children, function (refs, child) {
            var _a;
            return (child.hasAttribute('ref')
                ? __assign(__assign({}, refs), (_a = {}, _a[child.getAttribute('ref')] = child, _a)) : refs);
        }, {});
        if (node.refs.content) {
            this.attachActions(node);
            componentsPromise = this.attachComponents(node);
        }
        if (node.refs.childNodes) {
            childrenPromise = this.attachChildren(node);
        }
        return NativePromise.all([
            componentsPromise,
            childrenPromise,
        ]);
    };
    TreeComponent.prototype.attachActions = function (node) {
        var _this = this;
        this.loadRefs.call(node, node.refs.content, {
            addChild: 'single',
            cancelNode: 'single',
            editNode: 'single',
            removeNode: 'single',
            revertNode: 'single',
            saveNode: 'single',
            toggleNode: 'single',
        });
        if (node.refs.addChild) {
            this.addEventListener(node.refs.addChild, 'click', function () {
                _this.addChild(node);
            });
        }
        if (node.refs.cancelNode) {
            this.addEventListener(node.refs.cancelNode, 'click', function () {
                _this.cancelNode(node);
            });
        }
        if (node.refs.editNode) {
            this.addEventListener(node.refs.editNode, 'click', function () {
                _this.editNode(node);
            });
        }
        if (node.refs.removeNode) {
            this.addEventListener(node.refs.removeNode, 'click', function () {
                _this.removeNode(node);
            });
        }
        if (node.refs.revertNode) {
            this.addEventListener(node.refs.revertNode, 'click', function () {
                _this.revertNode(node);
            });
        }
        if (node.refs.saveNode) {
            this.addEventListener(node.refs.saveNode, 'click', function () {
                _this.saveNode(node);
            });
        }
        if (node.refs.toggleNode) {
            this.addEventListener(node.refs.toggleNode, 'click', function () {
                _this.toggleNode(node);
            });
        }
    };
    TreeComponent.prototype.attachComponents = function (node) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.builderMode) {
            return (_a = _super.prototype.attachComponents).call.apply(_a, __spreadArrays([this, node], args));
        }
        this.loadRefs.call(node, node.refs.content, {
            nodeEdit: 'single',
        });
        return node.refs.nodeEdit
            ? _super.prototype.attachComponents.call(this, node.refs.nodeEdit, node.components)
            : NativePromise.resolve();
    };
    TreeComponent.prototype.attachChildren = function (node) {
        var _this = this;
        var childElements = node.refs.childNodes.children;
        return NativePromise.all(_.map(childElements, function (childElement, index) { return _this.attachNode(childElement, node.children[index]); }));
    };
    TreeComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = this.updateValue(value, flags);
        this.setRoot();
        return changed;
    };
    TreeComponent.prototype.addChild = function (parent) {
        var _this = this;
        if (this.options.readOnly || parent.new) {
            return;
        }
        this.hook('tree.addChild', {
            parent: parent,
            component: this,
        }, function () {
            var child = parent.addChild();
            _this.redraw();
            return child;
        });
    };
    TreeComponent.prototype.cancelNode = function (node) {
        var _this = this;
        if (this.options.readOnly) {
            return;
        }
        this.hook('tree.cancelNode', {
            node: node,
            component: this,
        }, function () {
            if (node.isRoot) {
                _this.removeRoot();
            }
            else {
                node.cancel();
                _this.redraw();
            }
            return node;
        });
    };
    TreeComponent.prototype.editNode = function (node) {
        var _this = this;
        if (this.options.readOnly || node.new) {
            return;
        }
        this.hook('tree.editNode', {
            node: node,
            component: this,
        }, function () {
            node.edit();
            _this.redraw();
            return node;
        });
    };
    TreeComponent.prototype.removeNode = function (node) {
        var _this = this;
        if (this.options.readOnly || node.new) {
            return;
        }
        this.hook('tree.removeNode', {
            node: node,
            component: this,
        }, function () {
            if (node.isRoot) {
                _this.removeRoot();
            }
            else {
                node.remove();
                _this.updateTree();
            }
            return node;
        });
    };
    TreeComponent.prototype.revertNode = function (node) {
        var _this = this;
        if (this.options.readOnly || !node.revertAvailable) {
            return;
        }
        this.hook('tree.revertNode', {
            node: node,
            component: this,
        }, function () {
            node.revert();
            _this.updateTree();
            return node;
        });
    };
    TreeComponent.prototype.saveNode = function (node) {
        var _this = this;
        if (this.options.readOnly) {
            return;
        }
        this.hook('tree.saveNode', {
            node: node,
            component: this,
        }, function () {
            node.save();
            _this.updateTree();
            return node;
        });
    };
    TreeComponent.prototype.toggleNode = function (node) {
        var _this = this;
        this.hook('tree.toggleNode', {
            node: node,
            component: this,
        }, function () {
            node.collapsed = !node.collapsed;
            _this.redraw();
            return node;
        });
    };
    TreeComponent.prototype.removeRoot = function () {
        if (this.options.readOnly) {
            return;
        }
        this.dataValue = this.defaultValue;
        this.setRoot();
        this.redraw();
    };
    TreeComponent.prototype.setRoot = function () {
        var value = this.dataValue;
        this.treeRoot = new Node(null, value, {
            isNew: !value.data,
            createComponents: this.createComponents.bind(this),
            checkNode: this.checkNode.bind(this, this.data),
            removeComponents: this.removeComponents,
        });
        this.hook('tree.setRoot', {
            root: this.treeRoot,
            component: this,
        });
        this.redraw();
    };
    TreeComponent.prototype.getValue = function () {
        return this.dataValue;
    };
    TreeComponent.prototype.updateTree = function () {
        this.updateValue(this.treeRoot.value);
        this.redraw();
    };
    TreeComponent.prototype.checkData = function (data, flags, row) {
        return this.checkNode(data, this.treeRoot, flags, row);
    };
    TreeComponent.prototype.checkNode = function (data, node, flags, row) {
        var _this = this;
        return node.children.reduce(function (result, child) { return _this.checkNode(data, child, flags, row) && result; }, _super.prototype.checkData.call(this, data, flags, node.data, node.components));
    };
    return TreeComponent;
}(NestedComponent));
export default TreeComponent;
TreeComponent.prototype.hasChanged = Component.prototype.hasChanged;
TreeComponent.prototype.updateValue = Component.prototype.updateValue;

import _ from 'lodash';
var Node = /** @class */ (function () {
    function Node(parent, _a, _b) {
        var _this = this;
        var _c = _a === void 0 ? {} : _a, _d = _c.data, data = _d === void 0 ? {} : _d, _e = _c.children, children = _e === void 0 ? [] : _e;
        var _f = _b === void 0 ? {} : _b, checkNode = _f.checkNode, createComponents = _f.createComponents, _g = _f.isNew, isNew = _g === void 0 ? true : _g, removeComponents = _f.removeComponents;
        this.parent = parent;
        this.previousData = {};
        this.persistentData = _.cloneDeep(data);
        this.new = isNew;
        this.createComponents = createComponents;
        this.checkNode = checkNode;
        this.removeComponents = removeComponents;
        this.revertAvailable = false;
        this.editing = false;
        this.collapsed = false;
        this.components = [];
        this.children = [];
        this.resetData();
        this.children = children.map(function (child) { return new Node(_this, child, {
            checkNode: checkNode,
            createComponents: createComponents,
            isNew: false,
            removeComponents: removeComponents,
        }); });
    }
    Object.defineProperty(Node.prototype, "value", {
        get: function () {
            return this.new
                ? null // Check the special case for empty root node.
                : {
                    data: _.cloneDeep(this.persistentData),
                    children: this.children.filter(function (child) { return !child.new; }).map(function (child) { return child.value; }),
                };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "isRoot", {
        get: function () {
            return this.parent === null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "changing", {
        get: function () {
            return this.new || this.editing;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "hasChangingChildren", {
        get: function () {
            return this.changin || this.children.some(function (child) { return child.hasChangingChildren; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "hasData", {
        get: function () {
            return !_.isEmpty(this.persistentData);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "hasChildren", {
        get: function () {
            return Array.isArray(this.children) && this.children.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Node.prototype.eachChild = function (iteratee) {
        iteratee(this);
        this.children.forEach(function (child) { return child.eachChild(iteratee); });
        return this;
    };
    Node.prototype.getComponents = function () {
        return this.children.reduce(function (components, child) { return components.concat(child.getComponents()); }, this.components);
    };
    Node.prototype.addChild = function () {
        if (this.new) {
            return null;
        }
        var child = new Node(this, {}, {
            checkNode: this.checkNode,
            createComponents: this.createComponents,
            isNew: true,
            removeComponents: this.removeComponents,
        });
        this.children = this.children.concat(child);
        return child;
    };
    Node.prototype.removeChild = function (childToRemove) {
        if (!this.new) {
            this.children = this.children.filter(function (child) { return child !== childToRemove; });
        }
        return this;
    };
    Node.prototype.edit = function () {
        if (this.new) {
            return this;
        }
        this.editing = true;
        return this.resetData();
    };
    Node.prototype.save = function () {
        if (this.changing) {
            if (this.new) {
                this.new = false;
            }
            else {
                this.editing = false;
                this.revertAvailable = true;
            }
            this.commitData();
        }
        return this;
    };
    Node.prototype.cancel = function () {
        if (this.new) {
            this.remove();
        }
        else if (this.editing) {
            this.editing = false;
            this.resetData();
        }
        return this;
    };
    Node.prototype.remove = function () {
        this.parent.removeChild(this);
        this.parent = null;
        this.clearComponents();
        return this;
    };
    Node.prototype.revert = function () {
        if (!this.revertAvailable) {
            return this;
        }
        this.data = this.previousData;
        return this.commitData();
    };
    Node.prototype.commitData = function () {
        this.previousData = this.persistentData;
        this.persistentData = _.cloneDeep(this.data);
        this.clearComponents();
        return this;
    };
    Node.prototype.resetData = function () {
        this.data = _.cloneDeep(this.persistentData);
        this.updateComponentsContext();
        return this;
    };
    Node.prototype.updateComponentsContext = function () {
        if (this.changing) {
            this.instantiateComponents();
        }
        else {
            this.clearComponents();
        }
        return this;
    };
    Node.prototype.instantiateComponents = function () {
        this.components = this.createComponents(this.data, this);
        this.checkNode(this);
    };
    Node.prototype.clearComponents = function () {
        this.removeComponents(this.components);
        this.components = [];
    };
    return Node;
}());
export default Node;

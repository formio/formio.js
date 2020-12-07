"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.some");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Node = /*#__PURE__*/function () {
  function Node(parent) {
    var _this = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children;

    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        checkNode = _ref2.checkNode,
        createComponents = _ref2.createComponents,
        _ref2$isNew = _ref2.isNew,
        isNew = _ref2$isNew === void 0 ? true : _ref2$isNew,
        removeComponents = _ref2.removeComponents;

    _classCallCheck(this, Node);

    this.parent = parent;
    this.previousData = {};
    this.persistentData = _lodash.default.cloneDeep(data);
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
    this.children = children.map(function (child) {
      return new Node(_this, child, {
        checkNode: checkNode,
        createComponents: createComponents,
        isNew: false,
        removeComponents: removeComponents
      });
    });
  }

  _createClass(Node, [{
    key: "eachChild",
    value: function eachChild(iteratee) {
      iteratee(this);
      this.children.forEach(function (child) {
        return child.eachChild(iteratee);
      });
      return this;
    }
  }, {
    key: "getComponents",
    value: function getComponents() {
      return this.children.reduce(function (components, child) {
        return components.concat(child.getComponents());
      }, this.components);
    }
  }, {
    key: "addChild",
    value: function addChild() {
      if (this.new) {
        return null;
      }

      var child = new Node(this, {}, {
        checkNode: this.checkNode,
        createComponents: this.createComponents,
        isNew: true,
        removeComponents: this.removeComponents
      });
      this.children = this.children.concat(child);
      return child;
    }
  }, {
    key: "removeChild",
    value: function removeChild(childToRemove) {
      if (!this.new) {
        this.children = this.children.filter(function (child) {
          return child !== childToRemove;
        });
      }

      return this;
    }
  }, {
    key: "edit",
    value: function edit() {
      if (this.new) {
        return this;
      }

      this.editing = true;
      return this.resetData();
    }
  }, {
    key: "save",
    value: function save() {
      if (this.changing) {
        if (this.new) {
          this.new = false;
        } else {
          this.editing = false;
          this.revertAvailable = true;
        }

        this.commitData();
      }

      return this;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this.new) {
        this.remove();
      } else if (this.editing) {
        this.editing = false;
        this.resetData();
      }

      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      this.parent.removeChild(this);
      this.parent = null;
      this.clearComponents();
      return this;
    }
  }, {
    key: "revert",
    value: function revert() {
      if (!this.revertAvailable) {
        return this;
      }

      this.data = this.previousData;
      return this.commitData();
    }
  }, {
    key: "commitData",
    value: function commitData() {
      this.previousData = this.persistentData;
      this.persistentData = _lodash.default.cloneDeep(this.data);
      this.clearComponents();
      return this;
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this.data = _lodash.default.cloneDeep(this.persistentData);
      this.updateComponentsContext();
      return this;
    }
  }, {
    key: "updateComponentsContext",
    value: function updateComponentsContext() {
      if (this.changing) {
        this.instantiateComponents();
      } else {
        this.clearComponents();
      }

      return this;
    }
  }, {
    key: "instantiateComponents",
    value: function instantiateComponents() {
      this.components = this.createComponents(this.data, this);
      this.checkNode(this);
    }
  }, {
    key: "clearComponents",
    value: function clearComponents() {
      this.removeComponents(this.components);
      this.components = [];
    }
  }, {
    key: "value",
    get: function get() {
      return this.new ? null // Check the special case for empty root node.
      : {
        data: _lodash.default.cloneDeep(this.persistentData),
        children: this.children.filter(function (child) {
          return !child.new;
        }).map(function (child) {
          return child.value;
        })
      };
    }
  }, {
    key: "isRoot",
    get: function get() {
      return this.parent === null;
    }
  }, {
    key: "changing",
    get: function get() {
      return this.new || this.editing;
    }
  }, {
    key: "hasChangingChildren",
    get: function get() {
      return this.changin || this.children.some(function (child) {
        return child.hasChangingChildren;
      });
    }
  }, {
    key: "hasData",
    get: function get() {
      return !_lodash.default.isEmpty(this.persistentData);
    }
  }, {
    key: "hasChildren",
    get: function get() {
      return Array.isArray(this.children) && this.children.length > 0;
    }
  }]);

  return Node;
}();

exports.default = Node;
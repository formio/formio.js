"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Base = _interopRequireDefault(require("../base/Base"));

var _Components = _interopRequireDefault(require("../Components"));

var _NestedComponent2 = _interopRequireDefault(require("../nested/NestedComponent"));

var _utils = _interopRequireDefault(require("../../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Node =
/*#__PURE__*/
function () {
  function Node(parent) {
    var _this = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children;

    var isNew = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, Node);

    this.parent = parent;
    this.persistentData = data;
    this.children = children.map(function (child) {
      return new Node(_this, child, false);
    });
    this.new = isNew;
    this.revertAvailable = false;
    this.editing = false;
    this.collapsed = false;
    this.components = [];
    this.resetData();
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

      var child = new Node(this);
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
      this.previousData = _lodash.default.clone(this.persistentData);
      this.persistentData = _lodash.default.cloneDeep(this.data);
      return this;
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this.data = _lodash.default.cloneDeep(this.persistentData);
      return this;
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
  }]);

  return Node;
}();

var TreeComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(TreeComponent, _NestedComponent);

  _createClass(TreeComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        label: 'Tree',
        key: 'tree',
        type: 'tree',
        clearOnHide: true,
        input: true,
        tree: true,
        components: [],
        template: {
          edit: this.defaultEditTemplate,
          view: this.defaultViewTemplate,
          child: this.defaultChildTemplate,
          children: this.defaultChildrenTemplate
        }
      }].concat(extend));
    }
    /* Ignore builder until we work out the kinks in builder mode.
    static get builderInfo() {
      return {
        title: 'Tree',
        icon: 'fa fa-indent',
        group: 'data',
        weight: 30,
        schema: TreeComponent.schema(),
      };
    }
    */

  }, {
    key: "defaultEditTemplate",
    get: function get() {
      return "{% if (!node.isRoot) { %}\n  <div class=\"list-group-item\">\n{% } else { %}\n  <li class=\"list-group-item\">\n{% } %}\n  <div class=\"node-edit\">\n    <div node-edit-form></div>\n    {% if (!instance.options.readOnly) { %}\n      <div class=\"node-actions\">\n        <button class=\"btn btn-primary saveNode\">Save</button>\n        <button class=\"btn btn-danger cancelNode\">Cancel</button>\n      </div>\n    {% } %}\n  </div>\n{% if (!node.isRoot) { %}\n  </div>\n{% } else { %}\n  </li>\n{% } %}";
    }
  }, {
    key: "defaultChildTemplate",
    get: function get() {
      return "{% if (node.isRoot) { %}\n  <div class=\"list-group-item\"></div>\n{% } else { %}\n  <li class=\"list-group-item col-sm-12\"></li>\n{% } %}";
    }
  }, {
    key: "defaultChildrenTemplate",
    get: function get() {
      return '<ul class="tree-listgroup list-group row"></ul>';
    }
  }, {
    key: "defaultViewTemplate",
    get: function get() {
      return "<div class=\"row\">\n  {% util.eachComponent(components, function(component) { %}\n    <div class=\"col-sm-2\">\n      {{ getView(component, nodeData[component.key]) }}\n    </div>\n  {% }) %}\n  <div class=\"col-sm-3\">\n    <div class=\"btn-group pull-right\">\n      <button class='btn btn-default btn-sm toggleNode'>{{ node.collapsed ? 'Expand : 'Collapse' }}</button>\n      {% if (!instance.options.readOnly) { %}\n        <button class=\"btn btn-default btn-sm addChild\">Add</button>\n        <button class=\"btn btn-default btn-sm editNode\">Edit</button>\n        <button class=\"btn btn-danger btn-sm removeNode\">Delete</button>\n        {% if (node.revertAvailable) { %}\n          <button class=\"btn btn-danger btn-sm revertNode\">Revert</button>\n        {% } %}\n      {% } %}\n    </div>\n  </div>\n</div>";
    }
  }]);

  function TreeComponent(component, options, data) {
    var _this2$component$temp, _this2$component$temp2, _this2$component$temp3, _this2$component$temp4;

    var _this2;

    _classCallCheck(this, TreeComponent);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(TreeComponent).call(this, component, options, data));
    _this2.type = 'tree';
    _this2.changingNodeClassName = 'formio-component-tree-node-changing';
    _this2.templateHash = {
      edit: _utils.default.addTemplateHash(((_this2$component$temp = _this2.component.template) === null || _this2$component$temp === void 0 ? void 0 : _this2$component$temp.edit) || TreeComponent.defaultEditTemplate),
      view: _utils.default.addTemplateHash(((_this2$component$temp2 = _this2.component.template) === null || _this2$component$temp2 === void 0 ? void 0 : _this2$component$temp2.view) || TreeComponent.defaultViewTemplate),
      child: _utils.default.addTemplateHash(((_this2$component$temp3 = _this2.component.template) === null || _this2$component$temp3 === void 0 ? void 0 : _this2$component$temp3.child) || TreeComponent.defaultChildTemplate),
      children: _utils.default.addTemplateHash(((_this2$component$temp4 = _this2.component.template) === null || _this2$component$temp4 === void 0 ? void 0 : _this2$component$temp4.children) || TreeComponent.defaultChildrenTemplate)
    };
    return _this2;
  }

  _createClass(TreeComponent, [{
    key: "getComponents",
    value: function getComponents() {
      var _this$tree;

      return ((_this$tree = this.tree) === null || _this$tree === void 0 ? void 0 : _this$tree.getComponents()) || _get(_getPrototypeOf(TreeComponent.prototype), "getComponents", this).call(this);
    }
  }, {
    key: "build",
    value: function build(state) {
      if (this.options.builder) {
        return _get(_getPrototypeOf(TreeComponent.prototype), "build", this).call(this, state, true);
      }

      this.createElement();
      this.createLabel(this.element);
      this.setRoot();
      this.buildTree();
      this.createDescription(this.element);
      this.errorContainer = this.ce('div', {
        class: 'has-error'
      });
      this.element.appendChild(this.errorContainer);
      this.attachLogic();
    }
  }, {
    key: "buildTree",
    value: function buildTree() {
      if (this.options.builder) {
        return;
      }

      var treeElement = this.buildNode(this.tree);

      if (this.treeElement) {
        this.element.replaceChild(treeElement, this.treeElement);
      } else {
        this.appendTo(treeElement, this.element);
      }

      this.treeElement = treeElement;
    }
  }, {
    key: "buildNodes",
    value: function buildNodes(parent) {
      var _this3 = this;

      var childNodes = parent.children.map(this.buildNode.bind(this));
      var element = this.renderElement(this.templateHash.children, {
        node: parent,
        nodeData: parent.persistentData,
        data: this.data,
        components: this.component.components,
        instance: this,
        getView: function getView(component, data) {
          return _Components.default.create(component, _this3.options, data, true).getView(data);
        }
      });
      this.appendChild(element, childNodes);

      if (parent.hasChangingChildren) {
        this.addClass(element, this.changingNodeClassName);
      } else {
        this.removeClass(element, this.changingNodeClassName);
      }

      return element;
    }
  }, {
    key: "buildNode",
    value: function buildNode(node) {
      var _this4 = this;

      var element = this.renderElement(this.templateHash.child, {
        node: node,
        nodeData: node.persistentData,
        data: this.data,
        components: this.component.components,
        instance: this,
        getView: function getView(component, data) {
          return _Components.default.create(component, _this4.options, data, true).getView(data);
        }
      });

      if (node.changing) {
        node.components = this.component.components.map(function (comp, index) {
          var component = _lodash.default.cloneDeep(comp);

          var options = _lodash.default.clone(_this4.options);

          options.row = "".concat(_this4.row, "-").concat(index);
          options.name += "[".concat(index, "]");

          var instance = _this4.createComponent(component, options, node.data);

          instance.node = node;
          return instance;
        });
        this.renderTemplateToElement(element, this.templateHash.edit, {
          node: node,
          nodeData: node.data,
          data: this.data,
          components: this.component.components,
          instance: this
        }, [{
          class: 'saveNode',
          event: 'click',
          action: this.saveNode.bind(this, node)
        }, {
          class: 'cancelNode',
          event: 'click',
          action: this.cancelNode.bind(this, node)
        }]);
        var editForm = node.components.map(function (comp) {
          return comp.element;
        });
        element.querySelectorAll('[node-edit-form]').forEach(function (element) {
          return _this4.appendChild(element, editForm);
        });
      } else {
        this.renderTemplateToElement(element, this.templateHash.view, {
          node: node,
          nodeData: node.persistentData,
          data: this.data,
          components: this.component.components,
          instance: this,
          getView: function getView(component, data) {
            return _Components.default.create(component, _this4.options, data, true).getView(data);
          }
        }, [{
          class: 'toggleNode',
          event: 'click',
          action: this.toggleNode.bind(this, node)
        }, {
          class: 'addChild',
          event: 'click',
          action: this.addChild.bind(this, node)
        }, {
          class: 'editNode',
          event: 'click',
          action: this.editNode.bind(this, node)
        }, {
          class: 'removeNode',
          event: 'click',
          action: this.removeNode.bind(this, node)
        }, {
          class: 'revertNode',
          event: 'click',
          action: this.revertNode.bind(this, node)
        }]);
      }

      this.checkData(this.data, {
        noValidate: true
      });

      if (!node.collapsed && node.children.length > 0) {
        element.appendChild(this.buildNodes(node));
      }

      return element;
    }
  }, {
    key: "toggleNode",
    value: function toggleNode(node) {
      this.hook('tree.toggleNode', {
        node: node,
        component: this
      }, function () {
        return node.collapsed = !node.collapsed;
      });
      this.buildTree();
    }
  }, {
    key: "addChild",
    value: function addChild(parent) {
      if (this.options.readOnly || parent.new) {
        return;
      }

      this.hook('tree.addChild', {
        parent: parent,
        component: this
      }, function () {
        return parent.addChild();
      });
      this.buildTree();
    }
  }, {
    key: "editNode",
    value: function editNode(node) {
      if (this.options.readOnly || node.new) {
        return;
      }

      this.hook('tree.editNode', {
        node: node,
        component: this
      }, function () {
        return node.edit();
      });
      this.buildTree();
    }
  }, {
    key: "cancelNode",
    value: function cancelNode(node) {
      var _this5 = this;

      if (this.options.readOnly) {
        return;
      }

      this.hook('tree.cancelNode', {
        node: node,
        component: this
      }, function () {
        if (node.isRoot) {
          _this5.removeRoot();
        } else {
          node.cancel();
        }

        return node;
      });
      this.buildTree();
    }
  }, {
    key: "saveNode",
    value: function saveNode(node) {
      if (this.options.readOnly) {
        return;
      }

      this.hook('tree.saveNode', {
        node: node,
        component: this
      }, function () {
        return node.save();
      });
      this.updateTree();
    }
  }, {
    key: "revertNode",
    value: function revertNode(node) {
      if (this.options.readOnly || !node.revertAvailable) {
        return;
      }

      this.hook('tree.revertNode', {
        node: node,
        component: this
      }, function () {
        return node.revert();
      });
      this.updateTree();
    }
  }, {
    key: "removeNode",
    value: function removeNode(node) {
      var _this6 = this;

      if (this.options.readOnly || node.new) {
        return;
      }

      this.hook('tree.removeNode', {
        node: node,
        component: this
      }, function () {
        if (node.isRoot) {
          _this6.removeRoot();
        } else {
          node.remove();
        }

        return node;
      });
      this.updateTree();
    }
  }, {
    key: "removeRoot",
    value: function removeRoot() {
      if (this.options.readOnly) {
        return;
      }

      this.setRoot(this.defaultValue);
    }
  }, {
    key: "updateTree",
    value: function updateTree() {
      this.dataValue = this.tree.value;
      this.updateValue();
      this.triggerChange();
      this.buildTree();
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var changed = _Base.default.prototype.setValue.call(this, value, flags);

      this.dataValue = value;
      this.setRoot();
      this.buildTree();
      return changed;
    }
  }, {
    key: "setRoot",
    value: function setRoot() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataValue;
      this.tree = new Node(null, value, !value.data);
      this.hook('tree.setRoot', {
        root: this.tree,
        component: this
      });
    }
  }, {
    key: "updateValue",
    value: function updateValue(flags, value) {
      // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
      return _Base.default.prototype.updateValue.call(this, flags, value);
    }
  }, {
    key: "clearOnHide",
    value: function clearOnHide(show) {
      _get(_getPrototypeOf(TreeComponent.prototype), "clearOnHide", this).call(this, show);

      this.setRoot();
      this.buildTree();
    }
  }, {
    key: "restoreComponentsContext",
    value: function restoreComponentsContext() {
      this.getComponents().forEach(function (component) {
        return component.data = component.node.data;
      });
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return TreeComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return {};
    }
  }]);

  return TreeComponent;
}(_NestedComponent2.default);

exports.default = TreeComponent;
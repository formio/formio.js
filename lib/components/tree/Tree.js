"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Component = _interopRequireDefault(require("../_classes/component/Component"));

var _Components = _interopRequireDefault(require("../Components"));

var _NestedComponent2 = _interopRequireDefault(require("../_classes/nested/NestedComponent"));

var _Node = _interopRequireDefault(require("./Node"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TreeComponent = /*#__PURE__*/function (_NestedComponent) {
  _inherits(TreeComponent, _NestedComponent);

  var _super = _createSuper(TreeComponent);

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
        components: []
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Tree',
        icon: 'indent',
        group: 'data',
        weight: 40,
        schema: TreeComponent.schema()
      };
    }
  }]);

  function TreeComponent() {
    var _this;

    _classCallCheck(this, TreeComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.type = 'tree';
    return _this;
  }

  _createClass(TreeComponent, [{
    key: "init",
    value: function init() {
      if (this.builderMode) {
        return _get(_getPrototypeOf(TreeComponent.prototype), "init", this).call(this);
      }

      this.components = [];
      this.componentOptions = _objectSpread(_objectSpread({}, this.options), {}, {
        parent: this,
        root: this.root || this
      });
      this.setRoot();
      this.viewComponentsInstantiated = false;
      this._viewComponents = [];
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(TreeComponent.prototype), "destroy", this).call(this);

      if (!this.builderMode) {
        this.removeComponents(this._viewComponents);
      }
    }
  }, {
    key: "createComponents",
    value: function createComponents(data, node) {
      var _this2 = this;

      var components = this.componentComponents.map(function (component) {
        return _Components.default.create(component, _this2.componentOptions, data);
      });

      if (node) {
        this.checkNode(this.data, node);
      }

      return components;
    }
  }, {
    key: "removeComponents",
    value: function removeComponents(components) {
      return components.map(function (component) {
        return component.destroy();
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.builderMode) {
        return _get(_getPrototypeOf(TreeComponent.prototype), "render", this).call(this);
      }

      return _get(_getPrototypeOf(TreeComponent.prototype), "render", this).call(this, this.renderTree(this.treeRoot));
    }
  }, {
    key: "renderTree",
    value: function renderTree() {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var odd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var childNodes = node.hasChildren && !node.collapsed ? this.renderChildNodes(node.children, !odd) : [];
      var content = node.changing ? this.renderEdit(node) : this.renderView(node);
      return this.renderTemplate('tree', {
        odd: odd,
        childNodes: childNodes,
        content: content,
        node: node
      });
    }
  }, {
    key: "renderChildNodes",
    value: function renderChildNodes() {
      var _this3 = this;

      var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var odd = arguments.length > 1 ? arguments[1] : undefined;
      return nodes.map(function (node) {
        return _this3.renderTree(node, odd);
      });
    }
  }, {
    key: "renderEdit",
    value: function renderEdit() {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.renderTemplate('treeEdit', {
        children: this.renderComponents(node.components),
        node: node
      });
    }
  }, {
    key: "renderView",
    value: function renderView() {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.renderTemplate('treeView', {
        values: this.viewComponents.map(function (component) {
          component.data = node.data;
          component.checkComponentConditions(node.data);
          return component.getView(component.dataValue);
        }),
        nodeData: node.data,
        node: node
      });
    }
  }, {
    key: "attach",
    value: function attach(element) {
      if (this.builderMode) {
        return _get(_getPrototypeOf(TreeComponent.prototype), "attach", this).call(this, element);
      }

      this.loadRefs(element, {
        root: 'single'
      });
      return _nativePromiseOnly.default.all([_get(_getPrototypeOf(TreeComponent.prototype), "attach", this).call(this, element), this.attachNode(this.refs.root, this.treeRoot)]);
    }
  }, {
    key: "attachNode",
    value: function attachNode(element, node) {
      if (!element) {
        return _nativePromiseOnly.default.resolve();
      }

      var componentsPromise = _nativePromiseOnly.default.resolve();

      var childrenPromise = _nativePromiseOnly.default.resolve();

      node.refs = _lodash.default.reduce(element.children, function (refs, child) {
        return child.hasAttribute('ref') ? _objectSpread(_objectSpread({}, refs), {}, _defineProperty({}, child.getAttribute('ref'), child)) : refs;
      }, {});

      if (node.refs.content) {
        this.attachActions(node);
        componentsPromise = this.attachComponents(node);
      }

      if (node.refs.childNodes) {
        childrenPromise = this.attachChildren(node);
      }

      return _nativePromiseOnly.default.all([componentsPromise, childrenPromise]);
    }
  }, {
    key: "attachActions",
    value: function attachActions(node) {
      var _this4 = this;

      this.loadRefs.call(node, node.refs.content, {
        addChild: 'single',
        cancelNode: 'single',
        editNode: 'single',
        removeNode: 'single',
        revertNode: 'single',
        saveNode: 'single',
        toggleNode: 'single'
      });

      if (node.refs.addChild) {
        this.addEventListener(node.refs.addChild, 'click', function () {
          _this4.addChild(node);
        });
      }

      if (node.refs.cancelNode) {
        this.addEventListener(node.refs.cancelNode, 'click', function () {
          _this4.cancelNode(node);
        });
      }

      if (node.refs.editNode) {
        this.addEventListener(node.refs.editNode, 'click', function () {
          _this4.editNode(node);
        });
      }

      if (node.refs.removeNode) {
        this.addEventListener(node.refs.removeNode, 'click', function () {
          _this4.removeNode(node);
        });
      }

      if (node.refs.revertNode) {
        this.addEventListener(node.refs.revertNode, 'click', function () {
          _this4.revertNode(node);
        });
      }

      if (node.refs.saveNode) {
        this.addEventListener(node.refs.saveNode, 'click', function () {
          _this4.saveNode(node);
        });
      }

      if (node.refs.toggleNode) {
        this.addEventListener(node.refs.toggleNode, 'click', function () {
          _this4.toggleNode(node);
        });
      }
    }
  }, {
    key: "attachComponents",
    value: function attachComponents(node) {
      if (this.builderMode) {
        var _get2;

        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return (_get2 = _get(_getPrototypeOf(TreeComponent.prototype), "attachComponents", this)).call.apply(_get2, [this, node].concat(args));
      }

      this.loadRefs.call(node, node.refs.content, {
        nodeEdit: 'single'
      });
      return node.refs.nodeEdit ? _get(_getPrototypeOf(TreeComponent.prototype), "attachComponents", this).call(this, node.refs.nodeEdit, node.components) : _nativePromiseOnly.default.resolve();
    }
  }, {
    key: "attachChildren",
    value: function attachChildren(node) {
      var _this5 = this;

      var childElements = node.refs.childNodes.children;
      return _nativePromiseOnly.default.all(_lodash.default.map(childElements, function (childElement, index) {
        return _this5.attachNode(childElement, node.children[index]);
      }));
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var changed = this.updateValue(value, flags);
      this.setRoot();
      return changed;
    }
  }, {
    key: "addChild",
    value: function addChild(parent) {
      var _this6 = this;

      if (this.options.readOnly || parent.new) {
        return;
      }

      this.hook('tree.addChild', {
        parent: parent,
        component: this
      }, function () {
        var child = parent.addChild();

        _this6.redraw();

        return child;
      });
    }
  }, {
    key: "cancelNode",
    value: function cancelNode(node) {
      var _this7 = this;

      if (this.options.readOnly) {
        return;
      }

      this.hook('tree.cancelNode', {
        node: node,
        component: this
      }, function () {
        if (node.isRoot) {
          _this7.removeRoot();
        } else {
          node.cancel();

          _this7.redraw();
        }

        return node;
      });
    }
  }, {
    key: "editNode",
    value: function editNode(node) {
      var _this8 = this;

      if (this.options.readOnly || node.new) {
        return;
      }

      this.hook('tree.editNode', {
        node: node,
        component: this
      }, function () {
        node.edit();

        _this8.redraw();

        return node;
      });
    }
  }, {
    key: "removeNode",
    value: function removeNode(node) {
      var _this9 = this;

      if (this.options.readOnly || node.new) {
        return;
      }

      this.hook('tree.removeNode', {
        node: node,
        component: this
      }, function () {
        if (node.isRoot) {
          _this9.removeRoot();
        } else {
          node.remove();

          _this9.updateTree();
        }

        return node;
      });
    }
  }, {
    key: "revertNode",
    value: function revertNode(node) {
      var _this10 = this;

      if (this.options.readOnly || !node.revertAvailable) {
        return;
      }

      this.hook('tree.revertNode', {
        node: node,
        component: this
      }, function () {
        node.revert();

        _this10.updateTree();

        return node;
      });
    }
  }, {
    key: "saveNode",
    value: function saveNode(node) {
      var _this11 = this;

      if (this.options.readOnly) {
        return;
      }

      this.hook('tree.saveNode', {
        node: node,
        component: this
      }, function () {
        node.save();

        _this11.updateTree();

        return node;
      });
    }
  }, {
    key: "toggleNode",
    value: function toggleNode(node) {
      var _this12 = this;

      this.hook('tree.toggleNode', {
        node: node,
        component: this
      }, function () {
        node.collapsed = !node.collapsed;

        _this12.redraw();

        return node;
      });
    }
  }, {
    key: "removeRoot",
    value: function removeRoot() {
      if (this.options.readOnly) {
        return;
      }

      this.dataValue = this.defaultValue;
      this.setRoot();
      this.redraw();
    }
  }, {
    key: "setRoot",
    value: function setRoot() {
      var value = this.dataValue;
      this.treeRoot = new _Node.default(null, value, {
        isNew: !value.data,
        createComponents: this.createComponents.bind(this),
        checkNode: this.checkNode.bind(this, this.data),
        removeComponents: this.removeComponents
      });
      this.hook('tree.setRoot', {
        root: this.treeRoot,
        component: this
      });
      this.redraw();
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "updateTree",
    value: function updateTree() {
      this.updateValue(this.treeRoot.value);
      this.redraw();
    }
  }, {
    key: "checkData",
    value: function checkData(data, flags, row) {
      return this.checkNode(data, this.treeRoot, flags, row);
    }
  }, {
    key: "checkNode",
    value: function checkNode(data, node, flags, row) {
      var _this13 = this;

      return node.children.reduce(function (result, child) {
        return _this13.checkNode(data, child, flags, row) && result;
      }, _get(_getPrototypeOf(TreeComponent.prototype), "checkData", this).call(this, data, flags, node.data, node.components));
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return {};
    }
  }, {
    key: "viewComponents",
    get: function get() {
      if (!this.viewComponentsInstantiated) {
        this.viewComponentsInstantiated = true;
        this._viewComponents = this.createComponents({});
      }

      return this._viewComponents;
    }
  }]);

  return TreeComponent;
}(_NestedComponent2.default);

exports.default = TreeComponent;
TreeComponent.prototype.hasChanged = _Component.default.prototype.hasChanged;
TreeComponent.prototype.updateValue = _Component.default.prototype.updateValue;
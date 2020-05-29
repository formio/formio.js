import _ from 'lodash';
import Component from '../_classes/component/Component';
import Components from '../Components';
import NestedComponent from '../_classes/nested/NestedComponent';
import Node from './Node';
import NativePromise from 'native-promise-only';

export default class TreeComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Tree',
      key: 'tree',
      type: 'tree',
      clearOnHide: true,
      input: true,
      tree: true,
      components: [],
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Tree',
      icon: 'indent',
      group: 'data',
      weight: 40,
      schema: TreeComponent.schema(),
    };
  }

  constructor(...args) {
    super(...args);
    this.type = 'tree';
  }

  get emptyValue() {
    return {};
  }

  get viewComponents() {
    if (!this.viewComponentsInstantiated) {
      this.viewComponentsInstantiated = true;
      this._viewComponents = this.createComponents({});
    }

    return this._viewComponents;
  }

  init() {
    if (this.builderMode) {
      return super.init();
    }

    this.components = [];
    this.componentOptions = {
      ...this.options,
      parent: this,
      root: this.root || this,
    };
    this.setRoot();
    this.viewComponentsInstantiated = false;
    this._viewComponents = [];
  }

  destroy() {
    super.destroy();

    if (!this.builderMode) {
      this.removeComponents(this._viewComponents);
    }
  }

  createComponents(data, node) {
    const components = this.componentComponents.map(
      (component) => Components.create(component, this.componentOptions, data),
    );

    if (node) {
      this.checkNode(this.data, node);
    }

    return components;
  }

  removeComponents(components) {
    return components.map((component) => component.destroy());
  }

  render() {
    if (this.builderMode) {
      return super.render();
    }

    return super.render(this.renderTree(this.treeRoot));
  }

  renderTree(node = {}, odd = true) {
    const childNodes = (node.hasChildren && !node.collapsed)
      ? this.renderChildNodes(node.children, !odd)
      : [];
    const content = node.changing
      ? this.renderEdit(node)
      : this.renderView(node);

    return this.renderTemplate('tree', {
      odd,
      childNodes,
      content,
      node,
    });
  }

  renderChildNodes(nodes = [], odd) {
    return nodes.map((node) => this.renderTree(node, odd));
  }

  renderEdit(node = {}) {
    return this.renderTemplate('treeEdit', {
      children: this.renderComponents(node.components),
      node,
    });
  }

  renderView(node = {}) {
    return this.renderTemplate('treeView', {
      values: this.viewComponents.map((component) => {
        component.data = node.data;
        component.checkComponentConditions(node.data);
        return component.getView(component.dataValue);
      }),
      nodeData: node.data,
      node,
    });
  }

  attach(element) {
    if (this.builderMode) {
      return super.attach(element);
    }

    this.loadRefs(element, {
      root: 'single',
    });

    return NativePromise.all([
      super.attach(element),
      this.attachNode(this.refs.root, this.treeRoot),
    ]);
  }

  attachNode(element, node) {
    if (!element) {
      return NativePromise.resolve();
    }

    let componentsPromise = NativePromise.resolve();
    let childrenPromise = NativePromise.resolve();

    node.refs = _.reduce(
      element.children,
      (refs, child) => (
        child.hasAttribute('ref')
          ? {
            ...refs,
            [child.getAttribute('ref')]: child,
          }
          : refs
      ),
      {},
    );

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
  }

  attachActions(node) {
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
      this.addEventListener(node.refs.addChild, 'click', () => {
        this.addChild(node);
      });
    }

    if (node.refs.cancelNode) {
      this.addEventListener(node.refs.cancelNode, 'click', () => {
        this.cancelNode(node);
      });
    }

    if (node.refs.editNode) {
      this.addEventListener(node.refs.editNode, 'click', () => {
        this.editNode(node);
      });
    }

    if (node.refs.removeNode) {
      this.addEventListener(node.refs.removeNode, 'click', () => {
        this.removeNode(node);
      });
    }

    if (node.refs.revertNode) {
      this.addEventListener(node.refs.revertNode, 'click', () => {
        this.revertNode(node);
      });
    }

    if (node.refs.saveNode) {
      this.addEventListener(node.refs.saveNode, 'click', () => {
        this.saveNode(node);
      });
    }

    if (node.refs.toggleNode) {
      this.addEventListener(node.refs.toggleNode, 'click', () => {
        this.toggleNode(node);
      });
    }
  }

  attachComponents(node, ...args) {
    if (this.builderMode) {
      return super.attachComponents.call(this, node, ...args);
    }

    this.loadRefs.call(node, node.refs.content, {
      nodeEdit: 'single',
    });

    return node.refs.nodeEdit
      ? super.attachComponents(node.refs.nodeEdit, node.components)
      : NativePromise.resolve();
  }

  attachChildren(node) {
    const childElements = node.refs.childNodes.children;

    return NativePromise.all(
      _.map(
        childElements,
        (childElement, index) => this.attachNode(childElement, node.children[index]),
      ),
    );
  }

  setValue(value, flags = {}) {
    const changed = this.updateValue(value, flags);
    this.setRoot();
    return changed;
  }

  addChild(parent) {
    if (this.options.readOnly || parent.new) {
      return;
    }

    this.hook('tree.addChild', {
      parent,
      component: this,
    }, () => {
      const child = parent.addChild();
      this.redraw();

      return child;
    });
  }

  cancelNode(node) {
    if (this.options.readOnly) {
      return;
    }

    this.hook('tree.cancelNode', {
      node,
      component: this,
    }, () => {
      if (node.isRoot) {
        this.removeRoot();
      }
      else {
        node.cancel();
        this.redraw();
      }

      return node;
    });
  }

  editNode(node) {
    if (this.options.readOnly || node.new) {
      return;
    }

    this.hook('tree.editNode', {
      node,
      component: this,
    }, () => {
      node.edit();
      this.redraw();

      return node;
    });
  }

  removeNode(node) {
    if (this.options.readOnly || node.new) {
      return;
    }

    this.hook('tree.removeNode', {
      node,
      component: this,
    }, () => {
      if (node.isRoot) {
        this.removeRoot();
      }
      else {
        node.remove();
        this.updateTree();
      }

      return node;
    });
  }

  revertNode(node) {
    if (this.options.readOnly || !node.revertAvailable) {
      return;
    }

    this.hook('tree.revertNode', {
      node,
      component: this,
    }, () => {
      node.revert();
      this.updateTree();

      return node;
    });
  }

  saveNode(node) {
    if (this.options.readOnly) {
      return;
    }

    this.hook('tree.saveNode', {
      node,
      component: this,
    }, () => {
      node.save();
      this.updateTree();

      return node;
    });
  }

  toggleNode(node) {
    this.hook('tree.toggleNode', {
      node,
      component: this,
    }, () => {
      node.collapsed = !node.collapsed;
      this.redraw();

      return node;
    });
  }

  removeRoot() {
    if (this.options.readOnly) {
      return;
    }

    this.dataValue = this.defaultValue;
    this.setRoot();
    this.redraw();
  }

  setRoot() {
    const value = this.dataValue;
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
  }

  getValue() {
    return this.dataValue;
  }

  updateTree() {
    this.updateValue(this.treeRoot.value);
    this.redraw();
  }

  checkData(data, flags, row) {
    return this.checkNode(data, this.treeRoot, flags, row);
  }

  checkNode(data, node, flags, row) {
    return node.children.reduce(
      (result, child) => this.checkNode(data, child, flags, row) && result,
      super.checkData(data, flags, node.data, node.components),
    );
  }
}

TreeComponent.prototype.hasChanged = Component.prototype.hasChanged;
TreeComponent.prototype.updateValue = Component.prototype.updateValue;

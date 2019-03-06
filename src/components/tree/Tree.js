// import isEmpty from 'lodash/isEmpty';
import _ from 'lodash';
import flow from 'lodash/flow';
import Component from '../_classes/component/Component';
import NestedComponent from '../_classes/nested/NestedComponent';
import Node from './Node';

export default class TreeComponent extends NestedComponent {
  constructor(...args) {
    super(...args);
    this.type = 'tree';
    this.renderTree = this.renderTree.bind(this);
    this.renderChildNodes = this.renderChildNodes.bind(this);
    this.renderTreeItem = this.renderTreeItem.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  get emptyValue() {
    return {};
  }

  init() {
    this.component.components = [{
      type: 'textfield',
      input: true,
      key: 'field0',
      label: 'Field 0'
    }, {
      type: 'textfield',
      input: true,
      key: 'field1',
      label: 'Field 1'
    }];

    this.components = this.components || [];
  }

  /**
   * Pure version of `addComponents`;
   */
  createComponents(...args) {
    // temporary context to collect all componets
    const context = Object.create(this);
    context.components = [];
    super.addComponents.apply(context, args);
    return context.components;
  }

  updateNodeData(node = {}, data) {
    if (this.hasChanged(node.persistentData, data)) {
      node.data = data;
      node.commitData();

      if (node.hasData) {
        node.components.forEach(cmp => {
          this.setNestedValue(cmp, node.data, null, false);
        });
      }
    }

    return node;
  }

  updateNodeChildren(node = {}, spec = {}) {
    const oldChildren = _.get(node, 'children', []);
    const newChildren = _.get(spec, 'children', []);
    const nextChildren = newChildren.map(
      (next, index) => {
        const prev = oldChildren[index];

        // if we already have node, just update it
        if (prev instanceof Node) {
          return prev;
        }
        // if there new node, create new instance
        else {
          return this.createNode(node, next, false);
        }
      }
    );

    // filter nodes, that should be destroyed
    const rest = oldChildren.filter(ch => !nextChildren.includes(ch));
    rest.forEach(this.removeNode);
    node.children = nextChildren;

    return node;
  }

  addNodeCs(node) {
    node.components = this.createComponents(node.data);

    return node;
  }

  updateNode(node = {}, spec = {}) {
    const { children =  [] } = spec;
    this.updateNodeChildren(node, spec);
    this.updateNodeData(node, spec.data);

    if (node.hasData && _.isEmpty(node.components)) {
      this.addNodeCs(node);
    }

    children.forEach((childSpec, index) => {
      this.updateNode(node.children[index], childSpec);
    });

    return node;
  }

  createNode(parent, spec, isNew) {
    const { children = [], ...nodespec } = spec;
    const node = new Node(parent, nodespec, isNew);
    node.children = children.map(child => {
      return this.createNode(node, child, false);
    });

    return node;
  }

  render() {
    return super.render(this.renderTree(this.tree));
  }

  renderTree(node = {}) {
    const children = node.hasChildren && this.renderChildNodes(node.children);
    const form = (node.changing || node.hasData) && this.renderForm(node);

    return this.renderTemplate('tree', {
      children,
      form,
      level: node.level,
      isRoot: node.isRoot,
      node,
    });
  }

  renderChildNodes(nodes = []) {
    return this.renderTemplate('components', {
      children: nodes.map(flow([this.renderTree, this.renderTreeItem]))
    });
  }

  renderTreeItem(children) {
    return this.renderTemplate('treeItem', { children });
  }

  renderForm(node = {}) {
    if (node.changing) {
      return this.renderTemplate(
        'treeEdit',
        { children: this.renderComponents(node.components) }
      );
    }

    return this.renderTemplate('treeView', {
      views: node.components.map(cmp => cmp.getView(cmp.dataValue)),
      readOnly: this.options.readOnly,
      revertAvailable: node.revertAvailable,
    });
  }

  attach(element) {
    this.loadRefs(element, {
      root: 'single'
    });

    return Promise.all([
      super.attach(element),
      this.attachNode(this.refs.root, this.tree)
    ]);
  }

  attachNode(element, node) {
    let formPromise = Promise.resolve();
    let childPromise = Promise.resolve();

    node.refs = _.reduce(element.children, (refs, elt) => {
      return { ...refs, [elt.getAttribute('ref')]: elt };
    }, {});

    this.loadRefs.call(node, node.refs.nodeActions, {
      add: 'single'
    });

    if (node.refs.nodeForm) {
      this.loadRefs.call(node, node.refs.nodeForm, {
        formActionSave: 'single',
        formActionCancel: 'single'
      });
    }

    if (node.refs.add) {
      this.addEventListener(node.refs.add, 'click', () => {
        this.addChild(node);
      });
    }

    if (node.refs.formActionSave) {
      this.addEventListener(node.refs.formActionSave, 'click', () => {
        this.save(node);
      });
    }

    if (node.refs.nodeForm) {
      formPromise = this.attachComponents(node.refs.nodeForm, node.components);
    }

    if (node.refs.nodeChildren) {
      const nodeElements = _.map(node.refs.nodeChildren.children, li => li.firstChild);
      childPromise = Promise.all(
        nodeElements.map(
          (elt, index) => this.attachNode(elt, node.children[index])
        )
      );
    }

    return Promise.all([
      formPromise,
      childPromise
    ]);
  }

  setValue(value) {
    this.dataValue = value;

    if (!(this.tree instanceof Node)) {
      this.tree = this.createNode(null, this.dataValue, false);
    }

    this.tree = this.updateNode(this.tree, this.dataValue);
  }

  // updateValue(...args) {
  //   // super.updateValue(...args);
  //   // this.setValue(this.tree.value);
  //   // this.redraw();
  // }

  save(node) {
    node.save();
    this.updateValue();
    this.redraw();
  }

  removeNode(node) {
    const { components = [] } = node;
    node.remove();
    components.forEach(cmp => cmp.destroy());
  }

  addChild(parentNode) {
    const child = parentNode.addChild();

    if (child) {
      this.addNodeCs(child);
    }

    this.redraw();
  }
}

TreeComponent.prototype.hasChanged = Component.prototype.hasChanged;

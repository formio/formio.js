import _ from 'lodash';

export default class Node {
  constructor(
    parent,
    {
      data = {},
      children = [],
    } = {},
    {
      checkNode,
      createComponents,
      isNew = true,
      removeComponents,
    } = {},
  ) {
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
    this.children = children.map((child) => new Node(this, child, {
      checkNode,
      createComponents,
      isNew: false,
      removeComponents,
    }));
}

  get value() {
    return this.new
      ? null // Check the special case for empty root node.
      : {
        data: _.cloneDeep(this.persistentData),
        children: this.children.filter((child) => !child.new).map((child) => child.value),
      };
  }

  get isRoot() {
    return this.parent === null;
  }

  get changing() {
    return this.new || this.editing;
  }

  get hasChangingChildren() {
    return this.changin || this.children.some((child) => child.hasChangingChildren);
  }

  get hasData() {
    return !_.isEmpty(this.persistentData);
  }

  get hasChildren() {
    return Array.isArray(this.children) && this.children.length > 0;
  }

  eachChild(iteratee) {
    iteratee(this);
    this.children.forEach((child) => child.eachChild(iteratee));
    return this;
  }

  getComponents() {
    return this.children.reduce(
      (components, child) => components.concat(child.getComponents()),
      this.components,
    );
  }

  addChild() {
    if (this.new) {
      return null;
    }

    const child = new Node(this, {}, {
      checkNode: this.checkNode,
      createComponents: this.createComponents,
      isNew: true,
      removeComponents: this.removeComponents,
    });
    this.children = this.children.concat(child);
    return child;
  }

  removeChild(childToRemove) {
    if (!this.new) {
      this.children = this.children.filter((child) => child !== childToRemove);
    }

    return this;
  }

  edit() {
    if (this.new) {
      return this;
    }

    this.editing = true;
    return this.resetData();
  }

  save() {
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
  }

  cancel() {
    if (this.new) {
      this.remove();
    }
    else if (this.editing) {
      this.editing = false;
      this.resetData();
    }

    return this;
  }

  remove() {
    this.parent.removeChild(this);
    this.parent = null;
    this.clearComponents();
    return this;
  }

  revert() {
    if (!this.revertAvailable) {
      return this;
    }

    this.data = this.previousData;
    return this.commitData();
  }

  commitData() {
    this.previousData = this.persistentData;
    this.persistentData = _.cloneDeep(this.data);
    this.clearComponents();
    return this;
  }

  resetData() {
    this.data = _.cloneDeep(this.persistentData);
    this.updateComponentsContext();
    return this;
  }

  updateComponentsContext() {
    if (this.changing) {
      this.instantiateComponents();
    }
    else {
      this.clearComponents();
    }

    return this;
  }

  instantiateComponents() {
    this.components = this.createComponents(this.data, this);
    this.checkNode(this);
  }

  clearComponents() {
    this.removeComponents(this.components);
    this.components = [];
  }
}

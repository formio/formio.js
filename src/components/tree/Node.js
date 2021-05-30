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
      parentPath = ''
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
    this.parentPath = parentPath;

    this.resetData();
    this.children = children.map((child, index) => new Node(this, child, {
      checkNode,
      createComponents,
      isNew: false,
      removeComponents,
      parentPath: this.getChildrenPath(index),
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

  getChildrenPath(index) {
    return this.parentPath ? `${this.parentPath}.children[${index}]` : '';
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

  validateNode() {
    let valid = true;
    this.getComponents().forEach(comp => {
      comp.setPristine(false);
      valid &= comp.checkValidity(null, false, this.persistentData);
    });
    return valid;
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
      parentPath: this.getChildrenPath(this.children.length),
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
    const isValid = this.validateNode();
    if (this.changing && isValid) {
      if (this.new) {
        this.new = false;
      }
      else {
        this.editing = false;
        this.revertAvailable = true;
      }
      this.commitData();
    }

    return isValid;
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
    this.components.forEach((component) => {
      if (this.parentPath) {
        const path = this.calculateComponentPath(component);
        component.path = path;
      }
    });
    this.checkNode(this);
  }

  clearComponents() {
    this.removeComponents(this.components);
    this.components = [];
  }

  /**
   * Return a path of component's value.
   *
   * @param {Object} component - The component instance.
   * @return {string} - The component's value path.
   */
   calculateComponentPath(component) {
    let path = '';
    if (component.component.key) {
      path = `${this.parentPath}.data.${component.component.key}`;
    }
    return path;
  }
}
